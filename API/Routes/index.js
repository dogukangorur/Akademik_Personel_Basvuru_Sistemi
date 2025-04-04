const express = require("express");
const user = require("./aday.js");
const etkinlik = require("./etkinlik.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/aday", user);
router.use("/api/etkinlik", etkinlik);

module.exports = router;