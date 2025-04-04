import { useState, ChangeEvent, FormEvent } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const JuriBasvuruDegerlendirme = () => {
    const [adayAdi] = useState<string>('Ahmet Yılmaz');
    const belgeler: { id: number; ad: string; tarih: string; link: string }[] = [
        { id: 1, ad: 'Özgeçmiş.pdf', tarih: '2024-04-01', link: '#' },
        { id: 2, ad: 'Yayın Listesi.pdf', tarih: '2024-04-02', link: '#' },
        { id: 3, ad: 'Diploma.pdf', tarih: '2024-04-03', link: '#' },
    ];

    const [dosya, setDosya] = useState<File | null>(null);
    const [nihaiSonuc, setNihaiSonuc] = useState<string>('');
    const [yorum, setYorum] = useState<string>('');

    const handleDosyaYukle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setDosya(e.target.files[0]);
        }
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert('Değerlendirme ve sonuç kaydedildi.');
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <h2 className="text-3xl font-handwriting text-center">Başvuru değerlendirme</h2>

            {/* 1. Alan: Belgeler */}
            <div>
                <h3 className="text-lg mb-4">İncelenen Aday: <span className="font-bold">{adayAdi}</span></h3>
                <div className="border rounded p-4 mb-5">
                    <h4 className="mb-3">Belgeler ve Tablolar</h4>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b pb-2">Belge Adı</th>
                                <th className="border-b pb-2">Tarih</th>
                                <th className="border-b pb-2 text-center">Görüntüle</th>
                                <th className="border-b pb-2 text-center">İndir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {belgeler.map((belge) => (
                                <tr key={belge.id}>
                                    <td className="py-2">{belge.ad}</td>
                                    <td>{belge.tarih}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Tippy content="Belgeyi görüntüle">
                                            <button
                                                type="button"
                                                onClick={() => window.open(belge.link, '_blank')}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                Görüntüle
                                            </button>
                                        </Tippy>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <Tippy content="Belgeyi indir">
                                            <button
                                                type="button"
                                                onClick={() => window.location.href = belge.link}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                İndir
                                            </button>
                                        </Tippy>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 2. Alan: Jüri Değerlendirme Yükleme */}
            <div className="border rounded p-4 mb-5">
                <h4 className="mb-3">Değerlendirme Belgesi Yükle</h4>
                <hr className="mb-4" />
                
                <input
                    type="file"
                    onChange={handleDosyaYukle}
                    className="px-4 py-2 border border-gray-500 rounded w-full"
                />
                {dosya && <p className="mt-2 text-sm">Seçilen dosya: {dosya.name}</p>}
            </div>

            {/* 3. Alan: Nihai Sonuç ve Yorum */}
            <form onSubmit={handleFormSubmit} className="border rounded p-4 space-y-4 mb-5">
                <div>
                    <label htmlFor="sonuc" className="block mb-1">Nihai Sonuç</label>
                    <hr className="mb-4" />
                    <select
                        id="sonuc"
                        value={nihaiSonuc}
                        onChange={(e) => setNihaiSonuc(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        required
                    >
                        <option value="">Seçiniz</option>
                        <option value="Olumlu">Olumlu</option>
                        <option value="Olumsuz">Olumsuz</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="yorum" className="block mb-1">Yorum</label>
                    <hr className="mb-4" />
                    <textarea
                        id="yorum"
                        rows={4}
                        value={yorum}
                        onChange={(e) => setYorum(e.target.value)}
                        className="border rounded px-4 py-2 w-full"
                        placeholder="Kısa bir değerlendirme notu yazınız..."
                    ></textarea>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="border hover:bg-green-700 px-6 py-2 rounded bg-green-600"
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JuriBasvuruDegerlendirme;
