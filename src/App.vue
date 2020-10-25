<template>
  <div id="app">
    <img alt="Vue logo"
      src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div v-loading="true" 
      
      element-loading-text="拼命加载中"
      loading-spinner="v-my-loading-spinner"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width:500px;height:400px">500000</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
