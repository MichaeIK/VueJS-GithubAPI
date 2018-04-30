import * as api from '../api'

export const getGithubUser = ({ commit }, { githubName }) => {
	api.fetchData(githubName, userData => {
		commit('addGithubUser', userData);
	})
}

export const deleteGithubUser = ({ commit }, { id }) => {
	commit('deleteGithubUser', id);
}
