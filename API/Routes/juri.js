const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
    getAssignedIlansForJuri,
    getBasvurularByIlan,
    degerlendirmeTamIslemi,
    getBasvurularVeDurum,
    downloadBelge,
    getAdayBelgeleri,
    goruntuleBelge
} = require('../Controllers/juri-controller');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/ilanlarim/:juriId', getAssignedIlansForJuri);
router.get('/basvurular/:ilanId', getBasvurularByIlan);
router.post('/basvuru/:basvuruId/degerlendirme-tam', upload.single('dosya'), degerlendirmeTamIslemi);
router.get('/download/:type/:filename', downloadBelge);
router.get('/view/:type/:filename', goruntuleBelge);
router.get('/basvuru/:basvuruId/aday-belgeleri', getAdayBelgeleri);

router.get('/basvurular-durum/:ilanId/:juriId', getBasvurularVeDurum);

module.exports = router;
