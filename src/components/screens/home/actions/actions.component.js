import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import { NotificationService } from '@/core/services/notification.service'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/core/store/store'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import { CardService } from '@/api/card.service'

import styles from './actions.module.scss'
import template from './actions.template.html'

import { BALANCE_UPDATED } from '@/constants/event.constants'

export class Actions extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	/**
	 *
	 * @param {Event} event - событие самой кнопки
	 * @param {'top-up' | 'withdrawal'} type - тип операции (пополнение, снятие)
	 */
	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization')
		}

		$R(event.target).text('Sending...').attr('disabled', true)

		const inputElement = $R(this.element).find('input')
		const amount = inputElement.value()

		if (!amount) {
			validationService.showError($R(this.element).find('label'))
			return
		}
		this.cardService.updateBalance(amount, type, data => {
			inputElement.value(' ')

			const balanceUpdateEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdateEvent)

			$R(event.target).removeAttr('disabled').text(type)
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'amount',
					placeholder: 'Enter amount: ',
					type: 'number'
				})
			],
			styles
		)

		$R(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Top-up',
					variant: 'green',
					onClick: e => this.updateBalance(e, 'top-up')
				}).render()
			)
			.append(
				new Button({
					children: 'Withdrawal',
					variant: 'purple',
					onClick: e => this.updateBalance(e, 'withdrawal')
				}).render()
			)
		// тест события, чтобы например форматировать введенные данные
		// $R(this.element).find('input').element.addEventListener('input', (e) => console.log(e.data))
		return this.element
	}
}
