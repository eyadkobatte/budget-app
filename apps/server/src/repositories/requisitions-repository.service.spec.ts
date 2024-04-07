import { Test, TestingModule } from '@nestjs/testing';
import { RequisitionsRepositoryService } from './requisitions-repository.service';

describe('RequisitionsRepositoryService', () => {
  let service: RequisitionsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequisitionsRepositoryService],
    }).compile();

    service = module.get<RequisitionsRepositoryService>(
      RequisitionsRepositoryService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
