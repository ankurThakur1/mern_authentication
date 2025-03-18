const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userProfile } = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth_middleware.js");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, userProfile);


module.exports = router;