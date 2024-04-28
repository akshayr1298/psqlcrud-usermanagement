import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user :process.env.DATABASEUSER as string,
    database:process.env.DATABASENAME as string,
    password:process.env.DATABASEPASSWORD as string,
    port:5432 
})


export default pool;