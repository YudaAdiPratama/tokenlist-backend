import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenListService } from './token-list/token-list.service';
import { TokenListController } from './token-list/token-list.controller';
import { PrismaService } from './prisma/prisma.service'; // Import PrismaService
import { KeyTokenMiddleware } from './middleware/keyToken.middleware';
@Module({
  imports: [],
  controllers: [AppController, TokenListController],
  providers: [AppService, TokenListService, PrismaService], // Include PrismaService
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(KeyTokenMiddleware).forRoutes('token-list/*');
  }
}
