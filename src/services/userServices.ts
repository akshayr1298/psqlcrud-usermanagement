import pool from "../utils/database/databaseConfig";

const userServices = {
  async getProfile(id: string) {
    try {
      const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      return user.rows[0];
    } catch (error: any) {
      throw new Error(error);
    }
  },

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
};

export default userServices;
