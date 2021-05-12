import IWallet from './IWallet';

interface IUser {
  id: string;
  email: string;
  password: string;
  token?: string;
  created_at: Date;
  updated_at: Date;
  wallets: IWallet[];
}

export default IUser;
