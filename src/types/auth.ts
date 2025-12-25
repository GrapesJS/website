export interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  role: string | null;
  image: string | null;
}

export interface UserResponse {
  isAuthenticated: boolean;
  user?: AuthUser | null;
}
