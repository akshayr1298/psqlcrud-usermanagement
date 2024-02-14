import pool from "../utils/database/databaseConfig";

/**
 *  @param {string} id
 */

const userServices = {
  async getProfile(id: string) {
    try {
      // const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = await pool.query(
        `
  SELECT users.id, users.name, users.email,users.phone_number, address.country, address.state, address.city, address.postal_code, address.street_address, address.landmark
  FROM users
  JOIN address ON users.id = address.user_id
  WHERE users.id = $1`,
        [id]
      );

      return user.rows[0];
    } catch (error: any) {
      throw new Error(error);
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
      throw new Error(error);
    }
  },

  /**
   * @param {string} userId
   * @param {any} body
   */

  async addAddress(userid: string, body: any) {
    const { country, state, city, postalcode, streetaddress, landmark } = body;
    try {
      console.log(
        "data",
        userid,
        country,
        state,
        city,
        postalcode,
        streetaddress,
        landmark
      );

      const insert = await pool.query(
        "INSERT INTO address (user_id,country, state, city, postal_code, street_address, landmark) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [userid, country, state, city, postalcode, streetaddress, landmark]
      );
      return insert.rows[0];
    } catch (error: any) {
      console.log("error", error);

      throw new Error(error);
    }
  },
};

export default userServices;
