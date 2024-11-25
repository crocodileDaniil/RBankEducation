import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import { CardInfo } from '@/components/screens/home/card-info/card-info.component'
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
	}

	render() {
		let element = renderService.htmlToElement(
			homeTemplate,
			[
				new Heading('Heading home'),
				new CardInfo(),
				new Actions(),
				new Contacts(),
				Transactions,
				Statistics
			],
			styles
		)
		return element
	}
}
