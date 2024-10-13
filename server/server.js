require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnection = require("./Database/dbConnection");
const router = require("./Routes/problemRoutes");
const authRouter = require("./Routes/authRouter");
const cookieParser = require("cookie-parser");
// const problemRoutes = require('./routes/problemRoutes');

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use('/api/problems', problemRoutes);

// Connect to MongoDB

dbConnection();
app.use("/api/", router);
app.use("/api/auth", authRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
