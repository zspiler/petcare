<template>
	<v-app-bar app color="white">
		<router-link to="/" style="text-decoration: none; color: inherit">
			<div class="d-flex align-center">
				<v-img
					alt="Logo"
					class="shrink mr-2"
					contain
					src="../assets/petcareLogo.png"
					transition="scale-transition"
					width="200"
				/>
			</div>
		</router-link>
		<v-spacer></v-spacer>
		<router-link
				to="/jobs"
				style="text-decoration: none; color: inherit"
			>
			<v-btn class="mr-5" color="primary" outlined @click="logout">Find Job</v-btn>
		</router-link>
		<router-link
				to="/about"
				style="text-decoration: none; color: inherit"
			>
			<v-btn class="mr-5" color="primary" outlined @click="logout">About us</v-btn>
		</router-link>
		
		<v-spacer></v-spacer>
		<div v-if="!user.token">
			<router-link to="/login" style="text-decoration: none; color: inherit">
				<v-btn class="mr-5" color="primary" outlined>Login</v-btn>
			</router-link>
			<router-link
				to="/register"
				style="text-decoration: none; color: inherit"
			>
				<v-btn class="mr-5" color="primary" outlined>Register</v-btn>
			</router-link>
		</div>
		<div v-if="user.token">
			<router-link
					to="/postJob"
					style="text-decoration: none; color: inherit"
				>
				<v-btn class="mr-5" color="primary" outlined @click="logout">Post Job</v-btn>
			</router-link>
			<div style="display: inline">
				{{ user.email }}
			</div>
			<v-btn class="mr-5" @click="logout">Logout</v-btn>
		</div>
	</v-app-bar>
</template>

<script>
export default {
	name: "NavBar",
	computed: {
		user() {
			return this.$store.getters.user;
		},
		authStatus() {
			return this.$store.getters.authStatus;
		},
	},
	methods: {
		logout() {
			this.$store
				.dispatch("logout")
				.then(() => {
					this.$router.push("/").catch(() => {});
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style>

</style>
