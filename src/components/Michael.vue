<template>
	<div>
		<div class="hello">
			<h1>{{ msg }}</h1>
			<p v-if="loading">Loading ...</p>
			<p class="error" v-if="error">{{error}}</p>
			<p>Exmple name: MichaeIK</p>
			<input v-model="githubName" v-on:keyup.enter="addUser" placeholder="Input github user name"/>
			<button v-on:click="addUser">Look for github user</button>
		</div>
		<ul class="githubUserListWrap">
			<li class="githubUser" v-for="item in this.$store.state.listOfGithubUsers" :key="item.id">
				<span class="githubUserDeleteButton" v-on:click="deleteGithubUserFromList(item.id)">X</span>
				<span>{{item.login}}</span>
				<img class="githubUserAva" :src="item.avatar_url" />
				<ul class="githubUseerStats">
					<li><span>Repos:</span> {{ item.public_repos }}</li>
					<li><span>Followers:</span> {{ item.followers }}</li>
					<li><span>Following:</span> {{ item.following }}</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'Micheal',
	data () {
		return {
			loading: false,
			error: null,
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
.githubUser {
	width: 130px;
	border: 1px solid black;
	margin: 0 15px;
	position: relative;
}
.githubUserDeleteButton {
	position: absolute;
	right: 0;
	color: red;
	cursor: pointer;

}
.githubUserAva {
	width: 100px;
	border-radius: 50%;
}
.githubUseerStats {
	padding: 0;
	list-style: none;
}
.githubUseerStats span {
	font-weight: bold;
}
</style>
