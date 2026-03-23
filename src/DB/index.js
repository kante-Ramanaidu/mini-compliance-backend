// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// If DATABASE_URL is provided (for deployment like Heroku/Railway), use it.
// Otherwise fallback to local DB config.
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_NAME || "compliance_tracker",
        password: process.env.DB_PASSWORD || "ramkante84",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      }
);

export default pool;