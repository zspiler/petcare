<template>
	<v-container id="Home" fluid>
		<v-img height="400" src="../assets/home.png"></v-img>
		<v-row align="center" style="margin-top: 20px">
			<!-- <v-col md="2" align="center">
                    <v-text-field
                        label="Search"
                        outlined
                    > </v-text-field>
				</v-col> -->
		</v-row>
		<v-row justify="center" class="grayBorder" id="back">
			<v-container>
				<v-row>
					<div class="div-animal">
						<v-col>
							<v-row>
								<div id="animals">
									<div
										v-for="(animal, i) in this.services[this.index].animals"
										:key="i"
										@click="showAnimal(i)"
										class="center"
									>
										<v-img class="img-circle" :src="animal.picture"></v-img>
										<p style="font-weight: bold">{{ animal.name }}</p>
									</div>
								</div>
							</v-row>
						</v-col>
					</div>
					<div class="div-user" style="margin-right: 20px;">
						<v-col>
							<v-row>
								<v-col>
									<p style="font-weight: bold">User information:</p>
									<p>
										{{
											this.services[this.index].userFirstName +
											" " +
											this.services[this.index].userLastName
										}}
									</p>
									<p>{{ this.services[this.index].user.city }}</p>
								</v-col>
								<v-col>
									<v-img :src="getProfilePicURL()" class="img-circle"></v-img>
								</v-col>
							</v-row>
						</v-col>
					</div>
				</v-row>
			</v-container>

			<v-container>
				<v-row style="padding-top: 40px; margin-left: 0px;">
					<v-col>
						<div>
							<p style="font-weight: bold">Animal description:</p>
							<p>
								{{
									this.services[this.index].animals[this.selectedAnimal]
										.description
								}}
							</p>
							<p>
								Age:
								{{ this.services[this.index].animals[this.selectedAnimal].age }} years
							</p>
							<p>
								Type:
								{{	this.services[this.index].animals[this.selectedAnimal].type }}
							</p>
						</div>
					</v-col>
					<v-col style="width: 60%">
						<div class="div-user" style="width: 60%">
							<p style="font-weight: bold">Details:</p>
							<p>
								Date: {{ this.services[this.index].dateFrom }} -
								{{ this.services[this.index].dateTo }}
							</p>
							<p>Price per day: {{ this.services[this.index].pricePerDay }} €</p>
							<center></center>

							<router-link
								:to="`/chat/${this.services[this.index].user._id.toString()}`"
								style="text-decoration: none; color: inherit"
							>
								<button>Contact</button>
							</router-link>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
export default {
	name: "Details",
	async created() {
		this.id = this.$route.params.serviceId;
		console.log(this.id);
		this.getData();
	},
	data: () => ({
		offering: false,
		region: "",
		animalType: "",
		sortByValue: "",
		services: [],
		index: 0,
		selectedAnimal: 0,
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

				console.log(response.data);
				this.services = [];
				for (const service of response.data) {
                    const s = {
                        id: service._id,
                        userFirstName: service.user.firstName,
                        userLastName: service.user.lastName,
                        userProfilePicture:
                            this.$store.state.serverBaseUrl +
                            "img/" +
                            service.user.profilePicture,
                        animals: service.animals,
                        dateFrom: new Date(service.dateFrom).toLocaleDateString(),
                        dateTo: new Date(service.dateTo).toLocaleDateString(),
                        pricePerDay: service.pricePerDay,
                        user: service.user,
                    };
                    this.services.push(s);
				}
				this.findindex();
			} catch (err) {
				console.error(err);
			}
		},
		findindex() {
			for (let i = 0; i < this.services.length; i++) {
				if (this.services[i].id == this.id) {
					this.index = i;
				}
			}
		},
		getProfilePicURL() {
			var a =
				this.$store.state.serverBaseUrl +
				"img/" +
				this.services[this.index].user.profilePicture;
			return a;
		},
		showAnimal(key) {
			this.selectedAnimal = key;
		},
	},
    computed: {
        url(){
            return this.$store.state.serverBaseUrl + "api/";   
        }      
    },
};
</script>

<style scoped>
.img-circle {
	display: block;
	margin-left: auto;
	margin-right: auto;
	border-radius: 50%;
	height: 110px;
	width: 110px;
}
.img-animated {
	transition: all 0.15s ease-in-out;
}
.grayBorder {
	background-color: #f0f2ef;
	border-radius: 20px;
	padding: 30px;
}
.div-animal {
	border: 2px solid #1087c3;
	border-radius: 10px;
	padding-right: 20px;
	padding-top: 20px;
	padding-bottom: 20px;
    margin-left: 10px;
}
.div-user {
	border: 2px solid #1087c3;
	border-radius: 10px;
	width: 50%;
	padding: 15px;
	margin-left: auto;
	margin-right: 10px;
}
.center {
	text-align: center;
	padding-left: 20px;
}
#back {
	margin-left: 100px;
	margin-right: 100px;
}
#animals {
	display: flex;
	flex-direction: row;
}
button {
	padding: 15px;
	margin-top: 30px;
	margin-left: auto;
	margin-right: auto;
	background: #1087c3;
	color: #ffffff;
	font-weight: bold;
	border-radius: 20px;
	align-self: center;
}
</style>
