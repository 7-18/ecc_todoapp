import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import commentRouter from "./routes/comment.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", userRouter);
app.use("api/v1", taskRouter);
app.use("api/v1", commentRouter);

app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

export default app;
