<template>
	<v-app>
		<v-app-bar app color="blue-grey darken-1" dark>
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

			<v-spacer></v-spacer>

			<v-btn
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				target="_blank"
				text
			>
				<span class="mr-2">Latest Release</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
	name: "App",
	data: () => ({}),
};
</script>
