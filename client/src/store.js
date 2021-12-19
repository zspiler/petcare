import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {},
		status: null,
		serverBaseUrl: "http://localhost:5000/",
	},
	mutations: {
		authLoading(state) {
			state.status = "loading";
		},
		authSuccess(state, data) {
			state.status = "success";
			state.user = { ...data.user, token: data.token };
		},
		authError(state) {
			state.status = "error";
		},
		logout(state) {
			state.user = {};
			state.status = "";
		},
	},
	actions: {
		getUser({ commit }) {
			axios
				.get("/api/auth/user")
				.then((res) => {
					// get renewed token
					commit("authSuccess", res.data);
				})
				.catch((err) => {
					commit("authError");
					console.log("Caught error: ");
					console.log(err.response?.data?.message || err.message);
					localStorage.removeItem("token");
				});
		},
		login({ commit }, payload) {
			// returns promise, so that you can catch error at 'dispatch'
			return new Promise((resolve, reject) => {
				commit("authLoading");
				axios
					.post("/api/auth/login", {
						email: payload.email,
						password: payload.password,
					})
					.then((res) => {
						localStorage.setItem("token", res.data.token);
						commit("authSuccess", res.data);
						resolve(res);
					})
					.catch((err) => {
						commit("authError");
						console.log("Caught error: ");
						console.log(err.response?.data?.message || err.message);
						reject(err);
					});
			});
		},
		logout({ commit }) {
			commit("logout");
			localStorage.removeItem("token");
		},
		register({ commit }, payload) {
			return new Promise((resolve, reject) => {
				commit("authLoading");
				axios
					.post("/api/auth/register", payload, {
						headers: {
							"Content-Type": `multipart/form-data; boundary=${payload._boundary}`,
						},
					})
					.then((res) => {
						localStorage.setItem("token", res.data.token);
						commit("authSuccess", res.data);
						resolve(res);
					})
					.catch((err) => {
						commit("authError");
						console.log("Caught error: ");
						console.log(err.response?.data?.message || err.message);
						reject(err);
					});
			});
		},
	},
	modules: {},
	getters: {
		user: (state) => state.user,
		authStatus: (state) => state.status,
		serverBaseUrl: (state) => state.serverBaseUrl,
	},
});
