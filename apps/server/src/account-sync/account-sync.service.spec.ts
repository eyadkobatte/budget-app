import { Test, TestingModule } from '@nestjs/testing';
import { AccountSyncService } from './account-sync.service';

describe('AccountSyncService', () => {
  let service: AccountSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountSyncService],
    }).compile();

    service = module.get<AccountSyncService>(AccountSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
