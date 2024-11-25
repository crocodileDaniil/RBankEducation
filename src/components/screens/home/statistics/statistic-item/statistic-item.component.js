import { ChildComponent } from '@/core/component/child.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import styles from './statistic-item.module.scss'
import template from './statistic-item.template.html'

export class StatisticItem extends ChildComponent {
	/**
	 *
	 * @param {string} label - подпись к элементу
	 * @param {string|number} value - значение статистики
	 * @param {('green'|'purple')} variant - вид таблички статистики
	 */

	constructor(label, value, variant) {
		super()

		if (!label || !value || !variant)
			throw new Error('label, value or variant is not defined')

		this.label = label
		this.value = value
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$R(this.element).addClass(styles[this.variant]).addClass('fade-in')
		$R(this.element).find('#statistic-label').text(this.label)
		$R(this.element).find('#statistic-value').text(this.value)

		return this.element
	}
}
