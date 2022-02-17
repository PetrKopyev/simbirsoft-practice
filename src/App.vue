<template>
  <div id="app">
    <sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },

};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  height: 100%;
}
</style>
