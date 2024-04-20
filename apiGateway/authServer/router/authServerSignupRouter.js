const authServerSignupRouter = require("express").Router();

authServerSignupRouter.post("/", async (req, res) => {
  try {
    const { identifierString, accessString } = req.body;
    const signupRequestData = {
      identifierString,
      accessString,
    };
    const authServerUrl = process.env.AUTHSERVER_BASEURL + "/signup";
    const response = await fetch(authServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupRequestData),
    });

    if (response.ok) {
      const authServerResponse = await response.json();
      res.status(200).json({
        message: "Signup successful, Login with your credentials.",
        success: true,
      });
    } else {
      console.log("Unexpected response:", response.status);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = authServerSignupRouter;