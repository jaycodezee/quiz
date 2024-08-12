// import { Pool } from 'pg';

// const pool = new Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: parseInt(process.env.PG_PORT || '5432'),
// });

// export const query = (text: string, params?: any[]) => pool.query(text, params);


import { MongoClient } from 'mongodb';

const uri:any = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

let db: any = null;

export async function connectToDatabase() {
  if (db) return db;
  try {
    await client.connect();
    db = client.db('quiz'); 
    return db;
  } catch (error) {
    console.error('Failed to connect to the database', error);
    throw new Error('Failed to connect to the database');
  }
}
