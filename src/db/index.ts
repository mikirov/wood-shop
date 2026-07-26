import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  // eslint-disable-next-line no-var
  var __obsidianRiverDb: Db | undefined;
  // eslint-disable-next-line no-var
  var __obsidianRiverSql: ReturnType<typeof postgres> | undefined;
}

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!global.__obsidianRiverSql) {
    global.__obsidianRiverSql = postgres(databaseUrl, {
      prepare: false,
      max: 5,
    });
  }

  if (!global.__obsidianRiverDb) {
    global.__obsidianRiverDb = drizzle(global.__obsidianRiverSql, { schema });
  }

  return global.__obsidianRiverDb;
}

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}
