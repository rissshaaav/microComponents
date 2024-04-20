const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const authServerRouter = require("./authServer/router/authServer.js");

// Middleware Connections
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Gateway Ready.");
});

app.use("/auth", authServerRouter);
// app.use("/auth/*", authServerRouter);

// Connection
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("API Gateway running on port: " + PORT);
});
