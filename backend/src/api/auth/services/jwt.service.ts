import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

interface JwtPayload {
  sub: string;
  email: string;
  role?: string;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService
  ) {}

  generateAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_SECRET"),
      expiresIn: this.configService.get<string>("JWT_EXPIRES_IN", "1h"),
    });
  }

  generateRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN", "7d"),
    });
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  verifyRefreshToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      });
    } catch (error) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
