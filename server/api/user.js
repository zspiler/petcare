const express = require("express");
const { check, validationResult, body } = require("express-validator");
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const User = require("../models/User");

const auth = require("../middleware/auth");

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, _, cb) {
			cb(null, `${__dirname}/../public/galleries/${req.userId}`);
		},
		filename: function (_, file, cb) {
			let ext = file.mimetype.split("/");
			cb(null, `${file.fieldname}-${Date.now()}.${ext[ext.length - 1]}`);
		},
	}),
	limits: {
		fileSize: 10000000, // 10 MB limit
	},
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "image/png" ||
			file.mimetype == "image/jpg" ||
			file.mimetype == "image/jpeg"
		) {
			cb(null, true);
		} else {
			cb(null, false);
			req.fileValidationError = "Submitted file must be in PNG or JPG format";
			return cb(new Error("Submitted file must be in PNG or JPG format"));
		}
	},
}).single("picture");

// POST api/user/gallery
// Upload photo to user's gallery

router.post("/gallery", body("title").notEmpty(), auth, async (req, res) => {
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

	// Create directory if necessary
	const userGalleryDir = `${__dirname}/../public/galleries/${req.userId}`;
	if (!fs.existsSync(userGalleryDir)) {
		fs.mkdirSync(userGalleryDir);
	}

	const user = await User.findOne({ email: req.email });
	if (!user) {
		return res.status(409).json({ message: "Could not find user" });
	}

	upload(req, res, async (uploadErr) => {
		// file upload error
		if (uploadErr) {
			return res.status(422).json({ message: "Error processing file" });
		}

		const destination = req.file.destination.split("/");
		const picture = {
			title: req.body.title,
			url: `${destination[destination.length - 1]}/${req.file.filename}`,
		};

		await User.findOneAndUpdate(
			{ _id: user._id },
			{
				$push: {
					gallery: picture,
				},
			}
		);

		res.json({
			message: "Successfully uploaded picture to gallery",
			picture,
		});
	});
});

module.exports = router;
