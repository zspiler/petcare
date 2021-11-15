const express = require("express");
const { check, validationResult, body } = require("express-validator");
const multer = require("multer");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

const upload = multer({
	storage: multer.diskStorage({
		destination: function (_, _, cb) {
			cb(null, `${__dirname}/../public/profile_pictures`);
		},
		filename: function (_, file, cb) {
			cb(null, file.fieldname + "-" + Date.now());
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
			req.fileValidationError =
				"Submitted file must be in PNG or JPG format";
			return cb(new Error("Submitted file must be in PNG or JPG format"));
		}
	},
}).single("profilePicture");

// POST api/auth/signup
// Create new user and log them in

router.post(
	"/register",
	body("firstName").notEmpty(),
	body("firstName").isLength({ max: 20 }),
	body("lastName").notEmpty(),
	body("lastName").isLength({ max: 20 }),
	body("email").isEmail(),
	body("role").notEmpty(),
	body("password").isLength({ min: 8 }),
	async (req, res) => {
		upload(req, res, async (uploadErr) => {
			// file upload error
			if (uploadErr) {
				// return res.status(422).json({ message: uploadErr.message });
				return res
					.status(422)
					.json({ message: "Error processing file" });
			}

			const { firstName, lastName, email, password, role } = req.body;

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

			// Check if user exists
			const exists = await User.exists({ email });
			if (exists) {
				return res
					.status(409)
					.json({ message: "User with this email already exists" });
			}

			const user = new User({
				firstName,
				lastName,
				email,
				role,
				password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
			});
			if (req.file) {
				user.profilePicture = req.file.filename;
			}

			await user.save();
			res.json({
				message: "User created",
				firstName,
				lastName,
				email,
			});
		});
	}
);

module.exports = router;
