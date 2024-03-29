import axios from "axios";
const API = axios.create({ baseURL: "https://tour-server-is2n.onrender.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signUp = (user) => API.post("/users/signup", user);
export const signIn = (user) => API.post("/users/signin", user);


export const createTour = (tour) => API.post("/tours", tour);
export const fetchTours = () => API.get("/tours");
export const fetchTour = (id) => API.get(`/tours/${id}`);
export const fetchTourByUser = (userId) =>
  API.get(`/tours/userTours/${userId}`);
export const fetchTourBySearch = (searchQuery) =>
  API.get(`/tours/tour/search?searchQuery=${searchQuery}`);
export const updateTour = (id, tour) => API.patch(`/tours/${id}`, tour);
export const deleteTour = (id) => API.delete(`/tours/${id}`);
export const likeTour = (id) => API.patch(`/tours/like/${id}`);
export const commentTour = (id, comment) =>
  API.post(`/tours/comment/${id}`, comment);
