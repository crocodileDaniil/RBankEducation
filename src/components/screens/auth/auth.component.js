import { BaseScreen } from '@/core/component/base-screen.component'
import { $R } from '@/core/rquery/rquery.lib'
import renderService from '@/core/services/render.service'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import styles from './auth.module.scss'
import template from './auth.template.html'
import formService from '@/core/services/form.service'
import validationService from '@/core/services/validation.service'
import { AuthService } from '@/api/auth.service'

export class Auth extends BaseScreen {
	#isTypeLogin = true
	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $R(this.element).find('label:first-child')
		const passwordLabel = $R(this.element).find('label:last-child')
		// console.log(formValues)
		if(!formValues.email) {
			validationService.showError(emailLabel)
		}

		if(!formValues.password) {
			console.log(passwordLabel)
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = event => {
		const formValues = formService.getFormValues(event.target)
		if(!this.#validateFields(formValues)) return 

		// console.log(formValues)
		const type = this.#isTypeLogin ? 'login' : 'register'
		this.authService.main(type,formValues)
		
	}

	#changeFromType = event => {
		event.preventDefault()
		$R(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign in')

		event.target.textContent = this.#isTypeLogin ? 'Sign in' : 'Register'
		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {

		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)
		//прочитать про поле name в input
		$R(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'You email',
					type: 'email',
					name: 'email',
					value: ''
				}).render()
			)
			.append(
				new Field({
					placeholder: 'You password',
					type: 'password',
					name: 'password',
					value: ''
				}).render()
			)

		$R(this.element).find('#change-auth-type').addClick(this.#changeFromType)
		$R(this.element).find('form').submit(this.#handleSubmit)
		
		return this.element
	}
}
