const express = require("express");
const router = express.Router();

// === Backend routes === \\
router.get(["/", "/home"], (req, res) => {
	res.send({ message: "Hello From Express" });
});
router.get("/*", (req, res) => {
	res.status(404).send("Request Not Found...!");
});

module.exports = router;
