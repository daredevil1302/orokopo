import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInterface } from './user.interface';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserInterface => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
