import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as Routes from "./routes";
import pool from "./utils/database/databaseConfig";
import Logger from "./utils/logger/logger";
import session from "express-session";

dotenv.config();

const app: express.Application = express();
const origin = process.env.ORIGIN;
const secret: string | any = process.env.SESSION_SECRET;

app.use(morgan("dev"));
app.use(helmet());
app.use(
  session({
    secret: secret,
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, maxAge: 3600000  },
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    optionsSuccessStatus: 200,
    origin,
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
  })
);

/* database connect */
pool
  .connect()
  .then(() => {
    Logger.info("database is connected");
  })
  .catch((error: any) =>
    Logger.error("Error connecting to the database", error)
  );

/*application middleware config in routes */
app.get("/", (req: Request, res: Response) => {
  console.log("server is running");
});
Routes.init(app);

// error handling-middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("NOT FOUND") as any;
  error.status = 404;
  next(error);
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went to wong!";
  return res.status(errorStatus).json({
    succes: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 8505;
app.listen(port, () => {
  Logger.info(`[server]: Server is running at port:${port}`);
});
