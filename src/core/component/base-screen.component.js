import { getTitle } from '@/config/seo.config'

export class BaseScreen {
	/**
	 * конструктор базового класса 
	 * @param {Object} options 
	 * @param {string} options.title - title страницы   
	 */
	constructor({title}) {
		document.title = getTitle(title)
	}

	render() {
		throw new Error('Render method must be implemented in the child class')
	}
}
