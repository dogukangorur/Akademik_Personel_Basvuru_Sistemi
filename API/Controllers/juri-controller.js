const connection = require("../Service/connection");
const path = require('path');
const fs = require('fs');

// 🎯 Jüriye atanmış ilanları getir (anasayfa)
const getAssignedIlansForJuri = async (req, res) => {
    const juriId = req.params.juriId;  // juriId parametresini alıyoruz

    const query = `
        SELECT 
            i.id AS ilan_id,
            i.baslik AS ilan_basligi,
            DATE_FORMAT(i.baslangic_tarih, '%d/%m/%Y') AS baslangic_tarih,
            DATE_FORMAT(i.bitis_tarih, '%d/%m/%Y') AS bitis_tarih,
            i.durum,
            k.kadro_adi,
            f.fakulte_adi,
            b.bolum_adi
        FROM JuriIlan ji
        INNER JOIN Ilanlar i ON ji.ilan_id = i.id
        INNER JOIN Kadrolar k ON i.kadro_id = k.id
        INNER JOIN Fakulte f ON i.fakulte_id = f.id
        INNER JOIN bolumler b ON i.bolum_id = b.id
        WHERE ji.juri_id = ?
        ORDER BY i.baslangic_tarih DESC
    `;
    
    // Parametreleri query'ye gönderiyoruz
    const values = [juriId];

    connection.query(query, values, (error, data) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ success: false, message: error.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ success: false, message: "İlan bulunamadı." });
        }

        // Gelen verileri uygun formatta düzenliyoruz
        const ilanlar = data.map((row) => ({
            id: row.ilan_id,
            ilanAdi: `${row.kadro_adi} - ${row.fakulte_adi} / ${row.bolum_adi}`,
            tarihAraligi: `${row.baslangic_tarih} - ${row.bitis_tarih}`,
            durum:
                row.durum === "aktif"
                    ? "Değerlendirme Aşamasında"
                    : row.durum === "pasif"
                    ? "Tamamlandı"
                    : "Bilinmiyor",
        }));

        // JSON formatında yanıt gönderiyoruz
        return res.json({ success: true, data: ilanlar });
    });
};

// 🎯 Seçilen ilana yapılan başvuruları getir
const getBasvurularByIlan = async (req, res) => {
    const ilanId = req.params.ilanId;
    try {
        const query = `
            SELECT 
                b.id,
                k.ad,k.soyad AS aday_adi,
                DATE_FORMAT(b.basvuru_tarihi, '%d/%m/%Y') AS tarih,
                b.basvuru_durum
            FROM basvuru b
            INNER JOIN kullanici k ON b.aday_id = k.id
            WHERE b.ilan_id = ?
            ORDER BY b.basvuru_tarihi DESC;
        `;
        const values=[ilanId];
        connection.query(query, values, (error, data) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({ success: false, message: error.message });
            }
    
            if (data.length === 0) {
                return res.status(404).json({ success: false, message: "İlan bulunamadı." });
            }
           return res.json(data);
        });

    } catch (err) {
        console.error("Başvurular çekilirken hata:", err);
        res.status(500).json({ error: "Başvurular alınamadı." });
    }
};

const getBasvurularVeDurum = (req, res) => {
    const { ilanId, juriId } = req.params;

    const sql = `
        SELECT 
            b.id AS basvuru_id,
            k.ad AS ad,
            k.soyad AS aday_adi,
            DATE_FORMAT(b.basvuru_tarihi, '%d/%m/%Y') AS tarih,
            (
                SELECT COUNT(*) 
                FROM BasvuruJuri bj 
                WHERE bj.basvuru_id = b.id AND bj.juri_id = ?
            ) AS degerlendirildi_mi
        FROM Basvuru b
        INNER JOIN Kullanici k ON b.aday_id = k.id
        WHERE b.ilan_id = ?
        ORDER BY b.basvuru_tarihi DESC
    `;

    const values = [juriId, ilanId];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Başvurular alınırken hata:', err);
            return res.status(500).json({ error: 'Sunucu hatası' });
        }

        const response = results.map((row) => ({
            id: row.basvuru_id,
            ad: row.ad,
            aday_adi: row.aday_adi,
            tarih: row.tarih,
            basvuru_durum: row.degerlendirildi_mi > 0 ? 'Değerlendirildi' : 'Beklemede'
        }));

        return res.status(200).json(response);
    });
};

