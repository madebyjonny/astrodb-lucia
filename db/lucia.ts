import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db, Sessions, Users } from "astro:db";
import { Lucia } from "lucia";

//@ts-ignore - This is a workaround for a bug in the adapter-drizzle package
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
