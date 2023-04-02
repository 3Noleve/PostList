import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_POSTS_APP_API_URL,
});
