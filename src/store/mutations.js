import Vue from 'vue'

export const mutations = {
	fetchingStatus (state, status) {
		Vue.set(state, 'fetching', status)
		status && Vue.set(state, 'error', '')
	},
	addGithubUser (state, userData) {
		userData.id ? Vue.set(state.listOfGithubUsers, userData.id, userData) : Vue.set(state, 'error', 'Check username')
	},
	deleteGithubUser (state, id) {
		Vue.delete(state.listOfGithubUsers, id)
	}
}
