import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './donut-chart.module.scss'
import template from './donut-chart.template.html'

export class DonutChart extends ChildComponent {
	gap = 15

	/**
	 * @param {string|HTMLElement} container - куда будет помещён график
	 * @param {object[]} data - данные для графика
	 * @param {number} data[].value - значение определенной части графика
	 * @param {string} data[].color - цвет определенной части графика
	 * @param {number} options.size=250 - размер графика (диаметр), по умолчанию 250
	 * @param {number} options.donutWidth=50  - высота графика
	 */
	constructor(
		data,
		options = {
			size: 250,
			donutWidth: 50
		}
	) {
		super()
		this.data = data
		this.size = options.size
		this.donutWidth = options.donutWidth
	}
	/**
	 * вычисляет общую сумму значений сегментов, возвращает число
	 */
	#calculateTotalValue() {
		return this.data.reduce((acc, slice) => acc + slice.value, 0)
	}
	/**
	 * получение координат для графика элемента
	 * @param {number} percentage - количество занимаемого места на грфике в процентах
	 * @param {number} radius - радиус окружности
	 * @returns {number[]} координаты точки
	 */

	#polarToCartesian(percentage, radius) {
		const angleInDegrees = percentage * 3.6 - 90 
		const angleInRadians = (angleInDegrees * Math.PI) / 180
		const x = radius * Math.cos(angleInRadians)
		const y = radius * Math.sin(angleInRadians)
		return [x, y]
	}
	/**
	 * создаёт svg элемент
	 * @returns
	 */
	#createSvgElement() {
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

		svg.setAttribute('width', this.size)
		svg.setAttribute('height', this.size)
		svg.setAttribute(
			'viewBox',
			`-5 -5 ${this.size + this.gap} ${this.size + this.gap}`
		)
		return svg
	}
	/**
	 * создаёт элменты группы
	 * @returns
	 */
	#createSvgGroupElement() {
		const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		g.setAttribute(
			'transform',
			`translate(${this.size / 2 + this.gap / 4}, ${
				this.size / 2 + this.gap / 4
			})`
		)
		return g
	}

	#createPathElement(slice, pathData) {
		if (!pathData || pathData.includes('NaN')) return

		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute('d', pathData)
		path.setAttribute('fill', 'none')
		path.setAttribute('stroke', slice.color)
		path.setAttribute('stroke-width', this.donutWidth)
		return path
	}

	// создает элементы пути SVG для каждого сегмента диаграммы.
	#createSvgPathElements(g) {
		const totalValue = this.#calculateTotalValue(),
			scale = 0.8,
			newSize = this.size * scale,
			radius = newSize / 2

		let accumulatedPercentage = 0

		this.data.forEach(slice => {
			const percentage = (slice.value / totalValue) * 100
			const [startX, startY] = this.#polarToCartesian(
				accumulatedPercentage,
				radius
			)
			accumulatedPercentage += percentage
			const [endX, endY] = this.#polarToCartesian(accumulatedPercentage, radius)
			const largeArcFlag = percentage > 50 ? 1 : 0
			const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`

			const path = this.#createPathElement(slice, pathData)
			path.classList.add('rotate')
			g.appendChild(path)
		})
	}
	/**
	 * генерирует svg элемент графика (пончик)
	 */
	#getSvg() {
		const svg = this.#createSvgElement()
		const g = this.#createSvgGroupElement()
		this.#createSvgPathElements(g)
		svg.appendChild(g)
		return svg
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		console.log(this.element)
		$R(this.element).append(this.#getSvg())
		
		return this.element
	}
}
