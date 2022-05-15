import { IReimbursement } from './IReimbursement';

export interface IUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  reimbursements?: IReimbursement[];
}
