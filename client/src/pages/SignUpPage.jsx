import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { saveAuthToken } from "../lib/utils";
import axios from "axios";
import { BASE_URL } from "../axiosClient";
import { useAuth } from "../useAuth";
import { DemarcationLine } from "./LoginPage";
// import { LoginButton } from "../components/LoginButton";

export const SignUpPage = () => {
  const { handleSetLogin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    // Handle signup logic
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signup`, {
        email,
        password,
      });

      handleSetLogin(data.token);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "User already exist ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Join Us</h2>
      <p className="text-center text-gray-600 mb-6">
        Create an account to get started
      </p>
      {error ? (
        <p className="text-red-400 italic text-md text-center">{error}</p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
      {/* <DemarcationLine />
      <LoginButton buttonText="Sign Up with Google" /> */}

      <p className="mt-4 text-center text-gray-600">
        Already have an account?
        <button
          onClick={() => navigate("/sign-in")} // Adjust path for your Login page
          className="text-blue-600 hover:underline ml-1"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};
