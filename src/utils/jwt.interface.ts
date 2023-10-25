export interface JwtPayload {
  name: string;
  username: string;
  id: number;
  role: string;
  edcenso_city_fk: number;
}

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
