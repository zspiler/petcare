const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		required: true,
		default: "default.png",
	},
	role: {
		type: String,
		required: true,
	},
	gallery: [
		{
			name: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	chats: [
		{
			type: Schema.Types.ObjectId,
			ref: "chat",
		},
	],
});

User = mongoose.model("user", UserSchema);
module.exports = User;
