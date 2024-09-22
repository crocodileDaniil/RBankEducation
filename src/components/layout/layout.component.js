import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './layout.module.scss'
import template from './layout.template.html'

import { Header } from './header/header.component'
import { Notification } from './notification/notification.component'
import { NotificationService } from '@/core/services/notification.service'
import { StorageService } from '@/core/services/storage.service'

export class Layout extends ChildComponent {
	// деструктуризация данных, можно передавать единым объектом, как props в реакт и писать при при обращении props.router
	// можно перечислять все поля router, children ... и тогда при вызове класса передавать их также, а не объекстом
	constructor({ router, children }) {
		super()
		this.children = children
		this.router = router
	}

	render() {
		const renderHTML = ``

		// let header = document.createElement('header')
		// header.textContent = 'Header'

		// let nav = document.createElement('nav')

		// let linkHome = document.createElement('a')
		// linkHome.setAttribute('href', '/')
		// linkHome.textContent = 'Главная'

		// let linkAuth = document.createElement('a')
		// linkAuth.setAttribute('href', '/auth')
		// linkAuth.textContent = 'войти'

		// let linkAboutUs = document.createElement('a')
		// linkAboutUs.setAttribute('href', '/about-us')
		// linkAboutUs.textContent = 'иноформация'

		// let br = document.createElement('br')
		// nav.textContent = 'навигация'
		// nav.append(br)
		// nav.append(linkHome)
		// nav.append(linkAuth)
		// nav.append(linkAboutUs)

		// header.append(nav)
		// let app = document.createElement('template')

		// app.append(header)

		// let main = document.createElement('main')
		// main.append(this.children)

		// app.append(main)

		// $R('#app').append(header).append(main)

		this.element = renderService.htmlToElement(template, [Notification], styles)

		const contentContainer = $R(this.element).find('#content')
		contentContainer.append(this.children)
		window.storageService = new StorageService()
		const mainElement = $R(this.element).find('main')
		mainElement
			.before(
				new Header({
					router: this.router
				}).render()
			)
			.append(contentContainer.element)

		return this.element
	}
}
