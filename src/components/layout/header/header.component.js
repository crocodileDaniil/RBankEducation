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
		this.userItem = new UserItem(
			{
				name: 'Name',
				avatarPath:
					'https://www.dobrovserdce.ru/images/2022/11/02/kot%20Fedya_large.jpeg'
			},
			true,
			() => console.log('Hey user')
		)

		this.store.addObserver(this)

		this.router = router
	}

	update() {
		this.user = this.store.state.user

		const authSideElement = $R(this.element).find('#auth-side')
		const userName = this.user ? this.user.name.split('.').join(' ') : null
		// console.log(userName)
		// console.log(this.user)

		if (this.user) {
			authSideElement.show()
			this.userItem.update({
				...this.user,
				name: userName
			})
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
			[Logo, new LogoutButton({ router: this.router }), Search, this.userItem],
			styles
		)
		this.update()

		return this.element
	}
}
