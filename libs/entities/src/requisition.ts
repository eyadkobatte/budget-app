export class Requisition {
  id!: string;
  name!: string;
  created!: Date;
  redirect!: string;
  status!: RequisitionStatus;
  institutionId!: string;
  agreementId!: string;
  referenceId!: string;
  accountId!: string;
  transactionHistoricalDays!: number;
  accessValidForDays!: number;
  link!: string;
}

type RequisitionStatus =
  (typeof RequisitionStatus)[keyof typeof RequisitionStatus];
export const RequisitionStatus = {
  CREATED: 'CR',
  GIVING_CONSENT: 'GC',
  UNDERGOING_AUTHENTICATION: 'UA',
  REJECTED: 'RJ',
  SELECTING_ACCOUNTS: 'SA',
  GRANTING_ACCESS: 'GA',
  LINKED: 'LN',
  EXPIRED: 'EX',
} as const;
