import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProtectedExample from "./components/ProtectedExample";
import About from "./components/About";
import UserPage from "./components/userPage/UserPage";

Vue.use(VueRouter);

const routes = [
	{ path: "/", component: Home },
	{ path: "/register", component: Register },
	{ path: "/login", component: Login },
	{ path: "/about", component: About },
	{ 
		path: "/user", 
		component: UserPage,
		meta: {
			protected: true,
		} 
	},
	// exaple of route that requires authentication
	{
		path: "/protected-example",
		component: ProtectedExample,
		meta: {
			protected: true,
		},
	},
	{ path: "*", component: NotFound },
];

const router = new VueRouter({
	routes,
	mode: "history", // remove # from url
});

// Protected routes
router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.protected)) {
		if (store.getters.user.token) {
			next();
			return;
		}
		next("/login");
	} else {
		next();
	}
});

export default router;
