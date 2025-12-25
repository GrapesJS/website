'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { API_BASE, checkAuthSession, type AuthUser } from '@/lib/grapes-api';

const IFRAME_MIN_HEIGHT = 700;
const ALLOWED_ORIGINS = [
  'https://app.grapesjs.com',
  'https://app-staging.grapesjs.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

interface AuthIframeProps {
  readonly onAuthSuccess: (user: AuthUser) => void;
  readonly onClose: () => void;
}

export function AuthIframe({ onAuthSuccess, onClose }: AuthIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent<any>) => {
      if (!ALLOWED_ORIGINS.includes(event.origin)) return;

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

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
          <iframe
            ref={iframeRef}
            src={`${API_BASE}/signin?redirect=/signin`}
            className="w-full border-0 rounded-2xl"
            style={{ height: '700px', maxHeight: '85vh' }}
            title="Sign In"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
            allow="camera 'none'; microphone 'none'; geolocation 'none'"
          />
        </div>
      </div>
    </div>
  );

  // Render in a portal to ensure it's at the document root level
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}
