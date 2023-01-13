import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginJwtDto } from './dto/login-jwt.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginJwtDto> {
    return this.authService.login(loginDto);
  }
}
