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

//YoneticiFaaliyetTablosu.tsx
// Başlıklar
router.get('/basliklar', controller.getBasliklar);
// Etkinlikler
router.get('/etkinlikler/:baslikId', controller.getEtkinliklerByBaslikId);
router.post('/etkinlik', controller.addEtkinlik);
router.put('/etkinlik/:id', controller.updateEtkinlik);
router.delete('/etkinlik/:id', controller.deleteEtkinlik);

//YoneticiEtkinlikSayıKriter.tsx
router.get("/faaliyet-kriterleri", controller.getFaaliyetKriterleri);
router.post("/faaliyet-kriterleri", controller.addFaaliyetKriteri);
router.put("/faaliyet-kriterleri/:id", controller.updateFaaliyetKriteri);
router.delete("/faaliyet-kriterleri/:id", controller.deleteFaaliyetKriteri);
router.get("/fakulte-gruplari", controller.getFakulteGruplari);

module.exports = router;
