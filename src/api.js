// src/api.js
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Create axios instance with better configuration
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export const getPosts = () => api.get("/posts");
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const getPost = (id) => api.get(`/posts/${id}`);