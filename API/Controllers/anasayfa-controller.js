// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const connection = require("../Service/connection.js");
const axios = require("axios");
const bodyParser = require("body-parser");

exports.ilanGetir = async (req, res) => {
    const q = `
       select ilanlar.id, ilanlar.baslik, ilanlar.aranan_sayi, ilanlar.aciklama, ilanlar.durum, DATE_FORMAT(ilanlar.baslangic_tarih, '%d-%m-%Y') as baslangic_tarih, DATE_FORMAT(ilanlar.bitis_tarih, '%d-%m-%Y') as bitis_tarih, fakulte.fakulte_adi, bolumler.bolum_adi, kadrolar.kadro_adi from ilanlar join fakulte on fakulte.id = ilanlar.fakulte_id join bolumler on bolumler.id = ilanlar.bolum_id join kadrolar on kadrolar.id = ilanlar.kadro_id;
    `;
    connection.query(q,(error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({success:false, message: error.message });
        }
        if (data.length === 0) {
            return res.status(404).json({success:false, message: "İlan bulunamadı" });
        }
        return res.json({success:true ,data:data});
    });
};



exports.postAdminGiris = async (req, res) => {

    const q = `
       select * from kullanici join kullaniciroller on kullanici.id = kullaniciroller.kullaniciID where kullanici.tc= ? and kullanici.sifre= ? and rolID= ?
    `;
    const values = [req.body.tc, req.body.sifre, parseInt(req.body.rol)];
    connection.query(q,values,(error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({success:false, message: error.message });
        }
        if (data.length === 0) {
            return res.status(404).json({success:false, message: "Kullanıcı Bulunamadı !!!" });
        }
        return res.json({success:true ,data:data});
    });
};
