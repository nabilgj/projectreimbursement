import { IReimbursement } from './IReimbursement';

export interface IUser {
  user_id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  role_id?: number;
  reimbursements?: IReimbursement[];
}
