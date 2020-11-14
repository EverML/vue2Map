import axios from "axios";
const API_URL = "https://bio.torre.co/api/bios";

export default {
    async getUser(username) {
        try {
            return await axios.get(`${API_URL}/${username}`);
        } catch (error) {
            console.error(error);
            return error;
        }
  },
};
