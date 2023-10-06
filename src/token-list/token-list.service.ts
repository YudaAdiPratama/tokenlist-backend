// src/token-list/token-list.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TokenList } from '.prisma/client'; // Adjust the import path based on your project structure

@Injectable()
export class TokenListService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TokenList[]> {
    return this.prisma.tokenList.findMany();
  }

  async findOne(
    symbol: string,
    precision: number,
    contract: string,
  ): Promise<TokenList | null> {
    return this.prisma.tokenList.findUnique({
      where: { symbol_precision_contract: { symbol, precision, contract } },
    });
  }

  async create(data: Omit<TokenList, 'id'>): Promise<TokenList> {
    const { symbol, precision, contract } = data;
    // Check if a token with the same symbol and contract already exists
    const existingToken = await this.findOne(symbol, precision, contract);

    if (existingToken) {
      throw new NotFoundException(
        'Token with the same symbol and contract already exists',
      );
    }

    return this.prisma.tokenList.create({
      data,
    });
  }

  async update(
    symbol: string,
    precision: number,
    contract: string,
    data: Partial<TokenList>,
  ): Promise<TokenList | null> {
    return this.prisma.tokenList.update({
      where: { symbol_precision_contract: { symbol, precision, contract } },
      data,
    });
  }

  async remove(
    symbol: string,
    precision: number,
    contract: string,
  ): Promise<TokenList | null> {
    return this.prisma.tokenList.delete({
      where: { symbol_precision_contract: { symbol, precision, contract } },
    });
  }
}
