<template>
    <div>
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
        <!-- if empty -->
        <v-container v-if="services.length == 0">
            <v-row justify="center" class="mt-3">
                <p>
                    You have no active {{ adsAndRequestsButtonTxt() }} at the moment. You can add them 
                    <router-link v-if="user.token" to="/postJob">here</router-link>.
                </p>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import axios from "../../axios";
export default {
	name: "AdsAndRequestsForm",
	props: ['offering'],
	data: () => ({
		services: [],
	}),

	methods: {
		async getServices() {
			try {
				const data = {
                    params: {
                        id: this.user._id,
                        active: true,
                    }
				}
				console.log("get services by UserId data: ", data)
				this.services = [];
				
                const response = await axios.get(this.$store.state.serverBaseUrl + "api/service/byUserId", data);
                console.log("get services by UserId response: ", response);
				for (const service of response.data.services) {
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
			} catch (err) {
				console.log(err);
			}
			return Promise.resolve("Dummy response to keep the console quiet");
		},
        adsAndRequestsButtonTxt() {
			var txt = "Requests";
			if (this.user && this.user.role != undefined && this.user === "Pet sitter") txt = "Ads";
			return txt;
		},
	},
    computed: {
		user() {
			return this.$store.getters.user;
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
