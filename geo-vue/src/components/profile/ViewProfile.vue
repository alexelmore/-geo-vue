<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}</h2>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
// Further FB imports needed for older FB verison
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  name: "ViewProfile",
  data() {
    return { profile: null };
  },
  created() {
    let ref = db.collection("users");
    ref
      .doc(this.$route.params.id)
      .get()
      .then((user) => {
        this.profile = user.data();
      });
  },
};
</script>

<style></style>
