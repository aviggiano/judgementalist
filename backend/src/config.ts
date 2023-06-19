import dotenv from "dotenv";
dotenv.config();

const path = require('node:path')

const config = {
  port: process.env.PORT || 4000,
  db: process.env.DB || path.join(".data", "db.json"),
};

export default config;
