<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field center">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" />
        </div>
        <div class="field">
          <label for="name">Alias</label>
          <input id="name" type="text" v-model="alias" />
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase/compat/app";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
    };
  },
  methods: {
    signup() {
      if (this.email && this.password && this.alias) {
        this.feedback = null;
        console.log({
          email: this.email,
          password: this.password,
          alias: this.alias,
        });
      } else {
        this.feedback = "Please fill out all of the form fields";
      }
    },
  },
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>
