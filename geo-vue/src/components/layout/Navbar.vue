<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'GMap' }" class="brand-logo left"
          >Geo Vue</router-link
        >
        <ul class="right">
          <li><router-link :to="{ name: 'Signup' }">Signup</router-link></li>
          <li><router-link :to="{ name: 'Login' }">Login</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
// Further FB imports needed for older FB verison
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "Navbar",
};
</script>

<style></style>
