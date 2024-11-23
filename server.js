import Express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors'; // to allow cross-origin requests
import dotenv from "dotenv"; // to read .env file

dotenv.config({ path: ".env.local" });

const app = Express();
app.use(cors());

// Middleware to parse JSON body
app.use(Express.json());

var CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
var DATABASE_NAME="WanderHub"

var database;
const port = 5038;

// Connect to MongoDB first, then start the server
MongoClient.connect(CONNECTION_STRING)
  .then((client) => {
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connected successfully");

    // Start the server after the database connection is established
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });

app.get("/api/trips", async (req, res) => {
  try {
    const trips = await database.collection("trips").find({}).toArray();
    res.status(200).send(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).send("Failed to fetch trips");
  }
})

app.post("/api/trips", async (req, res) => {
  try {
    const trip = req.body;
    const collection = database.collection("trips");
    const result = await collection.insertOne(trip);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).send("Failed to save trip");
  }
});

