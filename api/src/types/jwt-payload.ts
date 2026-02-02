export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  name: string;
  iat?: number;
  exp?: number;
}
