import Express from "express";
import { MongoClient } from "mongodb";
import cors from "cors"; // to allow cross-origin requests
import dotenv from "dotenv"; // to read .env file

dotenv.config({ path: ".env.local" });

const app = Express();
app.use(cors());

// Middleware to parse JSON body
app.use(Express.json());

var CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
var DATABASE_NAME = "WanderHub";

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

app.get("/api/trips/:tripId", async (req, res) => {
  const { tripId } = req.params; // Extract tripId from URL parameters
  try {
    const trip = await database.collection("trips").findOne({ id: tripId });
    if (trip) {
      res.status(200).send(trip);
    } else {
      res.status(404).send({ error: "Trip not found" });
    }
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).send({ error: "Failed to fetch trip"});
  }
});

app.get("/api/user-trips", async (req, res) => {
  const userEmail = req.query.email; // Get email from query parameters
  if (!userEmail) {
    return res.status(400).send({ error: "User email is required" });
  }
  try {
    const trips = await database.collection("trips").find({ email: userEmail }).toArray();
    if (trips) {
      res.status(200).send(trips);
    } else {
      res.status(404).send({ error: "Trips not found" });
    }
  } catch (error) {
    console.error("Error fetching user trips:", error);
    res.status(500).send({ error: "Failed to fetch user trips" });
  }
});


// Endpoint to save unsplash images for a trip

app.post("/api/trip-images", async (req, res) => {
  const { tripId, images } = req.body;

  if (!tripId || !images || !Array.isArray(images)) {
    return res.status(400).json({ error: "Invalid request payload" });
  }

  try {
    const collection = database.collection("tripImages");

    // Use upsert to avoid duplicates
    const result = await collection.updateOne(
      { tripId }, 
      { $set: { images } },
      { upsert: true } // Insert if no document matches
    );

    res.status(200).json({ message: "Images saved/updated successfully", result });
  } catch (error) {
    console.error("Error saving trip images:", error);
    res.status(500).json({ error: "Failed to save trip images" });
  }
});


// Endpoint to retrieve unsplash images for a trip
app.get("/api/trip-images/:tripId", async (req, res) => {
  const { tripId } = req.params;

  try {
    const collection = database.collection("tripImages");
    const entry = await collection.findOne({ tripId });
    if (!entry) {
      return res.status(404).json({ error: "Images not found for the specified tripId" });
    }
    res.status(200).json(entry);
  } catch (error) {
    console.error("Error fetching trip images:", error);
    res.status(500).json({ error: "Failed to fetch trip images" });
  }
});
