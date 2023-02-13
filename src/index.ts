import express from "express";
import { DB } from "./database/database";
import usersRouter from "./routes/users.routes";
import groupsRouter from "./routes/groups.routes";

const app = express();
app.use(express.json());

const PORT = 3000;

async function main() {
  try {
    await DB.initDB();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();

app.use("/api/users", usersRouter);
app.use("/api/groups", groupsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
