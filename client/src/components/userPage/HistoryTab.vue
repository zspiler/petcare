<template>
	<div :services="services">
		<router-link 
			v-for="service in services"
			:key="service.id"
			:to="{ name: 'Details', params: { serviceId: service.id } }"
			style="text-decoration: none; color: inherit"
			>
			<v-row justify="center" class="userRow"
			>
				<v-col md="2" align="center">
					<v-img 
                        :src="service.userProfilePicture" 
                        class="profileImage"
                    > </v-img>
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
</template>
<script>
import axios from "../../axios";
export default {
	name: "HistoryForm",
	props: ['offering'],
	data: () => ({
		services: [],
	}),

	methods: {
		async getServices() {
			try {
				const data = {
					offering: this.offering
				}
				console.log(data)
				this.services = [];
				const response = await axios.get("http://localhost:5000/api/service", data);
				for (const service of response.data.services) {
					if (this.offering === (service.type === 'serviceOffering')) {
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
					}
				}
			} catch (err) {
				console.log(err);
			}
			return Promise.resolve("Dummy response to keep the console quiet");
		},
	},

	watch: {
		offering: function (val) {
			this.offering = val;
			this.getServices();
		},
	},

	created: function () {
		this.getServices();
	},
};
</script>
<style scoped>
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
.profileImage {
    max-height: 80px;
    max-width: 80px;
}

</style>
