const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.headers["authorization"].replace(/^Bearer\s+/, "");
	if (token == "null") {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const tokenData = jwt.verify(token, process.env.JWT_SECRET);

		req.email = tokenData.email;
		req.userId = tokenData.id;
		req.token = token;

		next();
	} catch (err) {
		// console.log("Middleware error: ");
		// console.log(err);
		// TODO:
		res.status(401).json({ message: "Invalid token" });
	}
};
