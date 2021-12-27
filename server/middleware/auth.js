const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.headers["authorization"].replace(/^Bearer\s+/, "");
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	try {
		const tokenData = jwt.verify(token, process.env.JWT_SECRET);
		req.email = tokenData.email;
		req.userId = tokenData.id;
		req.token = token;

		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token" });
	}
};
