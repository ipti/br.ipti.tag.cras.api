export interface JwtPayload {
  name: string;
  username: string;
  id: number;
  role: string;
  dbName: string;
}

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
