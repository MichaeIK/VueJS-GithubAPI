<template>
  <div id="app">
	<img class="vueLogo" src="./assets/logo.png">
	<router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.vueLogo {
  width: 150px;
  height: 150px;
}
</style>
