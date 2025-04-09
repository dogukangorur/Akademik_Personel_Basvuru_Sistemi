const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

    unvanGetir,
    bolumGetir,
    fakulteGetir,
    ilanKayit,
    ilanGetir,
    ilanDuzenle,
    ilanSil,
    ilanDurumGuncelle

} = require("../Controllers/admin-controller.js");


router.get("/unvanGetir", unvanGetir);
router.get("/bolumGetir", bolumGetir);
router.get("/fakulteGetir", fakulteGetir);
router.post("/ilanKayit", ilanKayit);
router.get("/ilanGetir", ilanGetir);
router.post("/ilanDuzenle", ilanDuzenle);
router.get("/ilanSil", ilanSil);
router.get("/ilanDurumGuncelle", ilanDurumGuncelle);
module.exports = router;