require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/users");

module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

  try {
    const existingUser = await User.findOne({ email, username });
    if (existingUser) return res.status(400).send("User already exists");

    if (password !== confirmPassword)
      return res.status(400).send("password do not match!");

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).send({ result, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error while registering.");
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).send("User with the given credentials not found.");

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) return res.status(402).send("Invalid credentials");

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({ result: existingUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internally something went wrong.");
  }
};
