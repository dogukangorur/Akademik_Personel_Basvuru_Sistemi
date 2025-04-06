const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

  etkinlikGetir,

} = require("../Controllers/etkinlik-controller.js");


router.get("/etkinlikGetir", etkinlikGetir);



module.exports = router;