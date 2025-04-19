const connection = require("../Service/connection.js");

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

        res.json(results);
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
        SELECT id, CONCAT(ad, ' ', soyad) AS adSoyad
        FROM Kullanici
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Kullanıcılar alınamadı:", err);
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

module.exports = {
    getIlanlarVeJuriDurumu, // önceki kodun da çalışmaya devam etmesi için
    getIlanById,
    getJurilerByIlanId,
    getJuriHavuzu,
    getTumKullanicilar,
    yetkilendirJuri,
    juriAta,
    juriSil
};
