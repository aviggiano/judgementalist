import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  db: process.env.DB || "db.json",
};

export default config;
