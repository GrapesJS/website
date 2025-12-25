import { useState, useEffect, useCallback } from "react";
import { UserResponse, checkAuthSession, API_BASE } from "@/lib/grapes-api";
import { useNewAuthFlow } from "@/lib/feature-flags";

export interface UseAuthResult {
    authSession: UserResponse | null;
    showAuthIframe: boolean;
    setShowAuthIframe: (show: boolean) => void;
    triggerAuth: () => void;
    handleAuthSuccess: (user: any) => void;
    handleAuthClose: () => void;
    logout: () => void;
    useNewFlow: boolean;
}

export function useAuth(): UseAuthResult {
    const [showAuthIframe, setShowAuthIframe] = useState(false);
    const [useNewFlow, setUseNewFlow] = useState(useNewAuthFlow());
    const [authSession, setAuthSession] = useState<UserResponse | null>(null);

    useEffect(() => {
        const handleFlagChange = () => {
            setUseNewFlow(useNewAuthFlow());
        };

        window.addEventListener('featureFlagChanged', handleFlagChange);
        return () => window.removeEventListener('featureFlagChanged', handleFlagChange);
    }, []);

    useEffect(() => {
        if (!useNewFlow) {
            return;
        }

        const checkAuth = async () => {
            try {
                const result = await checkAuthSession();
                setAuthSession(result);
            } catch (error) {
                console.error("Failed to check auth session", error);
            }
        };

        checkAuth();
    }, [useNewFlow]);

    const triggerAuth = useCallback(() => {
        setShowAuthIframe(true);
    }, []);

    const handleAuthSuccess = useCallback((userData: any) => {
        setShowAuthIframe(false);
        setAuthSession({
            isAuthenticated: true,
            user: userData,
        });
    }, []);

    const handleAuthClose = useCallback(() => {
        setShowAuthIframe(false);
    }, []);

    const logout = useCallback(() => {
        setAuthSession({ isAuthenticated: false, user: null });
        globalThis.location.href = `${API_BASE}/api/website-proxy/signout`;
    }, []);

    return {
        authSession,
        showAuthIframe,
        setShowAuthIframe,
        triggerAuth,
        handleAuthSuccess,
        handleAuthClose,
        logout,
        useNewFlow,
    };
}
