const connection = require("../Service/connection.js");
const nodemailer = require("nodemailer");
const path = require('path');

//**YöneticiIlanJuri.tsx**
const getIlanlarVeJuriDurumu = (req, res) => {
    const sql = `
        SELECT 
            i.id,
            i.baslik AS ilanAdi,
            CONCAT(DATE_FORMAT(i.baslangic_tarih, '%Y-%m-%d'), ' ~ ', DATE_FORMAT(i.bitis_tarih, '%Y-%m-%d')) AS tarihAraligi,
            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM BasvuruJuri bj
                    INNER JOIN Basvuru b ON bj.basvuru_id = b.id
                    WHERE b.ilan_id = i.id
                )
                THEN 'Juri Ataması Yapıldı'
                ELSE 'Juri Ataması Yapılmadı'
            END AS durum
        FROM Ilanlar i
        WHERE i.bitis_tarih < CURRENT_DATE()
        ORDER BY i.baslangic_tarih DESC
    `;

    connection.query(sql, (error, results) => {
        if (error) {
            console.error("İlanlar ve jüri durumu alınırken hata:", error);
            return res.status(500).json({ message: "Sunucu hatası" });
        }

        return res.status(200).json(results);
    });
};

//**YöneticiJuriAtama.tsx**
// 1. İlan bilgilerini getir
const getIlanById = (req, res) => {
    const ilanId = req.params.ilanId;

    const sql = `
        SELECT 
            id, baslik, aciklama,
            (SELECT COUNT(*) FROM Basvuru WHERE ilan_id = ?) AS basvuruSayisi
        FROM Ilanlar
        WHERE id = ?
    `;

    connection.query(sql, [ilanId, ilanId], (err, results) => {
        if (err) {
            console.error("İlan bilgisi alınamadı:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        res.json(results[0]);
    });
};

// 2. İlana atanmış jürileri getir
const getJurilerByIlanId = (req, res) => {
    const ilanId = req.params.ilanId;

    const sql = `
        SELECT k.id, CONCAT(k.ad, ' ', k.soyad) AS adSoyad
        FROM JuriIlan ji
        INNER JOIN Kullanici k ON ji.juri_id = k.id
        WHERE ji.ilan_id = ?
    `;

    connection.query(sql, [ilanId], (err, results) => {
        if (err) {
            console.error("Jüriler alınamadı:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        res.json(results);
    });
};

// 3. Sadece jüri havuzu (rolü 'Jüri' olan kullanıcılar)
const getJuriHavuzu = (req, res) => {
    const sql = `
        SELECT k.id, CONCAT(k.ad, ' ', k.soyad) AS adSoyad
        FROM Kullanici k
        INNER JOIN KullaniciRoller kr ON k.id = kr.kullaniciID
        INNER JOIN Rol r ON kr.rolID = r.id
        WHERE r.tanimlama = 'Jüri'
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Jüri havuzu alınamadı:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        res.json(results);
    });
};

// 4. Tüm kullanıcıları getir (arama için)
const getTumKullanicilar = (req, res) => {
    const sql = `
      SELECT k.id, CONCAT(k.ad, ' ', k.soyad) AS adSoyad
      FROM Kullanici k
      WHERE NOT EXISTS (
        SELECT 1
        FROM KullaniciRoller kr
        JOIN Rol r ON kr.rolID = r.id
        WHERE kr.kullaniciID = k.id AND r.tanimlama = 'Jüri'
      )
    `;
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Jüri olmayan kullanıcılar alınamadı:", err);
        return res.status(500).json({ message: "Sunucu hatası" });
      }
      res.json(results);
    });
  };

// 5. Kullanıcıya jüri yetkisi ver
const yetkilendirJuri = (req, res) => {
    const { kullaniciId } = req.body;

    const sql = `
        INSERT IGNORE INTO KullaniciRoller (kullaniciID, rolID)
        SELECT ?, id FROM Rol WHERE tanimlama = 'Jüri'
    `;

    connection.query(sql, [kullaniciId], (err, result) => {
        if (err) {
            console.error("Jüri yetkisi verilemedi:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        res.json({ success: true, message: "Kullanıcıya jüri yetkisi verildi." });
    });
};

// 6. Jüriyi ilana ata
const juriAta = (req, res) => {
    const { ilanId } = req.params;
    const { juriId } = req.body;

    const sql = `
        INSERT IGNORE INTO JuriIlan (ilan_id, juri_id)
        VALUES (?, ?)
    `;

    connection.query(sql, [ilanId, juriId], (err, result) => {
        if (err) {
            console.error("Jüri ataması yapılamadı:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        res.json({ success: true, message: "Jüri ilana atandı." });
    });
};

// 7. Jüriyi ilandan sil
const juriSil = (req, res) => {
    const { ilanId, juriId } = req.params;

    const sql = `
        DELETE FROM JuriIlan
        WHERE ilan_id = ? AND juri_id = ?
    `;

    connection.query(sql, [ilanId, juriId], (err, result) => {
        if (err) {
            console.error("Jüri silinemedi:", err);
            return res.status(500).json({ message: "Sunucu hatası" });
        }
        res.json({ success: true, message: "Jüri ilandan kaldırıldı." });
    });
};

//YoneticiIlanNihaiKarar.tsx
const getNihaiKararaHazirIlanlar = (req, res) => {
    const query = `
        SELECT 
            i.id AS id,
            i.baslik AS ilanAdi,
            CONCAT(DATE_FORMAT(i.baslangic_tarih, '%d.%m.%Y'), ' - ', DATE_FORMAT(i.bitis_tarih, '%d.%m.%Y')) AS tarihAraligi,
            COUNT(DISTINCT b.id) AS basvuruSayisi,
            COUNT(DISTINCT ji.juri_id) AS juriSayisi,
            COUNT(bj.id) AS yapilanDegerlendirmeSayisi
        FROM Ilanlar i
        JOIN Basvuru b ON b.ilan_id = i.id
        JOIN JuriIlan ji ON ji.ilan_id = i.id
        LEFT JOIN BasvuruJuri bj ON bj.basvuru_id = b.id AND bj.juri_id = ji.juri_id
        GROUP BY i.id
        HAVING (basvuruSayisi * juriSayisi) = yapilanDegerlendirmeSayisi
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Veritabanı hatası:", err);
            return res.status(500).json({ message: "Veri alınırken hata oluştu." });
        }

        res.status(200).json(results);
    });
};

//YoneticiNihaiKarar.tsx
const getIlanBasvurulariVeDegerlendirmeler = (req, res) => {
    const ilanId = req.params.ilanId;

    const query = `
        SELECT 
            b.id AS basvuru_id,
            CONCAT(k_ad.ad, ' ', k_ad.soyad) AS adayAdi,
            'Başvuru Belgesi' AS belgeAdi, 
            k_juri.ad AS juriAd,
            k_juri.soyad AS juriSoyad,
            bj.degerlendime_raporu_doc AS belgeDosyaAdi,
            bj.aciklama AS metin,
            bj.basvuru_degerlendirme_durum AS juriDegerlendirme
        FROM Basvuru b
        JOIN Kullanici k_ad ON k_ad.id = b.aday_id
        JOIN BasvuruJuri bj ON bj.basvuru_id = b.id
        JOIN Kullanici k_juri ON k_juri.id = bj.juri_id
        WHERE b.ilan_id = ?
        ORDER BY b.id, bj.juri_id
    `;

    connection.query(query, [ilanId], (err, results) => {
        if (err) {
            console.error("İlan başvuruları alınırken hata:", err);
            return res.status(500).json({ message: "Veri alınamadı." });
        }

        const grouped = {};
        results.forEach(row => {
            const basvuruId = row.basvuru_id;
            if (!grouped[basvuruId]) {
                grouped[basvuruId] = {
                    id: basvuruId,
                    adayAdi: row.adayAdi,
                    belgeAdi: row.belgeAdi,
                    juriDegerlendirmeleri: []
                };
            }

            const belgeURL = `http://localhost:8080/api/yonetici/download/juri/${row.belgeDosyaAdi}`;


            grouped[basvuruId].juriDegerlendirmeleri.push({
                juriAdi: `${row.juriAd} ${row.juriSoyad}`,
                belgeURL,
                metin: row.metin,
                juriDegerlendirme: row.juriDegerlendirme
            });
        });

        res.status(200).json(Object.values(grouped));
    });
};

// Mail gönderici ayarları
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'umuttepetest@gmail.com', // Buraya kendi mail adresin
        pass: 'yrwe gtou ciqk jqti'      // Buraya Gmail uygulama şifresi (normal şifre değil!)
    }
});

