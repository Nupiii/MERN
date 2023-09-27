import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTED_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}))
app.use("/users", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
    const { name } = req.body;
    console.log(name);
    console.log(req.body.name);
    res.send("it is working")
    
})

app.use(errorMiddleware);



