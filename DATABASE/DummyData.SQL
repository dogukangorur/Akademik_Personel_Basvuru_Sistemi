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
