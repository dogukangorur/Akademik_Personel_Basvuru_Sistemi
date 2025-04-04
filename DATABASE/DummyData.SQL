-- Kullanıcı tablosuna örnek veriler ekleme
INSERT INTO kullanici (ad, soyad, tc, telNo, mail, sifre, kurumu, bulundugu_kadro_id, dogum_tarihi) VALUES
('Ali', 'Yılmaz', '12345678901', '05001234567', 'ali.yilmaz@example.com', 'sifre123', 'İTÜ', 1, '1995-04-15'),
('Ayşe', 'Kara', '23456789012', '05002345678', 'ayse.kara@example.com', 'sifre456', 'ODTÜ', 2, '1993-06-10'),
('Mehmet', 'Demir', '34567890123', '05003456789', 'mehmet.demir@example.com', 'sifre789', 'Hacettepe', 3, '1988-11-20'),
('Zeynep', 'Çelik', '45678901234', '05004567890', 'zeynep.celik@example.com', 'sifre321', 'Ege Üniversitesi', 4, '1990-02-01'),
('Ahmet', 'Şahin', '56789012345', '05005678901', 'ahmet.sahin@example.com', 'sifre654', 'Boğaziçi', 5, '1985-09-25'),
('Elif', 'Koç', '67890123456', '05006789012', 'elif.koc@example.com', 'sifre987', 'YTÜ', 6, '1992-07-08'),
('Murat', 'Aydın', '78901234567', '05007890123', 'murat.aydin@example.com', 'sifre159', 'Ankara Üniversitesi', 7, '1978-03-30'),
('Fatma', 'Polat', '89012345678', '05008901234', 'fatma.polat@example.com', 'sifre753', 'İstanbul Üniversitesi', 8, '1970-12-12');


-- KullanıcıRoller tablosuna örnek veriler ekleme
INSERT INTO kullaniciRoller (rolID,kullaniciID) VALUES
(1, 5), -- Ahmet Admin
(2, 6), -- Elif Aday
(2, 1), -- Ali Aday
(3, 1), -- Ali ayrıca Jüri rolüne de sahip
(4, 8); -- Fatma Yönetici



-- Makaleler Tablosuna örnek veriler ekleme

INSERT INTO Makaleler (aktif, etkinlik_id, yazarlar, makale_adi, dergi_adi, cilt_no, sayfa_no, yıl) VALUES
(TRUE, 1, 'Ali Yılmaz, Ayşe Kara', 'Yapay Zekâ ile Görüntü İşleme', 'Bilim ve Teknik Dergisi', '34', '101-110', '2022-01-01'),
(TRUE, 2, 'Mehmet Demir', 'Makine Öğrenmesinde Yeni Yaklaşımlar', 'Teknoloji ve Mühendislik', '12', '55-63', '2023-01-01'),
(FALSE, 1, 'Zeynep Çelik', 'Tıp Alanında Yapay Zekâ Uygulamaları', 'Sağlık Bilimleri Dergisi', '8', '20-30', '2020-01-01'),
(TRUE, 3, 'Fatma Polat, Murat Aydın', 'İklim Değişikliğinin Tarım Üzerine Etkileri', 'Ziraat Araştırmaları', '5', '77-88', '2021-01-01'),
(TRUE, 2, 'Ahmet Şahin', 'Blokzincir Teknolojisinin Hukuki Boyutu', 'Hukuk ve Bilişim Dergisi', '1', '1-15', '2023-01-01');

-- Bilimsel Toplantı Faaliyetlerine örnek veriler ekleme

INSERT INTO BilimselToplantiFaaliyetleri 
(aktif, etkinlik_id, yazarlar, bildiri_adi, konferansin_adi, yapildigi_yer, sayfa_no, tarih) 
VALUES
(TRUE, 10, 'Ali Yılmaz, Ayşe Kara', 'Veri Madenciliği ile Öğrenci Başarı Tahmini', 'Uluslararası Eğitim Teknolojileri Konferansı', 'Ankara', '101-105', '2022-05-12'),

(TRUE, 10, 'Mehmet Demir', 'Endüstri 4.0 ve Akıllı Fabrikalar', 'Mühendislik ve Teknoloji Zirvesi', 'İstanbul', '55-60', '2023-04-18'),

(FALSE, 11, 'Zeynep Çelik', 'Sağlıkta Yapay Zekâ Kullanımı', 'Sağlık Bilişimi ve Teknolojileri Kongresi', 'İzmir', '23-30', '2021-11-08'),

(TRUE, 12, 'Fatma Polat, Murat Aydın', 'Tarımda Dijitalleşme ve Sensör Teknolojileri', 'Tarım Bilimleri ve Teknolojileri Sempozyumu', 'Konya', '77-83', '2023-06-21'),

