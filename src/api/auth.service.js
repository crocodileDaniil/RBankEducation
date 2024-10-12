import { redQuery } from '@/core/red-query/red-query.lig'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.store = new Store.getInstance()

		this.notificationService = new NotificationService()
	}

	main(type, body) {
		// можно и убрать return
		return redQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			onSuccess: data => {
				this.store.login(data.user, data.accessToken)
				this.notificationService.show('success', 'You successfully')
			},
			method: 'POST'
		})
	}
}
