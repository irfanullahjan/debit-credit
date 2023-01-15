import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginJwtDto } from './dto/login-jwt.dto';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    const passwordCheck = await compare(password, user?.password);
    if (passwordCheck) {
      return user;
    }
    return null;
  }

  /**
   * Returns a JWT token on successful login
   * @param loginDto email and password
   * @returns JWT token
   */
  async loginJwt(loginDto: LoginRequestDto): Promise<string> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (user) {
      const payload: JwtPayload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
