// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import agoraRoutes from "./routes/agora.js"; // extension .js is required in ESM


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/agora", agoraRoutes);

app.get("/", (req, res) => {
  res.send("✅ Agora ESM Server is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {

    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
  }
});
