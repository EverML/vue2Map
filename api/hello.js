
const  axios  = require("axios");

module.exports = async (req, res) => {
    const API_URL = "https://bio.torre.co/api/bios";

    const { username } = req.query;

    try {
        const response =  await axios.get(`${API_URL}/${username}`);
        
        res.send(response.data.person);
        
    } catch (error) {
        if (error.response) {
            res
            .status(error.response.status)
            .send(error.response.data);
          } else if (error.request) {
            res.status(error.request.status)
            .send(`Can't finish request properly, please try again`);
          } else {
            res.status(500).send('We fucked up');
          }
    }        
}