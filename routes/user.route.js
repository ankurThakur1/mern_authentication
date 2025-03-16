const express = require("express");
const { registerUser, loginUser, userProfile } = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/auth_middleware.js");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, userProfile);


module.exports = router;