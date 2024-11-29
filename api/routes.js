import { Router } from "express";
import { generateTravelPlan } from "./gpt.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export default function apiRoutes(database) {
  const router = Router();

  router.post('/create-trip', async (req, res) => {
    const { destination, duration, traveler, budget, activities } = req.body;
    try {
      const plan = await generateTravelPlan(destination, duration, traveler, budget, activities);
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate travel plan' });
    }
  });
  
  router.post("/trips", async (req, res) => {
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
  
  router.get("/trips/:tripId", async (req, res) => {
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
      res.status(500).send({ error: "Failed to fetch trip" });
    }
  });
  
  router.get("/user-trips", async (req, res) => {
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
  
  router.delete("/user-trips/:tripId", async (req, res) => {
    const { tripId } = req.params; // Extract tripId from URL parameters
    const userEmail = req.query.email; // Extract user email from query parameters
  
    if (!userEmail) {
      return res.status(400).send({ error: "User email is required" });
    }
  
    try {
      // Find the trip to verify ownership
      const trip = await database.collection("trips").findOne({ id: tripId });
  
      if (!trip) {
        return res.status(404).send({ error: "Trip not found" });
      }
  
      // Check if the user is the owner of the trip
      if (trip.email !== userEmail) {
        return res.status(403).send({ error: "You are not authorized to delete this trip" });
      }
  
      // Proceed with deletion if the user is authorized
      const result = await database.collection("trips").deleteOne({ id: tripId });
  
      if (result.deletedCount === 1) {
        res.status(200).send({ message: "Trip deleted successfully" });
      } else {
        res.status(500).send({ error: "Failed to delete trip" });
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
      res.status(500).send({ error: "An error occurred while deleting the trip" });
    }
  });
  
  
  // Endpoint to save unsplash images for a trip
  router.post("/trip-images", async (req, res) => {
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
  router.get("/trip-images/:tripId", async (req, res) => {
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
  
  // User Registration Endpoint
  router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const usersCollection = database.collection("users");
  
      // Check if the email is already registered
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        name,
        email,
        password: hashedPassword,
      };
  
      const result = await usersCollection.insertOne(newUser);
      res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });
  
  // Endpoint for user login
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
  
    try {
      const collection = database.collection("users");
  
      // Find the user by email
      const user = await collection.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password." });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || "your_secret_key",
        { expiresIn: "1h" } // Token valid for 1 hour
      );
  
      // console.log("Generated Token:", token); 
      res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Failed to process request." });
    }
  });
  
  router.get("/user-profile", (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
      const user = { id: decoded.id, email: decoded.email, name: decoded.name };
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  });
  
  
  router.post("/blogs", async (req, res) => {
    try {
      const { title, content, author, email, location, mood, date, latitude, longitude } = req.body;
  
      if (!title || !content || !author || !date) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const collection = database.collection("blogs");
      const result = await collection.insertOne({
        title,
        content,
        author,
        email,
        location:
          location === "Current Location" && latitude && longitude
            ? `${latitude}, ${longitude}` 
            : location || "Unknown location", 
        mood: mood || "Neutral",
        date,
        latitude: latitude || null, // Include latitude if provided
        longitude: longitude || null, // Include longitude if provided
      });    
  
      res.status(200).json({ message: "Blog saved successfully", result });
    } catch (error) {
      console.error("Error saving blog:", error);
      res.status(500).json({ error: "Failed to save blog" });
    }
  });
  
  router.get("/blogs", async (req, res) => {
    try {
      const collection = database.collection("blogs");
      const blogs = await collection.find().toArray(); // Retrieve all blogs from the collection
  
      if (!blogs.length) {
        return res.status(404).json({ message: "No blogs found" }); // Handle the case of no blogs
      }
  
      res.status(200).json(blogs); // Return the blogs as a JSON array
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });
  
  
  
  router.delete("/blogs/:blogId", async (req, res) => {
    const { blogId } = req.params; // Extract blogId from URL parameters
    const userEmail = req.query.email; // Extract user email from query parameters
  
    if (!userEmail) {
      return res.status(400).send({ error: "User email is required" });
    }
  
    try {
      const blog = await database.collection("blogs").findOne({ _id: new ObjectId(blogId) });
  
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
  
      // Check if the user is the owner of the blog
      if (blog.email !== userEmail) {
        return res.status(403).send({ error: "You are not authorized to delete this blog" });
      }
  
      const result = await database.collection("blogs").deleteOne({ _id: new ObjectId(blogId) });
  
      if (result.deletedCount === 1) {
        res.status(200).send({ message: "Blog deleted successfully" });
      } else {
        res.status(500).send({ error: "Failed to delete blog" });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).send({ error: "An error occurred while deleting the blog" });
    }
  });
  
  router.post("/blogs/like", async (req, res) => {
    const { _id } = req.body; // Expect _id in the request body
  
    if (!_id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }
  
    try {
      const collection = database.collection("blogs");
  
      // Find the blog by its ObjectId
      const blog = await collection.findOne({ _id: ObjectId.createFromHexString(inputId) });
  
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      const updatedLikes = (blog.likes || 0) + 1;
  
      // Update the blog's likes
      await collection.updateOne(
        { _id: ObjectId.createFromHexString(inputId) },
        { $set: { likes: updatedLikes } }
      );
  
      res.status(200).json({ _id, likes: updatedLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
      res.status(500).json({ error: "Failed to update likes" });
    }
  });
  
  
  router.post("/blogs/share", async (req, res) => {
    const { _id } = req.body; // Expect _id in the request body
  
    if (!_id) {
      return res.status(400).json({ error: "Blog ID is required" });
    }
  
    try {
      const collection = database.collection("blogs");
  
      // Find the blog by its ObjectId
      const blog = await collection.findOne({ _id: ObjectId.createFromHexString(inputId) });
  
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      const updatedShares = (blog.shares || 0) + 1;
  
      // Update the blog's shares
      await collection.updateOne(
        { _id: ObjectId.createFromHexString(inputId) },
        { $set: { shares: updatedShares } }
      );
  
      res.status(200).json({ _id, shares: updatedShares });
    } catch (error) {
      console.error("Error updating shares:", error);
      res.status(500).json({ error: "Failed to update shares" });
    }
  });

  return router;
}
