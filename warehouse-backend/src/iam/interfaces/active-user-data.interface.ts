import { Role } from "generated/prisma";

export interface ActiveUserData {
  sub: number;

  email: string;

  role: Role;
}