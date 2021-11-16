<template>
	<v-app-bar app color="blue-grey darken-1" dark>
		<router-link to="/" style="text-decoration: none; color: inherit">
			<div class="d-flex align-center">
				<v-img
					alt="Logo"
					class="shrink mr-2"
					contain
					src="http://cdn.shopify.com/s/files/1/1061/1924/products/OMG_Cat_Emoji_ios10_grande.png?v=1571606092"
					transition="scale-transition"
					width="40"
				/>
				<h1>PetCare</h1>
			</div>
		</router-link>
		<v-spacer></v-spacer>

		<router-link to="/login" style="text-decoration: none; color: inherit">
			<v-btn class="mr-5">Login</v-btn>
		</router-link>
		<router-link
			to="/register"
			style="text-decoration: none; color: inherit"
		>
			<v-btn class="mr-5">Register</v-btn>
		</router-link>

		<div v-if="user.token">
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

<style></style>
