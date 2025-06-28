import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from '../../user/user.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = dto;

    // Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const accessToken = this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role?.name,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role?.name,
      },
    };
  }

  async signUp(dto: SignUpDto): Promise<AuthResponseDto> {
    const { email, password, firstName, lastName , username } = dto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username
    });

    // Generate tokens
    const accessToken = this.jwtService.generateAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role?.name,
    });

    const refreshToken = this.jwtService.generateRefreshToken({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role?.name,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      // Verify refresh token
      const payload = this.jwtService.verifyRefreshToken(refreshToken);
      
      // Find user
      const user = await this.userService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new tokens
      const newAccessToken = this.jwtService.generateAccessToken({
        sub: user.id,
        email: user.email,
        role: user.role?.name,
      });

      const newRefreshToken = this.jwtService.generateRefreshToken({
        sub: user.id,
        email: user.email,
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role?.name,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    // In a real application, you might want to blacklist the refresh token
    // or store it in a database to invalidate it
    console.log(`User ${userId} logged out`);
  }
}
