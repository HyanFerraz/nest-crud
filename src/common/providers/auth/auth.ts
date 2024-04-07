import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate({ email, password }) {
    const user = await this.userService.findOneByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };
    return await this.jwtService.signAsync(payload);
  }
}
