import { MongoClient } from "mongodb";
import dotenv from "dotenv"; // to read .env file

dotenv.config({ path: ".env.local" });

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const DATABASE_NAME = "WanderHub";

export async function connectToDatabase() {
  const client = await MongoClient.connect(CONNECTION_STRING);
  return client.db(DATABASE_NAME);
}