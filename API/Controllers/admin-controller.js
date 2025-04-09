// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const { response } = require("express");
const connection = require("../Service/connection.js");

exports.unvanGetir = async (req, res) => {
    const q = "select * from kadrolar order by id asc";
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

exports.bolumGetir = async (req, res) => {
    const fakulteId = req.query.fakulteId;

    let q = "SELECT * FROM bolumler";
    if (fakulteId) {
        q = "SELECT * FROM bolumler WHERE fakulte_id = ?";
    }

    connection.query(q, [fakulteId], (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: error.message });
        }
        if (data.length === 0) {
            return res.status(404).json({ message: "Bölüm bulunamadı." });
        }
        return res.json(data);
    });
};


exports.fakulteGetir = async (req, res) => {
    const q = "select * from fakulte";
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


exports.ilanKayit = async (req, res) => {
   
    const { baslik, fakulteAdi, bolumAdi, arananUnvan, arananKisiSayisi, aciklama, baslangicTarihi, bitisTarihi } = req.body;
    

    const q = `INSERT INTO Ilanlar(fakulte_id,bolum_id,kadro_id,baslik,aranan_sayi,aciklama,durum,baslangic_tarih,bitis_tarih)
       VALUES(?,?,?,?,?,?,?,?,?) 
    `;
    const values = [fakulteAdi,bolumAdi,arananUnvan,baslik,arananKisiSayisi,aciklama,'aktif',baslangicTarihi,bitisTarihi];

    connection.query(q, values, (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ message: error.message });
        }

        return res.status(200).json({ message: 'Kayıt başarıyla yapıldı.' });
        
    });
};

exports.ilanGetir = async (req, res) => {
    const q = `select ilanlar.id, ilanlar.baslik, ilanlar.aranan_sayi, ilanlar.aciklama, ilanlar.durum, ilanlar.baslangic_tarih, ilanlar.bitis_tarih, fakulte.fakulte_adi,bolumler.bolum_adi,kadrolar.kadro_adi 
    from ilanlar join fakulte on ilanlar.fakulte_id=fakulte.id join bolumler on bolumler.id = ilanlar.bolum_id join kadrolar on kadrolar.id=ilanlar.kadro_id`
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