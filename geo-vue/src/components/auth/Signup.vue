<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center deep-purple-text">Signup</h2>

      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div class="field">
        <label for="name">Screen Name</label>
        <input id="name" type="text" v-model="alias" />
        <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      </div>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
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
    // Function that handles signing the user up, on form submission
    signup() {
      // Check if user filled out all form fields
      if (this.email && this.password && this.alias) {
        // Set feedback property back to its default of null
        this.feedback = null;
        // Create slug object
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        // Create a ref that is of our FB DB collection, "users", passing it our slug as the doc id
        let ref = db.collection("users").doc(this.slug);
        // Reach out to our FB DB with our ref
        ref.get().then((doc) => {
          // Check if doc exists, if it does, tell user that the screen name (alias) already exists
          if (doc.exists) {
            this.feedback =
              "This screen name already exists. Please pick a different screen name.";
            this.alias = null;
          } else {
            // this alias does not yet exists in the db
            // Make a call to FB to store the user
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((user) => {
                ref.set({
                  alias: this.alias,
                  geolocation: null,
                  user_id: user.user.uid,
                });
              })
              .then(() => {
                // After successfully signing the user up, redirect them to the home page
                this.$router.push({ name: "GMap" });
              })
              .catch((err) => {
                this.feedback = err.message;
              });
          }
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
