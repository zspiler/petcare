<template>
	<v-container fill-height>
		<v-row justify="center">
			<v-col md="6" lg="6" class="grayBorder" align="center">
				<h1>Animal needs</h1>
				<v-virtual-scroll height="480" item-height="150" :items="animals">
					<template v-slot:default="{ item, index }">
						<v-list-item :key="index">
							<v-row>
								<v-col md="4">
									<v-img
										class="img-circle img-animated"
										alt="Animal's image"
										height="100"
										max-width="100"
										:src="
											item.pictureUrl
												? item.pictureUrl
												: require('../../assets/catSilhuete.jpg')
										"
									/>
									<b>{{ item.name }}</b>
								</v-col>
								<v-col md="8">
									<v-textarea v-model="item.serviceDescription" height="100" />
								</v-col>
							</v-row>
						</v-list-item>
					</template>
				</v-virtual-scroll>
			</v-col>
			<v-col md="5" lg="5" class="grayBorder" align="center">
				<h1>User data</h1>
				<form>
					<v-row>
						<v-col>
							<p style="margintop: 20px; marginbottom: -30px">
								Check if your data is correct.
							</p>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field label="Name" required v-model="name" />
						</v-col>
						<v-col>
							<v-text-field label="Surname" required v-model="surname" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field label="City" required v-model="city" />
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<p style="margintop: 10px; marginbottom: 40px">
								Residence information will only be visible once you have confirmed
								your service person.
							</p>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-menu
								v-model="dateInputFrom"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="dateFrom"
										label="Date from"
										prepend-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="dateFrom"
									@input="dateInputFrom = false"
								></v-date-picker>
							</v-menu>
						</v-col>
						<v-col>
							<v-menu
								v-model="dateInputTo"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="dateTo"
										label="Date to"
										prepend-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="dateTo"
									@input="dateInputTo = false"
								></v-date-picker>
							</v-menu>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-text-field label="Price per day" required v-model="price" />
						</v-col>
					</v-row>
					<p>
						Total: <b>{{ this.calculatedPrice }} €</b>
					</p>
					<v-btn class="mr-4" color="primary" @click="postService()"
						>Post job</v-btn
					>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "../../axios";

export default {
	name: "PostJob2",
	data: () => ({
		name: "",
		surname: "",
		address: "",
		city: "",
		cityNumber: "",
		price: 0,
		calculatedPrice: 0,
		animals: [],
		dateFrom: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
			.toISOString()
			.substr(0, 10),
		dateTo: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
			.toISOString()
			.substr(0, 10),
		dateInputFrom: false,
		dateInputTo: false,
	}),
	async created() {
		this.animals = await JSON.parse(this.$route.params.animals);
		this.name = this.$store.getters.user.firstName;
		this.surname = this.$store.getters.user.lastName;
		this.city = this.$store.getters.user.city;
	},
	watch: {
		dateFrom: {
			handler: function () {
				this.calculatedPrice = this.price * this.dateDiff();
			},
		},
		dateTo: {
			handler: function () {
				this.calculatedPrice = this.price * this.dateDiff();
			},
		},
		price: {
			handler: function () {
				this.calculatedPrice = this.price * this.dateDiff();
			},
		},
	},
	methods: {
		async postService() {
			try {
				const data = {
					userId: this.$store.getters.user._id,
					dateFrom: this.dateFrom,
					dateTo: this.dateTo,
					pricePerDay: Number(this.price),
					animalsString: JSON.stringify(this.animals),
				};
				const response = await axios.post(`${this.url}service`, data);
				if (response.status === 200 || response.status === 203) {
					this.$router.push("/postJob/animal/complete");
				}
			} catch (err) {
				console.error(err);
			}
		},
		dateDiff() {
			var Difference_In_Time =
				new Date(this.dateTo).getTime() - new Date(this.dateFrom).getTime();
			var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
			return Difference_In_Days;
		},
	},
    computed: {
        url(){
            return this.$store.state.serverBaseUrl + "api/";   
        }      
    },
};
</script>

<style>
.img-circle {
	border-radius: 50%;
}
.img-animated {
	transition: all 0.15s ease-in-out;
}
.grayBorder {
	background-color: #f0f2ef;
	border-radius: 20px;
}
</style>
