export const recreospotService = {
  recreospotUrl: API_BASE_URL,

  async authenticate(user) {
    const response = await axios.post(`${this.recreospotUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

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

  async updateUser(id, updateData) {
    const res = await axios.post(`${this.recreospotUrl}/api/users/${id}`, updateData);
    return res.data;
  },

  async deleteUser(id) {
    const res = await axios.delete(`${this.recreospotUrl}/api/users/${id}`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.recreospotUrl}/api/users`);
    return res.data;
  },

  async getUserFavorites() {
    const res = await axios.get(`${this.recreospotUrl}/api/users/favorites`);
    return res.data;
  },

  async addFavorite(poiId, poiName) {
    const res = await axios.post(`${this.recreospotUrl}/api/users/favorites`, { poiId, poiName });
    return res.data;
  },

  async removeFavorite(poiId) {
    const res = await axios.post(`${this.recreospotUrl}/api/users/favorite/remove`, { poiId });
    return res.data;
  },

  clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async createPoi(poi) {
    const res = await axios.post(`${this.recreospotUrl}/api/pois`, poi);
    return res.data;
  },

  async getPoi(id) {
    const res = await axios.get(`${this.recreospotUrl}/api/pois/${id}`);
    return res.data;
  },

  async getPoisByUser(userId) {
    const res = await axios.get(`${this.recreospotUrl}/api/pois/user/${userId}`);
    return res.data;
  },

  async getPoisPublic() {
    const res = await axios.get(`${this.recreospotUrl}/api/pois/public`);
    return res.data;
  },

  async getPoisCandidate() {
    const res = await axios.get(`${this.recreospotUrl}/api/pois/candidate`);
    return res.data;
  },

  async getAllPois() {
    const res = await axios.get(`${this.recreospotUrl}/api/pois`);
    return res.data;
  },

  async updatePoi(id, updateData) {
    const res = await axios.post(`${this.recreospotUrl}/api/pois/${id}`, updateData);
    return res.data;
  },

  async deletePoi(id) {
    const res = await axios.delete(`${this.recreospotUrl}/api/pois/${id}`);
    return res.data;
  },

  async deleteAllPois() {
    const res = await axios.delete(`${this.recreospotUrl}/api/pois`);
    return res.data;
  },
};
