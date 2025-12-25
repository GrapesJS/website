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
  const [showAuthIframe, setShowAuthIframe] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Sync external showAuthIframe prop to internal state if provided
  useEffect(() => {
    if (externalShowAuthIframe !== undefined) {
      setShowAuthIframe(externalShowAuthIframe);
    }
  }, [externalShowAuthIframe]);

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
    setShowAuthIframe(false);
    onShowAuthIframe?.(false);
    externalOnAuthSuccess?.(userData);
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    onMobileMenuClose?.();
    setShowAuthIframe(true);
    onShowAuthIframe?.(true);
  };

  const handleAuthIframeClose = () => {
    setShowAuthIframe(false);
    onShowAuthIframe?.(false);
    externalOnAuthClose?.();
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    onMobileMenuClose?.();
    setUser(null);
    globalThis.location.href = `${API_BASE}/api/website-proxy/signout?callbackUrl=${encodeURIComponent(globalThis.location.href)}`;
  };

  const handleDashboardClick = () => {
    onMobileMenuClose?.();
  };

  const userInitial = (user?.name || user?.email || 'U')[0].toUpperCase();
  const userName = user?.name || 'User';
  const userEmail = user?.email;
  const avatarSize = isMobile ? "w-10 h-10" : "w-8 h-8";

  return (
    <>
      {/* Login Button - shown when not authenticated */}
      {!user && (
        <button
          onClick={handleLogin}
          className={cn(
            "font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500",
            isMobile 
              ? "mt-4 w-full text-center px-6 py-3 text-base"
              : "inline-block px-4 py-2 text-sm leading-5 sm:px-5 sm:py-2 lg:px-6 lg:py-2 whitespace-nowrap"
          )}
        >
          Login
        </button>
      )}

      {/* Mobile Authenticated View */}
      {user && isMobile && (
        <>
          <div className="mt-4 px-4 py-3 bg-zinc-800 rounded-lg flex items-center gap-3">
            {user.image ? (
              <img src={user.image} alt={userName} className={cn("rounded-full", avatarSize)} />
            ) : (
              <div className={cn("rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold", avatarSize)}>
                {userInitial}
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{userName}</p>
              <p className="text-xs text-gray-400">{userEmail}</p>
            </div>
          </div>
          <a
            href={`${API_BASE}/dashboard`}
            className="mt-2 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
            onClick={handleDashboardClick}
          >
            Dashboard
          </a>
          <button
            onClick={handleSignOut}
            className="mt-2 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
          >
            Sign Out
          </button>
        </>
      )}

      {/* Desktop Authenticated View */}
      {user && !isMobile && (
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            aria-label="User menu"
          >
            {user.image ? (
              <img src={user.image} alt={userName} className={cn("rounded-full", avatarSize)} />
            ) : (
              <div className={cn("rounded-full bg-violet-600 flex items-center justify-center text-white font-semibold", avatarSize)}>
                {userInitial}
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
                <p className="text-sm font-medium text-white">{userName}</p>
                <p className="text-xs text-gray-400 truncate">{userEmail}</p>
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
      )}

      {/* Auth Iframe - single instance for all cases */}
      {showAuthIframe && (
        <AuthIframe
          onAuthSuccess={handleAuthSuccess}
          onClose={handleAuthIframeClose}
        />
      )}
    </>
  );
}

