import { Role } from "@prisma/client";

export interface JwtPayload {
  name: string;
  username: string;
  id: number;
  role: Role;
  edcenso_city_fk: number;
  attendance_unity_fk?: number;
}

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
