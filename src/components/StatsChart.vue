<template>
    <h1>hello world</h1>
</template>
<script>

export default {
    name: "StatsChart", 
    props: {
        statsList: Array,
    },
  data () {
      return {
          mocData: [{data: "8777580544", stats: "Free memory"},
          {data: "15.06787109375", stats: "Last cpu load"},
          {data: "15.49267578125", stats: "Load for last 5 minutes"},
          {data: "15.75439453125", stats: "Load for last 15 minutes"},
          {data: "8", stats: "Total cpus"}
          ]

      }
  },
}
</script>
<style scoped>

</style>


