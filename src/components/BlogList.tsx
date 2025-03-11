import React from "react";
import "../App.css";

interface Blog {
  id: number;
  title: string;
  description: string;
}

interface BlogListProps {
  blogs: Blog[];
  deleteBlog: (id: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, deleteBlog }) => {
  return (
    <div>
      <h2 className="data-list-title">Blog Posts</h2>
      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs available. Add one!</p>
      ) : (
        <ul className="data-list">
          {blogs.map((blog) => (
            <li key={blog.id} className="data-item">
              <h3 className="data-title">{blog.title}</h3>
              <p className="data-description">{blog.description}</p>
              <button 
                className="delete-button" 
                onClick={() => deleteBlog(blog.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;