<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import $ from 'jquery'
import bs from 'bootstrap'
console.log('external')
window.alert($('img').src)

export default {
  name: 'app',
  components: {
    Hello
  },
  ready () {
    console.log(1)
    // window.alert($('img').src)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
