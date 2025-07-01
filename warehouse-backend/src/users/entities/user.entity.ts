import { Role } from "generated/prisma";

export class User {
  id: number;

  email: string;

  password: string;

  role: Role;
}