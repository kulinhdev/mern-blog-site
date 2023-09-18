const express = require("express");

const userController = require("../../../controllers/client/userController");
const router = express.Router();

router.put("/update-profile", userController.updateProfile);

router.put("/update-password", userController.updatePassword);

module.exports = router;
