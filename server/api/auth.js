const express = require("express");
const { check, validationResult, body } = require("express-validator");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const parseGooglePlace = require("parse-google-place");

const router = express.Router();

const User = require("../models/User");

const auth = require("../middleware/auth");

const upload = multer({
	storage: multer.diskStorage({
        destination: function (_, _, cb) {
            cb(null, `${__dirname}/../public/profile_pictures`);
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
}).single("profilePicture");

// POST api/auth/register
// Create new user
var toType = function (obj) {
	return {}.toString
		.call(obj)
		.match(/\s([a-zA-Z]+)/)[1]
		.toLowerCase();
};

router.post(
	"/register",
	body("firstName").notEmpty(),
	body("firstName").isLength({ max: 20 }),
	body("lastName").notEmpty(),
	body("lastName").isLength({ max: 20 }),
	body("email").isEmail(),
	body("role").notEmpty(),
	body("password").isLength({ min: 8 }),
	body("location").notEmpty(),
	async (req, res) => {
		upload(req, res, async (uploadErr) => {
			// file upload error
			if (uploadErr) {
				return res.status(422).json({ message: "Error processing file" });
			}

			const { firstName, lastName, email, password, role } = req.body;
			// location obj needs to be parsed from string form
			const location = JSON.parse(req.body.location);

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

			// Validate and parse location
			const parsedLocation = parseGooglePlace({ address_components: location });
			const country = parsedLocation.countryLong;
			const city = parsedLocation.city;

			if (!country || !city || !["Slovenia"].includes(country)) {
				return res.status(400).json({
					message: "Could not parse 'location' field",
				});
			}

			// Check if user exists
			const exists = await User.exists({ email });
			if (exists) {
				return res.status(409).json({ message: "User with this email already exists" });
			}

			// Save new user
			const user = new User({
				firstName,
				lastName,
				email,
				role,
				country,
				city,
				password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
			});
			if (req.file) {
				user.profilePicture = req.file.filename;
			}
			await user.save();

			// Log user in
			const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "24h",
			});
			res.json({
				message: "Account created",
				token,
				email,
				id: user._id,
			});
		});
	}
);

// POST api/auth/login
// Log user in

router.post(
	"/login",
	body("email").isEmail(),
	body("password").isLength({ min: 8 }),
	async (req, res) => {
		const { email, password } = req.body;

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
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(409).json({ message: "User with this email does not exist" });
		}

		const passwordValid = await bcrypt.compare(password, user.password);

		if (passwordValid) {
			// Create token
			const token = jwt.sign({ email, id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "24h",
			});
			res.json({
				message: "Successfully logged in",
				token,
				user: user,
			});
		} else {
			return res.status(401).json({ message: "Wrong password" });
		}
	}
);

// POST api/auth/user
// Get logged-in user's info

router.get("/user", auth, async (req, res) => {
	const user = await User.findOne({ email: req.email });
	if (!user) {
		return res.status(409).json({ message: "Could not find user" });
	}
	res.json({
		message: "Successfully logged in",
		token: req.token,
		user: user,
	});
});

module.exports = router;
