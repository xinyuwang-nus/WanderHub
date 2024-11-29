import { MongoClient } from "mongodb";
import dotenv from "dotenv"; // to read .env file

dotenv.config({ path: ".env.local" });

const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const DATABASE_NAME = "WanderHub";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb;
  }

  const client = await MongoClient.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  cachedDb = client.db(DATABASE_NAME);

  console.log("MongoDB Connected successfully");
  return cachedDb;
}


