import React, { useEffect, useState } from "react";
import { BASE_URL } from "../axiosClient";
import axios from "axios";
import { getAuthToken } from "../lib/utils";
import { BlogsTable } from "../components/BlogsTable";

export function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAndSetBlogs = async () => {
    const { data } = await axios.get(`${BASE_URL}/my-blogs`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Add the Bearer token to the headers
      },
    });
    setMyBlogs(data.blogs);
  };
  useEffect(() => {
    (async () => {
      try {
        await fetchAndSetBlogs();
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // Add the Bearer token to the headers
        },
      });

      console.log("dataL ", data);
      await fetchAndSetBlogs();
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return <BlogsTable blogs={myBlogs} onDelete={handleDelete} />;
}
