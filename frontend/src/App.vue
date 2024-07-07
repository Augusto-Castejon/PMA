<template>
  <div id="app">
    <div class="sidebar">
      <UserManager></UserManager>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import UserManager from './components/userManager.vue';

export default {
  name: 'App',
  components: {
    UserManager
  }
}
</script>

<style>
#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.main-content {
  flex: 1;
}
</style>
