export const currencyRounding = (currency: string, price: number): number => {
  switch (currency) {
    case 'KRW':
      return (Math.round(price / 100) * 100)
    case 'USD':
    case 'SGD':
    case 'CNY':
    default:
      return Math.round(price)
  }
}


export const currencyFormat = (value: number, dp: number): string => {
  return value.toLocaleString(undefined, { maximumFractionDigits: dp, minimumFractionDigits: dp })
}