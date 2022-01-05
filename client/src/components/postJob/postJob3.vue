<template>
	<v-container fill-height >
		<v-row justify="center" align="center">
            <v-col justify="center" align="center">
                <p>Your job post was successful added!</p>
                    <router-link to="/" style="text-decoration: none; color: inherit">
                        <v-btn color="primary">Show services</v-btn>
					</router-link>
                <v-img
                    alt="Animal's"
                    src="../../assets/Pets.jpg"
                    max-height="700"
                />
            </v-col>
        </v-row>
	</v-container>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .center {
        position: absolute;
        top: 25%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        transform: translate(-30%, -30%);
        width: 40%;
        height: 30%;
    }
</style>
