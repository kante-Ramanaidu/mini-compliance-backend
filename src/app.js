import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clientRoutes from "./routes/clientRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// ================== CORS CONFIG ==================
const allowedOrigins = [
  "http://localhost:5173", // React dev server
  process.env.FRONTEND_URL // production frontend URL from .env
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // if you use cookies or auth headers
  })
);

app.use(express.json());

// ================== ROUTES ==================
app.use("/api", clientRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;