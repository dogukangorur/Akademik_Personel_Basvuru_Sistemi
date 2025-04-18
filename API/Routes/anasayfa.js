const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

    ilanGetir,


} = require("../Controllers/anasayfa-controller.js");


router.get("/ilanGetir", ilanGetir);

module.exports = router;