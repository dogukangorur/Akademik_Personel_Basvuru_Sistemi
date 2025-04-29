import { useEffect, useState } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Basvuru {
    id: number;
    ad:string;
    aday_adi: string;
    tarih: string;
    basvuru_durum: 'Beklemede' | 'Onaylandı' | 'Reddedildi';
}

export default function ApplicationReviewTable() {
    const [applications, setApplications] = useState<Basvuru[]>([]);

    useEffect(() => {
        const ilanId = localStorage.getItem('secilenIlanId');
        console.log(ilanId);
        if (!ilanId) {
            MySwal.fire({
                title: 'Seçilen ilan bulunamadı!',
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

        const fetchData = async () => {
            try {
                const response = await axios.get<Basvuru[]>(`http://localhost:8080/api/juri/basvurular/${ilanId}`);
                setApplications(response.data);

                MySwal.fire({
                    title: 'Başvurular başarıyla yüklendi!',
                    icon: 'success',
                    toast: true,
                    position: 'bottom-start',
                    timer: 1500,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-success' },
                });
            } catch (error) {
                console.error('Başvurular alınırken hata oluştu:', error);

                MySwal.fire({
                    title: 'Başvurular yüklenemedi!',
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

        fetchData();
    }, []);

    const handleIncele = (basvuruId: number, adayAdi: string, adaySoyadi:string) => {
        localStorage.setItem('secilenBasvuruId', basvuruId.toString());
        localStorage.setItem('secilenAdayAd', adayAdi);
        localStorage.setItem('secilenAdayAdi', adaySoyadi);

        MySwal.fire({
            title: 'Başvuru detayına yönlendiriliyorsunuz...',
            icon: 'info',
            toast: true,
            position: 'bottom-start',
            timer: 1000,
            showConfirmButton: false,
            showCloseButton: true,
            customClass: { popup: 'color-info' },
        });

        setTimeout(() => {
            window.location.href = '/juri/basvuru-degerlendirme';
        }, 1000);
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold">Başvurular</h2>
            </div>
            <div className="table-responsive mb-5">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Ad Soyad</th>
                            <th className="px-4 py-2">Tarih</th>
                            <th className="px-4 py-2">Durum</th>
                            <th className="px-4 py-2 text-center">İncele</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2">{app.ad} {app.aday_adi}</td>
                                <td className="px-4 py-2">{app.tarih}</td>
                                <td
                                    className={`px-4 py-2 font-semibold ${
                                        app.basvuru_durum === 'Onaylandı' ? 'text-green-600' : app.basvuru_durum === 'Beklemede' ? 'text-yellow-600' : 'text-red-600'
                                    }`}
                                >
                                    {app.basvuru_durum}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <Tippy content="Başvuruyu İncele">
                                        <button type="button" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleIncele(app.id, app.ad ,app.aday_adi)}>
                                            İncele &gt;
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
}
