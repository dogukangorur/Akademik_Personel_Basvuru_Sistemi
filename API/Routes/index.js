const express = require("express");
const user = require("./aday.js");
const etkinlik = require("./etkinlik.js");
const admin = require("./admin.js");
const juri = require("./juri.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/aday", user);
router.use("/api/etkinlik", etkinlik);
router.use("/api/admin", admin);
// router.use("/api/juri", juri);

module.exports = router;