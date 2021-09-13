import IWallet from './IWallet';

interface ICurrency {
  id: string;
  acronym: string;
  alias: string;
  format: string;
  dollar_rate: number;
  favorite: boolean;
  created_at: Date;
  updated_at: Date;
  wallets: IWallet[];
}

export default ICurrency;
