const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	],
	messages: [
		{
			author: {
				type: Schema.Types.ObjectId,
				ref: "user",
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			time: {
				type: Date,
				default: Date.now,
				required: true,
			},
			read: {
				type: Boolean,
				required: true,
				default: false,
			},
		},
	],
});

Chat = mongoose.model("chat", ChatSchema);
module.exports = Chat;
