const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./handlers/errorHandlers");
const employeeRouter = require("./routes/employeeRoutes");
const shiftRouter = require("./routes/shiftRoutes");
const scheduleRouter = require("./routes/scheduleRoutes");
const availabilityRouter = require("./routes/availabilityRoutes");
const dshRouter = require("./routes/dshRoutes");
const roleRouter = require("./routes/roleRoutes");
const storeRouter = require("./routes/storeRoutes");
const employeeRoleRouter = require("./routes/employeeRoleRoutes");
const employeeStoreRouter = require("./routes/employeeStoreRoutes");
const AnnouncementRouter = require("./routes/AnnouncementRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();
const cors = require("cors");

//MIDDLEWARES
//Set security http headers
app.use(helmet());

//middleware modifies incoming request data
app.use(morgan("dev"));

//500 requests per hour to protect against DOS attacks and brute force
// const limiter = rateLimit({
//   max: 500,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again after an hour",
// });
// app.use("/api", limiter);

// Data sanitazation against XSS
app.use(xss());

//parse cookie
app.use(cookieParser());

//parse body, set limit
app.use(express.json({ limit: "100kb" }));

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use("/.css", express.static(`${__dirname}/public/css`));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
//ROUTES

app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/shifts", shiftRouter);
app.use("/api/v1/schedules", scheduleRouter);
app.use("/api/v1/availabilities", availabilityRouter);
app.use("/api/v1/dsh", dshRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/stores", storeRouter);
app.use("/api/v1/employeeroles", employeeRoleRouter);
app.use("/api/v1/employeestores", employeeStoreRouter);
app.use("/api/v1/announcements", AnnouncementRouter);
app.use("/api/v1/auth", authRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`S4.com${req.originalUrl} does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
