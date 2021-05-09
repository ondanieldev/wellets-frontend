import ICurrency from './ICurrency';
import IUser from './IUser';

interface IWallet {
  id: string;
  alias: string;
  balance: number;
  user_id: string;
  currency_id: string;
  created_at: Date;
  updated_at: Date;
  user: IUser;
  currency: ICurrency;
  // transactions: Transaction[];
  // from_transfers: Transfer[];
  // to_transfers: Transfer[];
}

export default IWallet;
