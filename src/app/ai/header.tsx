"use client";

import cn from "classnames";
import { useState } from "react";

interface HeaderStandaloneProps {
  className?: string;
}

export default function HeaderStandalone({ className }: HeaderStandaloneProps) {
  const githubRepoPath = "GrapesJS/grapesjs";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
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
              className="w-[233px] h-[63px]"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6 flex-1 justify-end mr-8 max-lg:hidden">
          <a
            href="/pricing#comparison-section"
            className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Features
          </a>
          <a
            href="/pricing"
            className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Pricing
          </a>
          <a
            href="/blog"
            className="text-gray-100 no-underline font-medium transition-colors duration-200 hover:text-white"
          >
            Blog
          </a>
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
          <a
            href="https://app.grapesjs.com/dashboard"
            className="inline-block px-4 py-2 text-sm font-semibold leading-5 text-gray-100 no-underline bg-purple-600 border border-purple-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-opacity-90 sm:px-5 sm:py-2 lg:px-6 lg:py-2"
          >
            Get Started
          </a>

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
            <a
              href="/pricing#comparison-section"
              className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
              onClick={closeMobileMenu}
            >
              Features
            </a>
            <a
              href="/pricing"
              className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
              onClick={closeMobileMenu}
            >
              Pricing
            </a>
            <a
              href="/blog"
              className="text-gray-100 no-underline font-medium text-xl transition-colors duration-200 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-md"
              onClick={closeMobileMenu}
            >
              Blog
            </a>
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
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/80 z-30"
          onClick={closeMobileMenu}
        />
      )}
    </header>
  );
}
