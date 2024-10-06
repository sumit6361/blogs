import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../axiosClient";

export const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/blogs`);
        setBlogs(data.blogs);
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, []);

  return (
    <div className="">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to My Blog
          </h2>
          <p className="text-gray-600">
            A place where I share my thoughts, tutorials, and ideas.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Post */}

          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};
