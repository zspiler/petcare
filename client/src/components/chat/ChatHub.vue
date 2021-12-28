<template>
     <v-container fluid style="height:100%">
        <v-img
            
            height=210px
            src="../../assets/chatHubBackground.jpg"
        ></v-img>
           
		<v-row justify="center" style="height:70%;" class="pt-10">
			<v-col  cols="10" md="4" align="center">
                <!-- contact list -->
				<v-container class="border-container" style="padding-top: 30px;">
                    <v-row align="center" class=" menu-row" v-for="contact in contacts" :key="contact.id">
                        <v-btn 
                            color="primary" 
                            class="menu-btn" 
                            :outlined="currentChatId != contact.id"
                            @click="selectContact(contact)"
                        >
                            <v-container>
                                <v-row class="justify-space-around" align="center">
                                    <!-- profile pic -->
                                    <v-col>
                                        <v-img
                                            class="img-circle" 
                                            alt="profilka.."
                                            max-height="30"
                                            max-width="30"
                                            :src="getProfilePicUrl(contact)"
                                        ></v-img>
                                    </v-col>
                                    <!-- name -->
                                    <v-col align="center" justify="center">
                                        {{ contact.firstName + ' ' + contact.lastName }}
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-btn>
                    </v-row>
                   
                </v-container>
			</v-col>
            <v-col  cols="10" md="6" style="width:80%">
                <!-- chat container -->
				<v-container class="border-container">
                    <!-- <ChatComponent chatId="currentChatId" />  idk to bos ze po svoje naredu-->
                </v-container>
			</v-col>
            
            
		</v-row>
       

	</v-container>
</template>

<script>
export default {
    name: "ChatHub",
    data: () => ({
        //trenutno izbran clovek za pogovor
        selectedContact: "",
        //vsi ljudje, s katerimi je trenutni user ze imel pogovor (vazna sta ime in profilePicture atributa)
        contacts: [
            {
                id: "61b9da5bd1fb177095ed7195",
                firstName: "burek",
                lastName: "car",
                profilePicture: "default.png",
                //other data ig
            },
            {
                id: "61b89a4ed1fb177095ed714e",
                firstName: "Jan",
                lastName: "Vrbinc",
                profilePicture: "profilePicture-1639488078388.png",
                //other data ig
            },
        ],
    }),
    computed: {
        currentChatId() {
            return this.selectedContact.id;
        }
    },
    methods: {
        getProfilePicUrl(user) {
            var a = this.$store.state.serverBaseUrl + 'img/' + user.profilePicture;
			// console.log("profilePicPath", a);
			return a;
		},
        //se izvede ko uporabnik izbere contact
        selectContact(contact) {
            this.selectedContact = contact;
            //TODO: fetch the chat with selected contact and inject it into the chat component
        }
    }
}
</script>

<style scoped>
.border-container {
    height: 100%;
    max-height: 400px;
    border-style: solid;
    border-width: 1px;
    border-color:  #448aff;
    border-radius: 5px;

    /* enables scrolling on overflow*/
    overflow-y: auto;
}
.menu-btn {
    width: 80%;
    height: 100% !important;
}
.menu-row {
    height: 50px;
    justify-content: center;
    vertical-align: center;
    margin-block: 5px;
}
.img-circle {
    border-radius: 50%;
}
</style>