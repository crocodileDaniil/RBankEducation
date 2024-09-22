import { BaseScreen } from "@/core/component/base-screen.component";


export class AboutUs extends BaseScreen {
	constructor() {
		super({title: 'About Us'})
	}

  render() {
    let aboutUs = document.createElement('div')
    aboutUs.innerHTML = '<h1> About Us </h1>'
    return aboutUs
  }
}