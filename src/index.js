// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import logInRouter from "./routes/login.routes.js";
import homeRouter from "./routes/home.routes.js";

dotenv.config();

// Create an Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/login", logInRouter);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server at http://localhost:${port}`));
