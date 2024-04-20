const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");

require("dotenv").config();
// Middleware Connections
app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Auth Server Ready." });
});
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

// Connection
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Auth Server running on port: " + PORT);
  // Mongo DB Connections
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Auth Server Connected to MongoDB.");
    })
    .catch((error) => {
      console.log("Error in DB connection: " + error);
    });
});
