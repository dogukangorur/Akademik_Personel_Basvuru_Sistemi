const connection = require("../service/connection.js");

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



exports.bilimselGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 2";
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






exports.kitapGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 3";
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





exports.atifGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 4";
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





exports.egitimGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 5";
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





exports.tezGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 6";
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





exports.patentGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 7";
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




exports.arastirmaGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 8";
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




exports.editorGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 9";
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



exports.odulGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 10";
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





exports.idariGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 11";
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





exports.guzelGetir = async (req, res) => {
    const q = "select * from etkinlik where baslik_id = 12";
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



