import AppError from "../utils/error/error";
import pool from "../config/database/databaseConfig";
import bcrypt from "bcrypt";
import { QueryResult } from "pg";

const authService = {
  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */

  async signup(name: string, email: string, password: string) {
    try {
      const userExist = await pool.query(
        "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS user_exists",
        [email]
      );

      const { user_exists } = userExist.rows[0];

      if (user_exists) {
        throw new AppError(
          400,
          "This email is already registered try another email",
          400
        );
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const users = await pool.query(
        "INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING *",
        [name, email, hashedPassword]
      );
      const data = users.rows[0];
      return data;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        console.error("error", error); // Log the error for debugging
        throw new AppError(500, "Internal Server Error", 500);
      }
    }
  },

  async signIn(email: string, password: string) {
    try {
      type UserCredentials = {
        id: string;
        name: string;
        email: string;
        password: string;
      };
      const result: QueryResult<UserCredentials> = await pool.query(
        "SELECT id,name,email,password FROM users WHERE email = $1",
        [email]
      );
      const user: UserCredentials = result.rows[0];
      if (!user) {
        throw new AppError(400, "Invalid email", 400);
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new AppError(400, "Invalid password", 400);
      }

      return user;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        console.error("error", error); // Log the error for debugging
        throw new AppError(500, "Internal Server Error", 500);
      }
    }
  },
};

export default authService;
