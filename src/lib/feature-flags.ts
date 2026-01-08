declare global {
  interface Window {
    GRAPES_USE_NEW_AUTH?: boolean;
  }
}

export function useNewAuthFlow(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }
  
  if (typeof window.GRAPES_USE_NEW_AUTH === 'boolean') {
    return window.GRAPES_USE_NEW_AUTH;
  }
  
  return true;
}

export function enableNewAuthFlow(): void {
  if (typeof window !== 'undefined') {
    window.GRAPES_USE_NEW_AUTH = true;
    window.dispatchEvent(new CustomEvent('featureFlagChanged', { detail: { flag: 'GRAPES_USE_NEW_AUTH', value: true } }));
    console.log('✅ New auth flow enabled.');
  }
}

export function disableNewAuthFlow(): void {
  if (typeof window !== 'undefined') {
    window.GRAPES_USE_NEW_AUTH = false;
    window.dispatchEvent(new CustomEvent('featureFlagChanged', { detail: { flag: 'GRAPES_USE_NEW_AUTH', value: false } }));
    console.log('✅ New auth flow disabled. Using legacy flow.');
  }
}

if (typeof window !== 'undefined') {
  (window as any).enableNewAuthFlow = enableNewAuthFlow;
  (window as any).disableNewAuthFlow = disableNewAuthFlow;
}
