import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import commentRouter from "./routes/comment.js";
import viewsRouer from "./routes/views.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
}));
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", viewsRouer);

app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

export default app;
