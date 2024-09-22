import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import { Button } from '@/components/ui/button/button.component'

import styles from './home.module.scss'
import homeTemplate from './home.template.html'
import { Heading } from '@/components/ui/heading/heading.component'

export class Home extends BaseScreen {
	constructor() {
		super({ title: 'Home' })
	}

	render() {
		let element = renderService.htmlToElement(homeTemplate, [
			new Heading('Heading home')
		], styles)
		return element
	}
}
