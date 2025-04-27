// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const connection = require("../Service/connection.js");
const axios = require("axios");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const puppeteer = require('puppeteer');


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
}

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

}


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
}

exports.profilMakaleKayit = async (req,res) =>{

    try {
        const { kullaniciId, makaleler } = req.body;
        const makalelerParsed = JSON.parse(makaleler);
    
        const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
        if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
    
        const values = [];
    
        for (let i = 0; i < makalelerParsed.length; i++) {
          const makale = makalelerParsed[i];
          const dosya = req.files[i]; 

        if (dosya) {
            const tamYol = path.join(dosyaKlasoru, makale.fileName);
            fs.writeFileSync(tamYol, dosya.buffer);
        }

    
          values.push([
            parseInt(kullaniciId),
            parseInt(makale.faaliyet),
            makale.yazar,
            makale.baslik,
            makale.dergi,
            makale.cilt,
            makale.sayfa,
            makale.yil,
            makale.makaleUrl,
            makale.isBaslicaYazar || false,
            makale.isAsgariCalisma || false,
            parseInt(makale.kisiSayisi)
          ]);
        }
    
        const q = `
        INSERT INTO Makaleler (
          kullanici_id, etkinlik_id, yazarlar, makale_adi, dergi_adi,
          cilt_no, sayfa_no, yıl, makale_url,
          isBaslicaYazar, isAsgariCalisma,kisiSayisi
        )
        VALUES ?
      `;

      connection.query(q, [values], (err, result) => {
        if (err) {
          console.error("Veritabanı hatası:", err);
          return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
        }
      
        return res.json({ success: true });
      });
    
       
      } catch (err) {
        console.error("Hata:", err);
        res.status(500).json({ success: false, message: err.message });
      }

}


exports.profilBilimselKayit = async (req,res) =>{

    try {
        const { kullaniciId, bilimsel } = req.body;
        const bilimselParsed = JSON.parse(bilimsel);
    
        const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
        if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
    
        const values = [];
    
        for (let i = 0; i < bilimselParsed.length; i++) {
          const bilimsel = bilimselParsed[i];
          const dosya = req.files[i];
        
        if (dosya) {
            const tamYol = path.join(dosyaKlasoru, bilimsel.fileName);
            fs.writeFileSync(tamYol, dosya.buffer);
        }

    
          values.push([
            parseInt(kullaniciId),
            parseInt(bilimsel.faaliyet),
            bilimsel.yazar,
            bilimsel.bildiriAdi,
            bilimsel.konferansAdi,
            bilimsel.yer,
            bilimsel.sayfa,
            bilimsel.yil,
            bilimsel.bilimselUrl,
            bilimsel.isBaslicaYazar || false,
            bilimsel.isAsgariCalisma || false,
            parseInt(bilimsel.kisiSayisi)
          ]);
        
        }
        
        const q = `
        INSERT INTO BilimselToplantiFaaliyetleri (
          kullanici_id, etkinlik_id, yazarlar, bildiri_adi, konferansin_adi,
          yapildigi_yer, sayfa_no, tarih, bilimsel_url,
          isBaslicaYazar, isAsgariCalisma,kisi_sayisi
        )
        VALUES ?
      `;

      connection.query(q, [values], (err, result) => {
        if (err) {
          console.error("Veritabanı hatası:", err);
          return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
        }
      
        return res.json({ success: true });
      });
      
   
      } catch (err) {
        console.error("Hata:", err);
        res.status(500).json({ success: false, message: err.message });
      }

}

exports.profilKitaplarKayit = async (req,res) =>{

    try {
        const { kullaniciId, kitaplar } = req.body;
        const kitaplarParsed = JSON.parse(kitaplar);
    
        const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
        if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
    
        const values = [];
    
        
        for (let i = 0; i < kitaplarParsed.length; i++) {
          const kitap = kitaplarParsed[i];
          const dosya = req.files[i]; 

          if (dosya && kitap.fileName) {
            const tamYol = path.join(dosyaKlasoru, kitap.fileName);
            fs.writeFileSync(tamYol, dosya.buffer);
          }

    
          values.push([
            parseInt(kullaniciId),
            parseInt(kitap.faaliyet),
            kitap.yazar,
            kitap.kitapAdi,
            kitap.yer,
            kitap.baskiSayisi,
            kitap.yil,
            kitap.kitaplarUrl,
            kitap.isBaslicaYazar || false,
            kitap.isAsgariCalisma || false,
            parseInt(kitap.kisiSayisi)
          ]);
        }
        const q = `
        INSERT INTO Kitaplar (
          kullanici_id, etkinlik_id, yazarlar, kitap_adi, yayinlandigi_yer,
          baski_sayisi, tarih, kitaplar_url,
          isBaslicaYazar, isAsgariCalisma,kisi_sayisi
        )
        VALUES ?
      `;

      connection.query(q, [values], (err, result) => {
        if (err) {
          console.error("Veritabanı hatası:", err);
          return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
        }
      
        return res.json({ success: true });
      });
    
       
      } catch (err) {
        console.error("Hata:", err);
        res.status(500).json({ success: false, message: err.message });
      }

}

