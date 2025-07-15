import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserService } from '../../user/user.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserRepository } from '@/api/user/user.repository';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = dto;

    // Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    // Use argon2 for password comparison instead of bcrypt
    const isPasswordValid = await argon2.verify(user.password, password);
    console.log("🚀 ~ AuthService ~ login ~ isPasswordValid:", isPasswordValid)
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
    const { email, password, firstName, lastName ,  } = dto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }


  // Create user
    const user = await this.userRepository.save(this.userRepository.create({
      email,
      password,
      firstName,
      lastName,
    }))
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
