
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@/api/auth/services/jwt.service";
import { UserService } from "@/api/user/user.service";
import { Socket } from "socket.io";

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token = this.extractTokenFromHandshake(client);

    if (!token) {
      return false;
    }

    let payload: any;
    try {
      payload = await this.jwtService.verifyToken(token);
    } catch (e) {
      return false;
    }

    const user = await this.userService.findByIdWithCache(payload.sub || payload.id, [
      "role",
      "role.permissions"
    ]);

    if (!user) {
      return false;
    }

    // Attach user to handshake for later use
    (client.handshake as any).user = user;
    return true;
  }

  private extractTokenFromHandshake(client: Socket): string | undefined {
    // Try to get token from query, headers, or auth
    const { query, headers, auth } = client.handshake as any;

    // 1. Try from query param (e.g. ?token=xxx)
    if (query && query.token) {
      return query.token;
    }

    // 2. Try from headers (e.g. Authorization: Bearer xxx)
    if (headers && headers.authorization) {
      const [type, token] = headers.authorization.split(" ");
      if (type === "Bearer") return token;
    }

    // 3. Try from auth property (Socket.IO v4+)
    if (auth && auth.token) {
      return auth.token;
    }

    return undefined;
  }
}
