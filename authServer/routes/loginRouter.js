const express = require("express");
const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { identifierString, accessString } = req.body;
    console.log("Login Request: ", identifierString, accessString);

    if (!(identifierString && accessString))
      return res.status(400).send("All input is required.");

    const user = await User.findOne({ identifierString });

    if (user && (await bcrypt.compare(accessString, user.accessString))) {
      console.log("auth_server->Login successful");

      const token = jwt.sign(
        { identifierString: user.identifierString, userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.status(200).json({ token, message: "Login successful" });
    } else {
      console.log("auth_server->Invalid credentials");
      res.status(401).json({ message: "auth_server->Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = loginRouter;
