<template>
	<v-container id="Home" fluid>
		<v-img height="400" src="../../assets/home.png"></v-img>
		<v-row justify="center" style="margin-top: 20px">
			<!-- <v-col md="2" align="center">
                    <v-text-field
                        label="Search"
                        outlined
                    > </v-text-field>
				</v-col> -->
			<v-col md="2" align="center">
				<v-row align="center" justify="center">
					<span style="margin: 10px 10px -20px 0px">Searching</span>
					<span>
						<v-switch v-model="offering"></v-switch>
					</span>
					<span style="margin: 10px 0px -20px 10px">Offering</span>
				</v-row>
			</v-col>
			<v-col md="2" align="center">
				<v-select label="Sort by" outlined :items="sortBy" v-model="sortByValue"></v-select>
			</v-col>
		</v-row>
		<v-row>
			<v-col align="center"> Filter by </v-col>
		</v-row>
		<v-row justify="center">
			<v-col md="2" align="center">
				<v-select label="Region" outlined :items="regions" v-model="region"></v-select>
			</v-col>
			<v-col md="2" align="center">
				<v-select
					label="Animal"
					outlined
					:items="animalTypes"
					v-model="animalType"
				></v-select>
			</v-col>
		</v-row>

		<v-row justify="center" class="headerRow">
			<v-col md="2" align="center"> </v-col>
			<v-col md="2" align="center">
				<b><p>Name</p></b>
			</v-col>
			<v-col md="2" align="center">
				<b><p>Animal</p></b>
			</v-col>
			<v-col md="2" align="center">
				<b><p>From/To</p></b>
			</v-col>
			<v-col md="2" align="center">
				<b><p>Offer</p></b>
			</v-col>
		</v-row>

		<div :services="services">
			<router-link
				v-for="service in services"
				:key="service.id"
				:to="{ name: 'Details', params: { serviceId: service.id } }"
				style="text-decoration: none; color: inherit"
			>
				<v-row justify="center" class="userRow">
					<v-col md="2" align="center">
						<v-img :src="service.userProfilePicture" width="80"> </v-img>
					</v-col>
					<v-col md="2" align="center" class="top">
						<b
							><p>{{ service.userFirstName }} {{ service.userLastName }}</p></b
						>
					</v-col>
					<v-col md="2" align="center" class="top">
						<b
							><p>{{ service.animal }}</p></b
						>
					</v-col>
					<v-col md="2" align="center" class="date">
						<b
							><p>{{ service.dateFrom }}<br />{{ service.dateTo }}</p></b
						>
					</v-col>
					<v-col md="2" align="center" class="top">
						<b
							><p>{{ service.pricePerDay }} €</p></b
						>
					</v-col>
				</v-row>
			</router-link>
		</div>
	</v-container>
</template>

<script>
import axios from "../../axios";

export default {
	name: "Search",
	created: function () {
		this.getData();
	},
	data: () => ({
		url: "http://localhost:5000/api/",
		regions: [
			"Ljubljana",
			"Maribor",
			"Celje",
			"Kranj",
			"Koper",
			"Velenje",
			"Novo mesto",
			"Ptuj",
			"Krško",
		],
		animalTypes: [
			"Cat",
			"Dog",
			"Hamster",
			"Turtle",
			"Fish",
			"Parrot",
			"Reptile",
			"Rabbit",
			"Dinosaur",
			"Other mammal",
			"Other bird",
			"Other",
		],
		sortBy: ["Date ascending", "Date descending", "Price ascending", "Price descending"],
		offering: false,
		region: "",
		animalType: "",
		sortByValue: "",
		services: [],
	}),
	methods: {
		async getData() {
			try {
				const data = {
					offering: this.offering,
					region: this.region,
					animalType: this.animalType,
					sortBy: this.sortByValue,
				};

				const response = await axios.post(`${this.url}service/search`, data);
				this.services = [];
				for (const service of response.data) {
					if (this.offering) {
						const s = {
							id: service._id,
							userFirstName: service.user.firstName,
							userLastName: service.user.lastName,
							userProfilePicture:
								this.$store.state.serverBaseUrl +
								"img/" +
								service.user.profilePicture,
							animal: service.animalsType[0],
							dateFrom: new Date(service.dateFrom).toLocaleDateString(),
							dateTo: new Date(service.dateTo).toLocaleDateString(),
							pricePerDay: service.pricePerDay,
						};
						this.services.push(s);
					} else {
						const s = {
							id: service._id,
							userFirstName: service.user.firstName,
							userLastName: service.user.lastName,
							userProfilePicture:
								this.$store.state.serverBaseUrl +
								"img/" +
								service.user.profilePicture,
							animal: service.animals[0].name,
							dateFrom: new Date(service.dateFrom).toLocaleDateString(),
							dateTo: new Date(service.dateTo).toLocaleDateString(),
							pricePerDay: service.pricePerDay,
						};
						this.services.push(s);
					}
				}
			} catch (err) {
				console.error(err);
			}
		},
	},
	watch: {
		offering: function (val) {
			this.offering = val;
			this.getData();
		},
		region: function (val) {
			this.region = val;
			this.getData();
		},
		animalType: function (val) {
			this.animalType = val;
			this.getData();
		},
		sortByValue: function (val) {
			this.sortByValue = val;
			this.getData();
		},
	},
};
</script>

<style scoped>
.headerRow {
	margin-top: 50px;
	margin-right: 15%;
	margin-left: 15%;
}
.userRow {
	height: 100px;
	background-color: #f0f2ef;
	border-radius: 10px;
	margin: 0% 15% 1% 15%;
	box-shadow: 2px 2px #dedede;
}
.top {
	padding-top: 40px;
}
.date {
	padding-top: 30px;
}
</style>
