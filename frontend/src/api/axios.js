import axios from 'axios'

const API = axios.create({
  baseURL: 'https://your-backend-url.vercel.app/api',
  withCredentials: true
});

export default API