/**
 * форматирование номера карты
 * @param {Stirng} cardNumber 
 * @returns string отформатированного номера карты
 */

export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
