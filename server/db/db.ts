import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pgURI = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: pgURI,
});

const db = {
  query: async (text: string, params?: any[], callback?): Promise<any> => {
    const dbResponse = await pool.query(text, params, callback);
    return dbResponse;
  },
};

export default db;
