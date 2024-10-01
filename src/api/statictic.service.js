import { redQuery } from '@/core/red-query/red-query.lig'


export class AuthService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return redQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
