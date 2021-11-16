import Vue from "vue";
import VueRouter from "vue-router";

import Register from "./components/Register";
import Login from "./components/Login";

Vue.use(VueRouter);

const routes = [
	{ path: "/register", component: Register },
	{ path: "/login", component: Login },
];

const router = new VueRouter({
	routes,
	mode: "history", // remove # from url
});

export default router;
