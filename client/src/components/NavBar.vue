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
				to="/search"
				style="text-decoration: none; color: inherit"
			>
			<v-btn class="mr-5" color="primary" outlined>Find Job</v-btn>
		</router-link>
		<router-link v-if="user.token"
			to="/postJob"
			style="text-decoration: none; color: inherit"
		>
			<v-btn class="mr-5" color="primary" outlined >Post Job</v-btn>
		</router-link>
		<router-link
				to="/about"
				style="text-decoration: none; color: inherit"
			>
			<v-btn class="mr-5" color="primary" outlined>About us</v-btn>
		</router-link>
		
		<!-- <v-btn class="mr-5" color="primary" outlined @click="testMethod">Test button</v-btn> -->
		
		<v-spacer></v-spacer>

		<div v-if="!user.token">
			
            <router-link to="/login" style="text-decoration: none; color: inherit">
				<v-btn class="mr-5" color="primary" outlined>Login</v-btn>
			</router-link>
			
		</div>
		<div v-if="user.token" class="userDataDiv mr-3">

			<!-- profile options dialog -->
			<UserMenuDialog />
            
		</div>
	</v-app-bar>
</template>

<script>

import UserMenuDialog from "./UserMenuDialog";

export default {
	name: "NavBar",
	data: () => ({
	}),
	computed: {
		user() {
			return this.$store.getters.user;
		},
		authStatus() {
			return this.$store.getters.authStatus;
		},
	},
	methods: {
		
		getProfilePicUrl() {
			var a = this.$store.state.serverBaseUrl + 'img/' + this.$store.getters.user.profilePicture;
			console.log("profilePicPath", a);
			return a;
		},
		testMethod() {
			console.log(this.$store.getters.user);
		}
	},
	components: { UserMenuDialog },
};
</script>

<style>
.userDataDiv {
	display: flex;
	align-content: center;
}
</style>
