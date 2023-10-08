import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenListService } from './token-list/token-list.service';
import { TokenListController } from './token-list/token-list.controller';
import { PrismaService } from './prisma/prisma.service'; // Import PrismaService
import { KeyTokenMiddleware } from './middleware/keyToken.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [
    AppController,
    TokenListController,
    UserController,
    AuthController,
    UserController,
  ],
  providers: [AppService, TokenListService, PrismaService, UserService], // Include PrismaService
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KeyTokenMiddleware).forRoutes('token-list/*');
  }
}
