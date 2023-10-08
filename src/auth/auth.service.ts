// auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && user.password === password) {
      return { id: user.id, username: user.username }; // Return a user object with at least 'id' and 'username'
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = await jwt.verify(token, 'hagsfhjsdgfsdyafays'); // Replace with your secret key
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}
