import { Controller, Get } from '@nestjs/common';
import { RequisitionsService } from './requisitions.service';

@Controller('api/v1/requisitions')
export class RequisitionsController {
  constructor(private readonly requisitionsService: RequisitionsService) {}

  @Get()
  getAll() {
    return this.requisitionsService.getAll();
  }
}
