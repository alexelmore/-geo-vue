<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'GMap' }" class="brand-logo left">Geo Vue</router-link>
        <ul class="right">
          <li>Signup</li>
          <li>Login</li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
export default {
name:'Navbar'
}
</script>

<style>

</style>