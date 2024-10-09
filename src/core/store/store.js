import { StorageService } from '../services/storage.service'

import { ACCESS_TOKEN_KEY, USER_STORAGE_KEY } from '@/constants/auth.constants'

export class Store {
	/**
	 * задать начальное состояние
	 * @param {Object} initialState - начальные состояние
	 */
	constructor(initialState) {
		this.observers = []

		this.storageService = new StorageService()
		const savedUser = this.storageService.getItem(USER_STORAGE_KEY)

		const state = savedUser ? { user: savedUser } : initialState

    this.state = new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value
        this.notify()

        return true
      }
    })
	}
  /**
   * Для получения стора с актуальным состоянием
   * @returns {Store} - возвращает сторе
   */
  static getInstance() {
    if(!Store.instance) {
      Store.instance = new Store({user:null})
    } 
    return Store.instance
  }

  /**
   * добавление слушателя
   * @param {Object} observer - добавляемый слушатель
   */
  addObserver(observer) {
    this.observers.push(observer)
  }
 /**
  * Удаление слушателя
  * @param {Object} observer - слушатель необходимый для удалени
  */
  removerObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }
/**
 * ререндер слшуателей (вызывается при изменении данных)
 */
  notify() {
    for (let observer of this.observers) {
      observer.update()
    }
  }
  
/**
 * заполнение данных стейта при авторизации пользователя
 * @param {Object} user - данные пользователя 
 * @param {String} accessToken - токен пользователя 
 */
  login(user, accessToken) {
    this.state.user = user 
    this.storageService.setItem(USER_STORAGE_KEY, user)
    this.storageService.setItem(ACCESS_TOKEN_KEY, accessToken)
  }

/**
 * выход пользователя 
 */
  logout() {
    this.state.user = null
    this.storageService.removeItem(USER_STORAGE_KEY)
    this.storageService.removeItem(ACCESS_TOKEN_KEY)
  }

 /**
  * Обновления данных карты пользователя (перезаписывает store с 
  * новыми данными карты). 
  * @param {Object} card - данные карты 
  */
  updateCard(card) {
    const oldUser = this.state.user
    const newUser = {...oldUser, card}
    this.state.user = newUser
    this.storageService.setItem(USER_STORAGE_KEY, newUser)
  }
}
