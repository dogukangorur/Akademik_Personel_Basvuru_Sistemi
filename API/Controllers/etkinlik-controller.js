const connection = require("../Service/connection.js");

exports.etkinlikGetir = async (req, res) => {
    const q = "select * from etkinlik";
    connection.query(q, (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: error.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "bulunamadı." });
        }
        return res.json(data);
    });
};




