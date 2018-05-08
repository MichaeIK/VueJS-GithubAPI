<template>
	<div class="githubUserCard">
		<span class="githubUserDeleteButton" v-on:click="deleteGithubUserFromList(item.id)">X</span>
		<span>{{item.login}}</span>
		<img class="githubUserAva" :src="item.avatarUrl" />
		<ul class="githubUseerStats">
			<li><span>Repos:</span> {{ item.repositories.totalCount }}</li>
			<li><span>Followers:</span> {{ item.followers.totalCount }}</li>
			<li><span>Following:</span> {{ item.following.totalCount }}</li>
		</ul>
	</div>
</template>
<script>
import gql from "graphql-tag";

export default {
  name: "GithubUserCard",
  props: {
    item: Object,
    deleteGithubUserFromList: Function
  },
  data() {
    return {
	  someTestValue: true,
	  myVariables: {login: "sdf"}
    };
  },
  apollo: {
    gql() {
      return {
        query: gql`
          query readUser($login: String!) {
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
          }
        `,
        variables() {
          return this.myVariables;
        },
        // update: result => this.$set(this.usersList, result.user.id, result.user)
      };
    }
  }
};
</script>
<style scoped>
.githubUserCard {
  width: 130px;
  border: 1px solid black;
  margin: 0 15px;
  position: relative;
}
.githubUserDeleteButton {
  position: absolute;
  right: 5px;
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


