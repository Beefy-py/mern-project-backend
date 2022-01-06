const express = require("express");

const { getUsers, registerUser, loginUser } = require("../controllers/users");

const router = express.Router();

router.get("/user-list", getUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
