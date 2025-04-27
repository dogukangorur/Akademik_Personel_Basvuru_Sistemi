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