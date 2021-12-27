const express = require("express");
const { validationResult, body, param } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Chat = require("../models/Chat");

const auth = require("../middleware/auth");

// GET api/chat/:userId
// Get chat with user with id 'userId'

router.get("/:userId", auth, async (req, res) => {
	// Get participants
	const loggedInUser = await User.findOne({
		email: req.email,
	}).exec();
	const otherUser = await User.findById(req.params.userId).exec();

	if (!(loggedInUser && otherUser)) {
		return res.status(404).json({ message: "Unknown user" });
	}

	// Check if conversation between two exists

	let chat = await Chat.findOne({
		users: { $all: [loggedInUser._id, otherUser._id] },
	});
	if (chat) {
		return res.json({ messages: chat.messages });
	}

	// Create conversation
	const _id = mongoose.Types.ObjectId();
	chat = new Chat({
		_id,
		users: [loggedInUser._id, otherUser._id],
		messages: [],
	});
	await chat.save();

	// Add conversations to users
	await User.findOneAndUpdate(
		{ _id: loggedInUser._id },
		{
			$push: {
				chats: _id,
			},
		}
	);

	await User.findOneAndUpdate(
		{ _id: otherUser._id },
		{
			$push: {
				chats: _id,
			},
		}
	);

	return res.json({ messages: [] });
});

// POST api/chat/:userId
// Send message to user

router.put("/:userId", body("message").notEmpty(), auth, async (req, res) => {
	// Validate
	const validationErrors = validationResult(req.body);
	if (!validationErrors.isEmpty()) {
		console.log("validation errors");
		console.log(validationErrors.array());
		return res.status(400).json({
			message: "Invalid parameters",
			errors: validationErrors.array(),
		});
	}

	// Get chat participants
	const loggedInUser = await User.findOne({
		email: req.email,
	}).exec();
	const otherUser = await User.findById(req.params.userId).exec();

	if (!(loggedInUser && otherUser)) {
		return res.status(404).json({ message: "Unknown user" });
	}

	// Check if chat between two exists
	const chat = await Chat.findOne({
		users: { $all: [loggedInUser._id, otherUser._id] },
	});
	if (!chat) {
		return res.status(404).json({ message: "Chat not found user" });
	}

	// Send message
	const updatedChat = await Chat.findOneAndUpdate(
		{
			users: { $all: [loggedInUser._id, otherUser._id] },
		},
		{
			$push: {
				messages: {
					author: loggedInUser._id,
					text: req.body.message,
				},
			},
		},
		{ new: true, setDefaultsOnInsert: true }
	).lean();

	return res.json({ messages: updatedChat.messages });
});

module.exports = router;
