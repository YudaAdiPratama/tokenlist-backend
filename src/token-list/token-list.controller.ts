// src/token-list/token-list.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TokenListService } from './token-list.service';
import { TokenList } from '@prisma/client'; // Adjust the import path based on your project structure
import { KeyTokenMiddleware } from 'src/middleware/keyToken.middleware';

@Controller('token-list')
export class TokenListController {
  constructor(private readonly tokenListService: TokenListService) {}

  @Get()
  async findAll(): Promise<{ tokens: TokenList[] }> {
    const tokens = await this.tokenListService.findAll();
    return { tokens };
  }

  @Get(':symbol/:precision/:contract')
  findOne(
    @Param('symbol') symbol: string,
    @Param('precision') precision: string,
    @Param('contract') contract: string,
  ): Promise<TokenList | null> {
    return this.tokenListService.findOne(symbol, +precision, contract);
  }

  @Post('/add')
  @UseGuards(KeyTokenMiddleware)
  create(@Body() data: Omit<TokenList, 'id'>): Promise<TokenList> {
    return this.tokenListService.create(data);
  }

  @Put(':symbol/:precision/:contract')
  @UseGuards(KeyTokenMiddleware)
  update(
    @Param('symbol') symbol: string,
    @Param('precision') precision: string,
    @Param('contract') contract: string,
    @Body() data: Partial<TokenList>,
  ): Promise<TokenList | null> {
    return this.tokenListService.update(symbol, +precision, contract, data);
  }

  @Delete(':symbol/:precision/:contract')
  @UseGuards(KeyTokenMiddleware)
  remove(
    @Param('symbol') symbol: string,
    @Param('precision') precision: string,
    @Param('contract') contract: string,
  ): Promise<TokenList | null> {
    return this.tokenListService.remove(symbol, +precision, contract);
  }
}
