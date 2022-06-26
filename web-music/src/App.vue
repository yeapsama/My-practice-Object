<template>
  <div id="app">
    <Header/>

    <Main/>

    <Footer/>
    
  </div>
</template>

<script>
import Header from './mainLayout/Header.vue'
import Main from './mainLayout/Main.vue'
import Footer from './mainLayout/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Main,
    Footer
  }
}
</script>

<style scoped>
@import "./assets/css/base.css";
#app {
  width: 100%;
	height: 100vh;
	position: fixed;
}
</style>
