const express = require("express");
const user = require("./user.js");


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api/user", user);

module.exports = router;