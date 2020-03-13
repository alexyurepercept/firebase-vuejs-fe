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
var firebaseConfig = {}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.user.loggedIn) {
    if (to.name === "Dashboard") {
      return next({ name: "Login" });
    }
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
