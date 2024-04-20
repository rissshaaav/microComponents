const express = require("express");
const authServerLoginRouter = express.Router();

authServerLoginRouter.post("/", async (req, res) => {
  try {
    const { identifierString, accessString } = req.body;
    const loginRequestData = {
      identifierString,
      accessString,
    };
    const authServerUrl = process.env.AUTHSERVER_BASEURL + "/login";

    const response = await fetch(authServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequestData),
    });

    if (response.ok) {
      // Successful login
      const authServerResponse = await response.json();

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        domain: "localhost",
        maxAge: 24 * 60 * 60 * 1000,
      };

      res.status(200).cookie("microServiceAuthToken", authServerResponse.token, options).json({
        message: "Login successful",
        success: true,
        token: authServerResponse.token,
      });
    } else if (response.status === 401) {
      console.log("Invalid credentials");
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      console.log("Unexpected response:", response.status);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = authServerLoginRouter;
