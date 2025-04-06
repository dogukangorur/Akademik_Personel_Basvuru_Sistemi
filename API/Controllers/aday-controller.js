// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const connection = require("../Service/connection.js");

exports.postAdayGiris = async (req, res) => {
    const q = `
        SELECT
            Kullanici.id AS ID,
            Kullanici.ad AS Ad,
            Kullanici.soyad AS Soyad,
            Kullanici.tc AS TC,
            Kullanici.mail AS Mail,
            Kullanici.kurumu AS Kurumu,
            Kullanici.telNo AS Telefon,
            Kullanici.dogum_tarihi AS DogumTarihi,
            Kullanici.bulundugu_kadro_id AS KadroID,
            Kadrolar.kadro_adi AS Kadro
        FROM
            Kullanici
        INNER JOIN Kadrolar ON Kadrolar.id = kullanici.bulundugu_kadro_id
        WHERE
            Kullanici.tc = ?
        AND Kullanici.sifre = ?
    `;
    const values = [req.body.tc, req.body.sifre];

    connection.query(q, values, (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: error.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        return res.json(data[0]);
    });
};