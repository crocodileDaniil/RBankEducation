import { SERVER_URL } from '@/config/url.config'

import { NotificationService } from '../services/notification.service'
import { StorageService } from '../services/storage.service'

import { extractErrorMessage } from './extract-error-message'
import { ACCESS_TOKEN_KEY } from '@/constants/auth.constants'

/**
 *
 * @param {Object} options - параметры запроса
 * @param {string} options.path - путь запроса
 * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} [options.method = "GET"] - тип запроса
 * @param {Object} [options.body = null] - данные для запроса
 * @param {Object} [options.headers = null] - заголовки запроса
 * @param {Function} [options.onSuccess] - функция вызываемая при авторизации
 * @param {Function} [options.onError] - функция вызываемая если пользователь не авторизован
 * @returns {Promise<{isLoading: boolean, error: string|null,data: any|null}>}   - ответ на запрос
 * со статусом ответа, данными об ошибке при наличии и данными ответа
 */
export async function redQuery({
	path,
	body = null,
	headers = {},
	method = 'GET',
	onError = null,
	onSuccess = null
}) {
	let isLoading = true
	let error = null
	let data = null
	const url = `${SERVER_URL}/api${path}`

	const accessToken = new StorageService().getItem(ACCESS_TOKEN_KEY)
	const requestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		}
	}

	if (accessToken) {
		requestOptions.headers.Authorization = `Bearer ${accessToken}`
	}

	if (body) {
		requestOptions.body = JSON.stringify(body)
	}

	try {
		const response = await fetch(url, requestOptions)

		if (response.ok) {
			data = await response.json()
			if (onSuccess) {
				onSuccess(data)
			}
		} else {
			const errorData = await response.json()
			const errorMessage = extractErrorMessage(errorData)
			if (onError) {
				onError(errorMessage)
			}

			new NotificationService().show('error', errorMessage)
		}
	} catch (error) {
		const errorMessage = extractErrorMessage(error)

		if (onError) onError(errorMessage)
	} finally {
		isLoading = false
	}
}
