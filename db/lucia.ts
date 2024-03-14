import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, Sessions, Users } from "astro:db";
import { Lucia } from "lucia";

//@ts-ignore - missmatch between AstroText and SQLiteColumn
const adapter = new DrizzleSQLiteAdapter(db, Sessions, Users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
