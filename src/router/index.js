import Vue from 'vue'
import Router from 'vue-router'
import Michael from '@/components/Michael'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Michael',
			component: Michael
		}
	]
})
