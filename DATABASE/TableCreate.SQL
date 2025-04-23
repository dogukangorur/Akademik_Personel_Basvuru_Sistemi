CREATE DATABASE APBS;
USE APBS;
CREATE TABLE Rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanimlama NVARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE FakulteGrup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fakulte_grup_adi NVARCHAR(200) NOT NULL UNIQUE
);
CREATE TABLE Fakulte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fakulte_adi NVARCHAR(100) NOT NULL UNIQUE,
    fakulte_grup_id INT NOT NULL,
    FOREIGN KEY (fakulte_grup_id) REFERENCES FakulteGrup(id) ON DELETE CASCADE
);
CREATE TABLE Kadrolar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kadro_adi NVARCHAR(100) NOT NULL UNIQUE
);
CREATE TABLE Kullanici (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad NVARCHAR(50) NOT NULL,
    soyad NVARCHAR(50) NOT NULL,
    tc CHAR(11) UNIQUE NOT NULL,
    telNo NVARCHAR(15) UNIQUE NOT NULL,
    mail NVARCHAR(100) UNIQUE NOT NULL,
    sifre NVARCHAR(255) NOT NULL,
    kurumu NVARCHAR(100) NOT NULL,
    bulundugu_kadro_id INT NOT NULL,
    dogum_tarihi DATE NOT NULL,
    FOREIGN KEY (bulundugu_kadro_id) REFERENCES Kadrolar(id) ON DELETE CASCADE
);
CREATE TABLE KullaniciRoller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kullaniciID INT NOT NULL,
    rolID INT NOT NULL,
    FOREIGN KEY (kullaniciID) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (rolID) REFERENCES Rol(id) ON DELETE CASCADE
);
CREATE TABLE bolumler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bolum_adi VARCHAR(255) NOT NULL,
    fakulte_id INT,
    FOREIGN KEY (fakulte_id) REFERENCES fakulte(id)
);
CREATE TABLE Ilanlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fakulte_id INT NOT NULL,
    bolum_id INT NOT NULL,
    kadro_id INT NOT NULL,
    baslik NVARCHAR(255) NOT NULL,
    aranan_sayi NVARCHAR(5) NOT NULL,
    aciklama TEXT NOT NULL,
    durum ENUM('aktif', 'pasif') NOT NULL DEFAULT 'aktif',
    baslangic_tarih DATE NOT NULL,
    bitis_tarih DATE NOT NULL,
    FOREIGN KEY (fakulte_id) REFERENCES Fakulte(id) ON DELETE CASCADE,
    FOREIGN KEY (bolum_id) REFERENCES bolumler(id) ON DELETE CASCADE,
    FOREIGN KEY (kadro_id) REFERENCES Kadrolar(id) ON DELETE CASCADE
);
CREATE TABLE Baslik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    baslik_kod NVARCHAR(1) NOT NULL,
    baslik_adi NVARCHAR(255) NOT NULL
);
CREATE TABLE Etkinlik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    baslik_id INT NOT NULL,
    baslık_no INT NOT NULL,
    aciklama NVARCHAR(1000) NOT NULL,
    puan INT NOT NULL,
    FOREIGN KEY (baslik_id) REFERENCES Baslik(id) ON DELETE CASCADE
);
CREATE TABLE PuanKriterleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    baslik_id INT NOT NULL,
    baslik_no_min INT NOT NULL,
    baslik_no_max INT NOT NULL,
    fak_gur_id INT NOT NULL,
    poz_id INT NOT NULL,
    asgari INT NOT NULL,
    azami INT NOT NULL,
    FOREIGN KEY (baslik_id) REFERENCES Baslik(id) ON DELETE CASCADE,
    FOREIGN KEY (fak_gur_id) REFERENCES FakulteGrup(id) ON DELETE CASCADE,
    FOREIGN KEY (poz_id) REFERENCES Kadrolar(id) ON DELETE CASCADE
);
CREATE TABLE Makaleler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    kullanici_id INT NOT NULL,
    etkinlik_id INT NOT NULL,
    yazarlar NVARCHAR(500) NOT NULL,
    makale_adi NVARCHAR(500) NOT NULL,
    dergi_adi NVARCHAR(500) NOT NULL,
    cilt_no NVARCHAR(10) NOT NULL,
    sayfa_no NVARCHAR(10) NOT NULL,
    yıl DATE NOT NULL,
    makale_url NVARCHAR(500) NOT NULL,
    isBaslicaYazar BOOLEAN DEFAULT FALSE,
    isAsgariCalisma BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE BilimselToplantiFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    yazarlar NVARCHAR(500) NOT NULL,
    bildiri_adi NVARCHAR(500) NOT NULL,
    konferansin_adi NVARCHAR(500) NOT NULL,
    yapildigi_yer NVARCHAR(10) NOT NULL,
    sayfa_no NVARCHAR(10) NOT NULL,
    tarih DATE NOT NULL,
    kisi_sayisi INT NOT NULL,
    bilimsel_url NVARCHAR(500) NOT NULL,
    isBaslicaYazar BOOLEAN DEFAULT FALSE,
    isAsgariCalisma BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE Kitaplar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    yazarlar NVARCHAR(500) NOT NULL,
    kitap_adi NVARCHAR(500) NOT NULL,
    baski_sayisi NVARCHAR(10) NOT NULL,
    yayinlandigi_yer NVARCHAR(50) NOT NULL,
    kisi_sayisi INT NOT NULL,
    tarih DATE NOT NULL,
    kitaplar_url NVARCHAR(500) NOT NULL,
    isBaslicaYazar BOOLEAN DEFAULT FALSE,
    isAsgariCalisma BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE Atiflar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    kullanici_id INT NOT NULL,
    etkinlik_id INT NOT NULL,
    atifin_yapildigi_eser NVARCHAR(500) NOT NULL,
    yer NVARCHAR(500) NOT NULL,
    atiflar_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE EgitimOgretimFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    dersin_adi NVARCHAR(500) NOT NULL,
    programin_adi NVARCHAR(500) NOT NULL,
    donemi ENUM('güz', 'bahar', 'yaz') NOT NULL,
    egitim_url NVARCHAR(500) NOT NULL,
    yili DATE NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE TezYoneticiligi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    ogrenci_adi NVARCHAR(500) NOT NULL,
    kullanici_id INT NOT NULL,
    tezin_adi NVARCHAR(500) NOT NULL,
    enstitüsü NVARCHAR(500) NOT NULL,
    yili NVARCHAR(4) NOT NULL,
    tez_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE Patentler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    patent_adi NVARCHAR(500) NOT NULL,
    patent_url NVARCHAR(500) NOT NULL,
    yili DATE NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE ArastirmaProjeleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    projenin_adi NVARCHAR(500) NOT NULL,
    proje_numarasi NVARCHAR(25) NOT NULL,
    proje_kurum NVARCHAR(150) NOT NULL,
    arastirma_url NVARCHAR(500) NOT NULL,
    yili NVARCHAR(4) NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE EditorlukHakemlik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    derginin_adi NVARCHAR(500) NOT NULL,
    sayisi INT,
    yili DATE NOT NULL,
    editor_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE Oduller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    odul_veren_kurum_adi NVARCHAR(500) NOT NULL,
    yili DATE NOT NULL,
    odul_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE IdariGorevlerVeUniversiteyeKatkiFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    gorev_birimi NVARCHAR(500) NOT NULL,
    yili DATE NOT NULL,
    idari_url NVARCHAR(500) NOT NULL,
    guzel_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE GuzelSanatlarFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aktif BOOLEAN NOT NULL DEFAULT TRUE,
    etkinlik_id INT NOT NULL,
    kullanici_id INT NOT NULL,
    faaliyet_adi NVARCHAR(500) NOT NULL,
    yili DATE NOT NULL,
    FOREIGN KEY (etkinlik_id) REFERENCES Etkinlik(id) ON DELETE CASCADE,
    FOREIGN KEY (kullanici_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
CREATE TABLE Basvuru (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    ilan_id INT NOT NULL,
    basvuru_tarihi DATE NOT NULL,
    puanlanan_faaliyet_donemi ENUM('Profesör', 'Doçent', 'DR. Öğretim Üyesi') NOT NULL,
    basvuru_durum ENUM('Beklemede', 'Onaylandı', 'Reddedildi') NOT NULL DEFAULT 'Beklemede',
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (ilan_id) REFERENCES Ilanlar(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruMakale (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    makale_id INT NOT NULL,
    puan INT NOT NULL,
    nihai_puan INT NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (makale_id) REFERENCES Makaleler(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruBilimselToplantiFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    bilimsel_toplanti_id INT NOT NULL,
    puan INT NOT NULL,
    nihai_puan INT NOT NULL,
    bilimsel_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (bilimsel_toplanti_id) REFERENCES BilimselToplantiFaaliyetleri(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruKitaplar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    kitaplar_id INT NOT NULL,
    yabanci_dil BOOLEAN NOT NULL DEFAULT FALSE,
    puan INT NOT NULL,
    nihai_puan INT NOT NULL,
    kitaplar_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (kitaplar_id) REFERENCES Kitaplar(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruAtiflar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    atiflar_id INT NOT NULL,
    puan INT NOT NULL,
    nihai_puan INT NOT NULL,
    atiflar_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (atiflar_id) REFERENCES Atiflar(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruEgitimOgretimFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    egitim_ogretim_faaliyetleri_id INT NOT NULL,
    puan INT NOT NULL,
    egitim_ogretim_faaliyetleri_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (egitim_ogretim_faaliyetleri_id) REFERENCES EgitimOgretimFaaliyetleri(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruTezYoneticiligi(
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    tez_yoneticiligi_id INT NOT NULL,
    puan INT NOT NULL,
    asgari_calisma BOOLEAN NOT NULL DEFAULT FALSE,
    tez_yoneticiligi_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (tez_yoneticiligi_id) REFERENCES TezYoneticiligi(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruPatentler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    patentler_id INT NOT NULL,
    puan INT NOT NULL,
    nihai_puan INT NOT NULL,
    patentler_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (patentler_id) REFERENCES Patentler(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruArastirmaProjeleri(
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    arastirma_projeleri_id INT NOT NULL,
    puan INT NOT NULL,
    asgari_calisma BOOLEAN NOT NULL DEFAULT FALSE,
    arastirma_projeleri_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (arastirma_projeleri_id) REFERENCES ArastirmaProjeleri(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruEditorlukHakemlik (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    editorluk_hakemlik_id INT NOT NULL,
    puan INT NOT NULL,
    editorluk_hakemlik_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (editorluk_hakemlik_id) REFERENCES EditorlukHakemlik(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruOduller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    oduller_id INT NOT NULL,
    puan INT NOT NULL,
    oduller_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (oduller_id) REFERENCES Oduller(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruIdariGorevlerVeUniversiteyeKatkiFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    idari_gorevler_id INT NOT NULL,
    puan INT NOT NULL,
    idari_gorevler_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (idari_gorevler_id) REFERENCES IdariGorevlerVeUniversiteyeKatkiFaaliyetleri(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE BasvuruGuzelSanatlarFaaliyetleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aday_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    guzel_sanatlar_id INT NOT NULL,
    puan INT NOT NULL,
    guzel_sanatlar_url NVARCHAR(500) NOT NULL,
    FOREIGN KEY (aday_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (guzel_sanatlar_id) REFERENCES GuzelSanatlarFaaliyetleri(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE FaaliyetPuanKatsayisi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    calisma_kisi_sayisi INT NOT NULL,
    katsayisi DOUBLE NOT NULL
);
CREATE TABLE BasvuruJuri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    juri_id INT NOT NULL,
    basvuru_id INT NOT NULL,
    degerlendime_raporu_doc NVARCHAR(250) NOT NULL,
    basvuru_degerlendirme_durum ENUM('Beklemede', 'Olumlu', 'Olumsuz') NOT NULL DEFAULT 'Beklemede',
    FOREIGN KEY (juri_id) REFERENCES Kullanici(id) ON DELETE CASCADE,
    FOREIGN KEY (basvuru_id) REFERENCES Basvuru(id) ON DELETE CASCADE
);
CREATE TABLE JuriIlan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ilan_id INT NOT NULL,
    juri_id INT NOT NULL,
    UNIQUE (ilan_id, juri_id),
    -- Aynı juri aynı ilana birden fazla kez atanamaz
    FOREIGN KEY (ilan_id) REFERENCES Ilanlar(id) ON DELETE CASCADE,
    FOREIGN KEY (juri_id) REFERENCES Kullanici(id) ON DELETE CASCADE
);
--Asgari Yayın/Etkinlik Sayısı Kriterleri Tablosu
CREATE TABLE FaaliyetKriterleri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    faaliyet_kodu NVARCHAR(50) NOT NULL,
    -- Örn: A.1-A.2, F.1 veya F.2, H.13-17
    fakulte_grup_id INT NOT NULL,
    kadro_id INT NOT NULL,
    deger INT NOT NULL,
    FOREIGN KEY (fakulte_grup_id) REFERENCES FakulteGrup(id) ON DELETE CASCADE,
    FOREIGN KEY (kadro_id) REFERENCES Kadrolar(id) ON DELETE CASCADE,
    UNIQUE (faaliyet_kodu, fakulte_grup_id, kadro_id)
);