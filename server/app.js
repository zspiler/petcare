const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
