<template>
  <div id="app">
    <Header></Header>

    <router-view></router-view>

    <Footer v-show="$route.meta.isshow"></Footer>
  </div>
</template>

<script>

import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //请求TypeNav中的数据，放在这里可以优化性能只请求一次
        this.$store.dispatch("categroyList");
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
