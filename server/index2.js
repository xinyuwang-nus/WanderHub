import { connectToDatabase } from "./mongodb.js";
import apiRoutes from "./routes.js";
export default async function handler(req, res) {
  try {
    // Connect to MongoDB
    const db = await connectToDatabase();
    // Inject the database into routes
    await apiRoutes(req, res, db);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}