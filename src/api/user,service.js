import { redQuery } from '@/core/red-query/red-query.lig'

export class AuthService {
	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return redQuery({
			path: `${this.#BASE_URL} 
				${
					searchTerm
						? `?${new URLSearchParams({
								searchTerm
						  })}`
						: ''
				} `,
			onSuccess
		})
	}
}
