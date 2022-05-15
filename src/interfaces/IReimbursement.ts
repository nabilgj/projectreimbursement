import { IUser } from './IUser';

export interface IReimbursement {
  amount: number;
  description: string;
  reimbursementType: string;
  reimbursementId: number;
  submittedDate: Date;

  reimbursementAuthor?: IUser;
  reimbursementAuthorId: number;
  reimbursementStatus: string;

  resolvedDate?: Date;
  reimbursementResolver?: number;
}
