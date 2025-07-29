import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/mongodb.js";
import userRouter from "../routes/userRoutes.js";
import imageRouter from "../routes/imageRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

connectDB();

export default app;
