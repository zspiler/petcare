<template>
		<v-container id="Home" fluid >
			<v-img
				height=400
				src="../../assets/home.png"
			></v-img> 
			<v-row justify="center">
				<v-col  md="2" align="center">
				</v-col>
				<v-col  md="2" align="center">
				</v-col>
				<v-col  md="2" align="center">
				</v-col>
				<v-col md="2" align="center">
				</v-col>
				<v-col md="2" align="center">
					<v-row align="center" justify="center">
						<span style="margin: 10px 10px -20px 0px">Searching</span>
						<span style="margin-top: 30px;">
							<v-switch v-model="offering"></v-switch>
						</span>
						<span style="margin: 10px 0px -20px 10px">Offering</span>
					</v-row>
				</v-col>
			</v-row>
			
			<v-row justify="center" class="headerRow">	
				<v-col  md="2" align="center">
				</v-col>
				<v-col  md="2" align="center">
					<b><p>Name</p></b>
				</v-col>
				<v-col  md="2" align="center">
					<b><p>Animal</p></b>
				</v-col>
				<v-col  md="2" align="center">
					<b><p>From/To</p></b>
				</v-col>
				<v-col md="2" align="center">
					<b><p>Offer</p></b>
				</v-col>
			</v-row>

			<span><HomePageAds :offering="offering"/></span>
			
			<center>
				<router-link to="/search" style="text-decoration: none; color: inherit">
					<v-btn class="mr-5" color="primary" style="margin-top: 80px;" outlined>Show more</v-btn>
				</router-link>
			</center>
			
	</v-container>
</template>

<script>
 import HomePageAds from './HomePageAds.vue'

	export default {
		name: 'Home',

		components: {
			HomePageAds,
		},
		data: () => ({
			offering: false,
		})
	}
	
</script>

<style scoped>
	.headerRow{
		margin-top: 50px;
		margin-right: 15%;
		margin-left: 15%;
	}
</style>
