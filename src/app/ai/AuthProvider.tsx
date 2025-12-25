"use client";

import { useAuth } from "./useAuth";
import { AuthContext } from "./AuthContext";
import { AuthIframe } from "./AuthIframe";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const {
        authSession,
        showAuthIframe,
        setShowAuthIframe,
        triggerAuth,
        handleAuthSuccess,
        handleAuthClose,
        logout,
        useNewFlow
    } = useAuth();

    const authContextValue = {
        authSession,
        showAuthIframe,
        setShowAuthIframe,
        triggerAuth,
        handleAuthSuccess,
        handleAuthClose,
        logout,
        useNewFlow
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
            {showAuthIframe && (
                <AuthIframe
                    onAuthSuccess={handleAuthSuccess}
                    onClose={handleAuthClose}
                />
            )}
        </AuthContext.Provider>
    );
}
