/* eslint-disable @typescript-eslint/naming-convention */
import db from '../db/db';

const userController = {
  async getUser(userId: number | null, googleId?: string) {
    let queryString = 'SELECT * FROM google_users WHERE ';
    if (userId) {
      queryString += `_id=${userId};`;
    }
    if (googleId) {
      queryString += `google_id='${googleId.toString()}';`;
    }
    const userInfo = await db.query(queryString);
    return userInfo.rows[0];
  },

  async addUser(userProfile) {
    const {
      id, display_name, family_name, given_name, email_verified, verified, language, picture,
    } = userProfile;

    let queryString = 'INSERT INTO google_users (google_id, display_name, family_name, given_name, email_verified, verified, language, picture) ';
    queryString += 'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning _id;';
    const insertionValues = [id, display_name, family_name, given_name,
      email_verified, verified, language, picture];
    const userId = await db.query(queryString, insertionValues);
    console.log(userId);
    return userId.rows[0]._id;
  },
};

export default userController;
