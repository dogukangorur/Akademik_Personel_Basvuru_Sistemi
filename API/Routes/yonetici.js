const express = require("express");
const router = express.Router();
const controller = require("../Controllers/YoneticiController");

// YöneticiIlanJuri.tsx
router.get("/ilanlar-juri", controller.getIlanlarVeJuriDurumu);

// YöneticiJuriAtama.tsx
router.get("/ilan/:ilanId", controller.getIlanById);
router.get("/ilan/:ilanId/juriler", controller.getJurilerByIlanId);
router.get("/juri-havuzu", controller.getJuriHavuzu);
router.get("/kullanicilar", controller.getTumKullanicilar);
router.post("/juri-yetkilendir", controller.yetkilendirJuri);
router.post("/ilan/:ilanId/juri-ekle", controller.juriAta);
router.delete("/ilan/:ilanId/juri-sil/:juriId", controller.juriSil);

// YoneticiIlanNihaiKarar.tsx
router.get("/ilanlar-nihai-karar", controller.getNihaiKararaHazirIlanlar);

//YoneticiNihaiKarar.tsx
router.get("/ilan-basvurulari/:ilanId", controller.getIlanBasvurulariVeDegerlendirmeler);

module.exports = router;
