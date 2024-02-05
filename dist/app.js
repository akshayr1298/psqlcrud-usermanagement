"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Routes = __importStar(require("./routes"));
const databaseConfig_1 = __importDefault(require("./utils/database/databaseConfig"));
const logger_1 = __importDefault(require("./utils/logger/logger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const origin = process.env.ORIGIN;
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    optionsSuccessStatus: 200,
    origin,
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE',
}));
/* database connect */
databaseConfig_1.default
    .connect()
    .then(() => {
    logger_1.default.info("database is connected");
})
    .catch((error) => logger_1.default.error("Error connecting to the database", error));
/*application middleware config in routes */
app.get("/", (req, res) => {
    console.log('server is running');
});
Routes.init(app);
// error handling-middleware
app.use((req, res, next) => {
    const error = new Error("NOT FOUND");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went to wong!";
    return res
        .status(errorStatus)
        .json({
        succes: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
const port = process.env.PORT || 8505;
app.listen(port, () => {
    logger_1.default.info(`[server]: Server is running at port:${port}`);
});
