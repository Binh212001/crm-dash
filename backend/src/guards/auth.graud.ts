
import { JwtService } from "@/api/auth/services/jwt.service";
import { UserService } from "@/api/user/user.service";
import { IS_PUBLIC } from "@/constants/app.constant";
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
    private reflector: Reflector ,
     private tokenService: JwtService,
      private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = this.extractTokenFromHeader(request);

    const payload = await this.tokenService.verifyToken(accessToken);

    request.user = await this.userService.findByIdWithCache(payload.id, [
      "role",
      "role.permissions"
    ]);

    return !!request.user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
