<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">
        {{ profile.alias }}'s Profile Page
      </h2>
      <div v-if="comments.length">
        <ul class="comments collection">
          <li v-for="(comment, index) in comments" :key="index">
            <div class="deep-purple-text">
              {{ comment.from }}
            </div>
            <div class="grey-text">{{ comment.content }}</div>
          </li>
        </ul>
      </div>

      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add A Comment </label>
          <input type="text" name="comment" v-model="newComment" />
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
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
    return {
      profile: null,
      newComment: null,
      feedback: null,
      comments: [],
      user: null,
    };
  },
  created() {
    // Firestore db reference to the current user collection
    let ref = db.collection("users");

    // Get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          (this.user = doc.data()), (this.user.id = doc.id);
        });
      });
    // Profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then((user) => {
        this.profile = user.data();
      });
    // Comments data
    let comment = db
      .collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content,
            });
          }
        });
      });
  },
  methods: {
    // Function that handles adding a new comment on form submission
    addComment() {
      // Check if there is a value for new comment
      if (this.newComment) {
        // Set feedback back to null
        this.feedback = null;
        // Add new comment to the FB db
        db.collection("comments")
          .add({
            to: this.$route.params.id,
            from: this.user.id,
            content: this.newComment,
            time: Date.now(),
          })
          .then(() => {
            this.newComment = null;
          });
      } else {
        this.feedback = "The comment field cannot be left blank";
      }
    },
  },
};
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
