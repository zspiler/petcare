<template>
		<v-container id="Home" fluid >
			<v-img
				height=400
				src="../../assets/home.png"
			></v-img> 
			<v-row justify="center" style="margin-top:20px">
				<v-col md="2" align="center">
                    <v-text-field
                        label="Search"
                        outlined
                    > </v-text-field>
				</v-col>
				<v-col  md="2" align="center">
                    <v-row align="center" justify="center">
                        <span style="margin: 10px 10px -20px 0px">Searching</span>
						<span>
							<v-switch v-model="offering" ></v-switch>
						</span>
						<span style="margin: 10px 0px -20px 10px">Offering</span>
                    </v-row>
                </v-col>
				<v-col  md="2" align="center">
                    <v-select
                        label="Sort by"
                        outlined
						:items="sortBy"
						v-model="sortByValue"
                    ></v-select>
				</v-col>
			</v-row>
			<v-row >
				<v-col align="center">
					Filter by
				</v-col>
			</v-row>
            <v-row justify="center">
				<v-col md="2" align="center">
					<v-select
						label="Region"
						outlined
						:items="regions"
						v-model="region"
					></v-select>
				</v-col>
				<v-col  md="2" align="center">
					<v-select
						label="Animal"
						outlined
						:items="animalTypes"
						v-model="animalType"
					></v-select>
				</v-col>
				<v-col  md="2" align="center">
					<v-select
						label="Date"
						outlined
					></v-select>
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

			<span><HomePageAds /></span>
			<v-btn @click="getData()"> test</v-btn>
			<center>
				<v-btn class="mr-5" color="primary" style="margin-top: 80px;" outlined>Show more</v-btn>
			</center>
			
	</v-container>
</template>

<script>

	import HomePageAds from './HomePageAds.vue'
	import axios from "axios";
	export default {
		name: 'Search',

		components: {
			HomePageAds,
		},

		data: () => ({
			url: 'http://localhost:5000/api/',
			regions: ['Ljubljana','Maribor','Celje','Kranj','Koper','Velenje','Novo mesto','Ptuj','Krško'],
			animalTypes: ['Cat','Dog','Hamster','Turtle','Fish','Parrot','Reptile','Rabbit','Dinosaur','Other mammal','Other bird','Other'],
			sortBy: ['Date ascending','Date descending','Price ascending','Price descending'],
			offering: false,
			region:'',
			animalType:'',
			sortByValue:'',
		}),
		methods: {
			async getData(){
				try {
					const data = {
						offering: this.offering,
						region: this.region,
						animalType: this.animalType,
						sortBy: this.sortByValue,
					}
					console.log(data)
					const response = await axios.post(`${this.url}service/search`,data)
					console.log(response.data)

				
				} catch (err) {
					console.error(err)
				}
			}
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
