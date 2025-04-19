import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Kullanici {
  id: number;
  adSoyad: string;
}

interface IlanBilgisi {
  baslik: string;
  aciklama: string;
  basvuruSayisi: number;
}

const YoneticiJuriAtama = () => {
  const [ilanId] = useState(localStorage.getItem("secilenIlanId"));
  const [ilanBilgisi, setIlanBilgisi] = useState<IlanBilgisi | null>(null);
  const [atananJuriler, setAtananJuriler] = useState<Kullanici[]>([]);
  const [tumJuriHavuzu, setTumJuriHavuzu] = useState<Kullanici[]>([]);
  const [tumKullanicilar, setTumKullanicilar] = useState<Kullanici[]>([]);
  const [arama, setArama] = useState('');
  const [kullaniciArama, setKullaniciArama] = useState('');

  useEffect(() => {
    if (!ilanId) return;

    // İlan bilgisi
    axios.get(`/api/yonetici/ilan/${ilanId}`).then(res => {
      setIlanBilgisi(res.data);
    });

    // Atanan jüriler
    axios.get(`/api/yonetici/ilan/${ilanId}/juriler`).then(res => {
      setAtananJuriler(res.data);
    });

    // Jüri havuzu
    axios.get(`/api/yonetici/juri-havuzu`).then(res => {
      setTumJuriHavuzu(res.data);
    });

    // Tüm kullanıcılar
    axios.get(`/api/yonetici/kullanicilar`).then(res => {
      setTumKullanicilar(res.data);
    });
  }, [ilanId]);

  const juriEkle = async (juri: Kullanici) => {
    if (atananJuriler.some((j) => j.id === juri.id)) return;
    if (atananJuriler.length >= 5) {
      alert("En fazla 5 jüri atanabilir.");
      return;
    }

    try {
      await axios.post(`/api/yonetici/ilan/${ilanId}/juri-ekle`, {
        juriId: juri.id,
      });
      setAtananJuriler((prev) => [...prev, juri]);
    } catch (err) {
      alert("Jüri ataması sırasında hata oluştu.");
    }
  };

  const juriSil = async (juriId: number) => {
    try {
      await axios.delete(`/api/yonetici/ilan/${ilanId}/juri-sil/${juriId}`);
      setAtananJuriler((prev) => prev.filter((j) => j.id !== juriId));
    } catch (err) {
      alert("Jüri silinirken hata oluştu.");
    }
  };

  const juriYetkilendirVeEkle = async (kullanici: Kullanici) => {
    try {
      await axios.post(`/api/yonetici/juri-yetkilendir`, {
        kullaniciId: kullanici.id,
      });

      await juriEkle(kullanici);
      alert(`"${kullanici.adSoyad}" adlı kullanıcı jüri olarak yetkilendirildi ve atandı.`);
    } catch (err) {
      alert("Yetkilendirme işlemi sırasında hata oluştu.");
    }
  };

  const filtrelenmisJuriler = tumJuriHavuzu.filter(
    (juri) =>
      juri.adSoyad.toLowerCase().includes(arama.toLowerCase()) &&
      !atananJuriler.some((a) => a.id === juri.id)
  );

  const filtrelenmisKullanicilar = tumKullanicilar.filter(
    (k) =>
      k.adSoyad.toLowerCase().includes(kullaniciArama.toLowerCase()) &&
      !atananJuriler.some((a) => a.id === k.id)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* İlan Bilgisi */}
      {ilanBilgisi && (
        <div className="bg-white border rounded-md p-4 shadow">
          <h2 className="text-2xl font-semibold mb-2">{ilanBilgisi.baslik}</h2>
          <p className="text-gray-700">{ilanBilgisi.aciklama}</p>
        </div>
      )}

      {/* Başvuru Sayısı */}
      {ilanBilgisi && (
        <div className="bg-white border rounded-md p-4 shadow">
          <p className="text-lg">
            <strong>{ilanBilgisi.basvuruSayisi}</strong> başvuru yapılmıştır.
          </p>
        </div>
      )}

      {/* Atanan Jüriler */}
      <div className="bg-white border rounded-md p-4 shadow">
        <h3 className="text-lg font-semibold mb-3">Seçilen Jüri Üyeleri</h3>
        {atananJuriler.length === 0 ? (
          <p className="italic text-gray-500">Henüz jüri ataması yapılmamış.</p>
        ) : (
          <ul className="space-y-2">
            {atananJuriler.map((juri) => (
              <li
                key={juri.id}
                className="flex justify-between items-center border px-4 py-2 rounded bg-gray-50"
              >
                <span>{juri.adSoyad}</span>
                <button
                  onClick={() => juriSil(juri.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* === 1. TABLO: Sadece Jüri Olanlar === */}
      <div className="bg-white border rounded-md p-4 shadow space-y-4">
        <h3 className="text-lg font-semibold">Yeni Jüri Seçimi (Sadece Jüri Olanlar)</h3>

        <input
          type="text"
          placeholder="Jüri adı veya unvanı ara..."
          value={arama}
          onChange={(e) => setArama(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        {filtrelenmisJuriler.length === 0 ? (
          <p className="text-gray-500 italic">Eşleşen jüri bulunamadı.</p>
        ) : (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border w-4/5">Ad Soyad</th>
                <th className="px-4 py-2 border w-1/5 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtrelenmisJuriler.map((juri) => (
                <tr key={juri.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{juri.adSoyad}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => juriEkle(juri)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Ekle +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* === 2. TABLO: Tüm Kullanıcılar === */}
      <div className="bg-white border rounded-md p-4 shadow space-y-4 mt-10">
        <h3 className="text-lg font-semibold">Kullanıcıdan Jüri Atama (Tüm Kullanıcılar)</h3>

        <input
          type="text"
          placeholder="Kullanıcı adı ara..."
          value={kullaniciArama}
          onChange={(e) => setKullaniciArama(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        {filtrelenmisKullanicilar.length === 0 ? (
          <p className="text-gray-500 italic">Eşleşen kullanıcı bulunamadı.</p>
        ) : (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border w-4/5">Kullanıcı</th>
                <th className="px-4 py-2 border w-1/5 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtrelenmisKullanicilar.map((kullanici) => (
                <tr key={kullanici.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{kullanici.adSoyad}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => juriYetkilendirVeEkle(kullanici)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Yetkilendir + Ata
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default YoneticiJuriAtama;
