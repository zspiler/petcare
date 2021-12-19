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
					<div>
						<span style="margin: 10px 10px 0px 0px">Iščem</span>
						<span><ToggleButton /></span>
						<span style="margin: 10px 0px 0px 10px">Nudim</span>
					</div>
				</v-col>
			</v-row>
			
			<v-row justify="center" class="headerRow">	
				<v-col  md="2" align="center">
				</v-col>
				<v-col  md="2" align="center">
					<b><p>Ime Iskalca</p></b>
				</v-col>
				<v-col  md="2" align="center">
					<b><p>Žival</p></b>
				</v-col>
				<v-col  md="2" align="center">
					<b><p>Od/Do</p></b>
				</v-col>
				<v-col md="2" align="center">
					<b><p>Ponudba</p></b>
				</v-col>
			</v-row>

			<span><HomePageAds /></span>
			
			<center>
				<v-btn class="mr-5" color="primary" style="margin-top: 80px;" outlined>Prikaži vse</v-btn>
			</center>
			
	</v-container>
</template>

<script>

 import ToggleButton from './ToggleButton.vue'
 import HomePageAds from './HomePageAds.vue'

	export default {
		name: 'Home',

		components: {
			ToggleButton,
			HomePageAds,
		}
	}
	
</script>

<style scoped>
	.headerRow{
		margin-top: 50px;
		margin-right: 15%;
		margin-left: 15%;
	}
</style>
