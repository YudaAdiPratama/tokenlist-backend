// user/user.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [], // Import any necessary modules
  controllers: [UserController],
  providers: [UserService, PrismaService], // Include PrismaService
  exports: [UserService], // Export UserService if needed
})
export class UserModule {}
