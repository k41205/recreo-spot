import axios from "axios";
import { serviceUrl } from "./fixtures.js";

export const recreospotService = {
  recreospotUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.recreospotUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.recreospotUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.recreospotUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteUser(id) {
    const res = await axios.delete(`${this.recreospotUrl}/api/users/${id}`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.recreospotUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.recreospotUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },
};
