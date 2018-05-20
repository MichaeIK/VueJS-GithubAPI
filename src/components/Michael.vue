<template>
	<div>
		<div>
			<h1>{{ msg }}</h1>
			<p v-if="this.fetching">Loading ...</p>
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
			fetching: false,
			msg: 'Test github API',
			usersList: {},
			userData: {},
			myVariables: { login: "sdf" }
		}
	},
	apollo: {
		// gql () {
		// 	return {
			userData: {
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
				result({data, loading}) {
					console.log(data, loading)
					if (!loading) { 
						this.fetching = false
						this.$set(this.usersList, data.user.id, data.user)
					 } else this.fetching = true
					// return this.usersList[data.user.id] = data.user;
				}
				// update: result => this.$set(this.usersList, result.user.id, result.user),
			}
		// }
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

	// apollo: {
	// 	user: {
	// 		query: gql`query readUser($login: String!) {
    //  			user(login: $login) {
	// 				id
	// 				avatarUrl
	// 				login
	// 				followers {
	// 					totalCount
	// 				}
	// 				following {
	// 					totalCount
	// 				}
	// 				repositories {
	// 					totalCount
	// 				}
	// 			}
	// 		}`
	// 	},
	// 	variables() {
    //     	return {
    //       		login: this.login,
    //     	}
    //   	},
    //   	result({data, loading}) {
    //     	if (!loading) {
    //       		this.usersList.push(data.user);
    //     	}
    //   	}
    // },
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
