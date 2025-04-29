import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Belge {
    kategori: string;
    dosyaAdi: string;
    url: string;
}

const JuriBasvuruDegerlendirme = () => {
    const [belgeler, setBelgeler] = useState<Belge[]>([]);
    const [dosya, setDosya] = useState<File | null>(null);
    const [nihaiSonuc, setNihaiSonuc] = useState<string>('');
    const [yorum, setYorum] = useState<string>('');

    const secilenAdayAdi = localStorage.getItem('secilenAdayAdi') || 'Aday Adı Bulunamadı';
    const secilenBasvuruId = localStorage.getItem('secilenBasvuruId');
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

    useEffect(() => {
        const fetchBelgeler = async () => {
            if (!secilenBasvuruId) return;

            try {
                const response = await axios.get<Belge[]>(`http://localhost:8080/api/juri/basvuru/${secilenBasvuruId}/aday-belgeleri`);
                setBelgeler(response.data);

                MySwal.fire({
                    title: 'Belgeler başarıyla yüklendi!',
                    icon: 'success',
                    toast: true,
                    position: 'bottom-start',
                    timer: 1500,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-success' },
                });
            } catch (error) {
                console.error('Belgeler alınırken hata oluştu:', error);
                MySwal.fire({
                    title: 'Belgeler yüklenirken hata oluştu!',
                    icon: 'error',
                    toast: true,
                    position: 'bottom-start',
                    timer: 2000,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-error' },
                });
            }
        };

        fetchBelgeler();
    }, [secilenBasvuruId]);

    const handleDosyaYukle = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && secilenBasvuruId && userInfo) {
            const selectedFile = e.target.files[0];
            setDosya(selectedFile);

            const formData = new FormData();
            formData.append('dosya', selectedFile);
            formData.append('juriId', userInfo.id);

            try {
                await axios.post(`http://localhost:8080/api/juri/basvuru/${secilenBasvuruId}/upload-degerlendirme`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                MySwal.fire({
                    title: 'Dosya başarıyla yüklendi!',
                    icon: 'success',
                    toast: true,
                    position: 'bottom-start',
                    timer: 1500,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-success' },
                });
            } catch (error) {
                console.error('Dosya yüklenirken hata oluştu:', error);
                MySwal.fire({
                    title: 'Dosya yüklenirken hata oluştu!',
                    icon: 'error',
                    toast: true,
                    position: 'bottom-start',
                    timer: 2000,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-error' },
                });
            }
        }
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!secilenBasvuruId || !userInfo) {
            MySwal.fire({
                title: 'Başvuru veya kullanıcı bilgisi eksik!',
                icon: 'warning',
                toast: true,
                position: 'bottom-start',
                timer: 2000,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: { popup: 'color-warning' },
            });
            return;
        }

        try {
            await axios.post(`http://localhost:8080/api/juri/basvuru/${secilenBasvuruId}/kaydet-nihai-sonuc`, {
                juriId: userInfo.id,
                nihaiSonuc,
                yorum,
            });

            MySwal.fire({
                title: 'Değerlendirme başarıyla kaydedildi!',
                icon: 'success',
                toast: true,
                position: 'bottom-start',
                timer: 1500,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: { popup: 'color-success' },
            });

            setTimeout(() => {
                window.location.href = '/juri/basvuru';
            }, 1500);
        } catch (error) {
            console.error('Sonuç kaydedilirken hata oluştu:', error);
            MySwal.fire({
                title: 'Değerlendirme kaydedilirken hata oluştu!',
                icon: 'error',
                toast: true,
                position: 'bottom-start',
                timer: 2000,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: { popup: 'color-error' },
            });
        }
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <h2 className="text-3xl font-handwriting text-center">Başvuru değerlendirme</h2>

            {/* 1. Alan: Belgeler */}
            <div>
                <h3 className="text-lg mb-4">
                    İncelenen Aday: <span className="font-bold">{secilenAdayAdi}</span>
                </h3>
                <div className="border rounded p-4 mb-5">
                    <h4 className="mb-3">Belgeler ve Tablolar</h4>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b pb-2">Belge Türü</th>
                                <th className="border-b pb-2">Belge Adı</th>
                                <th className="border-b pb-2 text-center">Görüntüle</th>
                                <th className="border-b pb-2 text-center">İndir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {belgeler.map((belge, index) => (
                                <tr key={index}>
                                    <td className="py-2">{belge.kategori}</td>
                                    <td>{belge.dosyaAdi}</td>
                                    <td className="px-4 py-2 text-center">
                                        <Tippy content="Belgeyi görüntüle">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    window.open(`http://localhost:8080/api/juri/download/${belge.kategori === 'Puan Tablosu' ? 'puan' : 'profil'}/${belge.dosyaAdi}`, '_blank')
                                                }
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
                                                onClick={() =>
                                                    (window.location.href = `http://localhost:8080/api/juri/download/${belge.kategori === 'Puan Tablosu' ? 'puan' : 'profil'}/${belge.dosyaAdi}`)
                                                }
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
                <input type="file" onChange={handleDosyaYukle} className="px-4 py-2 border border-gray-500 rounded w-full" />
                {dosya && <p className="mt-2 text-sm">Seçilen dosya: {dosya.name}</p>}
            </div>

            {/* 3. Alan: Nihai Sonuç ve Yorum */}
            <form onSubmit={handleFormSubmit} className="border rounded p-4 space-y-4 mb-5">
                <div>
                    <label htmlFor="sonuc" className="block mb-1">
                        Nihai Sonuç
                    </label>
                    <hr className="mb-4" />
                    <select id="sonuc" value={nihaiSonuc} onChange={(e) => setNihaiSonuc(e.target.value)} className="border rounded px-4 py-2 w-full" required>
                        <option value="">Seçiniz</option>
                        <option value="Olumlu">Olumlu</option>
                        <option value="Olumsuz">Olumsuz</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="yorum" className="block mb-1">
                        Yorum
                    </label>
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
                    <button type="submit" className="border hover:bg-green-700 px-6 py-2 rounded bg-green-600 text-white">
                        Gönder
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JuriBasvuruDegerlendirme;
