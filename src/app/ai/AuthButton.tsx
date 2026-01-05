'use client';

import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import { API_BASE, checkAuthSession } from "@/lib/grapes-api";
import { useAuthContext } from "./AuthContext";

interface AuthButtonProps {
  readonly isMobile?: boolean;
  readonly onMobileMenuClose?: () => void;
  readonly showLogin?: boolean;
  readonly showUserProfile?: boolean;
}

export function AuthButton({
  isMobile = false,
  onMobileMenuClose,
  showLogin = true,
  showUserProfile = true,
}: AuthButtonProps) {
  const authContext = useAuthContext();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Since we are now guaranteed to be inside AuthProvider, context should exist.
  // However, for safety (e.g. if used outside provider accidentally), we can have a safe check.
  const user = authContext?.authSession?.isAuthenticated ? authContext.authSession.user : null;

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

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    onMobileMenuClose?.();
    authContext?.triggerAuth();
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    onMobileMenuClose?.();
    authContext?.logout();
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
      {!user && showLogin && (
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
      {user && isMobile && showUserProfile && (
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
      {user && !isMobile && showUserProfile && (
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
    </>
  );
}
