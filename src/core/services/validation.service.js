import { COLORS } from "@/config/colors.config"

class ValidationService {
  constructor() {
    this.errorBorderTimeout = {}
  }

  showError(element, timeout = 2500) {
    element.css('border-color', COLORS.error)

    if(this.errorBorderTimeout[element]) {
      clearTimeout(this.errorBorderTimeout[element])
    }

    this.errorBorderTimeout[element] = setTimeout(() => {
      element.css('border-color','')
    }, timeout)
  }

  // моё решение для подсветки 
	addEventInput(form) {
		const inputs = form.querySelectorAll('input')
		inputs.forEach(input => {
			const parentInput = input.parentNode
			// parentInput.style.borderColor = 'red'
      input.addEventListener('blur', e => {
				if (!e.target.value) {
					parentInput.style.borderColor = 'red' // e.target.parentNode - изначально искал так
				} else {
					parentInput.style.borderColor = 'green'
				}
			})
			input.addEventListener('input', e => {
				if (!e.target.value) {
					parentInput.style.borderColor = 'red' // e.target.parentNode - изначально искал так
				} else {
					parentInput.style.borderColor = 'green'
				}
			})
		})
	}
}

export default new ValidationService()