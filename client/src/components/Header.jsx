import { useState } from "react";
import { useAuth } from "../useAuth";
import { Link } from "react-router-dom";

export const Header = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl font-bold text-gray-800">My Blog</h1>
        </Link>

        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="text-gray-800 hover:text-blue-500">
                Home
              </Link>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/blogs/create"
                    className="text-gray-800 hover:text-blue-500"
                  >
                    Create
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-blogs"
                    className="text-gray-800 hover:text-blue-500"
                  >
                    My Blogs
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-blue-500 bg-gray-200 px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/sign-in">
                    <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                      Login
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
