const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

  etkinlikGetir,
  bilimselGetir,
  kitapGetir,
  atifGetir,
  egitimGetir,
  tezGetir,
  patentGetir,
  arastirmaGetir,
  editorGetir,
  odulGetir,
  idariGetir,
  guzelGetir,

} = require("../Controllers/etkinlik-controller.js");


router.get("/etkinlikGetir", etkinlikGetir);



module.exports = router;