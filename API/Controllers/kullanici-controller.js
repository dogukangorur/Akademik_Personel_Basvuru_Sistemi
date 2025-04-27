const connection = require("../Service/connection");

// Şifre güncelleme (ROL KONTROLÜ YOK)
const updatePassword = (req, res) => {
    const { tc, newPassword } = req.body;

    if (!tc || !newPassword) {
        return res.status(400).json({ success: false, message: "TC ve yeni şifre gereklidir." });
    }

    const sql = `
        UPDATE Kullanici
        SET sifre = ?
        WHERE tc = ?
    `;

    connection.query(sql, [newPassword, tc], (err, result) => {
        if (err) {
            console.error("Şifre güncellerken hata oluştu:", err);
            return res.status(500).json({ success: false, message: "Sunucu hatası." });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
        }

        res.json({ success: true, message: "Şifre başarıyla güncellendi." });
    });
};

module.exports = { updatePassword };