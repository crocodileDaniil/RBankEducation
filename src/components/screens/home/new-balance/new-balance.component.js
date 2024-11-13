import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import { Button } from '@/components/ui/button/button.component'

import styles from './new-balance.module.scss'
import template from './new-balance.template.html'
import { CardService } from '@/api/card.service'
import { Store } from '@/core/store/store'

export class NewBalance extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
	}

	#balanceUp() {
		const value = $R(this.element).find('input').element.value
		console.log(+value)
		new CardService().updateBalance(
			value,
			"top-up",
			() => console.log("success")
		)
		$R(this.element).find('input').element.value = ''
		// this.store.notify()
	
	}

	#balanceDown() {
		const value = $R(this.element).find('input').element.value
		console.log(+value)
		new CardService().updateBalance(
			value,
			"withdrawal",
			() => console.log("success")
		)
		$R(this.element).find('input').element.value = ''
	
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		$R(this.element)
			.find('.button-up')
			.append(
				new Button({
					children: 'Up',
					onClick: this.#balanceUp.bind(this)
				}).render()
			)

		$R(this.element)
			.find('.button-down')
			.append(
				new Button({
					children: 'Up',
					onClick: this.#balanceDown.bind(this)
				}).render()
			)

		return this.element
	}
}
