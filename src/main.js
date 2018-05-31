// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import VueApollo from 'vue-apollo'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import App from './App'
import store from './store'
import router from './router'

const httpLink = new HttpLink({
	// You should use an absolute URL here
	uri: 'https://apolloclient.herokuapp.com/graphql'
})

// Auth via header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from github
	const token = 'f9f1d2ac79dbeca63a269c204447d66c32ff76d9'

	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: `token ${token}`
		}
	}
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
	uri: 'ws://localhost:5000/subscriptions',
	options: {
		reconnect: true
	}
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
	// split based on operation type
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	authLink.concat(httpLink)
)

// Create the apollo client
const apolloClient = new ApolloClient({
	link,
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
