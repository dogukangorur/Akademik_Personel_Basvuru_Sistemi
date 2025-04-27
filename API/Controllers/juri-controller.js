const connection = require("../Service/connection.js");

// Jüriye atanmış ilanları getir (anasayfa)
const getAssignedIlansForJuri = async (req, res) => {
    try {
        const juriId = req.params.juriId; // Artık URL'den geliyor

        const query = `
            SELECT 
                i.id AS ilan_id,
                i.baslik AS ilan_basligi,
                TO_CHAR(i.baslangic_tarih, 'DD/MM/YYYY') AS baslangic_tarih,
                TO_CHAR(i.bitis_tarih, 'DD/MM/YYYY') AS bitis_tarih,
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

        const [rows] = await connection.pool.query(query, [juriId]);

        const ilanlar = rows.map((row) => ({
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

        res.json(ilanlar);
    } catch (error) {
        console.error("Jüri ilanları alınırken hata:", error);
        res.status(500).json({ error: "İlanlar getirilemedi." });
    }
};

// Seçilen ilana yapılan başvuruları getir
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
