import { createContext, useContext } from 'react';
import { UseAuthResult } from './useAuth';

export const AuthContext = createContext<UseAuthResult | null>(null);

export function useAuthContext() {
    return useContext(AuthContext);
}
