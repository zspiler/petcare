const express = require("express");
const { validationResult, body, param } = require("express-validator");
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
	//Validate
	//TODO: fix pls (ta validation ne dela idk :leko_serious:)
    // const validationErrors = validationResult(req);
	// if (!validationErrors.isEmpty()) {
	// 	console.log("validation errors");
	// 	console.log(validationErrors.array());
	// 	return res.status(400).json({
	// 		message: "Invalid parameters",
	// 		errors: validationErrors.array(),
	// 	});
	// }

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
			name: req.body.title,
			url: `${destination[destination.length - 1]}/${req.file.filename}`,
		};

		// Insert into db
		const updatedGallery = (
			await User.findOneAndUpdate(
				{
					_id: user._id,
				},
				{
					$push: {
						gallery: picture,
					},
				},
				{
					returnDocument: "after",
				}
			)
		).gallery;

		picture.id = updatedGallery[updatedGallery.length - 1]._id.toString();

		res.json({
			message: "Successfully uploaded picture to gallery",
			picture,
		});
	});
});

// GET api/user/gallery
// Get all photos from user's gallery

router.get("/gallery", auth, async (req, res) => {
	const user = await User.findOne({ email: req.email });
	if (!user) {
		return res.status(409).json({ message: "Could not find user" });
	}
	res.json({
		gallery: user.gallery,
	});
});

// DELETE api/user/gallery/:pictureId
// Delete a picture from user's gallery

router.delete("/gallery/:pictureId", param("pictureId").notEmpty(), auth, async (req, res) => {
	const user = await User.findOne({ email: req.email });
	if (!user) {
		return res.status(409).json({ message: "Could not find user" });
	}

	await User.findOneAndUpdate(
		{ _id: user._id },
		{
			$pull: {
				gallery: {
					_id: req.params.pictureId,
				},
			},
		}
	);

	res.json({
		message: "Picture deleted successfully",
	});
});

// PUT api/user/gallery/:pictureId
// Edit a picture in user's gallery

router.put(
	"/gallery/:pictureId",
	param("pictureId").notEmpty(),
	body("name").notEmpty(),
	auth,
	async (req, res) => {
		// Validate
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			console.log("validation errors");
			console.log(validationErrors.array());
			return res.status(400).json({
				message: "Invalid parameters",
				errors: validationErrors.array(),
			});
		}

		const user = await User.findOne({ email: req.email });
		if (!user) {
			return res.status(409).json({ message: "Could not find user" });
		}

		await User.findOneAndUpdate(
			{ _id: user._id },
			{ $set: { "gallery.$[el].name": req.body.name } },
			{
				arrayFilters: [{ "el._id": req.params.pictureId }],
				new: true,
				returnDocument: "after",
			}
		);

		res.json({
			message: "Picture edited successfully",
		});
	}
);

module.exports = router;
