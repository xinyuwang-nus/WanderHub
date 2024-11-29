import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../BASE_URL";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
  
      // Store the token in localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage("Login successful!");
  
      // Fetch the user profile after storing the token
      await fetchUserProfile(token);
  
      // Redirect to the previous page, or the user trip history page
      const previousPage = location.state?.from?.pathname || "/user-trip";
      navigate(previousPage);
  
      // Reload the header, to update avatar
      window.location.reload();
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError(error.response?.data?.error || "Failed to sign in.");
    }
  };
  
  // Function to fetch user profile
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user-profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("User profile data: ", data);
  
        // Set the user in localStorage
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignIn}
        className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Sign In
        </Button>
        <div className="text-center mt-4 flex justify-between">
          <Link to="/register" className="text-black font-normal">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
