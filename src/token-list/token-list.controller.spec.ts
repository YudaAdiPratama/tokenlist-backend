import { Test, TestingModule } from '@nestjs/testing';
import { TokenListController } from './token-list.controller';

describe('TokenListController', () => {
  let controller: TokenListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenListController],
    }).compile();

    controller = module.get<TokenListController>(TokenListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
