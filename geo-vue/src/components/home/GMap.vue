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
      lat: 39,
      lng: -91,
    };
  },
  methods: {
    renderMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      });
      db.collection("users")
        .get()
        .then((users) => {
          users.docs.forEach((doc) => {
            let data = doc.data();
            if (data.geolocation) {
              let marker = new google.maps.Marker({
                position: {
                  lat: data.geolocation.lat,
                  lng: data.geolocation.lng,
                },
                map,
              });
              // // add click event to marker
              marker.addListener("click", () => {
                console.log(doc.id);
                this.$router.push({
                  name: "ViewProfile",
                  params: { id: doc.id },
                });
              });
            }
          });
        });
    },
  },
  mounted() {
    // get current user
    let user = firebase.auth().currentUser;

    // Request geo location from the user
    if (navigator.geolocation) {
      // Get user's current geo position and then update lat and lng data values with user's coords
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          // Find the user record using the current logged in user's id and then update geo coords with it
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude,
                    },
                  });
              });
            })
            .then(() => {
              this.renderMap();
            });
        },
        (err) => {
          console.log(err);
          this.renderMap();
        },
        { maximumAge: 60000, timeout: 1000 }
      );
    } else {
      // Position on map using default lat and lng values
      this.renderMap();
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
