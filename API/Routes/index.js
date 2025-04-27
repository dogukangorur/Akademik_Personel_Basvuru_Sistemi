const express = require("express");
const user = require("./aday.js");
const etkinlik = require("./etkinlik.js");
const admin = require("./admin.js");
const juri = require("./juri.js");
const anasayfa = require("./anasayfa.js");
const yonetici = require("./yonetici.js");
const kullanici = require("./kullanici.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/aday", user);
router.use("/api/etkinlik", etkinlik);
router.use("/api/admin", admin);
router.use("/api/anasayfa",anasayfa);
router.use("/api/juri", juri);
router.use("/api/yonetici", yonetici);
router.use("/api/kullanici", kullanici);

module.exports = router;