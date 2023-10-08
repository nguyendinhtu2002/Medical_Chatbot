const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/MongoDb.js");
const UserRouter = require("./routers/UserRouter.js");
const MessageRouter = require("./routers/MessageRouter.js");
const GroupRouter = require("./routers/GroupRouter.js");

dotenv.config();
connectDatabase();
app.use(cors());

app.use(express.json());
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/group", GroupRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
