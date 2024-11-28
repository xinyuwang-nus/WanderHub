import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Link } from "react-router-dom";

// TODO: send email
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5038/api/forgot-password", { email }); // TODO
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(error.response?.data?.error || "Failed to process request.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleResetPassword}
        className="p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>
        <div className="mb-6">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
                  {message && <p className="text-green-500">{message}</p>}
                  {error && <p className="text-red-500">{error}</p>}
        </div>
        <Button type="submit" variant="secondary" className="w-full">
          Reset Password
        </Button>
        <div className="text-center mt-4">
          <Link to="/sign-in" className="text-black font-normal">
            Remember your password? Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;