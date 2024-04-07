import { Injectable } from '@nestjs/common';
import { RequisitionsRepositoryService } from '../../../repositories/requisitions-repository.service';

@Injectable()
export class RequisitionsService {
  constructor(
    private requisitionsRepositoryService: RequisitionsRepositoryService
  ) {}

  getAll() {
    return this.requisitionsRepositoryService.getAllRequisitions();
  }
}
