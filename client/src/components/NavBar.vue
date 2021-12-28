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
		<router-link to="/search" style="text-decoration: none; color: inherit">
			<v-btn class="mr-5" color="primary" outlined>Find Job</v-btn>
		</router-link>
		<router-link v-if="user.token" to="/postJob" style="text-decoration: none; color: inherit">
			<v-btn class="mr-5" color="primary" outlined>Post Job</v-btn>
		</router-link>
		<router-link to="/about" style="text-decoration: none; color: inherit">
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
			<UserMenuDialog :unreadMessages="unreadMessages" />

			<!-- chat notification icon -->

			<v-icon
				v-if="unreadMessages"
				style="position: absolute; margin-left: 30px"
				right
				color="red"
			>
				mdi-alert-circle
			</v-icon>
		</div>
	</v-app-bar>
</template>

<script>
import UserMenuDialog from "./UserMenuDialog";
import axios from "axios";
export default {
	name: "NavBar",
	data: () => ({
		unreadMessages: false,
	}),
	computed: {
		user() {
			return this.$store.getters.user;
		},
		authStatus() {
			return this.$store.getters.authStatus;
		},
	},
	mounted() {
		window.setInterval(() => {
			this.checkForUnreadMessages();
		}, 10000);
	},
	methods: {
		getProfilePicUrl() {
			return (
				this.$store.state.serverBaseUrl + "img/" + this.$store.getters.user.profilePicture
			);
		},
		testMethod() {
			console.log(this.$store.getters.user);
		},
		checkForUnreadMessages() {
			axios
				.get(`/api/chat/unread/all`)
				.then((res) => {
					const newMessagesFrom = res.data.newMessagesFrom;
					this.unreadMessages = newMessagesFrom.length > 0;
				})
				.catch((err) => {
					console.log("Caught error: ", err.response?.data?.message || err.message);
					this.formSubmitErrors = err.response?.data?.message || err.message;
				});
		},
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
