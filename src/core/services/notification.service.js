import styles from '@/components/layout/notification/notification.module.scss'

import { $R } from '../rquery/rquery.lib'

export class NotificationService {
	#timeout
	constructor() {
		this.#timeout = null
	}

	/**
	 * показывает всплывающее окно об успешной авторизации или ошибке
	 * @param {string} message текст сообщение
	 * @param {('success'| 'error')} type тип всплывающего окна
	 */
	show(type, message) {
		if (!['error', 'success'].includes(type)) {
			throw new Error('Invalid notification type')
		}

		const classNames = {
			success: styles.success,
			error: styles.error
		}
		const notificationElement = $R('#notification')
		let className = classNames[type]

		notificationElement.text(message).addClass(className)
		this.#setTimeout(() => {
			notificationElement.removeClass(className)
		}, 3000)
	}

	#setTimeout(callback, duration) {
		if (this.#timeout) {
			clearTimeout(this.#timeout)
		}

		this.#timeout = setTimeout(callback, duration)
	}
}
