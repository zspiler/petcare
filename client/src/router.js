import Vue from "vue";
import VueRouter from "vue-router";

// import store from "./store";

import Home from "./components/homePage/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import ProtectedExample from "./components/ProtectedExample";
import About from "./components/About";
import UserPage from "./components/userPage/UserPage";

import postJob from "./components/postJob/AdType";
import PostJob1 from "./components/postJob/postJob1";
import PostJob2 from "./components/postJob/postJob2";
import PostJob3 from "./components/postJob/postJob3";
import postJobService from "./components/postJob/postJobService";

Vue.use(VueRouter);

const routes = [
	{ path: "/", component: Home },
	{ path: "/register", component: Register },
	{ path: "/login", component: Login },
	{ path: "/about", component: About },
	{ 
		path: "/postJob", 
		component: postJob,
		meta: {
			protected: true,
		},
	},
	{ 
		path: "/postJob/service", 
		component: postJobService,
		meta: {
			protected: true,
		},
	},
	{ 
		path: "/user", 
		component: UserPage,
		meta: {
			protected: true,
		},
	},
	{ 
		path: "/postJob/animal", 
		component: PostJob1,
		meta:{
			protected: true
		}
	},
	{ 
		path: "/postJob/animal/details", 
		component: PostJob2,
		meta:{
			protected: true
		}
	},
	{ 
		path: "/postJob/animal/complete", 
		component: PostJob3,
		meta:{
			protected: true
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
		// TODO: non-stupid fix?
		if (localStorage.getItem("token") !== null) {
			next();
			return;
		}
		// if (store.getters.user.token) {
		// 	console.log("next");
		// 	next();
		// 	return;
		// }
		next("/login");
	} else {
		next();
	}
});

export default router;
