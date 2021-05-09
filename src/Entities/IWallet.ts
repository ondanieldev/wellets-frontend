import ICurrency from './ICurrency';
import ITransaction from './ITransaction';
import ITransfer from './ITransfer';
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
  transactions: ITransaction[];
  from_transfers: ITransfer[];
  to_transfers: ITransfer[];
}

export default IWallet;
