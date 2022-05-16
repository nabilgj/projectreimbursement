import { IUser } from './IUser';

export interface IReimbursement {
  amount: number;
  submitted_date?: string;
  description: string;
  reimbursement_author?: number;
  reimbursement_status_id?: number;
  reimbursementType: number;

  reimbursementAuthor?: IUser;

  resolvedDate?: Date;
  reimbursementResolver?: number;
}
