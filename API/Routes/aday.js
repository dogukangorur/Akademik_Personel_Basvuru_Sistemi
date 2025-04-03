const express = require("express");
const router = express.Router();

// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

  postAdayGiris,

} = require("../Controllers/aday-controller.js");


router.post("/postAdayGiris", postAdayGiris);



module.exports = router;