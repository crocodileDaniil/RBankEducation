/**
 * форматирование номера карты
 * @param {Stirng} cardNumber 
 * @returns string отформатированного номера карты
 */

export function formatCardNumberWithDashes(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
/**
 * приводит карту к виду **** **** **** ****
 * @param {string} cardNumber - данные карты 
 * @returns {string} - отформатированная строка 
 */
export function formatCardNumber(cardNumber) {
	const formattedNumber = cardNumber.replace(/\s/g,'').match(/.{1,4}/g)
	return formattedNumber ? formattedNumber.join(' ') : ''
}
