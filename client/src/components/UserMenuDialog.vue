<template>
    <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        width="250"
    >
        <!-- activator -->
        <template v-slot:activator="{ on }">
            <v-img
                class="img-circle img-animated" 
                v-on="on"
                alt="profilka.."
                max-height="50"
                max-width="50"
                :src="getProfilePicUrl()"
            ></v-img>
        </template>

        <!-- dialog body -->
        <v-card class="justify-center">
            <v-card-title class="text-h5 grey lighten-2 justify-center">
               {{ user.firstName + ' ' + user.lastName }}
            </v-card-title>

            <!-- <v-card-text class="justify-center text-center">
                {{ user.firstName }}
            </v-card-text> -->


            <v-container class="mycontainer" style="margin-bottom:0px;padding-bottom:0px">
                 <v-row class="justify-center mb-4 mt-4">
                    <v-img
                        class="img-circle"
                        lazy-src="../assets/profile_default.png"
                        alt="profilka.."
                        max-height="100"
                        max-width="100"
                        :src="getProfilePicUrl()"
                    ></v-img>
                </v-row>
            </v-container>
            

            <v-card-actions>
                <v-container class="mycontainer" style="margin-bottom:0px;padding-bottom:0px">
                    <v-row class="justify-center mb-3 mt-2">
                        <v-btn color="primary" outlined @click="myProfile">
                            <v-icon left>
                                mdi-account
                            </v-icon>
                            My Profile
                        </v-btn>
                    </v-row>
                    <v-row class="justify-center mb-3 mt-10">
                        <v-btn color="primary" outlined @click="logout">
                            <v-icon left>
                                mdi-logout-variant
                            </v-icon>
                            Logout
                        </v-btn>
                    </v-row>
                    <v-row class="mb-2 mt-10" justify="end">
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                    </v-row>
                </v-container>

                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    name: "UserMenuDialog",
    data: () => ({
		dialog: "",
        on: "",
	}),
    computed: {
		user() {
			return this.$store.getters.user;
        }
    },
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
        myProfile() {
            this.dialog = false;
            this.$router.push("/user").catch(() => {});
        },
        getProfilePicUrl() {
            var a = this.$store.state.serverBaseUrl + 'img/' + this.$store.getters.user.profilePicture;
			// console.log("profilePicPath", a);
			return a;
		},
        hoverOver() {
            console.log('over');
            this.classes = ['img-circle','animated', 'zoomIn'];
        },
        hoverOut() {
            console.log('out');
            this.classes = ['img-circle'];
        },
    }
}
</script>

<style>
.mycontainer {
   margin-bottom: 0px;
   padding-bottom: 0px;
}
.v-dialog {
    position: absolute;
    top: 6%;
    right: 0px;
}
.img-circle {
    border-radius: 50%;
}
.img-animated {
    transition: all .15s ease-in-out;
}
.img-animated:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px #ccc;
}
/*
.img-animated:hover {
    width: 70px;
    height: 70px;
} */ 
</style>