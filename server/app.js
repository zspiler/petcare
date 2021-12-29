const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// load env variables from .env
require("dotenv").config();

const app = express();

// Connect to database
(async function () {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log("connected to database");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
})();

app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(express.json({ limit: "200mb" }));
app.use(express.text({ limit: "200mb" }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", require("./api/auth"));
app.use("/api/service", require("./api/service"));
app.use("/api/user", require("./api/user"));
app.use("/api/chat", require("./api/chat"));

app.use("/img", express.static(__dirname + "/public/profile_pictures"));
app.use("/gallery", express.static(__dirname + "/public/galleries"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
