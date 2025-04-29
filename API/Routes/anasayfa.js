const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

    ilanGetir,
    postAdminGiris


} = require("../Controllers/anasayfa-controller.js");


router.get("/ilanGetir", ilanGetir);
router.post("/postAdminGiris", postAdminGiris);
module.exports = router;