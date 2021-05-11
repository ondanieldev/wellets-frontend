interface ICreateTransferDTO {
  from_wallet_id: string;
  to_wallet_id: string;
  value: number;
  static_fee?: number;
  percentual_fee?: number;
}

export default ICreateTransferDTO;
