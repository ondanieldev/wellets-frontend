import IWallet from 'Entities/IWallet';

export default function formatWalletValue(
  value: number,
  wallet?: IWallet,
  currency?: string,
): string {
  const parsedValue = Number(value.toString()).toFixed(2);
  if (currency) {
    return `${parsedValue} ${currency}`;
  }
  if (!wallet || !wallet.currency) {
    return parsedValue.toString();
  }
  return `${parsedValue} ${wallet.currency.acronym}`;
}
