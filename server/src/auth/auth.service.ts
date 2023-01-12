import { Injectable } from '@nestjs/common';
import { UserService } from '@/src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordCheck = await compare(password, user.password);
    if (passwordCheck) {
      return user;
    }
    return null;
  }
}
