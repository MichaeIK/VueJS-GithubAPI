<template>
	<div>
		<div>
			<h1>{{ msg }}</h1>
			<p v-if="this.$store.state.fetching">Loading ...</p>
			<p class="error" v-if="this.$store.state.error">{{this.$store.state.error}}</p>
			<p>Exmple name: MichaeIK</p>
			<input v-model="githubName" v-on:keyup.enter="" placeholder="Input github user name"/>
			<button v-on:click="start">Look for github user</button>
		</div>
		<ul class="githubUserListWrap">
			<UserCard
				v-for="item in this.usersList"
				:key="item.id"
				:item="item"
				:deleteGithubUserFromList="deleteGithubUserFromList">
			</UserCard>
		</ul>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gql from 'graphql-tag'
import UserCard from './UserCard'

export default {
	name: 'Micheal',
	components: { UserCard },
	data () {
		return {
			githubName: null,
			msg: 'Test github API',
			usersList: {},
			myVariables: {login: "sdf"}
		}
	},
	apollo: {
		gql () {
			return {
				query: gql`query readUser($login: String!) {
					user(login: $login) {
						id
						avatarUrl
						login
						followers {
							totalCount
						}
						following {
							totalCount
						}
						repositories {
							totalCount
						}
					}
				}`,
				variables() {
					return this.myVariables
				},
				update: result => this.$set(this.usersList, result.user.id, result.user),
			}
		}
	},
	updated() {
		// some actions on update
	},
	methods:{
		start () {
			this.myVariables = {
				login: this.githubName
			}
		},
		deleteGithubUserFromList(id){
			this.usersList[id]={}
			
		}
	}
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
