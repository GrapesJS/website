'use client';

import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import { AuthIframe } from "./AuthIframe";
import { API_BASE, checkAuthSession, UserResponse } from "@/lib/grapes-api";

interface AuthButtonProps {
  readonly showAuthIframe?: boolean;
  readonly onShowAuthIframe?: (show: boolean) => void;
  readonly onAuthSuccess?: (userData: any) => void;
  readonly onAuthClose?: () => void;
  readonly authSession?: UserResponse | null;
  readonly isMobile?: boolean;
  readonly onMobileMenuClose?: () => void;
}

export function AuthButton({
  showAuthIframe: externalShowAuthIframe,
  onShowAuthIframe,
  onAuthSuccess: externalOnAuthSuccess,
  onAuthClose: externalOnAuthClose,
  authSession: externalAuthSession,
  isMobile = false,
  onMobileMenuClose,
}: AuthButtonProps) {
  const [user, setUser] = useState<any>(null);
  const [internalShowAuthIframe, setInternalShowAuthIframe] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (externalAuthSession) {
      setUser(externalAuthSession.isAuthenticated && externalAuthSession.user ? externalAuthSession.user : null);
      return;
    }

    const checkAuth = async () => {
      try {
        const result = await checkAuthSession();
        
        if (result.isAuthenticated && result.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [externalAuthSession]);

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('pointerdown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    if (onShowAuthIframe) {
      onShowAuthIframe(false);
    } else {
      setInternalShowAuthIframe(false);
    }
    externalOnAuthSuccess?.(userData);
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onShowAuthIframe) {
      onShowAuthIframe(true);
    } else {
      setInternalShowAuthIframe(true);
    }
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    setUser(null);
    
    globalThis.location.href = `${API_BASE}/api/website-proxy/signout?callbackUrl=${encodeURIComponent(globalThis.location.href)}`;
  };

  // Mobile version
  if (isMobile) {
    if (isAuthenticated && user) {
      return (
        <>
          <div className="mt-4 px-4 py-3 bg-zinc-800 rounded-lg flex items-center gap-3">
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name || 'User'} 
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
                {(user.name || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
          <a
            href={`${API_BASE}/dashboard`}
            className="mt-2 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
            onClick={onMobileMenuClose}
          >
            Dashboard
          </a>
          <button
            onClick={() => { onMobileMenuClose?.(); handleSignOut(); }}
            className="mt-2 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
          >
            Sign Out
          </button>
          {(externalShowAuthIframe ?? internalShowAuthIframe) && (
            <AuthIframe
              onAuthSuccess={handleAuthSuccess}
              onClose={() => {
                if (onShowAuthIframe) {
                  onShowAuthIframe(false);
                } else {
                  setInternalShowAuthIframe(false);
                }
                externalOnAuthClose?.();
              }}
            />
          )}
        </>
      );
    }

    return (
      <>
        <button
          onClick={(e) => { onMobileMenuClose?.(); handleLogin(e); }}
          className="mt-4 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
        >
          Login
        </button>
        {(externalShowAuthIframe ?? internalShowAuthIframe) && (
          <AuthIframe
            onAuthSuccess={handleAuthSuccess}
            onClose={() => {
              if (onShowAuthIframe) {
                onShowAuthIframe(false);
              } else {
                setInternalShowAuthIframe(false);
              }
              externalOnAuthClose?.();
            }}
          />
        )}
      </>
    );
  }

  // Desktop version
  if (isAuthenticated && user) {
    return (
      <>
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            aria-label="User menu"
          >
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name || 'User'} 
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold">
                {(user.name || user.email || 'U')[0].toUpperCase()}
              </div>
            )}
            <svg 
              className={cn("w-4 h-4 text-gray-400 transition-transform max-lg:hidden", showUserMenu && "rotate-180")} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-zinc-900 rounded-lg shadow-lg border border-zinc-700 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-zinc-700">
                <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <a
                  href={`${API_BASE}/dashboard`}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors no-underline"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
        {(externalShowAuthIframe ?? internalShowAuthIframe) && (
          <AuthIframe
            onAuthSuccess={handleAuthSuccess}
            onClose={() => {
              if (onShowAuthIframe) {
                onShowAuthIframe(false);
              } else {
                setInternalShowAuthIframe(false);
              }
              externalOnAuthClose?.();
            }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleLogin}
        className="inline-block px-4 py-2 text-sm font-semibold leading-5 text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500 sm:px-5 sm:py-2 lg:px-6 lg:py-2 whitespace-nowrap"
      >
        Login
      </button>
      {(externalShowAuthIframe ?? internalShowAuthIframe) && (
        <AuthIframe
          onAuthSuccess={handleAuthSuccess}
          onClose={() => {
            if (onShowAuthIframe) {
              onShowAuthIframe(false);
            } else {
              setInternalShowAuthIframe(false);
            }
            externalOnAuthClose?.();
          }}
        />
      )}
    </>
  );
}

