/**
 * форматирование баланса 
 * @param {number} number 
 * @returns 
 */
export function formatToCurrency(number) {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'RUB',
    style: 'currency'
  }).format(number)
} //TODO: почитать про этот объект Intl.NumberFormat
