export interface IReimbursement {
  amount: number;
  description: string;
  reimbursementType: string;
  reimbursementId: number;
  submittedDate: Date;

  reimbursementAuthorId: number;
  reimbursementStatus: string;

  resolvedDate?: Date;
  reimbursementResolver?: number;
}
