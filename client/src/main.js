import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import router from "./router";
import store from "./store";

import "@/assets/styles.css"; // global styles

// configure axios
axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers.common["Authorization"] =
	"Bearer " + localStorage.getItem("token");

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
	vuetify,
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
