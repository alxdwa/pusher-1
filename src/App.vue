<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: rgba(245, 245, 245, 0.651);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  color: rgb(46, 47, 56);
}

h1, h2 {
  margin: 1em 0;
  color: rgb(16, 5, 77);
}
</style>
