import { useEffect, useState } from 'react';
import axios from 'axios';

interface FakulteGrup {
    id: number;
    fakulte_grup_adi: string;
}

interface Kadro {
    id: number;
    kadro_adi: string;
}

interface Baslik {
    id: number;
    baslik_kod: string;
    baslik_adi: string;
}

const YoneticiEtkinlikSayıKriter = () => {
    const [formData, setFormData] = useState({
        baslik_id: 0,
        baslik_no_min: 1,
        baslik_no_max: 1,
        fakulte_grup_id: 0,
        kadro_id: 0,
        deger: 0,
    });

    const [veriler, setVeriler] = useState<any[]>([]);
    const [fakulteGruplari, setFakulteGruplari] = useState<FakulteGrup[]>([]);
    const [basliklar, setBasliklar] = useState<Baslik[]>([]);
    const [duzenleMod, setDuzenleMod] = useState<any | null>(null);
    const [silmeMod, setSilmeMod] = useState<any | null>(null);

    const kadrolar: Kadro[] = [
        { id: 6, kadro_adi: 'Dr. Öğr. Üyesi' },
        { id: 7, kadro_adi: 'Doçent' },
        { id: 8, kadro_adi: 'Profesör' },
    ];

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/yonetici/faaliyet-kriterleri')
            .then((res) => setVeriler(res.data))
            .catch((err) => console.error('Veri çekme hatası:', err));

        axios
            .get('http://localhost:8080/api/yonetici/fakulte-gruplari')
            .then((res) => setFakulteGruplari(res.data))
            .catch((err) => console.error('Fakülte grupları çekilemedi:', err));

        axios
            .get('http://localhost:8080/api/yonetici/basliklar')
            .then((res) => setBasliklar(res.data))
            .catch((err) => console.error('Başlıklar çekilemedi:', err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = ['kadro_id', 'fakulte_grup_id', 'baslik_id', 'baslik_no_min', 'baslik_no_max', 'deger'].includes(name) ? Number(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fakulte_grup_id || !formData.kadro_id || !formData.baslik_id) {
            alert('Lütfen tüm alanları eksiksiz doldurunuz.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/yonetici/faaliyet-kriterleri', formData);
            const yeniId = response.data.id;
            const yeniVeri = {
                ...formData,
                id: yeniId,
                fakulte_grup_adi: fakulteGruplari.find((fg) => fg.id === formData.fakulte_grup_id)?.fakulte_grup_adi,
                kadro_adi: kadrolar.find((k) => k.id === formData.kadro_id)?.kadro_adi,
                faaliyet_araligi: getFaaliyetAraligi(formData),
            };
            setVeriler([...veriler, yeniVeri]);
            setFormData({ baslik_id: 0, baslik_no_min: 1, baslik_no_max: 1, fakulte_grup_id: 0, kadro_id: 0, deger: 0 });
        } catch (err) {
            console.error('Ekleme hatası:', err);
        }
    };

    const handleSil = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/yonetici/faaliyet-kriterleri/${id}`);
            setVeriler(veriler.filter((v) => v.id !== id));
            setSilmeMod(null);
        } catch (err) {
            console.error('Silme hatası:', err);
        }
    };

    const handleDuzenle = (veri: any) => {
        setDuzenleMod(veri);
    };

    const handleDuzenleKaydet = async () => {
        try {
            await axios.put(`http://localhost:8080/api/yonetici/faaliyet-kriterleri/${duzenleMod.id}`, { deger: duzenleMod.deger });
            setVeriler(veriler.map((v) => (v.id === duzenleMod.id ? { ...v, deger: duzenleMod.deger } : v)));
            setDuzenleMod(null);
        } catch (err) {
            console.error('Güncelleme hatası:', err);
        }
    };

    const getFaaliyetAraligi = (veri: any) => {
        const kod = basliklar.find((b) => b.id === veri.baslik_id)?.baslik_kod;
        return `${kod}.${veri.baslik_no_min} - ${kod}.${veri.baslik_no_max}`;
    };

    return (
        <div className="p-4 space-y-4">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Yeni Faaliyet Kriteri Ekle</h2>

                <div>
                    <label className="block text-sm font-medium">Fakülte Grubu</label>
                    <select name="fakulte_grup_id" value={formData.fakulte_grup_id} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" required>
                        <option value={0} disabled>
                            Fakülte Grubu Seçiniz
                        </option>
                        {fakulteGruplari.map((fg) => (
                            <option key={fg.id} value={fg.id}>
                                {fg.fakulte_grup_adi}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Kadro</label>
                        <select name="kadro_id" value={formData.kadro_id} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" required>
                            <option value={0} disabled>
                                Kadro Seçiniz
                            </option>
                            {kadrolar.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.kadro_adi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Başlık</label>
                        <select name="baslik_id" value={formData.baslik_id} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" required>
                            <option value={0} disabled>
                                Başlık Seçiniz
                            </option>
                            {basliklar.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.baslik_kod} - {b.baslik_adi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Numara Aralığı</label>
                        <div className="flex gap-2">
                            <input type="number" name="baslik_no_min" value={formData.baslik_no_min} onChange={handleChange} className="w-1/2 border rounded px-2 py-2" min={1} />
                            <input type="number" name="baslik_no_max" value={formData.baslik_no_max} onChange={handleChange} className="w-1/2 border rounded px-2 py-2" min={formData.baslik_no_min} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Değer</label>
                    <input name="deger" type="number" value={formData.deger} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" required />
                </div>

                <div className="text-right">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Ekle
                    </button>
                </div>
            </form>

            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-md font-semibold mb-4">Kayıtlı Kriterler</h3>
                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">Faaliyet Kodu</th>
                            <th className="border px-2 py-1">Fakülte Grubu</th>
                            <th className="border px-2 py-1">Kadro</th>
                            <th className="border px-2 py-1">Değer</th>
                            <th className="border px-2 py-1">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veriler.map((v) => (
                            <tr key={v.id}>
                                <td className="border px-2 py-1">{getFaaliyetAraligi(v)}</td>
                                <td className="border px-2 py-1">{fakulteGruplari.find((fg) => fg.id === v.fakulte_grup_id)?.fakulte_grup_adi}</td>
                                <td className="border px-2 py-1">{kadrolar.find((k) => k.id === v.kadro_id)?.kadro_adi}</td>
                                <td className="border px-2 py-1 text-center">{v.deger}</td>
                                <td className="border px-2 py-1 text-center space-x-2">
                                    <button onClick={() => handleDuzenle(v)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                        Düzenle
                                    </button>
                                    <button onClick={() => setSilmeMod(v)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modaller */}
            {duzenleMod && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-[500px] space-y-4">
                        <h3 className="text-lg font-bold">Kriteri Düzenle</h3>
                        <p className="text-sm text-gray-600">{getFaaliyetAraligi(duzenleMod)}</p>
                        <label className="block text-sm font-medium">Değer</label>
                        <input className="w-full border rounded px-3 py-2" type="number" value={duzenleMod.deger} onChange={(e) => setDuzenleMod({ ...duzenleMod, deger: parseInt(e.target.value) })} />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setDuzenleMod(null)} className="px-4 py-2 bg-gray-300 rounded">
                                İptal
                            </button>
                            <button onClick={handleDuzenleKaydet} className="px-4 py-2 bg-blue-600 text-white rounded">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {silmeMod && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-[400px] space-y-4">
                        <h3 className="text-lg font-bold text-red-600">Silme Onayı</h3>
                        <p className="text-sm text-gray-700">
                            <strong>{getFaaliyetAraligi(silmeMod)}</strong> kriteri silinsin mi?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setSilmeMod(null)} className="px-4 py-2 bg-gray-300 rounded">
                                Vazgeç
                            </button>
                            <button onClick={() => handleSil(silmeMod.id)} className="px-4 py-2 bg-red-600 text-white rounded">
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoneticiEtkinlikSayıKriter;
