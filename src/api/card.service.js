import { redQuery } from '@/core/red-query/red-query.lig'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class CardService {
	#BASE_URL = '/cards'

	constructor() {
		this.store = Store.getInstance()

		this.notificationService = new NotificationService()
	}
	byUser(onSuccess) {
		return redQuery({
			path: `${this.#BASE_URL}/by-user`,
			onSuccess
		})
	}

	/**
	 * Изменение баланса
	 * @param {number} amount - число (списание, пополнение, перевод)
	 * @param {'top-up' | 'withdrawal'} type - тип операции, пополнение или списание
	 * @param {Function} onSuccess - функция, вызываемая при успешном
	 * изменении баланса
	 * @returns ответ от сервера
	 */
	updateBalance(amount, type, onSuccess) {
		console.log(type)
		return redQuery({
			path: `${this.#BASE_URL}/balance/${type}`,
			method: 'PATCH',
			body: { amount: +amount },
			onSuccess: () => {
				this.notificationService.show('success', 'Balance successfully changed'),
					onSuccess()
			}
		})
	}

	/**
	 * Перевод денег
	 * @param {Object} body - тело запроса для деструктуризации
	 * @param {number} body.amount - сумма перевода
	 * @param {string} body.toCardNumber - карта для перевода
	 * @param {Function} onSuccess - функция, вызываемая при успешном
	 * выполнении операции
	 * @returns ответ с сервера
	 */

	transfer({ amount, toCardNumber }, onSuccess) {
		return redQuery({
			path: `${this.#BASE_URL}/transfer-money`,
			method: 'PATCH',
			body: {
				amount: +amount,
				fromCardNumber: this.store.user.card.number,
				toCardNumber
			},
			onSuccess: () => {
				this.notificationService.show('success', 'Transfer completed')
				onSuccess()
			}
		})
	}
}
