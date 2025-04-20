import { useEffect, useState } from 'react';
import axios from 'axios';
import AnimateHeight from 'react-animate-height';

type JuriDegerlendirme = {
  juriAdi: string;
  belgeURL: string;
  metin: string;
  juriDegerlendirme: 'Olumlu' | 'Olumsuz';
};

type Basvuru = {
  id: number;
  adayAdi: string;
  belgeAdi: string;
  juriDegerlendirmeleri: JuriDegerlendirme[];
};

const YoneticiNihaiKarar = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleAccordion = (id: number) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const secilenIlanId = localStorage.getItem("secilenIlanId");
      if (!secilenIlanId) {
        setError("Seçilen ilan bulunamadı.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/yonetici/ilan-basvurulari/${secilenIlanId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (Array.isArray(response.data)) {
          setBasvurular(response.data);
        } else {
          console.warn("Beklenmeyen veri formatı:", response.data);
          setError("Veri formatı hatalı.");
        }
      } catch (err) {
        console.error("Başvuru verileri alınamadı:", err);
        setError("Veri alınırken hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mb-5">
      <h2 className="text-xl font-semibold mb-4">Başvuru Değerlendirme Sonuçları</h2>

      {loading && <p>Yükleniyor...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-2 font-semibold">
          {basvurular.map((basvuru, index) => (
            <div key={basvuru.id} className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
              <button
                type="button"
                className="p-4 w-full flex items-center text-white-dark dark:bg-[#1b2e4b]"
                onClick={() => toggleAccordion(basvuru.id)}
              >
                <span className="mr-2 text-sm font-bold">{index + 1}.</span>
                Başvuru – {basvuru.adayAdi} ({basvuru.belgeAdi})
                <div className={`ltr:ml-auto rtl:mr-auto ${activeId === basvuru.id ? 'rotate-180' : ''}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              </button>

              <AnimateHeight duration={300} height={activeId === basvuru.id ? 'auto' : 0}>
                <div className="p-4 text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b] text-white-dark space-y-6">

                  {basvuru.juriDegerlendirmeleri.map((degerlendirme, juriIndex) => (
                    <div key={juriIndex} className="p-4 border rounded bg-white dark:bg-[#1e293b] space-y-3">
                      <div className="font-bold text-sm text-blue-300">{degerlendirme.juriAdi}</div>

                      <div className="flex items-center justify-between text-sm">
                        <span>📎 Yüklenen Belge</span>
                        <a href={degerlendirme.belgeURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                          Görüntüle / İndir
                        </a>
                      </div>

                      <div>
                        <label className="block mb-1">📝 Jüri Açıklaması</label>
                        <textarea
                          readOnly
                          value={degerlendirme.metin}
                          className="w-full p-2 rounded border border-gray-300 dark:border-[#1b2e4b] bg-gray-100 dark:bg-[#1b2e4b]"
                          rows={3}
                        />
                      </div>

                      <div>
                        <strong>🔎 Jüri Değerlendirmesi: </strong>
                        <span className={degerlendirme.juriDegerlendirme === 'Olumlu' ? 'text-green-500' : 'text-red-500'}>
                          {degerlendirme.juriDegerlendirme}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Yönetici Karar Butonları */}
                  <div className="flex justify-end gap-2 pt-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Onayla</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reddet</button>
                  </div>
                </div>
              </AnimateHeight>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YoneticiNihaiKarar;
