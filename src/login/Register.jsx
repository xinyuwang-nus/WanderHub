import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "@/components/ui/input";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5038/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/sign-in"), 2000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Register
        </Button>
        <div className="text-center mt-4">
          <Link to="/sign-in" className="text-black font-normal">
            Already have an account? Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
