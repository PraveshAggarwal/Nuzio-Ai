import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
import authRoutes from "./routes/authRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Nuzio AI Backend", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Nuzio AI Server is running on port ${PORT}`);
  connectDB();
});


