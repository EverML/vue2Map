module.exports = (req, res) => {
    const API_URL = "https://bio.torre.co/api/bios";
    const { username } = req.query;

    try {
        const response = await fetch(`${API_URL}/${username}`);
        const data = await response.json();
        return res.send(data);
    } catch (error) {
        return res.send(error);
    }
    
}