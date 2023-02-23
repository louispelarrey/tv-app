import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(identifier: string, pass: string): Promise<any |null>  {
    const user = await this.userService.findByIdentifier(identifier);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({username}: {username: string}): Promise<{access_token: string}> {
    const user = await this.userService.findByIdentifier(username);
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
