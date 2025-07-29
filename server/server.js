import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

// Allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // if using cookies
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

module.exports = app;

app.use(express.json());
app.use(cors());
await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () => console.log("Server running on port" + PORT));
