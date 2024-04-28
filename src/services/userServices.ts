
import AppError from "../utils/error/error";
import pool from "../config/database/databaseConfig";

/**
 *  @param {string} id
 */

const userServices = {
  async getProfile(id: string) {
    try {
      // const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = await pool.query(
        `
  SELECT users.id, users.name, users.email,users.phone_number, address.*
  FROM users
  LEFT JOIN address ON users.id = address.user_id
  WHERE users.id = $1`,
        [id]
      );
      
      return user.rows;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        console.error("error", error); // Log the error for debugging
        throw new AppError(500, "Internal Server Error", 500);
      }
    }
  },

  /**
   * @param {string} id
   * @param {string} name
   * @param {string} phoneNumber
   * @returns
   */

  async editProfile(id: string, name: string, phoneNumber: string) {
    console.log(id, name, phoneNumber);
    try {
      const updateProfile = await pool.query(
        "UPDATE users SET name = $1, phone_number = $2 WHERE id = $3",
        [name, phoneNumber, id]
      );
      return updateProfile;
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        console.error("error", error); // Log the error for debugging
        throw new AppError(500, "Internal Server Error", 500);
      }
    }
  },

  /**
   * @param {string} userId
   * @param {any} body
   */

  async addAddress(userid: string, body: any) {
    const { country, state, city, postalcode, streetaddress, landmark } = body;
    try {
      const insert = await pool.query(
        "INSERT INTO address (user_id,country, state, city, postal_code, street_address, landmark) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [userid, country, state, city, postalcode, streetaddress, landmark]
      );
      return insert.rows[0];
    } catch (error: any) {
      console.log("error", error);
      if (error instanceof AppError) {
        throw error;
      } else {
        console.error("error", error); // Log the error for debugging
        throw new AppError(500, "Internal Server Error", 500);
      }
    }
  },
};

export default userServices;
