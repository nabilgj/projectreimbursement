import { IUser } from './IUser';

export interface IReimbursement {
  id?: number;
  amount: number;
  submittedDate?: string;
  description: string;

  reimbursementAuthorId?: number;
  reimbursementAuthor?: IUser;

  reimbursementStatusId?: number;
  reimbursementStatus?: string;

  reimbursementTypeId?: number;
  reimbursementType?: string;

  resolvedDate?: Date;
  reimbursementResolverId?: number;
}
