const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

  postAdayGiris,
  postAdayKayit,

} = require("../Controllers/aday-controller.js");


router.post("/postAdayGiris", postAdayGiris);
router.post("/postAdayKayit", postAdayKayit);


module.exports = router;