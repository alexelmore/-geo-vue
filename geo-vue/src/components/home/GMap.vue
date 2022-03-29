<template>
  <div class="map">
    <div class="google-map" id="map">home</div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase/compat/app";
export default {
  name: "GMap",
  data() {
    return {
      lat: 39.099789,
      lng: -94.57856,
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: this.lat,
          lng: this.lng,
        },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      });
    },
  },
  mounted() {
    this.renderMap();
  },
};
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
