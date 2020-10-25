<template>
  <div id="app">
    <img alt="Vue logo"
      src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div v-loading="loading"
      element-loading-text="拼命加载中"
      lloading-spinner="v-my-loading-spinner"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width:500px;height:400px">500000</div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Loading from "@/plugs/loading";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    
  },
  mounted() {
    // this.$loading.show();
      // console.log(this.$loading)
    // Loading.service();
    let loadingInstance =this.$loading({height:100,width:100})
    setTimeout(() => {
      loadingInstance.close();
    }, 5000);
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
