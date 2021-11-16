<template>
	<v-app>
		<NavBar />
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
	name: "App",
	mounted() {
		this.$store.dispatch("getUser");
	},
	data: () => ({}),
	components: { NavBar },
};
</script>

<style scoped></style>
