import mongoose from 'mongoose';
import { Transaction } from '@entities/transaction';

export const TransactionSchema = new mongoose.Schema<Transaction>(
  {
    id: String,
    date: Date,
    payee: String,
    amount: Number,
    cleared: Boolean,
    category: String,
    reconciled: Boolean,
  },
  {
    versionKey: false,
  }
);
