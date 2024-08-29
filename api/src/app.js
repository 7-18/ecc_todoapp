import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import commentRouter from "./routes/comment.js";
import viewsRouter from "./routes/views.js";

const app = express();

const allowedOrigins = [
  'https://main.d28gtcjq0f5p4y.amplifyapp.com',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type",
}));

app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", viewsRouter);

app.get("/", (req, res) => {
  res.redirect("/api/docs");
});

export default app;