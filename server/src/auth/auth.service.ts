import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginJwtDto } from './dto/login-jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordCheck = await compare(password, user.password);
    if (passwordCheck) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginRequestDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (user) {
      const payload = { email: user.email, sub: user.id };
      return new LoginJwtDto({
        accessToken: this.jwtService.sign(payload),
      });
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
