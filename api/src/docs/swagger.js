import swaggerJsdoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecc TodoApp API",
      description: "A TodoApp (Task Management) API usign Express and Sequelize",
      version: "1.0.0",
    },
    basePath: "/api/v1",
  },
  apis: ["./src/routes/*.js", "./src/config/db.js", "./src/models/*.js"],
};

const specs = swaggerJsdoc(options);

export const docs = (app) => {
  app.use("/api/docs", serve, setup(specs));
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};
