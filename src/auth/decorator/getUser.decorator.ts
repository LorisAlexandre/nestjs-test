import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx
      // context switch to HTTP
      .switchToHttp()
      // get Request
      .getRequest();
    if (data) {
      // return prop of userModel
      return request.user[data];
    }
    return request.user;
  },
);
