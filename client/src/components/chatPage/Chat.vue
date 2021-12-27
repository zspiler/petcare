<template>
	<section>
		<section ref="chatArea" class="chat-area">
			<p
				v-for="message in messages"
				class="message"
				:class="{
					'message-out': message.author === 'you',
					'message-in': message.author !== 'you',
				}"
				:key="message"
			>
				{{ message.body }}
			</p>
		</section>

		<section class="chat-inputs">
			<input
				v-model="youMessage"
				id="person2-input"
				type="text"
				placeholder="Type your message"
			/>
			<v-btn class="mr-5" color="primary" outlined>Send</v-btn>
		</section>
	</section>
</template>

<script>
export default {
	name: "Chat",
	components: {},
	data: () => ({
		bobMessage: "",
		youMessage: "",
		messages: [
			{
				body: "Welcome to the chat, I'm Bob!",
				author: "bob",
			},
			{
				body: "Thank you Bob",
				author: "you",
			},
			{
				body: "You're most welcome",
				author: "bob",
			},
		],
	}),
	methods: {
		sendMessage(direction) {
			if (!this.youMessage && !this.bobMessage) {
				return;
			}
			if (direction === "out") {
				this.messages.push({ body: this.youMessage, author: "you" });
				this.youMessage = "";
			} else if (direction === "in") {
				this.messages.push({ body: this.bobMessage, author: "bob" });
				this.bobMessage = "";
			} else {
				alert("something went wrong");
			}
			// Vue.nextTick(() => {
			// 	let messageDisplay = this.$refs.chatArea;
			// 	messageDisplay.scrollTop = messageDisplay.scrollHeight;
			// });
		},
		clearAllMessages() {
			this.messages = [];
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
	background: white;
	height: 50vh;
	padding: 1em;
	overflow: auto;
	width: 40%;
	margin: 0 auto 2em auto;
	box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
	margin-top: 10%;
	left: 50%;
	top: 50%;
}
.message {
	width: 45%;
	border-radius: 10px;
	padding: 0.5em;
	font-size: 0.8em;
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
	width: 40%;
	justify-content: space-around;
	background-color: gray;
	background: white;
	padding: 1em;
	margin: 0 auto 2em auto;
	box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
}
#person1-input {
	padding: 0.5em;
}
#person2-input {
	padding: 0.5em;
}
</style>
