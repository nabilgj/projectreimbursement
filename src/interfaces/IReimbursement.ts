import { IUser } from './IUser';

export interface IReimbursement {
  id?: number;
  amount: number;
  submittedDate?: string;
  description: string;

  reimbursementAuthorId?: number;
  reimbursementAuthor?: IUser;

  reimbursement_status_id?: number;
  reimbursementStatus?: string;

  reimbursementTypeId?: number;
  reimbursementType?: string;

  resolvedDate?: Date;
  reimbursementResolverId?: number;
}
