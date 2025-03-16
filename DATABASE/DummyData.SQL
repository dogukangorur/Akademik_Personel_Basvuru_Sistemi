-- Kullanıcı tablosuna örnek veriler ekleme
INSERT INTO Kullanici (ad, soyad, tc, telNo, mail, sifre) VALUES
('Ahmet', 'Yılmaz', '12345678901', '05001112233', 'ahmet@mail.com', 'sifre123'),
('Melisa', 'Kaya', '23456789012', '05002223344', 'melisa@mail.com', 'sifre234'),
('Ali', 'Kara', '23456789018', '05002223341', 'ali@mail.com', 'sifre234'),
('Burak', 'Demir', '34567890123', '05003334455', 'burak@mail.com', 'sifre345');

-- Rol tablosuna örnek veriler ekleme
INSERT INTO Rol (tanimlama) VALUES
('Admin'),
('Jüri'),
('Aday'),
('Yönetici');

-- KullanıcıRoller tablosuna örnek veriler ekleme
INSERT INTO KullaniciRoller (kullaniciID, rolID) VALUES
(1, 1), -- Ahmet Admin
(2, 2), -- Melisa Jüri
(3, 3), -- Ali Aday
(3, 2), -- Ali ayrıca Jüri rolüne de sahip
(4, 4); -- Burak Yönetici
