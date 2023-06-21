const express = require("express");
const router = express.Router();

const apiRoutes = require("../routes/api/api.Routes");
const backendRoutes = require("../routes/backend/backend.Routes");

router.use("/api", apiRoutes);
router.use("/", backendRoutes);

module.exports = router;
