import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepositoryService } from './categories-repository.service';

describe('CategoriesRepositoryService', () => {
  let service: CategoriesRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesRepositoryService],
    }).compile();

    service = module.get<CategoriesRepositoryService>(
      CategoriesRepositoryService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
