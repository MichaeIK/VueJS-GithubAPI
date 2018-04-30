<template>
	<div>
		<div>
			<h1>{{ msg }}</h1>
			<p v-if="this.$store.state.fetching">Loading ...</p>
			<p class="error" v-if="this.$store.state.error">{{this.$store.state.error}}</p>
			<p>Exmple name: MichaeIK</p>
			<input v-model="githubName" v-on:keyup.enter="addUser" placeholder="Input github user name"/>
			<button v-on:click="addUser">Look for github user</button>
		</div>
		<ul class="githubUserListWrap">
			<UserCard
				v-for="item in this.$store.state.listOfGithubUsers"
				:key="item.id"
				:item="item"
				:deleteGithubUserFromList="deleteGithubUserFromList">
			</UserCard>
		</ul>
	</div>
</template>

<script>
import UserCard from './UserCard';
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'Micheal',
	components: { UserCard },
	data () {
		return {
			githubName: null,
			msg: 'Test github API',
		}
	},
	updated() {
		// some actions on update
	},
	methods: 
		mapActions({
			addUser(dispatch){
				const { githubName } = this;
				dispatch('getGithubUser', { githubName })
				this.githubName = "";
			},
			deleteGithubUserFromList(dispatch, id) {
				dispatch('deleteGithubUser', { id })
			}
		}),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.error {
	color: red;
}
.githubUserListWrap {
	list-style: none;
	display: flex;
}
</style>
