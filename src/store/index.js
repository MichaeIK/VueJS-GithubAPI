import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
	listOfGithubUsers: {},
	fetching: false,
	error: ''
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})
