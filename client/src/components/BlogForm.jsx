import React, { useState } from "react";
import { getAuthToken } from "../lib/utils";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const BlogForm = ({ initialData }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const notify = () => toast("Blog created!");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);
    // Check if title or description is empty
    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }

    try {
      // await onSubmit({ title, description });
      let url = `${BASE_URL}/blogs`;
      let axiosInstance;

      if (initialData) {
        url += `/${initialData._id}`;
        axiosInstance = axios.put;
        console.log("first: puuuuuttttttttttt ");
      } else {
        axiosInstance = axios.post;
      }

      console.log("urlll: ", axiosInstance);
      const { data } = await axiosInstance(
        url,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`, // Add the Bearer token to the headers
          },
        }
      );
      console.log("data: ", data);
      notify();
      console.log("data.blog._id: ", data.blog);
      navigate(`/blogs/edit/${data.blog._id}`);
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-screen-md w-screen mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        {initialData ? "Edit Blog" : "Create Blog"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="6"
            placeholder="Enter blog description"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {initialData ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};
