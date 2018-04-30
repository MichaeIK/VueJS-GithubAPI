<template>
    <div class="githubUserCard">
        <span class="githubUserDeleteButton" v-on:click="deleteGithubUserFromList(item.id)">X</span>
        <span>{{item.login}}</span>
        <img class="githubUserAva" :src="item.avatar_url" />
        <ul class="githubUseerStats">
            <li><span>Repos:</span> {{ item.public_repos }}</li>
            <li><span>Followers:</span> {{ item.followers }}</li>
            <li><span>Following:</span> {{ item.following }}</li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'GithubUserCard',
  props: {
    item: Object,
    deleteGithubUserFromList: Function
  }
}
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


