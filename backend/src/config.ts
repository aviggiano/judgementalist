import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  db: process.env.DB || "db.json",
};

export default config;
