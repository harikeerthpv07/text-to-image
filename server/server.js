import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Setup CORS with allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://text-to-image-4jnc.vercel.app", // your frontend
  "https://text-to-image-eight-self.vercel.app", // if needed
];

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// Connect to MongoDB
await connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

// Test route
app.get("/", (req, res) => res.send("API Working"));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
