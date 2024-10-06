import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

export const BlogsTable = ({ blogs, onDelete }) => {
  return (
    <div className=" max-w-screen-md w-screen mx-auto">
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Your Blogs</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                Title
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                Description
              </th>
              <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{blog.title}</td>
                  <td className="py-2 px-4 border-b">{blog.description}</td>
                  <td className="py-2 px-4 border-b">
                    <Link
                      to={`/blogs/edit/${blog._id}`}
                      className="text-blue-600 hover:text-blue-800 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => onDelete(blog._id)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-2 px-4 border-b text-center text-gray-600"
                >
                  No blogs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
