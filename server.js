import express from "express";
import 'dotenv/config';
import db from './database/db.js'
import cors from 'cors';
import todoRouter from "./routes/Todo.router.js";
import userRouter from "./routes/User.router.js";
import { authRouter } from "./routes/Auth.router.js";

const PORT = process.env.PORT ?? 8000;
const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// connect database
db.connect()
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((err) => {
        console.log("Database connection failed : ", err);
    });


//routes
app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)


//server running 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})