const degerlendirmeTamIslemi = async (req, res) => {
    const basvuruId = req.params.basvuruId;
    const { juriId, nihaiSonuc, yorum } = req.body;

    try {
        let dosyaAdi = null;

        if (req.file) {
            const storageFolder = path.join(__dirname, '../../STORAGE/juri');
            if (!fs.existsSync(storageFolder)) {
                fs.mkdirSync(storageFolder, { recursive: true });
            }

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const newFilename = uniqueSuffix + '-' + req.file.originalname;
            const filePath = path.join(storageFolder, newFilename);

            fs.writeFileSync(filePath, req.file.buffer);
            dosyaAdi = newFilename;
        }

        const sql = `
            INSERT INTO BasvuruJuri 
            (juri_id, basvuru_id, degerlendime_raporu_doc, basvuru_degerlendirme_durum, yorum_metni)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [juriId, basvuruId, dosyaAdi, nihaiSonuc, yorum];

        connection.query(sql, values, (error, result) => {
            if (error) {
                console.error('Veritabanı hatası:', error);
                return res.status(500).json({ success: false, message: error.message });
            }

            return res.status(200).json({ success: true, message: "Değerlendirme başarıyla eklendi." });
        });

    } catch (error) {
        console.error('Hata oluştu:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Adayın tüm belgelerini getir
const getAdayBelgeleri = async (req, res) => {
    const basvuruId = req.params.basvuruId;

    try {
        const belgeler = [];
        

        const query = `SELECT aday_id, basvuru_puan_url FROM Basvuru WHERE id = ?`;
        const values = [basvuruId];
    
        connection.query(query, values, async (error, data) => {
            if (error) {
                console.error('Error executing query:', error);
                return res.status(500).json({ success: false, message: error.message });
            }
    
            if (data.length === 0) {
                return res.status(404).json({ success: false, message: "Başvuru bulunamadı." });
            }
    
            const adayId = data[0].aday_id;
            const basvuruPuanUrl = data[0].basvuru_puan_url;
    

            if (basvuruPuanUrl) {
                belgeler.push({
                    kategori: "Puan Tablosu",
                    dosyaAdi: basvuruPuanUrl,
                    url: `/storage/puan/${basvuruPuanUrl}`, 
                });
            }
    
     
            const belgeTablolari = [
                { tablo: "Makaleler", kolon: "makale_url", kategori: "Makale" },
                { tablo: "BilimselToplantiFaaliyetleri", kolon: "bilimsel_url", kategori: "Bildiri" },
                { tablo: "Kitaplar", kolon: "kitaplar_url", kategori: "Kitap" },
                { tablo: "Atiflar", kolon: "atiflar_url", kategori: "Atıf" },
                { tablo: "EgitimOgretimFaaliyetleri", kolon: "egitim_url", kategori: "Eğitim-Öğretim" },
                { tablo: "TezYoneticiligi", kolon: "tez_url", kategori: "Tez Yöneticiliği" },
                { tablo: "Patentler", kolon: "patent_url", kategori: "Patent" },
                { tablo: "ArastirmaProjeleri", kolon: "arastirma_url", kategori: "Araştırma Projesi" },
                { tablo: "EditorlukHakemlik", kolon: "editor_url", kategori: "Editörlük-Hakemlik" },
                { tablo: "Oduller", kolon: "odul_url", kategori: "Ödül" },
                { tablo: "IdariGorevlerVeUniversiteyeKatkiFaaliyetleri", kolon: "idari_url", kategori: "İdari Görev" },
                { tablo: "GuzelSanatlarFaaliyetleri", kolon: "guzel_url", kategori: "Güzel Sanatlar" },
            ];
    
        
            const promises = belgeTablolari.map((belgeTablo) => {
                return new Promise((resolve, reject) => {
                    const query2 = `SELECT ${belgeTablo.kolon} AS belge FROM ${belgeTablo.tablo} WHERE kullanici_id = ? AND aktif = 1`;
                    connection.query(query2, [adayId], (error, results) => {
                        if (error) {
                            return reject(error);
                        }
    
                        results.forEach((row) => {
                            if (row.belge) {
                                belgeler.push({
                                    kategori: belgeTablo.kategori,
                                    dosyaAdi: row.belge,
                                    url: `/storage/profil/${row.belge}`,
                                });
                            }
                        });
    
                        resolve(); 
                    });
                });
            });
    
        
            await Promise.all(promises);
    
            return res.status(200).json(belgeler);
        });
    } catch (error) {
        console.error("Aday belgeleri alınırken hata:", error);
        res.status(500).json({ error: "Belgeler getirilemedi." });
    }
};
const downloadBelge = (req, res) => {
    const { type, filename } = req.params;

    let folderPath;
    if (type === 'puan') {
        folderPath = path.join(__dirname, '../../STORAGE/puan/');
    } else if (type === 'profil') {
        folderPath = path.join(__dirname, '../../STORAGE/profil/');
    } else {
        return res.status(400).json({ error: "Geçersiz belge türü." });
    }

    const safeFilename = path.basename(filename); // ../ gibi şeyleri atar
    const filePath = path.join(folderPath, safeFilename);
    console.log("Belge tipi:", type);
    console.log("Dosya adı:", filename);
    console.log("Tam dosya yolu:", filePath);
    // Dosya gerçekten var mı kontrol ediyoruz
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Dosya bulunamadı:', filePath);
            return res.status(404).json({ error: "Dosya bulunamadı." });
        }

        res.download(filePath, filename, (err) => {
            if (err) {
                console.error('Dosya indirilemedi:', err);
                res.status(500).json({ error: "Dosya indirilemedi." });
            }
        });
    });
};

const goruntuleBelge = (req, res) => {
    const { type, filename } = req.params;

    let folderPath;
    if (type === 'puan') {
        folderPath = path.join(__dirname, '../../STORAGE/puan/');
    } else if (type === 'profil') {
        folderPath = path.join(__dirname, '../../STORAGE/profil/');
    } else {
        return res.status(400).json({ error: "Geçersiz belge türü." });
    }

    const safeFilename = path.basename(filename); // güvenlik için
    const filePath = path.join(folderPath, safeFilename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Dosya bulunamadı:', filePath);
            return res.status(404).json({ error: "Dosya bulunamadı." });
        }

        res.type('application/pdf'); // MIME tipi belirt
        res.sendFile(filePath);
    });
};


module.exports = {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
    getBasvurularVeDurum,
    degerlendirmeTamIslemi,
    getAdayBelgeleri,
    downloadBelge,
    goruntuleBelge
};
