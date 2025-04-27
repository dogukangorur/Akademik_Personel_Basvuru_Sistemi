const express = require('express');
const router = express.Router();
const kullaniciController = require('../Controllers/kullanici-controller');

// Şifre güncelleme endpointi
router.post('/update-password', kullaniciController.updatePassword);

module.exports = router;