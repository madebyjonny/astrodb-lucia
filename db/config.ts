import { column, defineDb, defineTable } from "astro:db";

export const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text({ unique: true }),
    password_hash: column.text(),
  },
});

export const Sessions = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => Users.columns.id }),
    expiresAt: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    Sessions,
  },
});
