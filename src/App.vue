<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Map />
    <notifications group="torreService" />
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>
/*Reset css */
body{
  box-sizing:border-box;
  padding: 0;
  margin: 0;
}
</style>
