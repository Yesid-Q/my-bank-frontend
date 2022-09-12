import { IUserInfo } from 'src/app/shared/interface/user.interface';
import { IAccountInfo } from './account.interface';

export interface ITransaction {
  id: string;
  amount: number;
  action: number;
  owner: IUserInfo;
  accountOwner: IAccountInfo;
  receiver: IUserInfo;
  accountReceiver: IAccountInfo;
}
