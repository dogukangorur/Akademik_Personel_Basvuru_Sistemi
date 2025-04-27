import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface PuanKriterForm {
    baslik_id: number;
    baslik_no_min: number;
    baslik_no_max: number;
    fak_gur_id: number;
    poz_id: number;
    asgari: number;
    azami: number;
}

const kadrolar = [
    { id: 6, ad: 'Dr. Öğr. Üyesi' },
    { id: 7, ad: 'Doçent' },
    { id: 8, ad: 'Profesör' },
];

const YoneticiEtkinlikPuanKriter = () => {
    const [formData, setFormData] = useState<PuanKriterForm>({
        baslik_id: 0,
        baslik_no_min: 1,
        baslik_no_max: 1,
        fak_gur_id: 0,
        poz_id: 0,
        asgari: 0,
        azami: 0,
    });

    const [liste, setListe] = useState<any[]>([]);
    const [basliklar, setBasliklar] = useState<any[]>([]);
    const [fakulteGruplari, setFakulteGruplari] = useState<any[]>([]);
    const [duzenleMod, setDuzenleMod] = useState<any | null>(null);
    const [silMod, setSilMod] = useState<any | null>(null);

    const fetchData = async () => {
        try {
            const [kriterRes, baslikRes, fakulteRes] = await Promise.all([
                axios.get('http://localhost:8080/api/yonetici/puan-kriterleri'),
                axios.get('http://localhost:8080/api/yonetici/basliklar'),
                axios.get('http://localhost:8080/api/yonetici/fakulte-gruplari'),
            ]);
            setListe(kriterRes.data);
            setBasliklar(baslikRes.data);
            setFakulteGruplari(fakulteRes.data);

            MySwal.fire({
                title: 'Veriler başarıyla yüklendi!',
                icon: 'success',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                showCloseButton: true,
                customClass: { popup: 'color-success' },
            });
        } catch (err) {
            MySwal.fire({
                title: 'Veriler yüklenirken hata oluştu!',
                icon: 'error',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: 'color-error' },
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newValue = ['poz_id', 'fak_gur_id', 'baslik_id', 'baslik_no_min', 'baslik_no_max', 'asgari', 'azami'].includes(name) ? parseInt(value, 10) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.fak_gur_id <= 0 || formData.poz_id <= 0 || formData.baslik_id <= 0) {
            MySwal.fire({
                title: 'Tüm alanları eksiksiz doldurun!',
                icon: 'warning',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: 'color-warning' },
            });
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/yonetici/puan-kriterleri', formData);
            await fetchData();
            setFormData({
                baslik_id: 0,
                baslik_no_min: 1,
                baslik_no_max: 1,
                fak_gur_id: 0,
                poz_id: 0,
                asgari: 0,
                azami: 0,
            });

            MySwal.fire({
                title: 'Puan kriteri başarıyla eklendi!',
                icon: 'success',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                showCloseButton: true,
                customClass: { popup: 'color-success' },
            });
        } catch (err) {
            MySwal.fire({
                title: 'Kayıt eklenirken hata oluştu!',
                icon: 'error',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: 'color-error' },
            });
        }
    };

    const handleDuzenle = (item: any) => setDuzenleMod({ ...item });
    const handleSil = (item: any) => setSilMod(item);

    const handleDuzenleKaydet = async () => {
        try {
            await axios.put(`http://localhost:8080/api/yonetici/puan-kriterleri/${duzenleMod.id}`, {
                asgari: duzenleMod.asgari,
                azami: duzenleMod.azami,
            });
            await fetchData();
            setDuzenleMod(null);

            MySwal.fire({
                title: 'Kriter başarıyla güncellendi!',
                icon: 'success',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                showCloseButton: true,
                customClass: { popup: 'color-success' },
            });
        } catch (err) {
            MySwal.fire({
                title: 'Güncelleme sırasında hata oluştu!',
                icon: 'error',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: 'color-error' },
            });
        }
    };

    const handleSilOnayla = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/yonetici/puan-kriterleri/${silMod.id}`);
            await fetchData();
            setSilMod(null);

            MySwal.fire({
                title: 'Kriter başarıyla silindi!',
                icon: 'success',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                showCloseButton: true,
                customClass: { popup: 'color-success' },
            });
        } catch (err) {
            MySwal.fire({
                title: 'Silme sırasında hata oluştu!',
                icon: 'error',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true,
                customClass: { popup: 'color-error' },
            });
        }
    };

    const getFaaliyetAraligi = (item: any) => {
        const baslikKod = basliklar.find((b) => b.id === item.baslik_id)?.baslik_kod || '';
        return `${baslikKod}.${item.baslik_no_min} - ${baslikKod}.${item.baslik_no_max}`;
    };

    return (
        <div className="p-4 space-y-4">
            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Yeni Puan Kriteri Ekle</h2>

                <div>
                    <label className="block text-sm font-medium">Fakülte Grubu</label>
                    <select name="fak_gur_id" value={formData.fak_gur_id} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                        <option value={0} disabled hidden>
                            Fakülte Grubu Seçiniz
                        </option>
                        {fakulteGruplari.map((f) => (
                            <option key={f.id} value={f.id}>
                                {f.fakulte_grup_adi}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Kadro</label>
                        <select name="poz_id" value={formData.poz_id} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                            <option value={0} disabled hidden>
                                Kadro Seçiniz
                            </option>
                            {kadrolar.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.ad}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Faaliyet Başlığı</label>
                        <select name="baslik_id" value={formData.baslik_id} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
                            <option value={0} disabled hidden>
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
                        <label className="block text-sm font-medium">No Aralığı</label>
                        <div className="flex gap-3">
                            <input type="number" name="baslik_no_min" value={formData.baslik_no_min} onChange={handleChange} className="w-1/2 border rounded px-2 py-2" min={1} />
                            <input type="number" name="baslik_no_max" value={formData.baslik_no_max} onChange={handleChange} className="w-1/2 border rounded px-2 py-2" min={formData.baslik_no_min} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Asgari</label>
                        <input type="number" name="asgari" value={formData.asgari} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Azami</label>
                        <input type="number" name="azami" value={formData.azami} onChange={handleChange} className="w-full border rounded px-3 py-2" />
                    </div>
                </div>

                <div className="text-right">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Kaydet
                    </button>
                </div>
            </form>

            {/* Liste */}
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-md font-semibold mb-4">Tanımlı Kriterler</h3>
                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">Faaliyetler</th>
                            <th className="border px-2 py-1">Fakülte Grubu</th>
                            <th className="border px-2 py-1">Kadro</th>
                            <th className="border px-2 py-1">Asgari</th>
                            <th className="border px-2 py-1">Azami</th>
                            <th className="border px-2 py-1">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {liste.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-2 py-1">{getFaaliyetAraligi(item)}</td>
                                <td className="border px-2 py-1">{fakulteGruplari.find((f) => f.id === item.fak_gur_id)?.fakulte_grup_adi}</td>
                                <td className="border px-2 py-1">{kadrolar.find((k) => k.id === item.poz_id)?.ad}</td>
                                <td className="border px-2 py-1 text-center">{item.asgari}</td>
                                <td className="border px-2 py-1 text-center">{item.azami}</td>
                                <td className="border px-2 py-1 text-center space-x-2">
                                    <button onClick={() => handleDuzenle(item)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                        Düzenle
                                    </button>
                                    <button onClick={() => handleSil(item)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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
                    <div className="bg-white p-6 rounded w-[400px] space-y-4">
                        <h3 className="text-lg font-bold">Kriteri Düzenle</h3>
                        <p className="text-sm text-gray-600">{getFaaliyetAraligi(duzenleMod)}</p>
                        <label className="block text-sm font-medium">Asgari</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            type="number"
                            value={duzenleMod.asgari}
                            onChange={(e) => setDuzenleMod({ ...duzenleMod, asgari: parseInt(e.target.value) })}
                        />
                        <label className="block text-sm font-medium">Azami</label>
                        <input className="w-full border rounded px-3 py-2" type="number" value={duzenleMod.azami} onChange={(e) => setDuzenleMod({ ...duzenleMod, azami: parseInt(e.target.value) })} />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setDuzenleMod(null)} className="px-4 py-2 bg-gray-300 rounded">
                                İptal
                            </button>
                            <button type="button" onClick={handleDuzenleKaydet} className="px-4 py-2 bg-blue-600 text-white rounded">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {silMod && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-[400px] space-y-4">
                        <h3 className="text-lg font-bold text-red-600">Silme Onayı</h3>
                        <p className="text-sm text-gray-700">
                            <strong>{getFaaliyetAraligi(silMod)}</strong> kriteri silinsin mi?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setSilMod(null)} className="px-4 py-2 bg-gray-300 rounded">
                                Vazgeç
                            </button>
                            <button type="button" onClick={handleSilOnayla} className="px-4 py-2 bg-red-600 text-white rounded">
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoneticiEtkinlikPuanKriter;
