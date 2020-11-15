import axios from "axios";
import Vue from 'vue'

const API_URL = "/api/hello";

export default {
    async getUser(username) {
        try {
            const response =  await axios.get(`${API_URL}?username=${username}`);

            Vue.notify({
                group: 'foo',
                title: 'User has been found!',
                type:'info'
            });

            return response;
        } catch (error) {
            Vue.notify({
                group: 'foo',
                title: error,
                type:'error'
            });

            return error;
        }
  },
};
