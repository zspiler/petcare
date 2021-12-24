<template>
    <v-container fluid style="width:90%;" class="mt-1">
        <v-row align="center" class="mb-1" >
            <v-btn color="primary" class="menu-btn" outlined>View privacy policy</v-btn>
        </v-row>
        <v-row align="center" class="mb-1" >
            <v-btn color="primary" class="menu-btn" outlined>Delete collected data</v-btn>
        </v-row>
        <v-row align="center" class="mb-1" >
            <v-btn color="primary" class="menu-btn" outlined @click="logout()">Logout</v-btn>
        </v-row>
        <v-row align="center" class="mb-1" >
            <v-btn color="red" class="menu-btn" outlined @click="logout()">Delete account</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "SettingsTab",
    methods: {
        logout() {
            this.dialog = false;
			this.$store
				.dispatch("logout")
				.then(() => {
					this.$router.push("/").catch(() => {});
				})
				.catch((err) => {
					console.log(err);
				});
		},
    }
}
</script>

<style scoped>

</style>