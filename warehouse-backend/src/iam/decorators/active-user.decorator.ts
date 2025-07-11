import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../iam.constants';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

// --- CUSTOM DECORATOR TO EXTRACT USER DATA FROM REQUEST ---
export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    // --- GET THE REQUEST OBJECT FROM THE CURRENT CONTEXT ---
    const request = ctx.switchToHttp().getRequest();

    // --- EXTRACT THE USER OBJECT ATTACHED BY THE AUTH GUARD ---
    const user: ActiveUserData | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);