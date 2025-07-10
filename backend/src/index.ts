import express from "express";
import cors from 'cors'
import { userRouter } from "./routes/user";
import { taskRouter } from "./routes/task";

const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.use('/user', userRouter)

app.use('/task', taskRouter)

app.listen(8080)