import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";

import Register from "./components/Register";
import Login from "./components/Login";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
	{ path: "/register", component: Register },
	{ path: "/login", component: Login },
];

const router = new VueRouter({
	routes,
	mode: "history", // remove # from url
});

new Vue({
	vuetify,
	router,
	render: (h) => h(App),
}).$mount("#app");
