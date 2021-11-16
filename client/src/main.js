import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import axios from "axios";

import router from "./router";
import store from "./store";

// configure axios
axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers.common["Authorization"] =
	"Bearer " + localStorage.getItem("token");

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
	vuetify,
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
