import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

// const pool = new Pool({
//     user : "akshay",
//     database:"perntodo",
//     password:"akshay@151298",
//     port:5432
// })


const pool = new Pool({
    user :process.env.DATABASEUSER,
    database:process.env.DATABASENAME,
    password:process.env.DATABASEPASSWORD,
    port:5432
})


export default pool;