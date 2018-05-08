// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'
import App from './App'
import store from './store'
import router from './router'

const httpLink = new HttpLink({
	// You should use an absolute URL here
	uri: 'https://api.github.com/graphql'
})

// Auth via header
const authLink = setContext((_, { headers }) => {

  // get the authentication token from github
  const token = 'dabb0abbe23956bd9fbc607f148ec9dedced1e73'
  
  // return the headers to the context so httpLink can read them
  return {
		headers: {
			...headers,
			'authorization': `token ${token}`
		}
	}
})

// Create the apollo client
const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

Vue.config.productionTip = false

const apolloProvider = new VueApollo({
	defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	provide: apolloProvider.provide(),
	components: { App },
	template: '<App/>'
})
