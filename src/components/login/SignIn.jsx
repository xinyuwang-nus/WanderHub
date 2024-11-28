import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5038/api/login", {
        email,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      window.location.href = "/user-trip"; // Redirect to user trip page after login
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError(error.response?.data?.error || "Failed to sign in.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Sign In
        </Button>
        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-500">
            Register
          </Link>{" "}
          |{" "}
          <Link to="/forget-password" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;