// Nihai Karar Verme ve Mail Gönderme
// Yönetici Nihai Karar Veriyor ve Mail Gönderiliyor
const verNihaiKarar = (req, res) => {
    const { basvuruId, karar } = req.body; // karar: 'Onaylandı' ya da 'Reddedildi'

    if (!basvuruId || !karar) {
        return res.status(400).json({ message: "Başvuru ID ve karar bilgisi gönderilmelidir." });
    }

    // 1. Basvuru durumunu güncelle (Basvuru tablosunda basvuru_durum alanı var)
    const updateQuery = `
        UPDATE Basvuru
        SET basvuru_durum = ?
        WHERE id = ?
    `;

    connection.query(updateQuery, [karar, basvuruId], (updateErr, updateResult) => {
        if (updateErr) {
            console.error("Başvuru durumu güncellenemedi:", updateErr);
            return res.status(500).json({ message: "Başvuru güncellenirken hata oluştu." });
        }

        // Eğer güncelleme başarılıysa, adayın mail adresini alalım
        const getAdayMailQuery = `
            SELECT k.mail, k.ad, k.soyad
            FROM Basvuru b
            JOIN Kullanici k ON b.aday_id = k.id
            WHERE b.id = ?
        `;

        connection.query(getAdayMailQuery, [basvuruId], (mailErr, mailResult) => {
            if (mailErr || mailResult.length === 0) {
                console.error("Aday bilgisi alınamadı:", mailErr);
                return res.status(500).json({ message: "Adayın mail adresi bulunamadı." });
            }

            const adayMail = mailResult[0].mail;
            const adayAdSoyad = `${mailResult[0].ad} ${mailResult[0].soyad}`;

            // 3. Maili oluştur ve gönder
            const subject = karar === "Onaylandı" ? "Akademik Başvurunuz Onaylandı" : "Akademik Başvurunuz Reddedildi";
            const text = karar === "Onaylandı"
                ? `Sayın ${adayAdSoyad},\n\nTebrikler! Akademik personel başvurunuz olumlu sonuçlanmıştır. Detaylar için sisteme giriş yapabilirsiniz.\n\nKocaeli Üniversitesi`
                : `Sayın ${adayAdSoyad},\n\nÜzgünüz, akademik personel başvurunuz olumsuz sonuçlanmıştır. Detaylı bilgi için sisteme giriş yapabilirsiniz.\n\nKocaeli Üniversitesi`;

            const mailOptions = {
                from: '"KOÜ Akademik Personel Sistemi" <umuttepetest@gmail.com>',
                to: adayMail,
                subject,
                text
            };

            transporter.sendMail(mailOptions, (sendErr, info) => {
                if (sendErr) {
                    console.error("Mail gönderimi sırasında hata oluştu:", sendErr);
                    return res.status(500).json({ message: "Başvuru kaydedildi ancak e-posta gönderilemedi." });
                }

                console.log("Mail başarıyla gönderildi:", info.response);
                res.status(200).json({ message: "Başvuru durumu güncellendi ve bilgilendirme maili gönderildi." });
            });
        });
    });
};

