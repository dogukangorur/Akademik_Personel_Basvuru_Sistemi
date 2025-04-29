const express = require('express');
const router = express.Router();
const {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
    uploadDegerlendirmeDosyasi,
    kaydetNihaiSonuc,
    downloadBelge,
    getAdayBelgeleri,
    goruntuleBelge
} = require('../Controllers/juri-controller');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/ilanlarim/:juriId', getAssignedIlansForJuri);
router.get('/basvurular/:ilanId', getBasvurularByIlan);


router.post('/basvuru/:basvuruId/upload-degerlendirme', upload.array('files'), uploadDegerlendirmeDosyasi);
router.post('/basvuru/:basvuruId/kaydet-nihai-sonuc', kaydetNihaiSonuc);
router.get('/download/:type/:filename', downloadBelge);
router.get('/view/:type/:filename', goruntuleBelge);

router.get('/basvuru/:basvuruId/aday-belgeleri', getAdayBelgeleri);


module.exports = router;
