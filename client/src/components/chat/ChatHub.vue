<template>
	<v-container fluid style="height: 100%">
		<v-img height="210px" src="../../assets/chatHubBackground.jpg"></v-img>

		<v-row justify="center" style="height: 70%" class="pt-10">
			<v-col cols="10" md="4" align="center" style="height: 100%">
				<!-- contact list -->
				<v-container class="border-container" style="padding-top: 30px">
					<v-row align="center" class="menu-row" v-for="chat in chats" :key="chat.userId">
						<v-btn
							color="primary"
							class="menu-btn"
							:outlined="currentChatId != chat.userId"
							@click="selectChat(chat)"
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
											:src="
												$store.state.serverBaseUrl +
												'img/' +
												chat.profilePicture
											"
										></v-img>
									</v-col>
									<!-- name -->
									<v-col align="center" justify="center">
										{{ chat.firstName + " " + chat.lastName }}
									</v-col>
								</v-row>
							</v-container>
						</v-btn>
					</v-row>
                    <v-row v-if="chats.length == 0 || !chats" align="center" justify="center">
                        <p>You don't have active contacts at the moment...</p>
                    </v-row>
				</v-container>
			</v-col>
			<v-col cols="10" md="6" style="width: 80%">
				<v-container class="border-container pa-0">
					<Chat v-if="selectedChat" :userId="selectedChat.userId" />
				</v-container>
			</v-col>
		</v-row>
		<ScaleLoader class="loader" v-if="loading" />
	</v-container>
</template>

<script>
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";
import axios from "../../axios";
import Chat from "./Chat.vue";

export default {
	name: "ChatHub",
	components: {
		ScaleLoader,
		Chat,
	},
	data: () => ({
		selectedChat: null,
		chats: [],
		loading: false,
	}),
	mounted() {
		// fetch chats
		this.fetchChats();
	},
	computed: {
		currentChatId() {
			return this.selectedChat ? this.selectedChat.userId : null;
		},
	},
	methods: {
		startNewChat(userId) {
			// fetch user data
			axios
				.get(`/api/user/${userId}`)
				.then((res) => {
					const newChat = res.data.user;
					this.chats.push(newChat);
					this.selectChat(newChat);
				})
				.catch((err) => {
					// TODO: if user not found -> ignore ...
					console.log("Caught error: ", err.response?.data?.message || err.message);
				});
		},
		fetchChats() {
			this.loading = true;
			axios
				.get(`/api/chat/`)
				.then((res) => {
					this.loading = false;
					this.chats = res.data.chats;

					// Open new chat if userId in URL and chat does not yet exist
					const existingChats = this.chats.map((chat) => chat.userId);
					const newChatUserId = this.$route.params.userId;
					if (newChatUserId && !existingChats.includes(newChatUserId)) {
						this.startNewChat(newChatUserId);
					}
				})
				.catch((err) => {
					this.loading = false;
					console.log("Caught error: ", err.response?.data?.message || err.message);
					this.formSubmitErrors = err.response?.data?.message || err.message;
				});
		},

		//se izvede ko uporabnik izbere contact
		selectChat(chat) {
			this.selectedChat = chat;
			//TODO: fetch the chat with selected contact and inject it into the chat component
		},
	},
};
</script>

<style scoped>
.border-container {
	height: 100%;
	max-height: 700px;
	border-style: solid;
	border-width: 1px;
	border-color: #448aff;
	border-radius: 5px;
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
