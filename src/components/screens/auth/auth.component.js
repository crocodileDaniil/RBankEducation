import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'

import styles from './auth.module.scss'
import template from './auth.template.html'

export class Auth extends BaseScreen {
	constructor() {
		super({ title: 'Auth' })
	}

	render() {
    this.element = renderService.htmlToElement(template, [], styles)
		let auth = document.createElement('div')
		auth.innerHTML = '<h1> Auth</h1>'
		return auth
	}
}
