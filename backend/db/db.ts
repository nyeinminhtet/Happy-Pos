import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "anni27420",
  database: "SarrMal",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
