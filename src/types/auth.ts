export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  image?: string | null;
}

export interface UserResponse {
  isAuthenticated: boolean;
  user?: AuthUser | null;
}
