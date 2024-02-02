import pool from "../utils/database/databaseConfig";
import bcrypt from "bcrypt";

const userService = {
  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */

  async signup(name: string, email: string, password: string) {
    try {
      console.log(name, email, password);
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      console.log("user", user.rows[0]);
      const userExist = await pool.query(
        "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS user_exists",
        [email]
      );

      const { user_exists } = userExist.rows[0];

      if (user_exists) {
        throw new Error("This email is already registered try another email");
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      const users = await pool.query(
        "INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING *",
        [name, email, hashedPassword]
      );
      const data = users.rows[0];
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
};

export default userService;
