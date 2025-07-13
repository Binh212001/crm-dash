import { Body, Controller, Post, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { Public } from '@/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(dto);
  }
  @Public()

  @Post('signup')
  async signUp(@Body() dto: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(dto);
  }
  @Public()

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshToken);
  }
  @Public()

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req): Promise<{ message: string }> {
    await this.authService.logout(req.user?.id);
    return { message: 'Logged out successfully' };
  }
}
