import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtPayload } from './auth.types';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private userService: UserService,
    @Inject(JwtService)
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
      // membership service is not injected in the constructor because of circular dependency
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const memberships = await this.userService.findMembershipsByUserId(
        user.id,
      );
      const payload: JwtPayload = {
        email: user.email,
        sub: user.id,
        memberships: memberships.reduce((acc, membership) => {
          acc[membership.companyId] = membership.role;
          return acc;
        }, {}),
      };
      return this.jwtService.sign(payload);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  getUserById(email: string) {
    if (email) {
      return this.userService.findOne(email);
    }
  }
}
