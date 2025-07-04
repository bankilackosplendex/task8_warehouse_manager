import { Role } from "../enums/UserRoleEnum";

export type DecodedAccessToken = {
  sub: string;
  role: Role
  exp: number;
  iat?: number;
};