import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()
		this.store = Store.getInstance()

		this.store.addObserver(this)

		this.router = router
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $R(this.element).find('#auth-side')
		const userName = this.user.name.split('.').join(' ')
		// console.log(userName)
		// console.log(this.user)

		if (this.user) {
			authSideElement.show()
			authSideElement
				.find('button')
				.find('img')
				.attr('src', this.user.avatarPath)
			authSideElement
				.find('button')
				.find('img')
				.attr('alt', userName.slice(0, 3))
			authSideElement.find('button').find('span').text(userName)
			console.log(authSideElement.find('button').find('img'))
		} else {
			authSideElement.hide()
		}

		if (this.user && this.router.getCurrentPath() === '/auth') {
			this.router.navigate('/')
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({ router: this.router }),
				Search,
				new UserItem(
					{
						name: 'Dan',
						avatarPath:
							'https://www.dobrovserdce.ru/images/2022/11/02/kot%20Fedya_large.jpeg'
					},
					true,
					() => console.log('Hey Daniil')
				)
			],
			styles
		)
		this.update()

		return this.element
	}
}
