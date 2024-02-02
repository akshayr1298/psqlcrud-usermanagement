"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const pool = new Pool({
//     user : "akshay",
//     database:"perntodo",
//     password:"akshay@151298",
//     port:5432
// })
const pool = new Pool({
    user: process.env.DATABASEUSER,
    database: process.env.DATABASENAME,
    password: process.env.DATABASEPASSWORD,
    port: 5432
});
exports.default = pool;
