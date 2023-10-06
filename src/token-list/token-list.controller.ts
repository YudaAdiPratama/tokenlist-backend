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

  @Get('logo/:symbol/:contract')
  async getLogo(
    @Param('symbol') symbol: string,
    @Param('contract') contract: string,
  ): Promise<{ logo: string } | null> {
    // Assuming that you have a method in your service to get the logo by symbol and contract
    const logo = await this.tokenListService.getLogo(symbol, contract);
    if (!logo) {
      return null;
    }
    return { logo };
  }

  @Get(':symbol/:contract')
  findOne(
    @Param('symbol') symbol: string,
    @Param('precision') precision: string,
    @Param('contract') contract: string,
  ): Promise<TokenList | null> {
    return this.tokenListService.findOne(symbol, contract);
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