(TRUE, 18, 'Ahmet Şahin', 'Siber Güvenlik ve Kişisel Verilerin Korunması', 'Bilgi Güvenliği Konferansı', 'Eskişehir', '10-18', '2022-10-03');


-- Kitaplar Tablosuna örnek veriler ekleme

INSERT INTO Kitaplar 
(aktif, etkinlik_id, yazarlar, kitap_adi, yayinevi, baski_sayisi, yayinlandigi_yer, tarih) VALUES
(TRUE, 22, 'Ali Yılmaz', 'Veri Bilimine Giriş', 'Akademi Yayıncılık', '1', 'Ankara', '2021-03-15'),

(TRUE, 22, 'Ayşe Kara, Mehmet Demir', 'Yapay Zekâ ve Uygulamaları', 'Teknoloji Yayınları', '2', 'İstanbul', '2022-06-01'),

(TRUE, 25, 'Zeynep Çelik', 'Sağlıkta Dijitalleşme', 'Tıp ve Teknoloji Basım', '1', 'İzmir', '2020-10-10'),

(FALSE, 24, 'Fatma Polat', 'Tarımda Akıllı Sistemler', 'Tarım Yayınları', '3', 'Konya', '2019-08-25'),

(TRUE, 27, 'Ahmet Şahin', 'Siber Güvenlik Rehberi', 'Bilişim Kitabevi', '1', 'Eskişehir', '2023-01-20');


-- Atıflar tablosuna örnek veriler ekleme

INSERT INTO Atiflar 
(aktif, etkinlik_id, atifin_yapildigi_eser, atif_sayisi) 
VALUES
(TRUE, 30, 'Veri Bilimine Giriş', 12),

(TRUE, 32, 'Yapay Zekâ ve Uygulamaları', 25),

(FALSE, 35, 'Sağlıkta Dijitalleşme', 5),

(TRUE, 33, 'Tarımda Akıllı Sistemler', 8),

(TRUE, 31, 'Siber Güvenlik Rehberi', 15);


-- Eğitim öğretim faaliyetleri tablosuna örnek veriler ekleme

INSERT INTO EgitimOgretimFaaliyetleri 
(aktif, etkinlik_id, dersin_adi, programin_adi, donemi, yili) 
VALUES
(TRUE, 36, 'Veri Yapıları', 'Bilgisayar Mühendisliği Lisans Programı', 'güz', '2022-01-01'),

(TRUE, 36, 'Yapay Zekâya Giriş', 'Yazılım Mühendisliği Lisans Programı', 'bahar', '2023-01-01'),

(TRUE, 37, 'İleri İstatistik', 'İşletme Yüksek Lisans Programı', 'güz', '2021-01-01'),

(FALSE, 37, 'Programlamaya Giriş', 'Bilgisayar Mühendisliği Lisans Programı', 'yaz', '2020-01-01'),

(TRUE, 38, 'Siber Güvenlik', 'Bilişim Sistemleri Tezli Yüksek Lisans Programı', 'bahar', '2023-01-01');



-- Tez Yöneticiliği Tablosuna örnek veriler ekleme

INSERT INTO TezYoneticiligi 
(aktif, etkinlik_id, ogrenci_adi, tezin_adi, enstitüsü, yili) 
VALUES
(TRUE, 40, 'Zeynep Kaya', 'Makine Öğrenmesi ile Anomali Tespiti', 'Fen Bilimleri Enstitüsü', '2022-01-01'),

(TRUE, 41, 'Ali Demir', 'Blokzincir Tabanlı Kimlik Doğrulama Sistemleri', 'Bilişim Enstitüsü', '2023-01-01'),

(TRUE, 42, 'Elif Yıldız', 'Tarımda IoT Teknolojilerinin Kullanımı', 'Fen Bilimleri Enstitüsü', '2021-01-01'),

(FALSE, 43, 'Murat Aydın', 'Bulut Bilişim Mimarilerinin Karşılaştırılması', 'Fen Bilimleri Enstitüsü', '2020-01-01'),

(TRUE, 40, 'Fatma Şahin', 'Sosyal Medyada Veri Madenciliği Uygulamaları', 'Sosyal Bilimler Enstitüsü', '2023-01-01');


-- Patentler tablosuna örnerk veriler ekleme

INSERT INTO Patentler 
(aktif, etkinlik_id, patent_adi, yili) 
VALUES
(TRUE, 51, 'Akıllı Sera Otomasyon Sistemi', '2021-01-01'),

(TRUE, 51, 'Giyilebilir Sağlık Takip Cihazı', '2022-01-01'),

(FALSE, 50, 'Mobil Tabanlı Eğitim Takip Sistemi', '2020-01-01'),

