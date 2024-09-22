// моё решение по стилям 
	#applyModuleStyles(parentElement, styles = {}) {
	
		console.log(typeof parentElement)
		let children = parentElement.getElementsByTagName('*')
		let parentBaseStyle = parentElement.classList.value.split(' ')

		for (let style of parentBaseStyle) {
			let replaceStyle = styles[style]
			if (replaceStyle) {
				parentElement.classList.remove(style)
				parentElement.classList.add(replaceStyle)
			}
		}
		console.log(parentElement)
		parentElement.classList.add("replace")
		for (let child of children) {
			let replaceStyles = child.classList.value.split(' ')
			for (let style of replaceStyles) {
				let replaceStyle = styles[style]
				if (replaceStyle) {
					child.classList.remove(style)
					child.classList.add(replaceStyle)
				}
			}
		}
	}