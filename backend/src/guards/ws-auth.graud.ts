import { JwtService } from "@/api/auth/services/jwt.service";
import { UserService } from "@/api/user/user.service";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Socket } from "socket.io";

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private tokenService: JwtService,
    private userService: UserService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.auth?.token?.split(" ")[1];
    console.log("🚀 ~ WsJwtGuard ~ canActivate ~ token:", token);

    if (!token) return false;

    try {
      const payload = await this.tokenService.verifyToken(token);

      const user = await this.userService.findByIdWithCache(payload.id, [
        "role",
        "role.permissions",
      ]);

      client.data.user = user;

      return !!user;
    } catch {
      return false;
    }
  }
}
