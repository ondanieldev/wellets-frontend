import ICurrency from 'Entities/ICurrency';

export default function getCurrency(
  currencies: ICurrency[],
  id: string,
): string {
  const currency = currencies.find(c => c.id === id);
  if (!currency) {
    return id;
  }
  return currency.acronym;
}
