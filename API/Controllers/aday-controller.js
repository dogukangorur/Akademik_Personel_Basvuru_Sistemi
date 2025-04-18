// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const connection = require("../Service/connection.js");
const axios = require("axios");
const bodyParser = require("body-parser");

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


exports.postAdayKayit = async (req, res) => {

    const { tc, ad, soyad, dogumYili, telNo, kurum, email, kadroId, sifre} = req.body;
    
        if (![tc, ad, soyad, dogumYili, telNo, kurum, email, kadroId, sifre].every(Boolean)) {
            return res.status(400).json({ success:false, message: "Eksik bilgi girdiniz!" });
        }
        const yil = dogumYili.split("-")[0];
        const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
        <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                         xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                         xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
          <soap12:Body>
            <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
              <TCKimlikNo>${tc}</TCKimlikNo>
              <Ad>${ad}</Ad>
              <Soyad>${soyad}</Soyad>
              <DogumYili>${yil}</DogumYili>
            </TCKimlikNoDogrula>
          </soap12:Body>
        </soap12:Envelope>`;
    
        try {
            const { data } = await axios.post("https://tckimlik.nvi.gov.tr/service/kpspublic.asmx", soapRequest, {
                headers: {
                    "Content-Type": "application/soap+xml; charset=utf-8"
                }
            });
    
            const result = data.match(/<TCKimlikNoDogrulaResult>(.*?)<\/TCKimlikNoDogrulaResult>/);
            if (result && result[1] === "true") {
                // Veritabanına kaydet
                const q = `INSERT INTO kullanici (ad, soyad, tc, telNo, mail, sifre, kurumu, bulundugu_kadro_id, dogum_tarihi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values =[ad, soyad, tc, telNo, email, sifre, kurum, kadroId, dogumYili]
                connection.query(q, values, (err, result) => {

                    if (err) {
                        return res.status(500).json({ message: "Veritabanı hatası", details: err.message });
                    }
                    return res.json({ success: true, message: "Kullanıcı kaydedildi!" });
                });
            } else {
                return res.status(400).json({ success: false, message: "Kimlik doğrulama başarısız!" });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message, details: error.message });
        }

};