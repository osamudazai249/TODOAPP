import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import todoRoutes from "./routes/todoServer.js";
import authRoutes from "./routes/authServer.js";

const MONGO=process.env.MONGO_URI

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// connect db
await mongoose.connect(MONGO);

// mount routers
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on ${port}`);
});