(TRUE, 45, 'Enerji Verimli Soğutma Ünitesi', '2023-01-01'),

(TRUE, 49, 'Yapay Zekâ Destekli Güvenlik Kamera Sistemi', '2023-01-01');



-- Araştırma projeleri tablosuna veri elkleme

INSERT INTO ArastirmaProjeleri 
(aktif, etkinlik_id, projenin_adi, proje_numarasi, proje_kurum, yili) 
VALUES
(TRUE, 59, 'Akıllı Tarım İçin Sensör Tabanlı Veri Toplama Sistemi', 'TUBITAK-120C456', 'TÜBİTAK', '2021-01-01'),

(TRUE, 55, 'Yapay Zekâ Destekli Hastalık Tahmin Sistemi', 'EU-H2020-HEALTH-2022', 'Avrupa Birliği Horizon 2020', '2022-01-01'),

(FALSE, 71, 'Kırsal Bölgelerde Güneş Enerjili Sulama Sistemi', 'TAGEM-2019-KIRSAL', 'Tarım ve Orman Bakanlığı', '2019-01-01'),

(TRUE, 64, 'Blokzincir ile Dijital Kimlik Doğrulama', 'TUBITAK-121E789', 'TÜBİTAK', '2023-01-01'),

(TRUE, 54, 'İklim Değişikliğinin Tarım Verimliliğine Etkisi', 'UNDP-AGRO-2022', 'Birleşmiş Milletler Kalkınma Programı (UNDP)', '2022-01-01');


-- Editörlük Hakemlik Tablosuna örnek veri ekleme

INSERT INTO EditorlukHakemlik 
(aktif, etkinlik_id, derginin_adi, sayisi, yili) 
VALUES
(TRUE, 80, 'Journal of Artificial Intelligence Research', 2, '2022-01-01'),

(TRUE, 86, 'International Journal of Agricultural Technology', 1, '2023-01-01'),

(FALSE, 87, 'Journal of Educational Technology and Society', 3, '2020-01-01'),

(TRUE, 88, 'Bilişim Teknolojileri ve Uygulamaları Dergisi', 1, '2021-01-01'),

(TRUE, 89, 'Sosyal Bilimler ve Eğitim Araştırmaları Dergisi', 2, '2023-01-01');


-- Ödüller tablosuna örnek veri ekleme

INSERT INTO Oduller 
(aktif, etkinlik_id, odul_veren_kurum_adi, yili) 
VALUES
(TRUE, 94, 'TÜBİTAK - Bilim Teşvik Ödülü', '2022-01-01'),

(TRUE, 103, 'YÖK - Üstün Başarı Ödülü', '2023-01-01'),

(FALSE, 93, 'IEEE - En İyi Makale Ödülü', '2020-01-01'),

(TRUE, 99, 'Avrupa Birliği - Genç Araştırmacı Ödülü', '2021-01-01'),

(TRUE, 99, 'Türkiye Bilimler Akademisi - Genç Bilim İnsanı Ödülü', '2023-01-01');


-- İdari görevler tablosuna örnek veri ekleme

INSERT INTO IdariGorevlerVeUniversiteyeKatkiFaaliyetleri 
(aktif, etkinlik_id, gorev_birimi, yili) 
VALUES
(TRUE, 120, 'Fakülte Kurulu Üyeliği – Mühendislik Fakültesi', '2022-01-01'),

(TRUE, 114, 'Bölüm Başkan Yardımcılığı – Bilgisayar Mühendisliği', '2023-01-01'),

(FALSE, 116, 'Senato Üyeliği – Üniversite Genel Kurulu', '2020-01-01'),

(TRUE, 117, 'Kalite Komisyonu Üyeliği – Eğitim Komisyonu', '2021-01-01'),

(TRUE, 117, 'Akademik Teşvik Değerlendirme Komisyonu Üyeliği', '2023-01-01');


-- Güzel sanatlar tablosuna örnek veri ekleme

INSERT INTO GuzelSanatlarFaaliyetleri 
(aktif, etkinlik_id, faaliyet_adi, yili) 
VALUES
(TRUE, 163, 'Karma Resim Sergisi – Akademik Sanatçılar Platformu', '2022-01-01'),

(TRUE, 104, 'Üniversitelerarası Tiyatro Festivali Katılımı', '2023-01-01'),

(FALSE, 126, 'Heykel Çalıştayı – Genç Sanatçılar Buluşması', '2019-01-01'),

(TRUE, 165, 'Fotoğraf Sergisi – Kültürel Mirasın İzinde', '2021-01-01'),

(TRUE, 141, 'Müzik Performansı – Bahar Şenliği Konseri', '2023-01-01');






