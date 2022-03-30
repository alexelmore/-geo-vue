<template>
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
// Further FB imports needed for older FB verison
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
    };
  },
  methods: {
    // Function to log user in on form submission
    login() {
      // Check if user filled out all form fields
      if (this.email && this.password) {
        // Set feedback property back to its default of null
        this.feedback = null;
        // Make call to FB to try to log user in
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            // After user has successfully logged in, route them to the home page
            this.$router.push({ name: "GMap" });
          })
          .catch((err) => {
            this.feedback = err.message;
          });
      } else {
        this.feedback = "Please fill out all of the form fields";
      }
    },
  },
};
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}
.login h2 {
  font-size: 2.4em;
}
.login .field {
  margin-bottom: 16px;
}
</style>
