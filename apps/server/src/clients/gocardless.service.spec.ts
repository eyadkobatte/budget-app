import { Test, TestingModule } from '@nestjs/testing';
import { GocardlessService } from './gocardless.service';

describe('GocardlessService', () => {
  let service: GocardlessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GocardlessService],
    }).compile();

    service = module.get<GocardlessService>(GocardlessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
