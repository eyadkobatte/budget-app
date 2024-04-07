import mongoose from 'mongoose';
import { Requisition, RequisitionStatus } from '@entities/requisition';

export const RequisitionSchema = new mongoose.Schema<Requisition>(
  {
    id: String,
    accessValidForDays: Number,
    accountId: String,
    agreementId: String,
    created: Date,
    institutionId: String,
    link: String,
    redirect: String,
    referenceId: String,
    status: {
      type: String,
      enum: {
        values: Object.values(RequisitionStatus),
        message: '{VALUE} is not supported',
      },
    },
    transactionHistoricalDays: Number,
  },
  {
    versionKey: false,
  }
);
