import { useEffect, useState } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Ilan {
    id: number;
    ilanAdi: string;
    tarihAraligi: string;
}

const YoneticiIlanNihaiKarar = () => {
    const [tableData, setTableData] = useState<Ilan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchIlanlar = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/yonetici/ilanlar-nihai-karar');

                if (Array.isArray(response.data)) {
                    setTableData(response.data);

                    // BAŞARI toast: İlanlar başarıyla yüklendi
                    MySwal.fire({
                        title: 'İlanlar başarıyla yüklendi!',
                        icon: 'success',
                        toast: true,
                        position: 'bottom-start',
                        showConfirmButton: false,
                        timer: 1500,
                        showCloseButton: true,
                        customClass: { popup: 'color-success' },
                    });
                } else {
                    console.warn('Beklenmeyen veri formatı:', response.data);
                    setTableData([]);

                    // HATA toast: Beklenmeyen veri formatı
                    MySwal.fire({
                        title: 'Beklenmeyen veri formatı!',
                        icon: 'error',
                        toast: true,
                        position: 'bottom-start',
                        showConfirmButton: false,
                        timer: 2000,
                        showCloseButton: true,
                        customClass: { popup: 'color-error' },
                    });
                }
            } catch (error) {
                console.error('İlanlar alınırken hata oluştu:', error);
                setError('İlanlar yüklenirken bir hata oluştu.');

                // HATA toast: API isteği başarısız
                MySwal.fire({
                    title: 'İlanlar yüklenemedi!',
                    icon: 'error',
                    toast: true,
                    position: 'bottom-start',
                    showConfirmButton: false,
                    timer: 2000,
                    showCloseButton: true,
                    customClass: { popup: 'color-error' },
                });
            } finally {
                setLoading(false);
            }
        };

        fetchIlanlar();
    }, []);

    const handleBasvuruyaGit = (ilanId: number) => {
        localStorage.setItem('secilenIlanId', ilanId.toString());
        window.location.href = '/yonetici/nihai-karar';

        // BİLGİ toast: Başvuru detayına yönlendiriliyor
        MySwal.fire({
            title: 'Başvuru detayına yönlendiriliyorsunuz...',
            icon: 'info',
            toast: true,
            position: 'bottom-start',
            showConfirmButton: false,
            timer: 1500,
            showCloseButton: true,
            customClass: { popup: 'color-info' },
        });
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h2 className="text-xl font-semibold">Nihai Karar Aşamasındaki İlanlar</h2>
            </div>

            {loading ? (
                <p className="text-gray-500">Yükleniyor...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : tableData.length === 0 ? (
                <p className="text-gray-600">Şu anda nihai karar aşamasında ilan bulunmamaktadır.</p>
            ) : (
                <div className="table-responsive mb-5">
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 w-2/3">İlan Adı</th>
                                <th className="px-4 py-2 w-1/3 text-center">Tarih Aralığı</th>
                                <th className="px-4 py-2 text-center">Başvuru Değerlendirmeleri</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((data) => (
                                <tr key={data.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2">{data.ilanAdi}</td>
                                    <td className="border px-4 py-2 text-center">{data.tarihAraligi}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <Tippy content="Başvuruları Görüntüle">
                                            <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleBasvuruyaGit(data.id)}>
                                                Nihai Karar &gt;
                                            </button>
                                        </Tippy>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default YoneticiIlanNihaiKarar;
