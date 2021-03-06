import IWallet from './IWallet';

interface ITransfer {
  id: string;
  from_wallet_id: string;
  to_wallet_id: string;
  value: number;
  static_fee: number;
  percentual_fee: number;
  filled: number;
  created_at: Date;
  updated_at: Date;
  from_wallet: IWallet;
  to_wallet: IWallet;
}

export default ITransfer;
