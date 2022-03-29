<template>
  <div class="map">
    <div class="google-map" id="map">home</div>
   
  </div>
</template>

<script>

import db from '@/firebase/init'
export default {
  name: 'GMap',
  data () {
    return {}
  }
}
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>