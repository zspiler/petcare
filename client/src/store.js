import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {},
		status: null,
	},
	mutations: {
		authLoading(state) {
			state.status = "loading";
		},
		authSuccess(state, data) {
			state.status = "success";
			state.user = {
				token: data.token,
				email: data.email,
				id: data.id,
			};
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
			console.log("getting user...");
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
			commit("authLoading");
			axios
				.post("/api/auth/login", {
					email: payload.email,
					password: payload.password,
				})
				.then((res) => {
					localStorage.setItem("token", res.data.token);
					commit("authSuccess", res.data);
				})
				.catch((err) => {
					commit("authError");
					console.log("Caught error: ");
					console.log(err.response?.data?.message || err.message);
					localStorage.removeItem("token");
				});
		},
		logout({ commit }) {
			commit("logout");
			localStorage.removeItem("token");
		},
		register({ commit }, payload) {
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
				})
				.catch((err) => {
					commit("authError");
					console.log("Caught error: ");
					console.log(err.response?.data?.message || err.message);
					localStorage.removeItem("token");
				});
		},
	},
	modules: {},
	getters: {
		user: (state) => state.user,
		authStatus: (state) => state.status,
	},
});
