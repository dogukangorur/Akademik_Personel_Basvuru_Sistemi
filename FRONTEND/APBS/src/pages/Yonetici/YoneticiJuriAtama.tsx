import React, { useState /*, useEffect */ } from 'react';

// Geçici jüri havuzu – ileride API'den alınacak
const mockJuriHavuzu = [
  'Prof. Dr. Ahmet Yılmaz',
  'Doç. Dr. Ayşe Demir',
  'Dr. Öğr. Üyesi Mehmet Kaya',
  'Dr. Öğr. Üyesi Zeynep Karaca',
  'Prof. Dr. Canan Aydın',
  'Dr. Öğr. Üyesi Hakan Tuna',
];

const YoneticiJuriAtama = () => {
  // İlan bilgisi – geçici olarak sabitlenmiş
  const [ilanBilgisi] = useState({
    baslik: 'Bilgisayar Müh. Doçent Kadrosu',
    aciklama: 'Yapay zeka ve veri bilimi alanında uzman adaylar için açılmıştır.',
    basvuruSayisi: 12,
  });

  const [atananJuriler, setAtananJuriler] = useState<string[]>([
    'Prof. Dr. Ahmet Yılmaz',
    'Doç. Dr. Ayşe Demir',
  ]);
  const [arama, setArama] = useState('');
  const [tumJuriHavuzu] = useState<string[]>(mockJuriHavuzu);

  // useEffect(() => {
  //   // İleride burada ilan bilgisi ve jüri havuzu API'den çekilebilir
  //   // örn: fetch('/api/juriler').then(res => res.json()).then(setTumJuriHavuzu);
  // }, []);

  const filtrelenmisJuriler = tumJuriHavuzu.filter(
    (juri) =>
      juri.toLowerCase().includes(arama.toLowerCase()) &&
      !atananJuriler.includes(juri)
  );

  const juriEkle = (juri: string) => {
    if (atananJuriler.length < 5) {
      setAtananJuriler([...atananJuriler, juri]);
    } else {
      alert('En fazla 5 jüri eklenebilir.');
    }
  };

  const juriSil = (index: number) => {
    const yeniListe = [...atananJuriler];
    yeniListe.splice(index, 1);
    setAtananJuriler(yeniListe);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* İlan Bilgisi */}
      <div className="bg-white border rounded-md p-4 shadow">
        <h2 className="text-2xl font-semibold mb-2">{ilanBilgisi.baslik}</h2>
        <p className="text-gray-700">{ilanBilgisi.aciklama}</p>
      </div>

      {/* Başvuru Sayısı */}
      <div className="bg-white border rounded-md p-4 shadow">
        <p className="text-lg">
          <strong>{ilanBilgisi.basvuruSayisi}</strong> başvuru yapılmıştır.
        </p>
      </div>

      {/* Seçilen Jüri Listesi */}
      <div className="bg-white border rounded-md p-4 shadow">
        <h3 className="text-lg font-semibold mb-3">Seçilen Jüri Üyeleri</h3>
        {atananJuriler.length === 0 ? (
          <p className="italic text-gray-500">Henüz jüri ataması yapılmamış.</p>
        ) : (
          <ul className="space-y-2">
            {atananJuriler.map((juri, index) => (
              <li
                key={index}
                className="flex justify-between items-center border px-4 py-2 rounded bg-gray-50"
              >
                <span>{juri}</span>
                <button
                  onClick={() => juriSil(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Jüri Arama ve Listeleme Tablosu */}
      <div className="bg-white border rounded-md p-4 shadow space-y-4">
        <h3 className="text-lg font-semibold">Yeni Jüri Seçimi</h3>

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
              {filtrelenmisJuriler.map((juri, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{juri}</td>
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
    </div>
  );
};

export default YoneticiJuriAtama;
