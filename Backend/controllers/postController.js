import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, '../../data.json');

// Utility function to read data.json
const readData = async () => {
    try {
        const data = await fs.readFile(dataFile, 'utf-8');
        return JSON.parse(data) || [];
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

// Utility function to write to data.json
const writeData = async (data) => {
    try {
        await fs.writeFile(dataFile, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

// Fetch all posts
export const getPosts = async (req, res) => {
    const posts = await readData();
    res.json(posts);
};

// Create a new post
export const createPost = async (req, res) => {
    const { title, description } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    const posts = await readData();
    const newPost = {
        id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
        title,
        description
    };

    posts.push(newPost);
    await writeData(posts);

    res.status(201).json(newPost);
};

// Delete a post by ID
export const deletePost = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) return res.status(400).json({ message: "Invalid blog ID" });

    const posts = await readData();
    const updatedPosts = posts.filter(post => post.id !== id);

    if (posts.length === updatedPosts.length) {
        return res.status(404).json({ message: "Post not found" });
    }

    await writeData(updatedPosts);
    res.json({ message: "Post deleted successfully!" });
};