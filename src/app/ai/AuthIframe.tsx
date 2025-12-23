'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getAppApiBase } from '@/lib/config';
import { checkAuthSession } from '@/lib/grapes-api';

const AUTH_TIMEOUT_MS = 300000;
const IFRAME_MIN_HEIGHT = 700;
const ALLOWED_ORIGINS = [
  'https://app.grapesjs.com',
  'https://app-staging.grapesjs.com',
  'https://app.grapesjs.local:3000',
  'http://app.grapesjs.local:3000',
  'http://www.grapesjs.local:3001',
  'http://localhost:3000',
  'http://localhost:3001',
];

export const AUTH_MESSAGE_TYPES = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_ERROR: 'AUTH_ERROR',
  AUTH_READY: 'AUTH_READY',
  AUTH_CANCELLED: 'AUTH_CANCELLED',
} as const;

export type AuthMessageType = typeof AUTH_MESSAGE_TYPES[keyof typeof AUTH_MESSAGE_TYPES];

export interface AuthMessage {
  type: AuthMessageType;
  payload?: {
    user?: User;
    error?: string;
    timestamp?: number;
  };
  source: 'grapes-auth-iframe';
}

interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  avatar?: string;
  [key: string]: any;
}

interface AuthIframeProps {
  readonly onAuthSuccess: (user: User) => void;
  readonly onClose: () => void;
  readonly onError?: (error: Error) => void;
  readonly timeoutMs?: number;
}

type AuthState = 
  | { status: 'loading' }
  | { status: 'ready' }
  | { status: 'authenticated' }
  | { status: 'error'; error: Error }
  | { status: 'timeout' };

export function AuthIframe({ 
  onAuthSuccess, 
  onClose,
  onError,
  timeoutMs = AUTH_TIMEOUT_MS,
}: AuthIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef(false);
  
  const [authState, setAuthState] = useState<AuthState>({ status: 'loading' });


  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleSuccess = useCallback((user: User) => {
    if (hasCompletedRef.current) return;
    if (!user?.id) {
      handleError(new Error('Invalid user object'));
      return;
    }

    hasCompletedRef.current = true;
    cleanup();
    setAuthState({ status: 'authenticated' });
    
    requestAnimationFrame(() => {
      onAuthSuccess(user);
    });
  }, [onAuthSuccess, cleanup]);

  const handleError = useCallback((error: Error) => {
    if (hasCompletedRef.current) return;

    hasCompletedRef.current = true;
    cleanup();
    setAuthState({ status: 'error', error });
    onError?.(error);
  }, [onError, cleanup]);

  const handleTimeout = useCallback(() => {
    if (hasCompletedRef.current) return;
    
    setAuthState({ status: 'timeout' });
    handleError(new Error(`Authentication timeout after ${timeoutMs / 1000}s`));
  }, [timeoutMs, handleError]);

  const handleMessage = useCallback((event: MessageEvent<any>) => {
    const isLocalDev = event.origin.includes('localhost') || event.origin.includes('grapesjs.local');
    const isAllowed = ALLOWED_ORIGINS.includes(event.origin) || (process.env.NODE_ENV === 'development' && isLocalDev);
    
    if (!isAllowed) {
      return;
    }
    const message = event.data as Partial<AuthMessage>;
    

    switch (message.type) {
      case AUTH_MESSAGE_TYPES.AUTH_READY:
        if (!hasCompletedRef.current) {
          setAuthState({ status: 'ready' });
        }
        break;

      case AUTH_MESSAGE_TYPES.AUTH_SUCCESS:
        if (message.payload?.user) {
          handleSuccess(message.payload.user);
        } else {

          checkAuthSession()
            .then((result) => {
              if (result.isAuthenticated && result.user) {
                handleSuccess(result.user);
              } else {
                handleError(new Error('No user in session after successful auth'));
              }
            })
            .catch((error) => {
              handleError(new Error(`Failed to fetch session: ${error.message}`));
            });
        }
        break;

      case AUTH_MESSAGE_TYPES.AUTH_ERROR:
        handleError(new Error(message.payload?.error || 'Authentication failed'));
        break;

      case AUTH_MESSAGE_TYPES.AUTH_CANCELLED:
        onClose();
        break;
    }
  }, [handleSuccess, handleError, onClose]);

  const handleClose = useCallback(() => {
    cleanup();
    onClose();
  }, [onClose, cleanup]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    timeoutRef.current = setTimeout(handleTimeout, timeoutMs);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      cleanup();
    };
  }, [handleMessage, handleTimeout, timeoutMs, cleanup]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const iframeUrl = (() => {
    const baseUrl = getAppApiBase();
    const params = new URLSearchParams({
      embedded: 'true',
      callbackUrl: `${baseUrl}/auth/callback?success=true`,
      postMessage: 'true',
    });
    return `${baseUrl}/signin?${params}`;
  })();

  const isProcessing = ['loading', 'authenticated'].includes(authState.status);
  const processingText = authState.status === 'authenticated' ? 'Signing in...' : 'Loading...';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 max-h-[85vh] flex flex-col">
          
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 z-10 rounded-2xl">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-violet-500 border-t-transparent" />
                <p className="mt-2 text-sm text-gray-400">{processingText}</p>
              </div>
            </div>
          )}

          {authState.status === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/95 z-10 p-6 rounded-2xl">
              <div className="text-center max-w-sm">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Authentication Error</h3>
                <p className="text-sm text-gray-400 mb-4">{authState.error.message}</p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {authState.status === 'timeout' && (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/95 z-10 p-6 rounded-2xl">
              <div className="text-center max-w-sm">
                <div className="text-yellow-500 text-4xl mb-4">⏱️</div>
                <h3 className="text-lg font-semibold text-white mb-2">Authentication Timeout</h3>
                <p className="text-sm text-gray-400 mb-4">Please try again.</p>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={iframeUrl}
            className="w-full h-full border-0 rounded-2xl"
            style={{ minHeight: IFRAME_MIN_HEIGHT }}
            title="Sign In"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
            allow="camera 'none'; microphone 'none'; geolocation 'none'"
          />
        </div>
      </div>
    </div>
  );
}
