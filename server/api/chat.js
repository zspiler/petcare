const express = require("express");
const { validationResult, body, param } = require("express-validator");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User");
const Chat = require("../models/Chat");

const auth = require("../middleware/auth");

// GET api/chat/:userId
// Get all messages (and create conversation if it does not exist)

router.get("/:userId", auth, async (req, res) => {
	// Get participants
	const loggedInUser = await User.findOne({
		email: req.email,
	}).exec();
	const otherUser = await User.findById(req.params.userId).exec();

	if (!(loggedInUser && otherUser)) {
		return res.status(404).json({ message: "Unknown user" });
	}
	if (loggedInUser == otherUser) {
		return res.status(400).json({ message: "Bad request" });
	}

	// Check if conversation between two exists
	let chat = await Chat.findOne({
		users: { $all: [loggedInUser._id, otherUser._id] },
	});
	if (chat) {
		// Mark other user's messages as 'read'
		chat.messages.forEach((msg) => {
			if (msg.author.toString() == otherUser._id && msg.read == false) {
				msg.read = true;
			}
		});
		await chat.save();

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

// GET api/chat/:userId/unread
// Get all unread messages from specific chat

router.get("/:userId/unread", auth, async (req, res) => {
	// Get participants
	const loggedInUser = await User.findOne({
		email: req.email,
	}).exec();
	const otherUser = await User.findById(req.params.userId).exec();

	if (!(loggedInUser && otherUser)) {
		return res.status(404).json({ message: "Unknown user" });
	}
	if (loggedInUser == otherUser) {
		return res.status(400).json({ message: "Bad request" });
	}

	let chat = await Chat.findOne({
		users: { $all: [loggedInUser._id, otherUser._id] },
	});
	if (chat) {
		const unreadMessages = [];
		// Mark as 'read'
		chat.messages.forEach((msg) => {
			if (msg.author.toString() == otherUser._id && msg.read == false) {
				msg.read = true;
				unreadMessages.push(msg);
			}
		});
		await chat.save();
		return res.json({ messages: unreadMessages });
	} else {
		return res.status(404).json({ message: "Chat not found" });
	}
});

// GET api/chat/unread/all
// Get all users from which user has unread messages
router.get("/unread/all", auth, async (req, res) => {
	const user = await User.findOne({
		email: req.email,
	}).exec();

	const newMessagesFrom = [];

	for (let i = 0; i < user.chats.length; i++) {
		const chat = await Chat.findById(user.chats[i]._id);
		if (chat) {
			for (let j = 0; j < chat.messages.length; j++) {
				const msg = chat.messages[j];
				if (msg.author.toString() != req.userId && msg.read == false) {
					newMessagesFrom.push(msg.author);
					break;
				}
			}
		}
	}

	return res.json({ newMessagesFrom });
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

// GET api/chat/
// Get all user's chats (metadata)

router.get("/", auth, async (req, res) => {
	const user = await User.findOne({
		email: req.email,
	});

	const chats = [];

	for (let i = 0; i < user.chats.length; i++) {
		const chat = await Chat.findById(user.chats[i], "-messages").lean();
		if (chat) {
			let participant = null;
			for (let i = 0; i < chat.users.length; i++) {
				if (req.userId.toString() !== chat.users[i].toString()) {
					participant = await User.findById(chat.users[i]);
					break;
				}
			}

			chats.push({
				userId: participant._id.toString(),
				firstName: participant.firstName,
				lastName: participant.lastName,
				profilePicture: participant.profilePicture,
			});
		}
	}

	res.json({ chats });
});

module.exports = router;
