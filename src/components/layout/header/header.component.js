import { ChildComponent } from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()
		this.router = router
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
						name: 'Daniil',
						avatarPath:
							'https://www.dobrovserdce.ru/images/2022/11/02/kot%20Fedya_large.jpeg'
					},
					true,
					() => console.log('Hey Daniil')
				)
			],
			styles
		)

		return this.element
	}
}