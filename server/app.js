const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
(async function () {
	try {
		await mongoose.connect("mongodb://database:27017");
		console.log("connected to database");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./api/auth"));

// app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
