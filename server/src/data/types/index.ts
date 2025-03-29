export interface UserPayload {
    userId: string;
    email?: string;
}
  
export interface User {
    id: string;
    email: string;
    password_hash: string;
    name: string;
}
  
export interface LoginRequest {
    email: string;
    password: string;
}
  
export interface TokenResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}
  
export interface RefreshTokenResponse {
    accessToken: string;
}
  
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}