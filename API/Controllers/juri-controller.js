//DÜZENLENECEK
const connection = require("../service/connection.js");

// 1. Jüriye atanmış ilanları getir
const getAssignedIlansForJuri = async (req, res) => {
    const juriId = req.user.id;
    try {
        const query = `
            SELECT i.id, i.baslik AS "ilanAdi",
                   TO_CHAR(i.baslangic_tarihi, 'DD/MM/YYYY') || ' - ' || TO_CHAR(i.bitis_tarihi, 'DD/MM/YYYY') AS "tarihAraligi",
                   i.durum
            FROM ilan i
            INNER JOIN juri_ilan ji ON i.id = ji.ilan_id
            WHERE ji.juri_id = $1
            ORDER BY i.baslangic_tarihi DESC;
        `;
        const { rows } = await connection.pool.query(query, [juriId]);
        res.json(rows);
    } catch (error) {
        console.error('Jüri ilanlarını çekerken hata:', error);
        res.status(500).json({ error: 'Jüri ilanları alınamadı.' });
    }
};

// 2. Seçilen ilana yapılan başvuruları getir
const getBasvurularByIlan = async (req, res) => {
    const ilanId = req.params.ilanId;
    try {
        const query = `
            SELECT 
                b.id,
                k.ad_soyad AS aday_adi,
                TO_CHAR(b.basvuru_tarihi, 'DD/MM/YYYY') AS tarih,
                b.basvuru_durum
            FROM basvuru b
            INNER JOIN kullanici k ON b.aday_id = k.id
            WHERE b.ilan_id = $1
            ORDER BY b.basvuru_tarihi DESC;
        `;
        const { rows } = await connection.pool.query(query, [ilanId]);
        res.json(rows);
    } catch (err) {
        console.error("Başvurular çekilirken hata:", err);
        res.status(500).json({ error: "Başvurular alınamadı." });
    }
};

module.exports = {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
};
