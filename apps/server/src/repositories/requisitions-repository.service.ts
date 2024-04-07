import { Requisition } from '@entities/requisition';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import { Model } from 'mongoose';

@Injectable()
export class RequisitionsRepositoryService {
  constructor(
    @InjectModel(Requisition.name)
    private requisitionsRepository: Model<Requisition>
  ) {}

  async createRequisition(requisition: Requisition) {
    const result = await this.requisitionsRepository.create(requisition);
    console.log('Created requisition', result);
  }

  async getAllRequisitions() {
    return this.requisitionsRepository.find().lean();
  }
}
