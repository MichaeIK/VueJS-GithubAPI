<template>
	<div>
		<p v-if="this.fetching">Loading ...</p>
		<h1>{{ statsList[0]}}</h1>
		<h1>{{ statsList[1]}}</h1>
		<h1>{{ statsList[2]}}</h1>
		<h1>myVariables {{ myVariables }}</h1>
		<!-- <div>
			
			<p class="error" v-if="this.$store.state.error">{{this.$store.state.error}}</p>
			<p>Exmple name: MichaeIK</p>
			<input v-model="githubName" v-on:keyup.enter="" placeholder="Input github user name"/>
			<button v-on:click="start">Look for github user</button>
		</div> -->
		<!-- <ul class="githubUserListWrap">
			<UserCard
				v-for="item in this.usersList"
				:key="item.id"
				:item="item"
				:deleteGithubUserFromList="deleteGithubUserFromList">
			</UserCard>
		</ul> -->
		<button v-on:click="start">Update data</button>
		<StatsChart :statsList="this.statsList" >
		</StatsChart>
		<div class="chartsWrap">
			<CommitChart v-if="this.statsList.length > 0" :statsList="this.statsList" :statsTime="this.statsTime">
			</CommitChart>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import gql from 'graphql-tag'
import UserCard from './UserCard'
import StatsChart from './StatsChart'
import CommitChart from './CommitChart'

export default {
	name: 'Micheal',
	components: { UserCard, StatsChart, CommitChart },
	data () {
		return {
			githubName: null,
			fetching: false,
			msg: 'Test github API',
			statsList: [],
			statsTime: [0, 5, 15],
			serverData: {},
			myVariables: 0
		}
	},
	apollo: {
		serverData: {
			query: gql`query {
				systemStats {
					data
					stats
					aditionalInfo
				}
			}`,
			variables() {
				return this.myVariables
			},
			result({data, loading}) {
				console.log(data, loading)
				if (!loading) { 
					this.fetching = false
					this.convertData(data.systemStats)			
				} else this.fetching = true
			}
		}
	},
	updated() {
		// some actions on update
	},
	methods:{
		start () {
			this.myVariables++;
			// console.log(this.$apollo.query)
		},
		convertData(data) {
			data.map((item, index) => {
				if (item.stats === "Last cpu load") this.statsList.push(Math.round(item.data * 10))
				if (item.stats === "Load for last 5 minutes") this.statsList.push(Math.round(item.data * 10))
				if (item.stats === "Load for last 15 minutes") this.statsList.push(Math.round(item.data * 10))
			})
			this.statsList.reverse()
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
.chartsWrap {
	width: 300px;
	height: 300px;
}
</style>
