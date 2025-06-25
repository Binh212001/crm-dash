// import { TokenService } from "@/api/auth/token.service";
// import { UserService } from "@/api/user/user.service";
import { IS_AUTH_OPTIONAL, IS_PUBLIC } from "@/constants/app.constant";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector // private tokenService: TokenService, // private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const isAuthOptional = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_OPTIONAL,
      [context.getHandler(), context.getClass()]
    );

    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = this.extractTokenFromHeader(request);

    // const payload = await this.tokenService.verifyAccessToken(accessToken);

    // request.user = await this.userService.findByIdWithCache(payload.id, [
    //   "roles.permissions",
    //   "permissions",
    //   "agency",
    // ]);

    // request.payload = payload;

    return !!request.user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
