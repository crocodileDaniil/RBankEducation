import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './heading.module.scss'
import template from './heading.template.html'

export class Heading extends ChildComponent {
	constructor(title = 'default') {
		super()
		this.title = title
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		// this.element.textContent = this.text
		$R(this.element).find('h1').text(this.title)
		return this.element
	}
}
