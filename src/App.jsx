import { useState, useEffect } from "react";
import axios from "axios";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import "./App.css";

const API_URL = "http://localhost:3000/posts";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data);
    } catch (err) {
      setError("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  const addBlog = async (newBlog) => {
    try {
      const response = await axios.post(API_URL, newBlog);
      setBlogs((prevBlogs) => [...prevBlogs, response.data]);
    } catch (err) {
      setError("Failed to add blog.");
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (err) {
      setError("Failed to delete blog.");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Simple Blog App</h1>
      <BlogForm addBlog={addBlog} />
      {loading && <p className="loading">Loading blogs...</p>}
      {error && <p className="error">{error}</p>}
      <BlogList blogs={blogs} deleteBlog={deleteBlog} />
    </div>
  );
};

export default App;