//YoneticiFaaliyetTablosu.tsx
// Tüm başlıkları getir
const getBasliklar = (req, res) => {
    const sql = "SELECT * FROM Baslik ORDER BY id";
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Seçilen başlığa ait etkinlikleri getir
const getEtkinliklerByBaslikId = (req, res) => {
    const baslikId = req.params.baslikId;
    const sql = "SELECT * FROM Etkinlik WHERE baslik_id = ? ORDER BY baslık_no";
    connection.query(sql, [baslikId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Yeni etkinlik ekle
const addEtkinlik = (req, res) => {
    const { baslik_id, baslık_no, aciklama, puan } = req.body;
    const sql = "INSERT INTO Etkinlik (baslik_id, baslık_no, aciklama, puan) VALUES (?, ?, ?, ?)";
    connection.query(sql, [baslik_id, baslık_no, aciklama, puan], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Etkinlik eklendi", id: result.insertId });
    });
};

// Etkinlik güncelle
const updateEtkinlik = (req, res) => {
    const etkinlikId = req.params.id;
    const { baslık_no, aciklama, puan } = req.body;
    const sql = "UPDATE Etkinlik SET baslık_no = ?, aciklama = ?, puan = ? WHERE id = ?";
    connection.query(sql, [baslık_no, aciklama, puan, etkinlikId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Etkinlik güncellendi" });
    });
};

// Etkinlik sil
const deleteEtkinlik = (req, res) => {
    const etkinlikId = req.params.id;
    const sql = "DELETE FROM Etkinlik WHERE id = ?";
    connection.query(sql, [etkinlikId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Etkinlik silindi" });
    });
};

//YoneticiEtkinlikSayıKriter.tsx
// Faaliyet kriterlerini listele
const getFaaliyetKriterleri = (req, res) => {
    const sql = `
      SELECT fk.*, fg.fakulte_grup_adi, k.kadro_adi, b.baslik_kod
      FROM FaaliyetKriterleri fk
      JOIN FakulteGrup fg ON fk.fakulte_grup_id = fg.id
      JOIN Kadrolar k ON fk.kadro_id = k.id
      JOIN Baslik b ON fk.baslik_id = b.id
    `;
    connection.query(sql, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  };
  
  
  // Yeni faaliyet kriteri ekle
  const addFaaliyetKriteri = (req, res) => {
    const { baslik_id, baslik_no_min, baslik_no_max, fakulte_grup_id, kadro_id, deger } = req.body;
  
    const sql = `
      INSERT INTO FaaliyetKriterleri
      (baslik_id, baslik_no_min, baslik_no_max, fakulte_grup_id, kadro_id, deger)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [baslik_id, baslik_no_min, baslik_no_max, fakulte_grup_id, kadro_id, deger];
  
    connection.query(sql, values, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
  };
  
  // Faaliyet kriterini güncelle (sadece değer)
  const updateFaaliyetKriteri = (req, res) => {
    const { id } = req.params;
    const { deger } = req.body;
  
    const sql = `UPDATE FaaliyetKriterleri SET deger = ? WHERE id = ?`;
    connection.query(sql, [deger, id], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    });
  };
  
  // Faaliyet kriterini sil
  const deleteFaaliyetKriteri = (req, res) => {
    const { id } = req.params;
  
    const sql = `DELETE FROM FaaliyetKriterleri WHERE id = ?`;
    connection.query(sql, [id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    });
  };

  // Fakülte gruplarını listele
  const getFakulteGruplari = (req, res) => {
    const sql = "SELECT id, fakulte_grup_adi FROM FakulteGrup";
    connection.query(sql, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  };

  //YoneticiEtkinlikPuanKriter.tsx
  // Tüm puan kriterlerini listele
const getPuanKriterleri = (req, res) => {
    const sql = `
      SELECT pk.*, fg.fakulte_grup_adi, k.kadro_adi, b.baslik_kod
      FROM PuanKriterleri pk
      JOIN FakulteGrup fg ON pk.fak_gur_id = fg.id
      JOIN Kadrolar k ON pk.poz_id = k.id
      JOIN Baslik b ON pk.baslik_id = b.id
    `;
    connection.query(sql, (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
  };
  
  // Yeni kriter ekle
  const addPuanKriteri = (req, res) => {
    const { baslik_id, baslik_no_min, baslik_no_max, fak_gur_id, poz_id, asgari, azami } = req.body;
  
    const sql = `
      INSERT INTO PuanKriterleri
      (baslik_id, baslik_no_min, baslik_no_max, fak_gur_id, poz_id, asgari, azami)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [baslik_id, baslik_no_min, baslik_no_max, fak_gur_id, poz_id, asgari, azami];
  
    connection.query(sql, values, (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
    });
  };
  
  
  // Güncelleme
  const updatePuanKriteri = (req, res) => {
    const { id } = req.params;
    const { asgari, azami } = req.body;
  
    const sql = `
      UPDATE PuanKriterleri
      SET asgari = ?, azami = ?
      WHERE id = ?
    `;
    connection.query(sql, [asgari, azami, id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, message: "Kriter başarıyla güncellendi." });
    });
  };
  
  // Silme
  const deletePuanKriteri = (req, res) => {
    const { id } = req.params;
  
    const sql = `DELETE FROM PuanKriterleri WHERE id = ?`;
    connection.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ success: true, message: "Kriter başarıyla silindi." });
    });
  };

  // 📥 Jüri dosyası indirme fonksiyonu
