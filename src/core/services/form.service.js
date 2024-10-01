class FormService {
	constructor() {}

/**
 * 
 * @param {HTMLFormElement} formELement - элемент-контейнер для полей input 
 * @returns {object} - возвращает объект содержимого 
 */
	getFormValues(formELement) {
		const values = {}
		const inputs = formELement.querySelectorAll('input')
		inputs.forEach(element => {
			values[element.name] = element.value
		})

		return values
	}

}

export default new FormService()