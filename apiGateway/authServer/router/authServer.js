const authServerRouter = require("express").Router();
const authServerLoginRouter = require("./authServerLoginRouter");
const authServerSignupRouter = require("./authServerSignupRouter");

authServerRouter.get("/", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3002/");
    const { message } = await response.json();
    res.send("API Gateway: " + message);
  } catch (error) {
    res.send("API Gateway: Error in fetching data from Auth Server.");
  }
});

authServerRouter.use("/login", authServerLoginRouter);
authServerRouter.use("/signup", authServerSignupRouter);


module.exports = authServerRouter;