import * as api from '../api'

export const getGithubUser = ({ commit }, { githubName }) => {
	commit('fetchingStatus', true);
	api.fetchData(githubName, userData => {
		commit('addGithubUser', userData);
		commit('fetchingStatus', false);
	})
}

export const deleteGithubUser = ({ commit }, { id }) => {
	commit('deleteGithubUser', id);
}
