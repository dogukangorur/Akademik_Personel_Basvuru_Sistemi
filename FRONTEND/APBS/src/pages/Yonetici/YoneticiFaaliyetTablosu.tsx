import { useState } from 'react';
import AnimateHeight from 'react-animate-height';

const accordionTitles = [
    'MAKALELER',
    'BİLİMSEL TOPLANTI FAALİYETLERİ',
    'KİTAPLAR',
    'ATIFLAR',
    'EĞİTİM ÖĞRETİM FAALİYETLERİ',
    'TEZ YÖNETİCİLİĞİ',
    'PATENTLER',
    'ARAŞTIRMA PROJELERİ',
    'EDİTÖRLÜK, YAYIN KURULU ÜYELİĞİ VE HAKEMLİK FAALİYETLERİ',
    'ÖDÜLLER (Temel alanı ile ilgili olmak üzere)',
    'İDARİ GÖREVLER VE ÜNİVERSİTEYE KATKI FAALİYETLERİ',
    'GÜZEL SANATLAR FAALİYETLERİ (Konservatuvar dahil)',
];

const YoneticiFaaliyetTablosu = () => {
    const [active, setActive] = useState<string>('');
    const [modalState, setModalState] = useState<{ open: boolean; accordionKey: string | null }>({ open: false, accordionKey: null });
    const [newEntryMode, setNewEntryMode] = useState(false);
    const [formData, setFormData] = useState({ id: '', ad: '', puan: '' });
    const [editId, setEditId] = useState<number | null>(null);

    const [faaliyetler, setFaaliyetler] = useState<{ [key: string]: { id: number; ad: string; puan: number }[] }>({
        '1': [{ id: 101, ad: 'Makale Yayını', puan: 20 }],
        '2': [{ id: 201, ad: 'Sempozyum Sunumu', puan: 10 }],
        '3': [{ id: 301, ad: 'Kitap Bölümü Yazarlığı', puan: 25 }],
        '4': [{ id: 401, ad: 'Atıf Alınması', puan: 15 }],
    });

    const toggleAccordion = (key: string) => {
        setActive((prev) => (prev === key ? '' : key));
    };

    const openModalForNew = (key: string) => {
        setNewEntryMode(true);
        setEditId(null);
        setFormData({ id: '', ad: '', puan: '' });
        setModalState({ open: true, accordionKey: key });
    };

    const openModalForEdit = (key: string, item: any) => {
        setNewEntryMode(false);
        setEditId(item.id);
        setFormData({ id: item.id.toString(), ad: item.ad, puan: item.puan.toString() });
        setModalState({ open: true, accordionKey: key });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleKaydet = () => {
        const key = modalState.accordionKey;
        if (!key) return;
        const yeniId = parseInt(formData.id);
        const yeniPuan = parseInt(formData.puan);

        const yeniItem = { id: yeniId, ad: formData.ad, puan: yeniPuan };

        setFaaliyetler((prev) => {
            const list = prev[key] || [];
            const guncellenmis = newEntryMode ? [...list, yeniItem] : list.map((f) => (f.id === editId ? yeniItem : f));
            return { ...prev, [key]: guncellenmis };
        });

        setModalState({ open: false, accordionKey: null });
        setEditId(null);
        setFormData({ id: '', ad: '', puan: '' });
    };

    const handleIptal = () => {
        setModalState({ open: false, accordionKey: null });
        setEditId(null);
        setFormData({ id: '', ad: '', puan: '' });
    };

    const handleSil = (key: string, id: number) => {
        setFaaliyetler((prev) => {
            const yeniListe = prev[key].filter((item) => item.id !== id);
            return { ...prev, [key]: yeniListe };
        });
    };

    return (
        <div className="p-4 space-y-4">
            {accordionTitles.map((title, idx) => {
                const key = (idx + 1).toString();
                return (
                    <div key={key} className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                        <button className="p-4 w-full flex items-center justify-between text-white-dark dark:bg-[#1b2e4b]" onClick={() => toggleAccordion(key)}>
                            <span>{title}</span>
                        </button>
                        <AnimateHeight duration={300} height={active === key ? 'auto' : 0}>
                            <div className="p-4 border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                                <table className="min-w-full table-auto border border-gray-300 text-sm mb-4">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-center">No</th>
                                            <th className="px-4 py-2 w-4/6">Faaliyet Adı</th>
                                            <th className="px-4 py-2 text-center">Puan</th>
                                            <th className="px-4 py-2 text-center">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(faaliyetler[key] || []).map((faaliyet) => (
                                            <tr key={faaliyet.id}>
                                                <td className="px-4 py-2 text-center">{faaliyet.id}</td>
                                                <td className="px-4 py-2">{faaliyet.ad}</td>
                                                <td className="px-4 py-2 text-center">{faaliyet.puan}</td>
                                                <td className="px-4 py-2 text-center space-x-2">
                                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => openModalForEdit(key, faaliyet)}>
                                                        Düzenle
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleSil(key, faaliyet.id)}>
                                                        Kaldır
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => openModalForNew(key)}>
                                    Yeni Faaliyet Ekle
                                </button>
                            </div>
                        </AnimateHeight>
                    </div>
                );
            })}

            {modalState.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-3xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-6">{newEntryMode ? 'Yeni Faaliyet Ekle' : 'Faaliyet Düzenle'}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Faaliyet Adı</label>
                                <input name="ad" value={formData.ad} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Faaliyet Adı" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">No</label>
                                <input name="id" value={formData.id} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Faaliyet No" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Puan</label>
                                <input name="puan" type="number" value={formData.puan} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Puan" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700" onClick={handleKaydet}>
                                Kaydet
                            </button>
                            <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={handleIptal}>
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoneticiFaaliyetTablosu;
