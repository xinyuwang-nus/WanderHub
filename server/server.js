import Express from "express";
import { MongoClient } from "mongodb";
import cors from "cors"; // to allow cross-origin requests
import dotenv from "dotenv"; // to read .env file
import bcrypt from "bcrypt";
import OpenAI from "openai";
import { EXAMPLE_JSON } from "./prompt.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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


const openai = new OpenAI(process.env.OPENAI_API_KEY);
async function generateTravelPlan(destination, duration, traveler, budget, activities) {
  const prompt = `
  Generate Travel Plan for Destination: ${destination}, for ${duration} days for ${traveler}, with hotel budget of ${budget}, with activity preference in ${activities}. 
  The result should follow the example JSON format as shown below (the number of days should follow the duration specified above), and randomize the number of hotels and locations being generated (3 to 6 hotels. For each day, 2 to 4 locations):
  ${EXAMPLE_JSON}
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful travel planner assistant." },
        { role: "user", content: prompt },
      ],
    });

    // console.log("Response from OpenAI:", response.choices[0].message.content);
    return JSON.parse(response.choices[0].message.content); 
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
}



app.post('/api/create-trip', async (req, res) => {
  const { destination, duration, traveler, budget, activities } = req.body;
  try {
    const plan = await generateTravelPlan(destination, duration, traveler, budget, activities);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate travel plan' });
  }
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
    res.status(500).send({ error: "Failed to fetch trip" });
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

app.delete("/api/user-trips/:tripId", async (req, res) => {
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

// User Registration Endpoint
app.post("/api/register", async (req, res) => {
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
app.post("/api/login", async (req, res) => {
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
      { id: user._id, email: user.email },
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

// Endpoint to initiate password reset
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const collection = database.collection("users");

    // Check if user exists
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Generate a password reset token and expiration time
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    const resetTokenExpires = Date.now() + 3600000; // Token valid for 1 hour

    // Update user with reset token
    await collection.updateOne(
      { email },
      { $set: { resetToken: resetTokenHash, resetTokenExpires } }
    );

    // Send password reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you did not request this, please ignore this email.</p>`,
    });

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ error: "Failed to process request." });
  }
});

// Endpoint to reset the password
app.post("/api/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token and new password are required." });
  }

  try {
    const collection = database.collection("users");

    // Find user with matching reset token
    const user = await collection.findOne({ resetToken: { $exists: true } });

    if (!user || !user.resetTokenExpires || Date.now() > user.resetTokenExpires) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    const isTokenValid = await bcrypt.compare(token, user.resetToken);
    if (!isTokenValid) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await collection.updateOne(
      { email: user.email },
      { $set: { password: hashedPassword }, $unset: { resetToken: "", resetTokenExpires: "" } }
    );

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Failed to reset password." });
  }
});


app.get("/api/user-profile", (req, res) => {
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


app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, author, location, mood, date, latitude, longitude } = req.body;

    if (!title || !content || !author || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const collection = database.collection("blogs");
    const result = await collection.insertOne({
      title,
      content,
      author,
      location: location || "Unknown location",
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

app.get("/api/blogs", async (req, res) => {
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

app.post("/api/blogs/like", async (req, res) => {
  const { title } = req.body;
  try {
    const collection = database.collection("blogs");
    const blog = await collection.findOne({ title });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const updatedLikes = (blog.likes || 0) + 1;

    await collection.updateOne({ title }, { $set: { likes: updatedLikes } });

    res.status(200).json({ title, likes: updatedLikes });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Failed to update likes" });
  }
});
app.post("/api/blogs/share", async (req, res) => {
  const { title } = req.body;
  try {
    const collection = database.collection("blogs");
    const blog = await collection.findOne({ title });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const updatedShares = (blog.shares || 0) + 1;

    await collection.updateOne({ title }, { $set: { shares: updatedShares } });

    res.status(200).json({ title, shares: updatedShares });
  } catch (error) {
    console.error("Error updating shares:", error);
    res.status(500).json({ error: "Failed to update shares" });
  }
});
