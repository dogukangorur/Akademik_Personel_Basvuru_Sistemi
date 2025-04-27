const connection = require("../Service/connection");

// 🎯 Jüriye atanmış ilanları getir (anasayfa)
const getAssignedIlansForJuri = async (req, res) => {
    try {
        const juriId = req.params.juriId;

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

// 🎯 Seçilen ilana yapılan başvuruları getir
const getBasvurularByIlan = async (req, res) => {
    const ilanId = req.params.ilanId;
    try {
        const query = `
            SELECT 
                b.id,
                k.ad_soyad AS aday_adi,
                DATE_FORMAT(b.basvuru_tarihi, '%d/%m/%Y') AS tarih,
                b.basvuru_durum
            FROM basvuru b
            INNER JOIN kullanici k ON b.aday_id = k.id
            WHERE b.ilan_id = ?
            ORDER BY b.basvuru_tarihi DESC;
        `;
        const [rows] = await connection.pool.query(query, [ilanId]);
        res.json(rows);
    } catch (err) {
        console.error("Başvurular çekilirken hata:", err);
        res.status(500).json({ error: "Başvurular alınamadı." });
    }
};

// 🎯 Jüri değerlendirme dosyasını yükle ve veritabanına kaydet
const uploadDegerlendirmeDosyasi = async (req, res) => {
    const basvuruId = req.params.basvuruId;
    const juriId = req.body.juriId;

    if (!req.file) {
        return res.status(400).json({ error: 'Dosya bulunamadı.' });
    }

    const dosyaAdi = req.file.filename;

    try {
        const sql = `
            UPDATE BasvuruJuri 
            SET degerlendime_raporu_doc = ?
            WHERE basvuru_id = ? AND juri_id = ?
        `;
        await connection.pool.query(sql, [dosyaAdi, basvuruId, juriId]);

        res.status(200).json({ message: 'Dosya başarıyla yüklendi.' });
    } catch (error) {
        console.error('Değerlendirme dosyası kaydedilirken hata:', error);
        res.status(500).json({ error: 'Dosya kaydedilemedi.' });
    }
};

// 🎯 Jüri nihai sonucu ve yorumu kaydet
const kaydetNihaiSonuc = async (req, res) => {
    const basvuruId = req.params.basvuruId;
    const { juriId, nihaiSonuc, yorum } = req.body;

    try {
        const sql = `
            UPDATE BasvuruJuri
            SET basvuru_degerlendirme_durum = ?, yorum_metni = ?
            WHERE basvuru_id = ? AND juri_id = ?
        `;
        await connection.pool.query(sql, [nihaiSonuc, yorum, basvuruId, juriId]);

        res.status(200).json({ message: 'Nihai sonuç ve yorum başarıyla kaydedildi.' });
    } catch (error) {
        console.error('Nihai sonuç kaydedilirken hata:', error);
        res.status(500).json({ error: 'Sonuç kaydedilemedi.' });
    }
};

module.exports = {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
    uploadDegerlendirmeDosyasi,
    kaydetNihaiSonuc,
};
