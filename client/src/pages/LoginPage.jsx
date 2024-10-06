import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { BASE_URL } from "../axiosClient";
import { useAuth } from "../useAuth";
// import { LoginButton } from "../components/LoginButton";

export const DemarcationLine = () => (
  <div className="flex items-center my-4">
    <div className="flex-grow h-px bg-gray-300" />
    <span className="px-4 text-sm text-gray-500">or continue with</span>
    <div className="flex-grow h-px bg-gray-300" />
  </div>
);
export const LoginPage = () => {
  const { handleSetLogin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      handleSetLogin(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setError(error?.response?.data?.message || "User already exist ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">
          Please log in to your account to continue
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
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
        {/* <DemarcationLine />
        <LoginButton buttonText="Login with Google" /> */}
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?
          <button
            onClick={() => navigate("/sign-up")} // Adjust path for your Signup page
            className="text-blue-600 hover:underline ml-1"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
