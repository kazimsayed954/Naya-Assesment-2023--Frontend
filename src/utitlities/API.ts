import axios from 'axios';

// const BASE_URL = "http://localhost:7899/";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_KEY;

const headers = {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "true",
}

const defaultConfiguration = {
    baseURL: BASE_URL,
    headers,
}
export const api = axios.create(defaultConfiguration);

const token = localStorage.getItem("id-token");

export const apiWithToken = axios.create({
    baseURL: BASE_URL,
    headers: {
      ...headers,
      // Add the token to the Authorization header if it exists
      Authorization: token ? token : "",
    },
  });

