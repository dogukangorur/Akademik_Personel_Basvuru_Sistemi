const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const { checkAuth, checkAdmin } = require("../service/check-auth.js");

const {

  postAdayGiris,
  postAdayKayit,
  ilanGetir,
  profilMakaleKayit,
  profilBilimselKayit,
  profilKitaplarKayit,
  profilAtiflarKayit,
  profilEgitimKayit,
  profilTezKayit,
  profilPatentKayit,
  profilArastirmaKayit,
  profilEditorKayit,
  profilOdulKayit,
  profilIdariKayit,
  profilGuzelSanatlarKayit,
  veriGetir,
  basvuruGetir,
  kriterKontrol_1,
  kriterKontrol_2,
  puanHesapla

} = require("../Controllers/aday-controller.js");


router.post("/postAdayGiris", postAdayGiris);
router.post("/postAdayKayit", postAdayKayit);
router.post("/ilanGetir", ilanGetir);
router.post("/profilMakaleKayit", upload.array("files"),profilMakaleKayit);
router.post("/profilBilimselKayit", upload.array("files"),profilBilimselKayit);
router.post("/profilKitaplarKayit", upload.array("files"),profilKitaplarKayit);
router.post("/profilAtiflarKayit", upload.array("files"),profilAtiflarKayit);
router.post("/profilEgitimKayit", upload.array("files"),profilEgitimKayit);
router.post("/profilTezKayit", upload.array("files"),profilTezKayit);
router.post("/profilPatentKayit", upload.array("files"),profilPatentKayit);
router.post("/profilArastirmaKayit", upload.array("files"),profilArastirmaKayit);
router.post("/profilEditorKayit", upload.array("files"),profilEditorKayit);
router.post("/profilOdulKayit", upload.array("files"),profilOdulKayit);
router.post("/profilIdariKayit", upload.array("files"),profilIdariKayit);
router.post("/profilGuzelSanatlarKayit", upload.array("files"),profilGuzelSanatlarKayit);
router.post("/veriGetir", veriGetir);
router.post("/basvuruGetir", basvuruGetir);
router.post("/kriterKontrol_1", kriterKontrol_1);
router.post("/puanHesapla", puanHesapla);


module.exports = router;