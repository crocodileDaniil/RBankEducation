import { Layout } from '@/components/layout/layout.component';
import { NotFound } from '@/components/screens/not-found/not-found.component';
import { $R } from '../rquery/rquery.lib';



import { ROUTES } from './routes.data';


export class Router {
	#routes
	#currentRoute
  #layout = null

	constructor() {
		this.#routes = ROUTES
		this.#currentRoute = null
    this.#handleLink()
    this.#handleRouteChange()
    window.addEventListener('popstate', () => {
      this.#handleRouteChange()
    })
	}
  /**
   * позволяет получить текущий путь
   * @returns {string} - текущий путь
    */
	getCurrentPath() {
		return window.location.pathname // url в браузере
	}

  #handleLink() {
    document.addEventListener('click',e => {
      const target = e.target.closest('a')
      if (target) {
        e.preventDefault()
        this.navigate(target.href)
      }
       

    })
  }

  navigate(path) {
    if(path !== this.getCurrentPath()) {
      window.history.pushState({}, '', path)
      // console.log()
      this.#handleRouteChange()
    }
  }

	#handleRouteChange() {
		const path = this.getCurrentPath() || '/'

		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = {
				component: NotFound
			}
		}

		this.#currentRoute = route
		this.#render()
	}

	#render() {
	
		const component = new this.#currentRoute.component()
		
    if(!this.#layout) {
      this.#layout = new Layout({
        router: this,
        children: component.render()
      }).render()

      $R('#app').append(this.#layout)
    }
    $R('#content').replacContent(component.render())
		// document.querySelector('#app').querySelector('main').innerHTML = component.render() // для not found лучше переделать
	}
}