const express = require('express');
const router = express.Router();
const {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
    uploadDegerlendirmeDosyasi,
    kaydetNihaiSonuc
} = require('../Controllers/juri-controller');
const multer = require('multer');
const path = require('path');

// 👉 Sadece burada Multer config ayarı yapıyoruz.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../STORAGE'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.get('/juri/ilanlarim/:juriId', getAssignedIlansForJuri);
router.get('/juri/basvurular/:ilanId', getBasvurularByIlan);

// 🎯 Yeni endpointler
router.post('/juri/basvuru/:basvuruId/upload-degerlendirme', upload.single('dosya'), uploadDegerlendirmeDosyasi);
router.post('/juri/basvuru/:basvuruId/kaydet-nihai-sonuc', kaydetNihaiSonuc);

module.exports = router;
