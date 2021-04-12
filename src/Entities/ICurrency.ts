import IWallet from './IWallet';

interface ICurrency {
  id: string;
  acronym: string;
  alias: string;
  format: string;
  dollar_rate: number;
  created_at: Date;
  updated_at: Date;
  wallets: IWallet[];
}

export default ICurrency;
