import dotenv from "dotenv";
import { Pool } from "pg";
import config from "./config";
dotenv.config();

const clint = new Pool({
  port: parseInt(config.dbPort as string, 10),
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  max: 4,
});

export default clint;
