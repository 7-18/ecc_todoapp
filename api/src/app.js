import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import commentRouter from "./routes/comment.js";
import viewsRouter from "./routes/views.js";

const app = express();

const corsOptions = {
  origin: ["https://main.d28gtcjq0f5p4y.amplifyapp.com", "http://localhost:5173", "http://ec2-54-92-235-228.compute-1.amazonaws.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", viewsRouter);

app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

export default app;
