import app from "./app.js";
import { db } from "./config/db.js";

async function main() {
  try {
    await db.sync({ force: false });
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
