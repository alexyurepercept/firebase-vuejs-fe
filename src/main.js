import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import store from "./store";
import router from "./routes/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    libraries: "places,directions"
  },
  installComponents: true
});
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_API_KEY,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let authPromise;
firebase.auth().onAuthStateChanged(user => {
  authPromise = store.dispatch("fetchUser", user);
  return authPromise;
});

router.beforeEach(async (to, from, next) => {
  // this is to make sure fetch user is completed before route to any page
  if (authPromise) {
    await authPromise;
  }
  if (!store.state.user.loggedIn) {
    if (to.name === "Dashboard") {
      return next({ name: "Login" });
    } else if (to.name === "Home") {
      return next({ name: "Login" });
    }
  } else {
    if (to.name === "Home") {
      return next({ name: "Dashboard" });
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
