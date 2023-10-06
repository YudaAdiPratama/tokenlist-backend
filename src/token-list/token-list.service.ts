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

  async findOne(symbol: string, contract: string): Promise<TokenList | null> {
    return this.prisma.tokenList.findUnique({
      where: { symbol_contract: { symbol, contract } },
    });
  }

  async getLogo(symbol: string, contract: string): Promise<string | null> {
    // Implement the logic to fetch the logo by symbol and contract here
    const token = await this.prisma.tokenList.findUnique({
      where: {
        symbol_contract: {
          symbol,
          contract,
        },
      },
    });
    if (!token) {
      throw new NotFoundException(
        `Token with symbol ${symbol} and contract ${contract} not found`,
      );
    }
    return token.logo; // Assuming that the token has a 'logo' field
  }

  async create(data: Omit<TokenList, 'id'>): Promise<TokenList> {
    const { symbol, contract } = data;
    // Check if a token with the same symbol and contract already exists
    const existingToken = await this.findOne(symbol, contract);

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
      where: { symbol_contract: { symbol, contract } },
      data,
    });
  }

  async remove(
    symbol: string,
    precision: number,
    contract: string,
  ): Promise<TokenList | null> {
    return this.prisma.tokenList.delete({
      where: { symbol_contract: { symbol, contract } },
    });
  }
}
