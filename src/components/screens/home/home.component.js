import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import { Button } from '@/components/ui/button/button.component'

import styles from './home.module.scss'
import homeTemplate from './home.template.html'
import { Heading } from '@/components/ui/heading/heading.component'
import { CardInfo } from '@/components/screens/home/card-info/card-info.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		let element = renderService.htmlToElement(homeTemplate, [
			new Heading('Heading home'),
			new CardInfo()
		], styles)
		return element
	}
}
