const express = require("express");
const user = require("./aday.js");


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/aday", user);

module.exports = router;