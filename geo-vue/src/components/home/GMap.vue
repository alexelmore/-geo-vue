<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import db from "@/firebase/init";
// Further FB imports needed for older FB verison
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "GMap",
  data() {
    return {
      lat: 0,
      lng: 0,
    };
  },
  methods: {
    renderMap(lat, lng) {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat,
          lng,
        },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      });
    },
  },
  mounted() {
    // get current user
    let user = firebase.auth().currentUser;

    // Request geo location from user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        this.renderMap(pos.coords.latitude, pos.coords.longitude);
      });
    }
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
