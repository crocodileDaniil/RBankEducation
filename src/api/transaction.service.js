import { redQuery } from '@/core/red-query/red-query.lig'

export class AuthService {
	#BASE_URL = '/transactions'

	getAll(onSuccess) {
		return redQuery({
			path: this.#BASE_URL + `?${new URLSearchParams({
        orderBy: 'desc'
      })}`,
			onSuccess
		})
	}
}
