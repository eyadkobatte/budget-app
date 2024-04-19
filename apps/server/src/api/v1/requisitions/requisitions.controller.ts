import { Controller, Get, UseGuards } from '@nestjs/common';
import { RequisitionsService } from './requisitions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/requisitions')
@UseGuards(AuthGuard('jwt'))
export class RequisitionsController {
  constructor(private readonly requisitionsService: RequisitionsService) {}

  @Get()
  getAll() {
    return this.requisitionsService.getAll();
  }
}
