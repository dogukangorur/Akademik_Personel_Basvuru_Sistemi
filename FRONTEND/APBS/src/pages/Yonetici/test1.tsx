// 📄 Fakülte Grubu ve Kadro Pozisyonu ile dinamik olarak Tablo 1 ve Tablo 2 yönetimi

import { useEffect, useState } from 'react';

interface FakulteGrup {
    id: number;
    fakulte_grup_adi: string;
}

interface KadroPozisyonu {
    id: number;
    pozisyon_adi: string;
}

interface Baslik {
    id: number;
    baslik_kodu: string;
}

const test1 = () => {
    const [formData, setFormData] = useState({
        baslik_id: 1,
        baslik_no_min: 1,
        baslik_no_max: 4,
        fak_gur_id: 1,
        poz_id: 1,
        asgari: 60,
        azami: 100,
    });

    const fakulteGruplari: FakulteGrup[] = [
        { id: 1, fakulte_grup_adi: 'Mühendislik' },
        { id: 2, fakulte_grup_adi: 'Fen Edebiyat' },
    ];

    const kadrolar: KadroPozisyonu[] = [
        { id: 1, pozisyon_adi: 'Dr. Öğr. Üyesi' },
        { id: 2, pozisyon_adi: 'Doçent' },
    ];

    const basliklar: Baslik[] = [
        { id: 1, baslik_kodu: 'A.1' },
        { id: 2, baslik_kodu: 'A.2' },
        { id: 3, baslik_kodu: 'A.3' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Form verileri:\n' + JSON.stringify(formData, null, 2));
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Puan Kriteri Düzenleme</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Başlık</label>
                    <select name="baslik_id" onChange={handleChange} value={formData.baslik_id} className="mt-1 block w-full border rounded px-3 py-2">
                        {basliklar.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.baslik_kodu}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Fakülte Grubu</label>
                    <select name="fak_gur_id" onChange={handleChange} value={formData.fak_gur_id} className="mt-1 block w-full border rounded px-3 py-2">
                        {fakulteGruplari.map((fg) => (
                            <option key={fg.id} value={fg.id}>
                                {fg.fakulte_grup_adi}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Kadro Pozisyonu</label>
                    <select name="poz_id" onChange={handleChange} value={formData.poz_id} className="mt-1 block w-full border rounded px-3 py-2">
                        {kadrolar.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.pozisyon_adi}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Başlık No Aralığı</label>
                    <div className="flex space-x-2">
                        <input name="baslik_no_min" type="number" value={formData.baslik_no_min} onChange={handleChange} className="w-1/2 border rounded px-2 py-1" />
                        <input name="baslik_no_max" type="number" value={formData.baslik_no_max} onChange={handleChange} className="w-1/2 border rounded px-2 py-1" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Asgari Puan</label>
                    <input name="asgari" type="number" value={formData.asgari} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Azami Puan</label>
                    <input name="azami" type="number" value={formData.azami} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
            </div>

            <div className="text-right">
                <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                    Kaydet
                </button>
            </div>
        </form>
    );
};

export default test1;

// 🔷 Tablo 2 yapısı farklıysa (örneğin sadece sayılar ve fakülte grubu varsa) ayrı form olarak buraya eklenebilir
