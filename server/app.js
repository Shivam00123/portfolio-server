const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
const experienceRouter = require("./Routes/experienceRouter");
const companyProjectsRouter = require("./Routes/companyProjectsRouter");
const personalProjectsRouter = require("./Routes/personalProjectsRouter");
const resumeRouter = require("./Routes/resumeRouter");
const authRouter = require("./Routes/authRoutes");
const globalErrorHandler = require("./controllers/errorController");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Include credentials in CORS requests
};

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());

app.use("/v1/experiences", experienceRouter);
app.use("/v1/companyProjects", companyProjectsRouter);
app.use("/v1/personalProjects", personalProjectsRouter);
app.use("/v1/resume", resumeRouter);
app.use("/v1/user", authRouter);

app.use(globalErrorHandler);

module.exports = app;
