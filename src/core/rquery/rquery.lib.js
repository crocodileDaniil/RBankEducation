import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

class RQuery {
	/**
	 * create new RQuery
	 * @param {string | HTMLElement} selector
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)
			if (!this.element) throw new Error(`Element ${selector} not found`)
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			new Error('Invalid selector type')
		}
	}

	/**
	 *
	 * @param {String} selector search this selector
	 * @returns {RQuery} new object RQuery for the found selector
	 */

	find(selector) {
		const elem = new RQuery(this.element.querySelector(selector))
		if (elem) {
			return elem
		}

		throw new Error(`Element ${selector} not found`)
	}
	/**
	 * ищет все элементы в определённым селектором/классом/свойством
	 * @param {string} selector - название селектора/класса/свойства
	 * @returns {RQuery[]} массив RQurry объектор из этих селекторов/классов
	 */
	findAll(selector) {
		const elements = this.element.querySelectorAll(selector)
		return Array.from(elements).map(element => new RQuery(element))
	}
	//CSS

	/**
	 * Удаляет свойство дисплей у HTML элемента (чтобы убрать значение none)
	 * @returns {RQuery} - возвращает текущий объект RQuery
	 */
	show() {
		this.element.style.removeProperty('display')
		return this
	}
	/**
	 * ставит элементу значение display none, чтобы элемент пропал.
	 * @returns {RQuery} - текуший объект RQuery
	 */
	hide() {
		this.element.style.display = 'none'
		return this
	}

	/**
	 *  add or replace value CSS style
	 * @param {String} property key CSS style
	 * @param {String} value value CSS style
	 * @returns {RQuery} this object
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('propetry or value not string')
		}

		this.element.style[property] = value

		return this
	}

	/**
	 * добавляет классы у указанному HTML элементу
	 * @param {String or String[]} classNames строка css селектора или массив строк
	 * @returns {RQuery}
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (let className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}
		return this
	}

	/**
	 * удаляет классы у указанному HTML элементу
	 * @param {String or String[]} classNames строка css селектора или массив строк
	 * @returns {RQuery}
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (let className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}
		return this
	}

	/**
	 *
	 * @param {HTMLElement} childElement
	 * @returns {RQuery} this object
	 */