exports.profilAtiflarKayit = async (req,res) =>{

  try {
      const { kullaniciId, atiflar } = req.body;
      const atiflarParsed = JSON.parse(atiflar);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < atiflarParsed.length; i++) {
        const atif = atiflarParsed[i];
        const dosya = req.files[i]; 

        if (dosya && atif.fileName) {
          const tamYol = path.join(dosyaKlasoru, atif.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(atif.faaliyet),
          atif.yazar,
          atif.atiflarUrl
        ]);
      }
      const q = `
      INSERT INTO Atiflar (
        kullanici_id, etkinlik_id, atifin_yapildigi_eser, atiflar_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" });
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilEgitimKayit = async (req,res) =>{

  try {
      const { kullaniciId, egitimler } = req.body;
      const egitimlerParsed = JSON.parse(egitimler);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < egitimlerParsed.length; i++) {
        const egitim = egitimlerParsed[i];
        const dosya = req.files[i]; 

        if (dosya && egitim.fileName) {
          const tamYol = path.join(dosyaKlasoru, egitim.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(egitim.faaliyet),
          egitim.dersinAdi,
          egitim.programinAdi,
          egitim.egitimDonemi,
          egitim.yil,
          egitim.egitimlerUrl
        ]);
      }
      const q = `
      INSERT INTO EgitimOgretimFaaliyetleri (
        kullanici_id, etkinlik_id, dersin_adi,programin_adi,donemi,yili,egitim_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilTezKayit = async (req,res) =>{

  try {
      const { kullaniciId, tezler } = req.body;
      const tezlerParsed = JSON.parse(tezler);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < tezlerParsed.length; i++) {
        const tez = tezlerParsed[i];
        const dosya = req.files[i]; 

        if (dosya && tez.fileName) {
          const tamYol = path.join(dosyaKlasoru, tez.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(tez.faaliyet),
          tez.ogrenciAdi,
          tez.tezAdi,
          tez.enstutu,
          tez.yil,
          tez.tezlerUrl
        ]);
      }
      const q = `
      INSERT INTO TezYoneticiligi (
        kullanici_id, etkinlik_id, ogrenci_adi,tezin_adi,enstitüsü,yili,tez_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilPatentKayit = async (req,res) =>{

  try {
      const { kullaniciId, patentler } = req.body;
      const patentlerParsed = JSON.parse(patentler);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < patentlerParsed.length; i++) {
        const patent = patentlerParsed[i];
        const dosya = req.files[i]; 

        if (dosya && patent.fileName) {
          const tamYol = path.join(dosyaKlasoru, patent.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(patent.faaliyet),
          patent.patentAdi,
          patent.yil,
          patent.patentlerUrl
        ]);
      }
      const q = `
      INSERT INTO Patentler (
        kullanici_id, etkinlik_id, patent_adi, yili, patent_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilArastirmaKayit = async (req,res) =>{

  try {
      const { kullaniciId, arastirmalar } = req.body;
      const arastirmalarParsed = JSON.parse(arastirmalar);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < arastirmalarParsed.length; i++) {
        const arastirma = arastirmalarParsed[i];
        const dosya = req.files[i]; 

        if (dosya && arastirma.fileName) {
          const tamYol = path.join(dosyaKlasoru, arastirma.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(arastirma.faaliyet),
          arastirma.projeAdi,
          arastirma.projeNumarasi,
          arastirma.projeKurumAdi,
          arastirma.yil,
          arastirma.arastirmalarUrl
        ]);
      }
      const q = `
      INSERT INTO ArastirmaProjeleri (
        kullanici_id, etkinlik_id, projenin_adi, proje_numarasi, proje_kurum, yili, arastirma_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilEditorKayit = async (req,res) =>{

  try {
      const { kullaniciId, editorler } = req.body;
      const editorlerParsed = JSON.parse(editorler);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < editorlerParsed.length; i++) {
        const editor = editorlerParsed[i];
        const dosya = req.files[i]; 

        if (dosya && editor.fileName) {
          const tamYol = path.join(dosyaKlasoru, editor.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(editor.faaliyet),
          editor.dergiAdi,
          parseInt(editor.dergiSayisi),
          editor.yil,
          editor.editorlerUrl
        ]);
      }
      const q = `
      INSERT INTO EditorlukHakemlik (
        kullanici_id, etkinlik_id, derginin_adi, sayisi, yili, editor_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilOdulKayit = async (req,res) =>{

  try {
      const { kullaniciId, oduller } = req.body;
      const odullerParsed = JSON.parse(oduller);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < odullerParsed.length; i++) {
        const odul = odullerParsed[i];
        const dosya = req.files[i]; 

        if (dosya && odul.fileName) {
          const tamYol = path.join(dosyaKlasoru, odul.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(odul.faaliyet),
          odul.kurumAdi,
          odul.yil,
          odul.odullerUrl
        ]);
      }
      const q = `
      INSERT INTO Oduller (
        kullanici_id, etkinlik_id, odul_veren_kurum_adi, yili, odul_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilIdariKayit = async (req,res) =>{

  try {
      const { kullaniciId, idariler } = req.body;
      const idarilerParsed = JSON.parse(idariler);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < idarilerParsed.length; i++) {
        const idari = idarilerParsed[i];
        const dosya = req.files[i]; 

        if (dosya && idari.fileName) {
          const tamYol = path.join(dosyaKlasoru, idari.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(idari.faaliyet),
          idari.gorevBirimi,
          idari.yil,
          idari.idarilerUrl
        ]);
      }
      const q = `
      INSERT INTO IdariGorevlerVeUniversiteyeKatkiFaaliyetleri (
        kullanici_id, etkinlik_id, gorev_birimi, yili, idari_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.profilGuzelSanatlarKayit = async (req,res) =>{

  try {
      const { kullaniciId, guzelSanatlar } = req.body;
      const guzelSanatlarParsed = JSON.parse(guzelSanatlar);
  
      const dosyaKlasoru = path.join(__dirname, "../../STORAGE/profil");
      if (!fs.existsSync(dosyaKlasoru)) fs.mkdirSync(dosyaKlasoru, { recursive: true });
  
      const values = [];
  
      
      for (let i = 0; i < guzelSanatlarParsed.length; i++) {
        const guzelSanat = guzelSanatlarParsed[i];
        const dosya = req.files[i]; 

        if (dosya && guzelSanat.fileName) {
          const tamYol = path.join(dosyaKlasoru, guzelSanat.fileName);
          fs.writeFileSync(tamYol, dosya.buffer);
        }

  
        values.push([
          parseInt(kullaniciId),
          parseInt(guzelSanat.faaliyet),
          guzelSanat.faaliyetAdi,
          guzelSanat.yil,
          guzelSanat.guzelSanatlarUrl
        ]);
      }
      const q = `
      INSERT INTO GuzelSanatlarFaaliyetleri (
        kullanici_id, etkinlik_id, faaliyet_adi, yili, guzel_url
      )
      VALUES ?
    `;

    connection.query(q, [values], (err, result) => {
      if (err) {
        console.error("Veritabanı hatası:", err);
        return res.status(500).json({ success: false, message: "Veritabanı hatası" }); 
      }
    
      return res.json({ success: true });
    });
  
     
    } catch (err) {
      console.error("Hata:", err);
      res.status(500).json({ success: false, message: err.message });
    }

}

exports.veriGetir = async (req, res) => {
  const { kullaniciId } = req.body;
  const q = `
    select * from makaleler m join etkinlik e on e.id=m.etkinlik_id where kullanici_id= ?;
    select * from BilimselToplantiFaaliyetleri b join etkinlik e on e.id=b.etkinlik_id where kullanici_id= ?;
    select * from Kitaplar k join etkinlik e on e.id=k.etkinlik_id where kullanici_id= ?;
    select * from Atiflar a join etkinlik e on e.id=a.etkinlik_id where kullanici_id= ?;
    select * from EgitimOgretimFaaliyetleri etk join etkinlik e on e.id=etk.etkinlik_id where kullanici_id= ?;
    select * from TezYoneticiligi t join etkinlik e on e.id=t.etkinlik_id where kullanici_id= ?;
    select * from Patentler p join etkinlik e on e.id=p.etkinlik_id where kullanici_id= ?;
    select * from ArastirmaProjeleri a join etkinlik e on e.id=a.etkinlik_id where kullanici_id= ?;
    select * from EditorlukHakemlik ed join etkinlik e on e.id=ed.etkinlik_id where kullanici_id= ?;
    select * from Oduller o join etkinlik e on e.id=o.etkinlik_id where kullanici_id= ?;
    select * from IdariGorevlerVeUniversiteyeKatkiFaaliyetleri i join etkinlik e on e.id=i.etkinlik_id where kullanici_id= ?;
    select * from GuzelSanatlarFaaliyetleri g join etkinlik e on e.id=g.etkinlik_id where kullanici_id= ?;
  
  `;
  values =[kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId];
  connection.query(q,values,(error, results) => {
      if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({success:false, message: error.message });
      }
      const [makaleler,BilimselToplantiFaaliyetleri,Kitaplar,Atiflar,
        EgitimOgretimFaaliyetleri,
        TezYoneticiligi,Patentler,
        ArastirmaProjeleri,
        EditorlukHakemlik,
        Oduller,IdariGorevlerVeUniversiteyeKatkiFaaliyetleri,GuzelSanatlarFaaliyetleri
      ] = results;
      return res.json({success:true ,makaleler,BilimselToplantiFaaliyetleri,
        Kitaplar,Atiflar,
        EgitimOgretimFaaliyetleri,
        TezYoneticiligi,Patentler,
        ArastirmaProjeleri,
        EditorlukHakemlik,
        Oduller,IdariGorevlerVeUniversiteyeKatkiFaaliyetleri,GuzelSanatlarFaaliyetleri
      });
  });
}


exports.basvuruGetir = async (req, res) => {
  const { kullaniciId } = req.body;
  const q = `
    select * from basvuru b join ilanlar i on b.ilan_id = i.id join fakulte f on f.id =i.fakulte_id join bolumler bolum on bolum.id = i.bolum_id where aday_id = ?;
  `;
  values =[kullaniciId];
  connection.query(q,values,(error, data) => {
      if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({success:false, message: error.message });
      }

      return res.json({success:true ,data:data});
  });
}


exports.kriterKontrol_1 = async (req, res) => {
  const { kullaniciId, pozisyon } = req.body; 

  try {
    const makaleler = []; 

    const q = `
      SELECT * FROM makaleler m JOIN etkinlik e ON e.id = m.etkinlik_id WHERE kullanici_id = ?;
      SELECT * FROM tezyoneticiligi m JOIN etkinlik e ON e.id = m.etkinlik_id WHERE kullanici_id = ?;
      SELECT * FROM arastirmaprojeleri m JOIN etkinlik e ON e.id = m.etkinlik_id WHERE kullanici_id = ?;
    `;
    
    const values = [kullaniciId,kullaniciId,kullaniciId];


    connection.query(q, values, (error, data) => {
      if (error) {
        console.error('Error executing query:', error);
        return res.status(500).json({ success: false, message: error.message });
      }

      const [makaleler,tezYoneticiligi,arastirmaProjeleri] = data; 

      return this.kriterKontrol_2(req, res, makaleler, pozisyon,tezYoneticiligi,arastirmaProjeleri);
    });
  } catch (error) {
    console.error('Hata:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

exports.kriterKontrol_2 = async (req, res, makaleler, pozisyon,tezYoneticiligi,arastirmaProjeleri) => {
  let a1a2Count = 0;
  let a1a4Count = 0;  
  let a1a5Count = 0;
  let a1a6Count = 0;
  let f1 = 0;
  let f2 = 0;
  let h112 = 0;
  let h1317 = 0;
  let baslicaYazarCount = 0;  
  const etkinlikH112 = [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];
  const etkinlikH1317 = [64, 65, 66, 67, 68];

  makaleler.forEach(makale => {
    if ((makale.etkinlik_id === 1 || makale.etkinlik_id === 2)) {
      a1a2Count += 1;
    }
    if ((makale.etkinlik_id === 1 || makale.etkinlik_id === 4)) {
      a1a4Count += 1;
    }
    if ((makale.etkinlik_id === 1 || makale.etkinlik_id === 5)) {
      a1a5Count += 1;
    }
    if (makale.isBaslicaYazar) {
      baslicaYazarCount += 1;
    }
  });

  tezYoneticiligi.forEach(tez=>{
    if (tez.etkinlik_id === 40) {
      f1 += 1;
    }
    if (tez.etkinlik_id === 41) {
      f2 += 1;
    }
  })

  arastirmaProjeleri.forEach(arastirma=>{
    if (etkinlikH112.includes(arastirma.etkinlik_id)) {
      h112 += 1;
    }
    if (etkinlikH1317.includes(arastirma.etkinlik_id)) {
      h1317 += 1;
    }
  })


  if (pozisyon === 'Dr. Öğr. Üyesi') {
    if (a1a2Count >= 1 && a1a4Count >= 2 && a1a5Count >= 1 && baslicaYazarCount >= 1) {
      return res.json({ success: true, message: "Kriterlere uyuyor." });
    } else {
      return res.json({
        success: false,
        message: 'Kriterlere uymuyor.'
      });
    }
  }
  if (pozisyon === 'Doçent') {
    if (a1a2Count >= 3 && a1a4Count >= 4 && a1a5Count >= 1 && baslicaYazarCount >= 2 && (f1 >= 1 || f2 >= 1) && (h112 >= 1 || h1317 >= 2)) {
      return res.json({ success: true ,message: "Kriterlere uyuyor."});
    } else {
      return res.json({ success: false, message: 'Kriterlere uymuyor.'});
    }
  }

  if (pozisyon === 'Profesör') {
    if (a1a2Count >= 3 && a1a4Count >= 4 && a1a5Count >= 1 && baslicaYazarCount >= 3 && (f1 >= 1 || f2 >= 2) && (h112 >= 1 || h1317 >= 2)) {
      return res.json({ success: true ,message: "Kriterlere uyuyor."});
    } else {
      return res.json({ success: false, message: 'Kriterlere uymuyor.' });
    }
  }
}


exports.puanHesapla = async (req, res) => {
  const { kullaniciId,ilanId,pozisyon} = req.body;
  var makalePuan=0,bilimselPuan=0,kitapPuan=0,atifPuan=0,egitimPuan=0,tezPuan=0,patentPuan=0,arastirmaPuan=0,editorPuan=0,odulPuan=0,idariPuan=0,guzelPuan=0;
  const q = `
    select * from makaleler m join etkinlik e on e.id=m.etkinlik_id where kullanici_id= ?;
    select * from BilimselToplantiFaaliyetleri b join etkinlik e on e.id=b.etkinlik_id where kullanici_id= ?;
    select * from Kitaplar k join etkinlik e on e.id=k.etkinlik_id where kullanici_id= ?;
    select * from Atiflar a join etkinlik e on e.id=a.etkinlik_id where kullanici_id= ?;
    select * from EgitimOgretimFaaliyetleri etk join etkinlik e on e.id=etk.etkinlik_id where kullanici_id= ?;
    select * from TezYoneticiligi t join etkinlik e on e.id=t.etkinlik_id where kullanici_id= ?;
    select * from Patentler p join etkinlik e on e.id=p.etkinlik_id where kullanici_id= ?;
    select * from ArastirmaProjeleri a join etkinlik e on e.id=a.etkinlik_id where kullanici_id= ?;
    select * from EditorlukHakemlik ed join etkinlik e on e.id=ed.etkinlik_id where kullanici_id= ?;
    select * from Oduller o join etkinlik e on e.id=o.etkinlik_id where kullanici_id= ?;
    select * from IdariGorevlerVeUniversiteyeKatkiFaaliyetleri i join etkinlik e on e.id=i.etkinlik_id where kullanici_id= ?;
    select * from GuzelSanatlarFaaliyetleri g join etkinlik e on e.id=g.etkinlik_id where kullanici_id= ?;
    select k.id,k.ad,k.soyad,k.telNo,k.kurumu,kadro.kadro_adi from kullanici k join kadrolar kadro on kadro.id=k.bulundugu_kadro_id where k.id= ?;
  `;
  values =[kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId,kullaniciId];
  connection.query(q,values,async (error, results) => {
      if (error) {
          console.error('Error executing query:', error);
          return res.status(500).json({success:false, message: error.message });
      }
      
      const [makaleler,BilimselToplantiFaaliyetleri,Kitaplar,Atiflar,
        EgitimOgretimFaaliyetleri,
        TezYoneticiligi,Patentler,
        ArastirmaProjeleri,
        EditorlukHakemlik,
        Oduller,IdariGorevlerVeUniversiteyeKatkiFaaliyetleri,GuzelSanatlarFaaliyetleri,kullaniciBilgi
      ] = results;
    
      makaleler.forEach(makale => {
        if(makale.kisiSayisi===1){
          makale.hesapliPuan = 1*makale.puan;
        }
        else if(makale.kisiSayisi===2){
          makale.hesapliPuan = 0.8*makale.puan;
        }
        else if(makale.kisiSayisi===3){
          makale.hesapliPuan = 0.6*makale.puan;
        }
        else if(makale.kisiSayisi===4){
          makale.hesapliPuan = 0.5*makale.puan;
        }
        else if(makale.kisiSayisi>=5 &&makale.kisiSayisi<=9){
          makale.hesapliPuan = (1/makale.kisiSayisi)*makale.puan;
        }
        else{
          makale.hesapliPuan = 0.1*makale.puan;
        }
        makalePuan +=makale.hesapliPuan;
      });

      BilimselToplantiFaaliyetleri.forEach(bilimsel => {
        if(bilimsel.kisi_sayisi===1){
          bilimsel.hesapliPuan = 1*bilimsel.puan;
        }
        else if(bilimsel.kisi_sayisi===2){
          bilimsel.hesapliPuan = 0.8*bilimsel.puan;
        }
        else if(bilimsel.kisi_sayisi===3){
          bilimsel.hesapliPuan = 0.6*bilimsel.puan;
        }
        else if(bilimsel.kisi_sayisi===4){
          bilimsel.hesapliPuan = 0.5*bilimsel.puan;
        }
        else if(bilimsel.kisi_sayisi>=5 &&bilimsel.kisi_sayisi<=9){
          bilimsel.hesapliPuan = (1/bilimsel.kisi_sayisi)*bilimsel.puan;
        }
        else{
          bilimsel.hesapliPuan = 0.1*bilimsel.puan;
        }
        bilimselPuan +=bilimsel.hesapliPuan;
      });

      Kitaplar.forEach(kitap => {
        if(kitap.kisi_sayisi===1){
          kitap.hesapliPuan = 1*kitap.puan;
        }
        else if(kitap.kisi_sayisi===2){
          kitap.hesapliPuan = 0.8*kitap.puan;
        }
        else if(kitap.kisi_sayisi===3){
          kitap.hesapliPuan = 0.6*kitap.puan;
        }
        else if(kitap.kisi_sayisi===4){
          kitap.hesapliPuan = 0.5*kitap.puan;
        }
        else if(kitap.kisi_sayisi>=5 &&kitap.kisi_sayisi<=9){
          kitap.hesapliPuan = (1/kitap.kisi_sayisi)*kitap.puan;
        }
        else{
          kitap.hesapliPuan = 0.1*kitap.puan;
        }
        kitapPuan +=kitap.hesapliPuan;
      });

      Atiflar.forEach(atif => {
        
        atifPuan +=atif.puan;
      });

      EgitimOgretimFaaliyetleri.forEach(egitim => {
        
        egitimPuan +=egitim.puan;
      });

       TezYoneticiligi.forEach(tez => {
        
        tezPuan +=tez.puan;
      });

      Patentler.forEach(patent => {
        
        patentPuan +=patent.puan;
      });

      ArastirmaProjeleri.forEach(arastirma => {
        
        arastirmaPuan +=arastirma.puan;
      });

      EditorlukHakemlik.forEach(editor => {
        
        editorPuan +=editor.puan;
      });

      Oduller.forEach(odul => {
        odulPuan +=odul.puan;
      });

      IdariGorevlerVeUniversiteyeKatkiFaaliyetleri.forEach(idari => {
        idarPuan +=idari.puan;
      });

      GuzelSanatlarFaaliyetleri.forEach(guzel => {
        guzelPuan +=guzel.puan;
      });



      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const content = `
        <html>
    <head>
      <style>
        h3 { background-color:#c4bcba;}
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
          p{
            width:100%;
            text-align:center;
          }
      </style>
    </head>
    <body>
      <div class='satir'>
      <p>ÖĞRETİM ÜYELİKLERİNE ATAMA İÇİN YAPILAN BAŞVURULARDA ADAYLARIN YAYIN, EĞİTİM-ÖĞRETİM VE 
DİĞER FAALİYETLERİNİN DEĞERLENDİRİLMESİNE İLİŞKİN GENEL PUANLAMA BİLGİLERİ</p>
      <table style="witdh:%100;">
        <thead>
          <tr>
            <th colspan=2><h3 style='text-align:center'>Genel Puanlama Bilgileri</h3></th>
          </tr>
        </thead>
        <tbody>
          ${kullaniciBilgi.map(kullanici => {
            const today = new Date();
            const bugun = today.toLocaleDateString('tr-TR');
            return `
              <tr>
                <td>Adı Soyadı</td>
                <td>${kullanici.ad} ${kullanici.soyad}</td>
              </tr>

               <tr>
                <td>Tarih</td>
                <td>${bugun}</td>
              </tr>

               <tr>
                <td>Bulunduğu Kurum</td>
                <td>${kullanici.kurumu}</td>
              </tr>

              <tr>
                <td>Başvurduğu Akademik Kadro</td>
                <td>${pozisyon}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      </div>

${makaleler.length > 0 ? `
    <div class='satir'>
  <h3 style='background-color:#c4bcba;'>Makaleler</h3><em>(Başvurulan bilim alanı ile ilgili tam araştırma ve derleme makaleleri)</em>

    <table>
      <thead>
        <tr>
          <th>Etkinlik</th>
          <th>Yazar/Yazarlar, Makale adı, Dergi adı, Cilt No., Sayfa, Yıl</th>
          <th>Puan</th>
        </tr>
      </thead>
      <tbody>
        ${makaleler.map(makale => {
          const ayarliTarih = new Date(makale.yıl).toLocaleDateString('tr-TR');
          return `
            <tr>
              <td>${makale.aciklama}</td>
              <td>${makale.yazarlar}, ${makale.makale_adi}, ${makale.dergi_adi}, ${makale.cilt_no}, ${makale.sayfa_no}, ${ayarliTarih}</td>
              <td>${makale.hesapliPuan}</td>
            </tr>
          `;
        }).join('')}
        <tr>
          <td colspan=2>TOPLAM PUAN</td>
          <td>${makalePuan}</td>
        </tr>
      </tbody>
    </table>
    </div>
  ` : ''}


  ${BilimselToplantiFaaliyetleri.length > 0 ? `
<div class='satir'>
  <h3>Bilimsel Toplantı Faaliyetleri</h3>
    <table>
      <thead>
        <tr>
          <th>Etkinlik</th>
          <th>Yazar/Yazarlar, Bildiri Adı, Konferansın Adı, Yapıldığı Yer, Sayfa Sayıları ve Tarih</th>
          <th>Puan</th>
        </tr>
      </thead>
      <tbody>
        ${BilimselToplantiFaaliyetleri.map(makale => {
          const ayarliTarih = new Date(makale.tarih).toLocaleDateString('tr-TR');
          return `
            <tr>
              <td>${makale.aciklama}</td>
              <td>${makale.yazarlar}, ${makale.bildiri_adi}, ${makale.konferansin_adi}, ${makale.yapildigi_yer}, ${ayarliTarih}</td>
              <td>${makale.hesapliPuan}</td>
            </tr>
          `;
        }).join('')}
        <tr>
          <td colspan=2>TOPLAM PUAN</td>
          <td>${bilimselPuan}</td>
        </tr>
      </tbody>
    </table>
    </div>
  ` : ''}


${Kitaplar.length > 0 ? `
<div class='satir'>
  <h3>Kitaplar </h3><em>(Yabancı dildeki kitapların puanları 1.5 ile çarpıldıktan sonra hesaplama kullanılır)</em>
    <table>
      <thead>
        <tr>
          <th>Etkinlik</th>
          <th>Yazar/Yazarlar, Kitap Adı, Yayınevi, Baskı sayısı yayımlandığı Yer, Yıl</th>
          <th>Puan</th>
        </tr>
      </thead>
      <tbody>
        ${Kitaplar.map(makale => {
          const ayarliTarih = new Date(makale.tarih).toLocaleDateString('tr-TR');
          return `
            <tr>
              <td>${makale.aciklama}</td>
              <td>${makale.yazarlar}, ${makale.bildiri_adi}, ${makale.kitap_adi}, ${makale.yayinlandigi_yer}, ${ayarliTarih}</td>
              <td>${makale.hesapliPuan}</td>
            </tr>
          `;
        }).join('')}
        <tr>
          <td colspan=2>TOPLAM PUAN</td>
          <td>${kitapPuan}</td>
        </tr>
      </tbody>
    </table>
    </div>
  ` : ''}


${Atiflar.length > 0 ? `
<div class='satir'>
  <h3>Atıflar </h3><em>(Atıf yapan eserlerin belgelenmesi kaydıyla, bu yönetmeliğin Temel İlkeler bölümündeki atıflara ilişkin açıklamalar dikkate alınır)</em>
    <table>
      <thead>
        <tr>
          <th>Etkinlik</th>
          <th>Atıfın Yapıldığı Eser, Atıf Sayısı</th>
          <th>Puan</th>
        </tr>
      </thead>
      <tbody>
        ${Atiflar.map(makale => {
          return `
            <tr>
              <td>${makale.aciklama}</td>
              <td>${makale.atifin_yapildigi_eser}, ${makale.atif_sayisi}</td>
              <td>${makale.puan}</td>
            </tr>
          `;
        }).join('')}
        <tr>
          <td colspan=2>TOPLAM PUAN</td>
          <td>${atifPuan}</td>
        </tr>
      </tbody>
    </table>
    </div>
  ` : ''}


${EgitimOgretimFaaliyetleri.length > 0 ? `
<div class='satir'>
  <h3>Eğitim Öğretim Faaliyetleri </h3><em>(Son üç yılda verdiği dersler, Azami 50 puan, doktora unvanından sonra)</em>
  
    <table>
      <thead>
        <tr>
          <th>Etkinlik</th>
          <th>Dersin Adı, Programın Adı, Dönemi, Yılı</th>
          <th>Puan</th>
        </tr>
      </thead>
      <tbody>
        ${EgitimOgretimFaaliyetleri.map(makale => {
          const ayarliTarih = new Date(makale.yili).toLocaleDateString('tr-TR');
          return `
            <tr>
              <td>${makale.aciklama}</td>
              <td>${makale.dersin_adi}, ${makale.programin_adi}, ${makale.donemi}, ${ayarliTarih}</td>
              <td>${makale.puan}</td>
            </tr>
          `;
        }).join('')}
        <tr>
          <td colspan=2>TOPLAM PUAN</td>
          <td>${egitimPuan}</td>
        </tr>
      </tbody>
    </table>
    </div>
  ` : ''}


${TezYoneticiligi.length > 0 ? `
      <div class='satir'>
      <h3>Tez Yöneticiligi ></h3> <em>(Tamamlanmış olması kaydıyla) </ems
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Öğrenci adı, Tezin Adı, Enstitüsü, Yılı </th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${TezYoneticiligi.map(makale => {
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.ogrenci_adi}, ${makale.tezin_adi}, ${makale.enstitüsü}, ${makale.yili}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${tezPuan}</td>
          <tr>
        </tbody>
      </table>
      </div>
  ` : ''}

${Patentler.length > 0 ? `
      <div class='satir'>
      <h3>Patentler</h3>
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Patent Adı, Yılı</th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${Patentler.map(makale => {
            const ayarliTarih = new Date(makale.yili).toLocaleDateString('tr-TR');
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.patent_adi}, ${ayarliTarih}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${patentPuan}</td>
          <tr>
        </tbody>
      </table>
        </div>
  ` : ''}

${ArastirmaProjeleri.length > 0 ? `

      <div class='satir'>
      <h3>Araştırma Projeleri  </h3>
      <em>(Tamamlanmış veya devam ediyor olmak koşuluyla, projenin en az dokuz ay süreli olduğu ve hakem 
değerlendirilmesinden geçtiği belgelenir ve projenin bütçesi, kabul edildiği yıldaki en son açıklanan memur taban aylık katsayısının en az 4000 katı 
olmalıdır.) </em>
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Projenin Adı, Proje Numarası, Projenin Yürütüldüğü 
Kurumun Adı, Yılı </th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${ArastirmaProjeleri.map(makale => {
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.projenin_adi}, ${makale.proje_numarasi}, ${makale.proje_kurum}, ${makale.yili}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${arastirmaPuan}</td>
          <tr>
        </tbody>
      </table>
       </div>
  ` : ''}


  ${EditorlukHakemlik.length > 0 ? `

           <div class='satir'>
      <h3>Editörlük, Yayın Kurulu Üyeliği Ve Hakemlik Faaliyetleri </h3>
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Derginin Adı, Sayısı, Yılı </th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${EditorlukHakemlik.map(makale => {
            const ayarliTarih = new Date(makale.yili).toLocaleDateString('tr-TR');
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.derginin_adi}, ${makale.sayisi}, ${ayarliTarih}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${editorPuan}</td>
          <tr>
        </tbody>
      </table>
       </div>
  ` : ''}


 ${Oduller.length > 0 ? `
<div class='satir'>
      <h3>Ödüller</h3>
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th> Ödülün Veren Kurul/Kurumun Adı, Yılı  </th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${Oduller.map(makale => {
            const ayarliTarih = new Date(makale.yili).toLocaleDateString('tr-TR');
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.odul_veren_kurum_adi}, ${ayarliTarih}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${odulPuan}</td>
          <tr>
        </tbody>
      </table>
     </div>
  ` : ''}



 ${IdariGorevlerVeUniversiteyeKatkiFaaliyetleri.length > 0 ? `
      <div class='satir'>
      <h3>İdari Görevler Ve Üniversiteye Katkı Faaliyetleri </h3>
      <em> (İdari görevlerde vekaleten de olsa en az 6 ay görev yapmış olmak, aynı anda birden fazla idari görevi olanlar için en yüksek puan dikkate alınır 
ve normal süresi dolup yeniden atamalar ayrıca puanlanır. Bu kısımda en fazla 50 puan dikkate alınır)  </em>
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th> Ödülün Veren Kurul/Kurumun Adı, Yılı  </th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${IdariGorevlerVeUniversiteyeKatkiFaaliyetleri.map(makale => {
            const ayarliTarih = new Date(makale.yili).toLocaleDateString('tr-TR');
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.gorev_birimi}, ${ayarliTarih}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${idariPuan}</td>
          <tr>
        </tbody>
      </table>
   </div>
  ` : ''}

 ${GuzelSanatlarFaaliyetleri.length > 0 ? `
       <div class='satir'>
      <h3>Güzel Sanatlar Faaliyetleri </h3> <em>(Konservatuvar dahil)</em>
      <table>
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th> Faaliyet Adı, Yılı  </th>
            <th>Puan</th>
          </tr>
        </thead>
        <tbody>
          ${GuzelSanatlarFaaliyetleri.map(makale => {
            const ayarliTarih = new Date(makale.yili).toLocaleDateString('tr-TR');
            return `
              <tr>
                <td>${makale.aciklama}</td>
                <td>${makale.faaliyet_adi}, ${ayarliTarih}</td>
                <td>${makale.puan}</td>
              </tr>
            `;
          }).join('')}
          <tr>
            <td colspan=2>TOPLAM PUAN</td>
            <td>${guzelPuan}</td>
          <tr>
        </tbody>
      </table>
        </div>
  ` : ''}

    </body>
  </html>
`;
        const ts= Math.floor(Date.now() / 1000);
        await page.setContent(content);
        await page.pdf({ path: `../STORAGE/puan/${kullaniciBilgi[0].id}_${ilanId}_${ts}.pdf`, format: 'A4' });
        await browser.close();

        if(pozisyon=="Dr. Öğr. Üyesi"){
         var pozisyonYeni="DR. Öğretim Üyesi";
        }
        else{
          var pozisyonYeni=pozisyon;
        }

        const yol = `../STORAGE/puan/${kullaniciBilgi[0].id}_${ilanId}_${ts}.pdf`;

        const today_date = new Date().toISOString().split('T')[0];

        const query = `
        INSERT INTO Basvuru (aday_id,ilan_id,basvuru_tarihi,puanlanan_faaliyet_donemi,basvuru_puan_url)
        VALUES (?,?,?,?,?)
      `;
      values =[kullaniciId,ilanId,today_date,pozisyonYeni,yol];
      connection.query(query,values,(error, data) => {
          if (error) {
              console.error('Error executing query:', error);
              return res.status(500).json({success:false, message: error.message });
          }

          return res.json({success:true ,message:"tablo olusturuldu."});
      });
     
    });
}