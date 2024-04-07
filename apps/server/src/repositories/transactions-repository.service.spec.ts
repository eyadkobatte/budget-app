import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsRepositoryService } from './transactions-repository.service';

describe('TransactionsRepositoryService', () => {
  let service: TransactionsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsRepositoryService],
    }).compile();

    service = module.get<TransactionsRepositoryService>(
      TransactionsRepositoryService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
