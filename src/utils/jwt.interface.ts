import { Role } from "@prisma/client";

export interface JwtPayload {
  id: number;
  name: string;
  username: string;
  role: Role;
  attendance_unity_ids: number[];
}

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
