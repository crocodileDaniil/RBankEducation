export class StorageService {
  /**
   * сохраняет данные в локалСторадж
   * @param {string} key - ключ сохраняемого параметра
   * @param {any} value - значение сохраняего параметра
   */
  setItem(key,value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
 /**
  * удаление данных из хранилища
  * @param {string} key - ключ удаляемого параметра 
  */
  removeItem(key) {
    localStorage.removeItem(key)
  }
/**
 * полная очистка хранилища
 */
  clear() {
    localStorage.clear()
  }
  /**
   * получение значения необходимого параметра
   * @param {string} key - ключ необходимого параметра
   * @returns {any} - значение необходимого параметра
   */
  getItem(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
}