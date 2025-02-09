// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import emailRouter from "./routes/email.routes.js";
import logInRouter from "./routes/login.routes.js";
import logOutRouter from "./routes/logout.routes.js";
import homeRouter from "./routes/home.routes.js";
import adminRouter from "./routes/admin.routes.js";
import taskRouter from "./routes/task.routes.js";
import statusRouter from "./routes/status.routes.js";
import optionsRouter from "./routes/options.routes.js";

dotenv.config();

// Create an Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", homeRouter);
app.use("/reportes/users", userRouter);
app.use("/reportes/emails", emailRouter);
app.use("/reportes/login", logInRouter);
app.use("/reportes/logout", logOutRouter);
app.use("/reportes/admin", adminRouter);
app.use("/reportes/tasks", taskRouter);
app.use("/reportes/status", statusRouter);
app.use("/reportes/options", optionsRouter);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server at http://localhost:${port}`));
