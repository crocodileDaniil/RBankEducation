import { BaseScreen } from '@/core/component/base-screen.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { CardInfo } from '@/components/screens/home/card-info/card-info.component'
import { AuthRequiredMessage } from '@/components/ui/auth-required-message/auth-required-message.component'
import { Heading } from '@/components/ui/heading/heading.component'

import styles from './home.module.scss'
import homeTemplate from './home.template.html'

import { Actions } from './actions/actions.component'
import { Contacts } from './contacts/contacts.component'
import { Statistics } from './statistics/statistics.component'
import { Transactions } from './transactions/transactions.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.components = {
			cardInfo: null,
			transactions: null,
			statistics: null
		}
	}

	createOrUpdateComponent(component, componentName) {
		if (this.components[componentName]) {
			this.components[componentName].destroy()
		}
		this.components[componentName] = new component()
		return this.components[componentName]
	}

	update() {
		this.user = this.store.state.user

		if (!this.user) {
			$R(this.element).html(new AuthRequiredMessage().render().outerHTML)
		}
	}

	render() {
		const componentsToRender = [
			this.createOrUpdateComponent(CardInfo, 'cardInfo'),
			this.createOrUpdateComponent(Transactions, 'Transactions'),
			this.createOrUpdateComponent(Statistics, 'Statistics'),
			Actions,
			Contacts
		]

		this.element = renderService.htmlToElement(
			homeTemplate,
			componentsToRender,
			styles
		)

		this.update()

		return this.element
	}
}
