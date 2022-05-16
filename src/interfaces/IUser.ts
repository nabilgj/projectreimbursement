import { IReimbursement } from './IReimbursement';

export interface IUser {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  reimbursements?: IReimbursement[];
}
