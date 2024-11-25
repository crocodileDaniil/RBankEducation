/**
 * Форматирует дату в формат "MMM DD, YYYY"
 * @param {string} dateString - фходная дата формата "YYYY-MM-DDTHH:mm:ss:.sssz"
 * @return {string} - дата формата "MMM DD, YYYY"
 */

export function formatDate(dateString) {
	const date = new Date(dateString)
	const options = { month: 'short', day: 'numeric', year: 'numeric' }

	return date.toLocaleDateString('en-Us', options)
}
