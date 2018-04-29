<template>
	<div>
		<div class="hello">
			<h1>{{ msg }}</h1>
			<p v-if="loading">Loading ...</p>
			<p class="error" v-if="error">{{error}}</p>
			<p>Exmple name: MichaeIK</p>
			<input v-model="githubId" v-on:keyup.enter="fetchData" placeholder="Input github user name"/>
			<button v-on:click="fetchData">Look for github user</button>
		</div>
		<ul class="githubUserListWrap">
			<li class="githubUser" v-for="{login, avatar_url, public_repos, followers, following, id} in listGithubUsers" :key="id">
				<span class="githubUserDeleteButton" v-on:click="deleteGithubUserFromList(id)">X</span>
				<span>{{login}}</span>
				<img class="githubUserAva" :src="avatar_url" />
				<ul class="githubUseerStats">
					<li><span>Repos:</span> {{ public_repos }}</li>
					<li><span>Followers:</span> {{ followers }}</li>
					<li><span>Following:</span> {{ following }}</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Micheal',
	data () {
		return {
			loading: false,
			error: null,
			githubId: null,
			listGithubUsers: [],
			msg: 'Test github API'
		}
	},
	updated() {
		console.log('update code here')
	},
	methods: {
		fetchData(num) {
			this.error = null;
			this.loading = true;
			if(this.githubId) {
				fetch(`https://api.github.com/users/${this.githubId}`, { method: 'GET', headers: { "Content-Type": "application/json" }})
					.then(res => res.json())
					.then(res => {
						this.loading = false;
						let checkGithubUser = false;
						if (res.login && this.listGithubUsers.length) {
							this.listGithubUsers.forEach((githubUser) => {
								if (githubUser.id !== res.id) {
									checkGithubUser = true;
								}
							})
						} else {
							res.login ? checkGithubUser = true : null;
						}
						checkGithubUser ? this.listGithubUsers.push(res) : this.error = "Check user name";
					})
			}
			this.githubId = "";
		},
		deleteGithubUserFromList(id) {
			let indexOfElement = this.listGithubUsers.findIndex(githubUser => githubUser.id === id);
			if (indexOfElement > -1) this.listGithubUsers.splice(indexOfElement, 1);
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
