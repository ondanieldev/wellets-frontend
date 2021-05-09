interface ICreateTransferDTO {
  from_wallet_id: string;
  to_wallet_id: string;
  value: number;
  static_rate?: number;
  percentual_rate?: number;
}

export default ICreateTransferDTO;
