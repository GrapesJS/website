"use client";

import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import { AuthIframe } from "./AuthIframe";
import { API_BASE, checkAuthSession } from "@/lib/grapes-api";
import { useNewAuthFlow } from "@/lib/feature-flags";

interface HeaderStandaloneProps {
  readonly className?: string;
}

export default function HeaderStandalone({ className }: HeaderStandaloneProps) {
  const githubRepoPath = "GrapesJS/grapesjs";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuthIframe, setShowAuthIframe] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [useNewFlow, setUseNewFlow] = useState(useNewAuthFlow());

  useEffect(() => {
    const handleFlagChange = () => {
      setUseNewFlow(useNewAuthFlow());
    };

    window.addEventListener('featureFlagChanged', handleFlagChange);
    return () => window.removeEventListener('featureFlagChanged', handleFlagChange);
  }, []);

  useEffect(() => {
    // Only check auth session if using new flow
    if (!useNewFlow) {
      return;
    }

    const checkAuth = async () => {
      try {
        const result = await checkAuthSession();
        
        if (result.isAuthenticated && result.user) {
          setIsAuthenticated(true);
          setUser(result.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, [useNewFlow]);

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

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(() => setIsMobileMenuVisible(false), 300);
    } else {
      setIsMobileMenuVisible(true);
      setTimeout(() => setIsMobileMenuOpen(true));
    }
  };

  const closeMobileMenu = () => {
    toggleMobileMenu();
  };

  const handleAuthSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthIframe(false);
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (useNewFlow) {
      // New flow: show iframe modal
      setShowAuthIframe(true);
    } else {
      // Legacy flow: redirect to app signin
      globalThis.location.href = `${API_BASE}/signin?callbackUrl=${encodeURIComponent(globalThis.location.href)}`;
    }
  };

  const handleSignOut = async () => {
    setShowUserMenu(false);
    setIsAuthenticated(false);
    setUser(null);
    
    globalThis.location.href = `${API_BASE}/api/website-proxy/signout?callbackUrl=${encodeURIComponent(globalThis.location.href)}`;
  };

  return (
    <>
      {/* <div className="w-full bg-violet-600 text-white text-sm sm:text-base">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2 sm:py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="inline-flex items-center justify-center rounded-full bg-white/10 px-2 py-0.5 text-[0.7rem] sm:text-xs font-semibold tracking-wide uppercase">
              Black Friday 🍇🖤🤑
            </span>
            <span className="font-medium">
              Get <span className="font-semibold">3 months free</span> on Grapes
              Studio.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline text-xs text-violet-100/90">
              Use code at checkout:
            </span>
            <span className="inline-flex items-center justify-center rounded-md border border-white/40 bg-white/10 px-3 py-1 text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase">
              XXXXX
            </span>
          </div>
        </div>
      </div> */}
      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur-lg bg-black/95 border-b border-gray-700",
          className
        )}
      >
        <nav className="px-8 py-4 flex items-center justify-between mx-auto max-lg:px-6 max-sm:px-4">
          <div className="text-2xl leading-8 font-bold tracking-wider">
            <a href="/">
              <img
                src="https://cdn.grapesjs.com/workspaces/cmddyhbh105af12ivgiyr7vui/assets/57483344-a73e-4e1f-abb2-f2df8058ef62__grapesblackandwhite.png"
                alt="Grapes Studio"
                className="w-[150px] h-[40px] md:w-[200px] md:h-[53px]"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6 flex-1 justify-end mr-8 max-lg:hidden">
            <a
              href="/pricing"
              className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
            >
              Pricing
            </a>
            {/* <a
            href="/blog"
            className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Blog
          </a> */}
            <a
              href="/sdk"
              className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
            >
              Studio SDK
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-3 max-sm:gap-2">
            <a
              href={`https://github.com/${githubRepoPath}`}
              className="flex items-center justify-center mr-4 text-gray-100 max-lg:hidden"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <svg
                className="w-[22px] h-[22px] opacity-100"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
            </a>
            
            {useNewFlow && isAuthenticated && user ? (
              <div className="relative max-lg:hidden" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
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
                    className={cn("w-4 h-4 text-gray-400 transition-transform", showUserMenu && "rotate-180")} 
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
            ) : (
              <button
                onClick={handleLogin}
                className="max-lg:hidden inline-block px-4 py-2 text-sm font-semibold leading-5 text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500 sm:px-5 sm:py-2 lg:px-6 lg:py-2 whitespace-nowrap"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden ml-4 p-2 text-gray-100 hover:text-white transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuVisible && (
          <div
            className={cn(
              "lg:hidden fixed top-0 left-0 w-full h-full bg-black z-40 transform transition-transform duration-300 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="pt-8 px-8 max-sm:px-4">
              {/* Close Button */}
              <div className="flex justify-end items-center mb-6">
                <button
                  className="p-2 text-gray-100 hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-800/50"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col space-y-6 bg-gray-900/90 rounded-lg p-6 backdrop-blur-sm">
                {/* <a
              href="/pricing#comparison-section"
              className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
              onClick={closeMobileMenu}
            >
              Features
            </a> */}
                <a
                  href="/pricing"
                  className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
                  onClick={closeMobileMenu}
                >
                  Pricing
                </a>
                {/* <a
              href="/blog"
              className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
              onClick={closeMobileMenu}
            >
              Blog
            </a> */}
                <a
                  href="/sdk"
                  className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
                  onClick={closeMobileMenu}
                >
                  SDK
                </a>
                <a
                  href={`https://github.com/${githubRepoPath}`}
                  className="flex items-center gap-3 text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.11 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.91.08 2.11.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                    />
                  </svg>
                </a>
                
                {useNewFlow && isAuthenticated && user ? (
                  <>
                    <div className="mt-4 px-4 py-3 bg-zinc-800 rounded-lg">
                      <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <a
                      href={`${API_BASE}/dashboard`}
                      className="mt-2 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={() => { closeMobileMenu(); handleSignOut(); }}
                      className="mt-2 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => { closeMobileMenu(); handleLogin(e); }}
                    className="mt-4 w-full text-center px-6 py-3 text-base font-semibold text-gray-100 no-underline border border-gray-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:border-gray-500"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="lg:hidden fixed inset-0 bg-black/80 z-30"
            onClick={closeMobileMenu}
          />
        )}
      </header>
      
      {useNewFlow && showAuthIframe && (
        <AuthIframe
          onAuthSuccess={handleAuthSuccess}
          onClose={() => setShowAuthIframe(false)}
        />
      )}
    </>
  );
}
