const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

const authServerSignupRouter = express.Router();

authServerSignupRouter.post("/", async (req, res) => {
  try {
    const { identifierString, accessString } = req.body;

    console.log("New User Request: ", identifierString, accessString);

    if (!(identifierString && accessString))
      return res.status(400).send("All input is required.");

    const encryptedAccessString = await bcrypt.hash(accessString, 10);

    const newUser = new User({
      identifierString,
      accessString: encryptedAccessString,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = authServerSignupRouter;
