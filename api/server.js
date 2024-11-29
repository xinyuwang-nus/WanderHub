import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./mongodb.js";
// import apiRoutes from "./api.js";
import apiRoutes from "./routes.js";

dotenv.config({ path: ".env.local" });

const app = Express();
const port = 5038;

// Middleware
app.use(cors());
app.use(Express.json());

// Connect to the database and start the server
connectToDatabase()
  .then((db) => {
    console.log("MongoDB Connected successfully");

    // Inject database into routes
    app.use("/api", apiRoutes(db));

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
