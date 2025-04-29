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
    durum: string;
}

const JuriAnasayfa = () => {
    const [tableData, setTableData] = useState<Ilan[]>([]);

    useEffect(() => {
        const fetchIlanlar = async () => {
            try {
                const storedUserInfo = localStorage.getItem('userInfo');
                const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

                if (!userInfo) {
                    MySwal.fire({
                        title: 'Kullanıcı bilgisi bulunamadı!',
                        icon: 'error',
                        toast: true,
                        position: 'bottom-start',
                        timer: 2000,
                        showConfirmButton: false,
                        showCloseButton: true,
                        customClass: { popup: 'color-error' },
                    });
                    return;
                }
            
                console.log(userInfo);
                const response = await axios.get(`http://localhost:8080/api/juri/ilanlarim/${userInfo.kullaniciID}`);

                console.log("API'den dönen veri:", response.data.data[0]);  

                if (Array.isArray(response.data.data)) {
                    setTableData(response.data.data);

                    MySwal.fire({
                        title: 'İlanlar başarıyla yüklendi!',
                        icon: 'success',
                        toast: true,
                        position: 'bottom-start',
                        timer: 1500,
                        showConfirmButton: false,
                        showCloseButton: true,
                        customClass: { popup: 'color-success' },
                    });
                } else {
                    console.warn('Beklenmeyen veri formatı:', response.data.data);
                    setTableData([]);

                    MySwal.fire({
                        title: 'Beklenmeyen veri formatı!',
                        icon: 'error',
                        toast: true,
                        position: 'bottom-start',
                        timer: 2000,
                        showConfirmButton: false,
                        showCloseButton: true,
                        customClass: { popup: 'color-error' },
                    });
                }
            } catch (error) {
                console.error('İlanlar alınırken hata oluştu:', error);
                setTableData([]);

                MySwal.fire({
                    title: 'İlanlar yüklenirken hata oluştu!',
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

        fetchIlanlar();
    }, []);

    const handleBasvuruyaGit = (ilanId: number) => {
        localStorage.setItem('secilenIlanId', ilanId.toString());

        MySwal.fire({
            title: 'Başvuru listesine yönlendiriliyorsunuz...',
            icon: 'info',
            toast: true,
            position: 'bottom-start',
            timer: 1000,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: { popup: 'color-info' },
        });

        setTimeout(() => {
            window.location.href = '/juri/basvuru';
        }, 1000);
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold mb-3">Atanılan İlanlar</h2>
            </div>
            <div className="table-responsive mb-5">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">İlan Adı</th>
                            <th className="px-4 py-2">Tarih Aralığı</th>
                            <th className="px-4 py-2">Durum</th>
                            <th className="px-4 py-2 text-center">Başvurular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => (
                            <tr key={data.id} className="hover:bg-gray-50">
                                <td className="border-gray-300 px-4 py-2">{data.ilanAdi}</td>
                                <td className="border-gray-300 px-4 py-2">{data.tarihAraligi}</td>
                                <td
                                    className={`border-gray-300 px-4 py-2 font-semibold ${
                                        data.durum === 'Tamamlandı'
                                            ? 'text-green-600'
                                            : data.durum === 'Değerlendirme Aşamasında'
                                            ? 'text-blue-600'
                                            : data.durum === 'Başvuru Aşamasında'
                                            ? 'text-yellow-600'
                                            : data.durum === 'İptal Edildi'
                                            ? 'text-red-600'
                                            : 'text-gray-600'
                                    }`}
                                >
                                    {data.durum}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <Tippy content="Başvuruları Görüntüle">
                                        <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleBasvuruyaGit(data.id)}>
                                            Başvurular &gt;
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JuriAnasayfa;
