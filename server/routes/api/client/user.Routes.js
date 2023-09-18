const express = require("express");

const userController = require("../../../controllers/client/userController");
const router = express.Router();

router.put("/update-profile", userController.updateProfile);

module.exports = router;
