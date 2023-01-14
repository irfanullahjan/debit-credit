import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JWT_COOKIE_NAME } from '../common/constants';
import { AuthService } from './auth.service';
import { LoginJwtDto } from './dto/login-jwt.dto';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginRequestDto,
  ) {
    const jwt = await this.authService.loginJwt(loginDto);
    res.cookie(JWT_COOKIE_NAME, jwt, { httpOnly: true, sameSite: 'strict' });
    res.status(200);
    return new LoginJwtDto({ accessToken: jwt });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
