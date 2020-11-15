import axios from "axios";
const API_URL = "/api/hello";

export default {
    async getUser(username) {
        try {
            return await axios.get(`${API_URL}?username=${username}`);
        } catch (error) {
            console.error(error);
            return error;
        }
  },
};
