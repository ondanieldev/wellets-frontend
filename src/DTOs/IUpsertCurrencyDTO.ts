interface IUpsertCurrencyDTO {
  acronym: string;
  alias: string;
  dollar_rate: number;
  format: string;
  id?: string;
  favorite?: string;
}

export default IUpsertCurrencyDTO;
