import { default as _axios } from "axios";

const axios = _axios.create({
	baseURL: "http://localhost:5000/",
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	},
});

axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem("token");
	config.headers["Authorization"] = `Bearer ${token}`;
	return config;
});

export default axios;
