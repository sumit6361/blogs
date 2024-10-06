import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../axiosClient";
import { BlogForm } from "../components/BlogForm";

export const BlogEditPage = () => {
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { blogId } = useParams();

  useEffect(() => {
    console.log(`${BASE_URL}/blogs/${blogId}`);
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/blogs/${blogId}`);
        if (!data.blog) navigate("/");
        setBlog(data.blog);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        navigate("/");
      }
    })();
  }, [blogId]);
  console.log("isLoading: ", isLoading);
  if (isLoading) return <></>;

  return <BlogForm initialData={blog} />;
};
