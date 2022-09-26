import axios from "./axios";

const api = {
  getUsersList: (page, size) =>
    axios.get(`/api/users?page=${page}&size=${size}`),
  modifyUser: (user) => axios.put("/api/users", user),
  addUser: (user) => axios.post("/api/users", user),
  getUser: (uid) => axios.get(`/api/users/${uid}`),
  removeUser: (uid) => axios.delete(`/api/users/${uid}`),

  login: (email) => axios.post("/api/auth/login", { email }),
};

export default api;
