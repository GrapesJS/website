import { AUTH_MESSAGE_TYPES, type AuthMessage, type AuthMessageType } from '@/app/ai/AuthIframe';

export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  [key: string]: any;
}

function sendMessage(
  type: AuthMessageType,
  payload?: AuthMessage['payload'],
  targetWindow: Window = window.parent,
  targetOrigin: string = '*'
): void {
  if (targetWindow === window) return;

  const message: AuthMessage = {
    type,
    payload: { ...payload, timestamp: Date.now() },
    source: 'grapes-auth-iframe',
  };

  try {
    targetWindow.postMessage(message, targetOrigin);
  } catch (error) {
    console.error('[AuthMessaging] Failed to send:', error);
  }
}

export function sendAuthReady(targetWindow?: Window, targetOrigin?: string): void {
  sendMessage(AUTH_MESSAGE_TYPES.AUTH_READY, undefined, targetWindow, targetOrigin);
}

export function sendAuthSuccess(user: User, targetWindow?: Window, targetOrigin?: string): void {
  if (!user?.id) {
    console.error('[AuthMessaging] Invalid user object');
    return;
  }
  sendMessage(AUTH_MESSAGE_TYPES.AUTH_SUCCESS, { user }, targetWindow, targetOrigin);
}

export function sendAuthError(error: string | Error, targetWindow?: Window, targetOrigin?: string): void {
  const errorMessage = error instanceof Error ? error.message : error;
  sendMessage(AUTH_MESSAGE_TYPES.AUTH_ERROR, { error: errorMessage }, targetWindow, targetOrigin);
}

export function sendAuthCancelled(targetWindow?: Window, targetOrigin?: string): void {
  sendMessage(AUTH_MESSAGE_TYPES.AUTH_CANCELLED, undefined, targetWindow, targetOrigin);
}

export function isEmbeddedContext(): boolean {
  try {
    return window.self !== window.top || window.opener !== null;
  } catch {
    return true;
  }
}

export function isEmbeddedParam(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('embedded') === 'true';
}

export function isPostMessageEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('postMessage') === 'true';
}

export function useAuthMessaging() {
  const isEmbedded = isEmbeddedContext() || isEmbeddedParam();
  const postMessageEnabled = isPostMessageEnabled();

  return {
    isEmbedded,
    postMessageEnabled,
    sendReady: () => postMessageEnabled && sendAuthReady(),
    sendSuccess: (user: User) => postMessageEnabled && sendAuthSuccess(user),
    sendError: (error: string | Error) => postMessageEnabled && sendAuthError(error),
    sendCancelled: () => postMessageEnabled && sendAuthCancelled(),
  };
}

export default useAuthMessaging;
