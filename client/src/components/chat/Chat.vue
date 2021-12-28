<template>
	<section>
		<section ref="chatArea" class="chat-area">
			<p
				v-for="message in messages"
				class="message"
				:class="{
					'message-out': message.author !== userId,
					'message-in': message.author === userId,
				}"
				:key="message._id"
			>
				{{ message.text }}
			</p>
		</section>

		<section class="chat-inputs">
			<input
				v-model="messageInput"
				id="person2-input"
				type="text"
				placeholder="Type your message"
			/>
			<v-btn class="mr-5" color="primary" outlined v-on:click="sendMessage">Send</v-btn>
		</section>
		<ScaleLoader class="loader" v-if="loading" />
	</section>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
	name: "Chat",
	components: { ScaleLoader },
	data: () => ({
		messageInput: "",
		messages: [],
		loading: false,
	}),
	props: ["userId"],
	mounted() {
		// Get messages
		this.loading = true;
		this.fetchMessages();
		window.setInterval(() => {
			this.checkForNewMessages();
		}, 2000);
	},
	methods: {
		fetchMessages() {
			axios
				.get(`/api/chat/${this.userId}`)
				.then((res) => {
					this.loading = false;
					this.messages = res.data.messages;
					this.scrollToBottom();
				})
				.catch((err) => {
					this.loading = false;
					console.log("Caught error: ", err.response?.data?.message || err.message);
					this.formSubmitErrors = err.response?.data?.message || err.message;
				});
		},
		checkForNewMessages() {
			axios
				.get(`/api/chat/${this.userId}/unread`)
				.then((res) => {
					this.loading = false;
					if (res.data.messages.length > 0) {
						this.messages = this.messages.concat(res.data.messages);
						this.scrollToBottom();
					}
				})
				.catch((err) => {
					this.loading = false;
					console.log("Caught error: ", err.response?.data?.message || err.message);
					this.formSubmitErrors = err.response?.data?.message || err.message;
				});
		},
		sendMessage() {
			if (!this.messageInput) {
				return;
			}
			axios
				.put(`/api/chat/${this.userId}`, { message: this.messageInput })
				.then((res) => {
					this.loading = false;
					this.messageInput = "";
					this.messages.push(res.data.messages[res.data.messages.length - 1]);
					this.scrollToBottom();
				})
				.catch((err) => {
					this.loading = false;
					console.log("Caught error: ", err.response?.data?.message || err.message);
					this.formSubmitErrors = err.response?.data?.message || err.message;
				});
		},
		scrollToBottom() {
			Vue.nextTick(() => {
				let messageDisplay = this.$refs.chatArea;
				messageDisplay.scrollTop = messageDisplay.scrollHeight;
			});
		},
	},
};
</script>

<style scoped>
body,
html {
	font-family: sans-serif;
	font-weight: 100;
}

.headline {
	text-align: center;
	font-weight: 100;
	color: white;
}
.chat-area {
	height: 50vh;
	/* height: 80%; */
	/* padding: 1em; */
	overflow-y: auto;
	width: 100%;
	/* box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3); */
	left: 50%;
	top: 50%;
}
.message {
	width: 35%;
	border-radius: 10px;
	padding: 0.5em;
	font-size: 0.8em;

	white-space: normal;
	word-wrap: break-word;

	/* display: inline-block; */
	/* max-width: 30px; */
}

.message-out {
	background: #5ab368;
	color: white;
	margin-left: 50%;
}
.message-in {
	background: #f1f0f0;
	color: black;
}
.chat-inputs {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: space-around;
	background-color: rgb(248, 242, 242);

	padding: 2%;
	/* margin: 0 auto 2em auto; */
	/* box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1); */
	/* position: absolute; */
	bottom: 0px;
}
#person1-input {
	padding: 0.5em;
}
#person2-input {
	padding: 0.5em;
}
</style>
