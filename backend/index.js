import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/MongoDb.js";
import UserRouter from "./routers/UserRouter.js";
import MessageRouter from "./routers/MessageRouter.js";
import GroupRouter from "./routers/GroupRouter.js";

const sessions = new Map();

const app = express();

dotenv.config();
connectDatabase();
app.use(cors(
    {
origin: "http://localhost:3000",
    }
));

app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/group", GroupRouter);

// app.use("/api/v1/openai", require("./routers/openRouter.js"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
