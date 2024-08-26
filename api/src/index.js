import app from "./app.js";
import { db } from "./config/db.js";
import { docs } from "./docs/swagger.js";

async function main() {
  try {
    await db.authenticate();
    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
    docs(app);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
