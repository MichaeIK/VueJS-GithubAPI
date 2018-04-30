import Vue from 'vue'

export const mutations = {
	addGithubUser (state, userData ) {
		userData.id && Vue.set(state.listOfGithubUsers, userData.id, userData)
	},
	deleteGithubUser (state, id) {
		Vue.delete(state.listOfGithubUsers, id)
	}
}
