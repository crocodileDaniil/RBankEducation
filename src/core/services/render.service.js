import { ChildComponent } from '../component/child.component'

import test from './test.html'

class RenderService {
	#htmlElement
	constructor() {}

	/**
	 *
	 * @param {HTML} html
	 * @param {Array} components child components
	 * @param {Object} styles
	 * @returns {HTMLElement}
	 */
	htmlToElement(html, components = [], styles) {
		// const template = document.createElement('template')
		// template.innerHTML = html.trim()
		// const element = template.content.firstChild
		//другой способ, более безопасный. innerHTML небезопасно для использования (способ выше тоже рабочий)
		const parser = new DOMParser()
		const doc = parser.parseFromString(html, 'text/html')
		const element = doc.body.firstChild

		if (styles) this.#applyModuleStyles(styles, element)
		this.#replaceComponentTags(element, components)

		return element
	}

	/**
	 *
	 * @param {HTMLElement} parentElement
	 * @param {Array} components
	 */
	#replaceComponentTags(parentElement, components) {
		const componentTagPattern = /^component/
		const allElements = parentElement.getElementsByTagName('*')

		for (let elem of allElements) {
			const elementTagName = elem.tagName.toLowerCase()
			if (componentTagPattern.test(elementTagName)) {
				const componentName = elementTagName
					.replace(componentTagPattern, '')
					.replace(/-/g, '')

				const foundComponent = components.find(Component => {
					const instance =
						Component instanceof ChildComponent ? Component : new Component()

					return instance.constructor.name.toLowerCase() === componentName
				})
				if (foundComponent) {
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()
							: new foundComponent().render()
					elem.replaceWith(componentContent)
				} else {
					console.error(
						`Component "${componentName}" not found in the provided components array.`
					)
				}
			}
		}
	}

	/**
	 *
	 * @param {HTMLElement} parentElement
	 * @param {Object} styles
	 */
	#applyModuleStyles(moduleStyles = {}, element) {
		if (!element) return

		const applyStyles = element => {
			for (const [key, value] of Object.entries(moduleStyles)) {
				if (element.classList.contains(key)) {
					element.classList.remove(key)
					element.classList.add(value)
				}
			}
		}

		if (element.getAttribute('class')) applyStyles(element)

		const childElements = element.querySelectorAll('*')

		childElements.forEach(element => {
			applyStyles(element)
		})
	}
}

export default new RenderService()

// let service = new RenderService()
// console.log(service)

// const template = document.createElement('template')
// template.innerHTML = test.trim()
// const element = template.content.firstChild

// let children = element.getElementsByTagName('*')

// console.log(children)

// children.forEach(elem => console.log(elem))

// for (let child of children) {
// 	console.log(child)
// }