const downloadJuriDosyasi = (req, res) => {
    const fileName = req.params.fileName;

    // Eğer dosya adı boş veya kötü niyetliyse (örneğin ".." gibi) kontrol edelim
    if (!fileName || fileName.includes("..")) {
        return res.status(400).json({ message: "Geçersiz dosya adı." });
    }

    // 📂 Dosya yolu
    const filePath = path.join(__dirname, '../../STORAGE/juri', fileName);

    res.download(filePath, fileName, (err) => {
        if (err) {
            console.error('Dosya indirme hatası:', err);
            return res.status(404).json({ message: 'Dosya bulunamadı veya indirilemedi.' });
        }
    });
};

module.exports = {
    getIlanlarVeJuriDurumu, 
    getIlanById,
    getJurilerByIlanId,
    getJuriHavuzu,
    getTumKullanicilar,
    yetkilendirJuri,
    juriAta,
    juriSil,
    getNihaiKararaHazirIlanlar,
    getIlanBasvurulariVeDegerlendirmeler,
    getBasliklar,
    getEtkinliklerByBaslikId,
    addEtkinlik,
    updateEtkinlik,
    deleteEtkinlik,
    getFaaliyetKriterleri,
    addFaaliyetKriteri,
    updateFaaliyetKriteri,
    deleteFaaliyetKriteri,
    getFakulteGruplari,
    getPuanKriterleri,
    addPuanKriteri,
    updatePuanKriteri,
    deletePuanKriteri,
    verNihaiKarar,
    downloadJuriDosyasi
};
