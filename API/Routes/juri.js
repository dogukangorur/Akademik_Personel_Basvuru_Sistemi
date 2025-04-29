const express = require('express');
const router = express.Router();
const {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
    uploadDegerlendirmeDosyasi,
    kaydetNihaiSonuc,
    downloadBelge,
    getAdayBelgeleri,
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

router.get('/ilanlarim/:juriId', getAssignedIlansForJuri);
router.get('/basvurular/:ilanId', getBasvurularByIlan);


router.post('/basvuru/:basvuruId/upload-degerlendirme', upload.single('dosya'), uploadDegerlendirmeDosyasi);
router.post('/basvuru/:basvuruId/kaydet-nihai-sonuc', kaydetNihaiSonuc);
router.get('/download/:type/:filename', downloadBelge);


router.get('/basvuru/:basvuruId/aday-belgeleri', getAdayBelgeleri);


module.exports = router;
