const express = require("express");
const axios = require("axios");

const { validationResult, query } = require("express-validator");

const router = express.Router();

// POST api/places
// Search places via Google Places API

router.get("/", query("search").notEmpty(), async (req, res) => {
	// Validate
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		return res.status(400).json({
			message: "Invalid parameters",
			errors: validationErrors.array(),
		});
	}

	const query = req.query.search;

	// TODO: noce se omejit na cities
	axios
		.get(
			`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&types=postal_code&key=${process.env.MAPS_API_KEY}`
		)
		.then((resp) => {
			console.log("RESPONSE:");
			console.log(resp.data);
		})
		.catch((err) => {
			console.log("Error: ");
			console.log(err);
		});

	// process.env.MAPS_API_KEY

	res.send("ok");
});

module.exports = router;
