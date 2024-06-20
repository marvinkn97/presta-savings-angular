export interface JwtToken {
  exp: number;
  iat: number;
  iss: string;
  role: string;
  sub: string;
  memNo?: string;
}