	//HTML and DOOM
	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}

	/**
	 * clear parent component and add now elemnt
	 * @param {HTMLElement} elem html element, component
	 * @returns {RQuery}
	 */

	replacContent(elem) {
		this.element.innerHTML = ''
		this.element.append(elem)
		return this
	}

	/**
	 * выполняет содержимого DOOM/HTML элемента
	 * @param {[htmlElement]} htmlContent строка разметки или outerHtml элемента
	 * @returns
	 */

	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent // только строка разметки или отдавать outerHtml
			return this
		}
	}

	before(newElement) {
		if (!newElement instanceof HTMLElement) {
			throw new Error('Element must be an HTMLElement')
		}

		const parentElement = this.element.parentElement
		if (parentElement) {
			parentElement.insertBefore(newElement, this.element) // почему нельзя this.newElement.before(elem)?
		} else {
			throw new Error('Element does not have a parent element')
		}

		return this
	}

	/**
	 * add text content this HTMLElement
	 * @param {string} textContent
	 * @returns {RQuery}
	 */
	text(textContent) {
		if (typeof textContent === 'undefined') return this.element.textContent
		else {
			this.element.textContent = textContent
			return this
		}
	}
	// EVENTS
	/**
	 * Добавляет слушатель/событие
	 * @param {string} eventType - тип события
	 * @param {function} callback - слушатель или событие происходящее при действии eventType
	 * @returns {RQuery} - текущий элмент
	 */
	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error('eventType not string or callback not a function')
		}
		this.element.addEventListener(eventType, callback)
		return this
	}

	/**
	 * добавляет событие на элемент
	 * @param {function()} callback функция - событие
	 * @returns {RQuery} RQuerry объект
	 */

	addClick(callback) {
		this.element.addEventListener('click', callback)
		return this
	}
	//Form

	/**
	 * добавление события на кнопку формы
	 * @param {function} onSumbit - событие которые должно выполняться на форме
	 * @returns {RQuery} - текущий объект
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLocaleLowerCase() === 'form') {
			this.element.addEventListener('submit', e => {
				e.preventDefault()
				onSubmit(e)
			})
		} else {
			throw new Error('Element must be a form')
		}

		return this
	}

	/**
	 * добавление отрибутов и события (при наличии) элементу ввода
	 * @param {function} param1 onInput event to hanlde input
	 * @param {Object} param2 ...rest, атрибуты для добавления
	 * @returns {RQuery} RQuery сам объект
	 */
	input({ onInput, value, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input')
			throw new Error('Element must be an input')

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}
		if (!value) this.element.setAttribute('value', '')
		if (this.input) this.element.addEventListener('click', onInput)

		return this
	}

	/**
	 * вешает события, которое запрещает ввод букв и добавляет ограничение(при необходимости)
	 * @param {number} limit ограничение по вводимым символам
	 * @returns {RQuery}
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'number'
		) {
			throw new Error('Element must be an input with type number')
		}

		this.element.addEventListener('input', e => {
			let value = e.target.value.replace(/[^0-9]/g, '0')
			if (limit) value = value.substring(0, limit)

			e.target.value = value
		})

		return this
	}

	/**
	 * добавляет событие, которое запрещает ввод букв и добавляет ограничение 16 символов по умолчанию
	 * @returns {RQuery}
	 */
	creditCardInput() {
		const limit = 16
		if (
			this.element.tagName.toLowerCase() !== 'input' ||
			this.element.type !== 'text'
		) {
			throw new Error('Element must be an input with type text')
		}

		this.element.addEventListener('input', e => {
			let value = e.target.value.replace(/[^0-9]/g, '')
			if (limit) value = value.substring(0, limit)

			e.target.value = formatCardNumberWithDashes(value)
		})

		return this
	}

	/**
	 *
	 * @param {String} [newValue] - новое значение формы (необязательно)
	 * @returns {String | RQuery} - если не было передано значение, вернёт текущее значение формы,
	 * если значение было передано, то вернёт RQuerry
	 */
	value(newValue) {
		if (!newValue) {
			return this.element.value
		}
		this.element.value = newValue
		return this
	}
	//Attr

	/**
	 * Изменяет значение атрибута элемента или дбавляет атрибут с конкретым значение.
	 * Если значение атрибута не передано, то возвращает значение атрибута
	 * @param {Stirng} attributeName
	 * @param {String} [value]
	 * @returns {RQuery|String}
	 */
	attr(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string')
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName)
		}

		this.element.setAttribute(attributeName, value)
		return this
	}
	/**
	 *
	 * @param {String} attributeName - имя атрибута
	 * @returns {RQuery} - без необходимого атрибута
	 */
	removeAttr(attributeName) {
		if (typeof attributeName !== 'string') {
			throw new Error('Attribute name must be a string')
		}
		this.element.removeAttribute(attributeName)

		return this
	}
}

/**
 * create object RQuery
 * @param {String | HTMLElement} selector
 * @returns {RQuery}
 */
export function $R(selector) {
	return new RQuery(selector)
}

//Mini test
// let data = {
// 	title: 'title 1',
// 	countUpdate: 1
// }

// let testElemnt = {
// div: document.createElement('div'),

// contentDiv() {
// this.div.textContent = 'elemnt'
// },

// updateDiv() {
// this.div.textContent = 'newElement'
// }
// }
// testElemnt.contentDiv()

// let divElemnt = document.createElement('div')
// let divElemnt2 = document.createElement('div')
// let divElemnt3 = document.createElement('div')

// divElemnt2.textContent = data.title
// divElemnt3.textContent = data.countUpdate

// divElemnt.append(divElemnt2)
// divElemnt.append(divElemnt3)
// divElemnt.append(testElemnt.div)

// document.body.append(divElemnt)
// console.log(divElemnt)
// setTimeout(()=> {
// console.log('start timeOut')
// data.title = 'title 2'
// data.countUpdate++
// testElemnt.updateDiv()

// console.log(data)
// divElemnt2.textContent = data.title
// console.log(divElemnt.textContent)
// }, 3000)
