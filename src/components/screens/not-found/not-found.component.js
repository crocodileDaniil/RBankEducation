import { BaseScreen } from "@/core/component/base-screen.component"



export class NotFound extends BaseScreen {
	constructor() {
		super({title: 'Not found page'})
	}

  render() {
    return '<h1> Not found page </h1>'
  }
}
