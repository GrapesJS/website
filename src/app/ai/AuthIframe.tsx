'use client';

import { useEffect, useRef } from 'react';
import { API_BASE, checkAuthSession } from '@/lib/grapes-api';

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
}

export function AuthIframe({ onAuthSuccess, onClose }: AuthIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<any>) => {
      const isLocalDev = event.origin.includes('localhost') || event.origin.includes('grapesjs.local');
      if (!ALLOWED_ORIGINS.includes(event.origin) && !isLocalDev) return;

      const message = event.data;
      
      if (message.type === 'AUTH_SUCCESS') {
        try {
          const result = await checkAuthSession();
          if (result.isAuthenticated && result.user) {
            onAuthSuccess(result.user);
            onClose();
          }
        } catch (error) {
          console.error('Auth session check failed:', error);
        }
      } else if (message.type === 'AUTH_CANCELLED') {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAuthSuccess, onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 max-h-[85vh] flex flex-col">
          <iframe
            ref={iframeRef}
            src={`${API_BASE}/signin?redirect=/signin`}
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
