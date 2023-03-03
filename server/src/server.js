import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/databaseConfig.js";
import rootPath from "./routes/rootPath.js";
import "./config/passport.js";

dotenv.config({ path: "./.env" });
const app = express();

// Connect to MongoDB
connectDB();

//Api security
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());

// cookie
app.use(cookieParser());

app.set("trust proxy", 1);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_CLIENT_URL
        : process.env.LOCAL_CLIENT_URL,
    credentials: true,
  })
);

// Session
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false,
    proxy: true,
  })
);

// Passport middleware
app.use(passport.initialize());

//Logger
app.use(morgan("tiny"));

// compression
app.use(compression());

// routes
rootPath(app);

/* ------------------------------ errorHandler ------------------------------ */
app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

/* ---------------------------------- port ---------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
