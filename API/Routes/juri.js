const express = require('express');
const router = express.Router();
const {
    getAssignedIlansForJuri,
    getBasvurularByIlan
} = require('../controllers/JuriController');

router.get('/juri/ilanlarim', auth, getAssignedIlansForJuri);
router.get('/juri/basvurular/:ilanId', auth, getBasvurularByIlan);

module.exports = router;
