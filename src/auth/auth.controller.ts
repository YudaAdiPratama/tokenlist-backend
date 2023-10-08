// auth/auth.controller.ts

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async profile(@Request() req: any) {
    try {
      // Extract the token from the Authorization header
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        // Invalid or missing Authorization header
        return { message: 'Invalid Authorization header' };
      }

      const token = authorizationHeader.substring(7); // Remove 'Bearer ' from the header

      // Verify the token and get its payload
      const payload = await this.authService.verifyToken(token);

      // Token is still valid, return the accessToken from the payload
      return {
        accessToken: payload,
        timestamp: Math.floor(new Date().getTime() / 1000),
      };
    } catch (error) {
      // Handle token validation errors
      return { message: 'Token is invalid or expired' };
    }
  }

  @Post('login') // This should be a POST endpoint
  async login(@Request() req: any) {
    const { username, password } = req.body;
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }
}
