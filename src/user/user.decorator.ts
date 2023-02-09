import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data, req: ExecutionContext) => {
    return req.switchToHttp().getRequest().user;
  },
);
