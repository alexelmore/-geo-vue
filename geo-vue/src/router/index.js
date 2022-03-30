import Vue from "vue";
import Router from "vue-router";
import GMap from "@/components/home/GMap";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
// Further FB imports needed for older FB verison
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "GMap",
      component: GMap,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});

// Route guard for home page
router.beforeEach((to, from, next) => {
  // Check to see if route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // Check if user is authenticated
    let user = firebase.auth().currentUser;
    if (user) {
      // User is logged in, let them proceed to the GMap component page
      next();
    } else {
      // User is not logged in or signed up, redirect them to the login page
    }
  } else {
    next();
  }
});

export default router;
