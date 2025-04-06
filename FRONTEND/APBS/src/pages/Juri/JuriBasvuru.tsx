import { useEffect, useState } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Basvuru {
    id: number;
    aday_adi: string;
    tarih: string;
    basvuru_durum: 'Beklemede' | 'Onaylandı' | 'Reddedildi';
}

export default function ApplicationReviewTable() {
    const [applications, setApplications] = useState<Basvuru[]>([]);

    useEffect(() => {
        const ilanId = localStorage.getItem('secilenIlanId');

        if (!ilanId) {
            console.error("Seçilen ilan bulunamadı.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get<Basvuru[]>(`/api/juri/basvurular/${ilanId}`);
                setApplications(response.data);
            } catch (error) {
                console.error("Başvurular alınırken hata oluştu:", error);
            }
        };

        fetchData();
    }, []);

    const handleIncele = (basvuruId: number) => {
        localStorage.setItem("secilenBasvuruId", basvuruId.toString());
        window.location.href = "/juri/basvuru-degerlendirme";
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
                                <td className="px-4 py-2">{app.aday_adi}</td>
                                <td className="px-4 py-2">{app.tarih}</td>
                                <td className={`px-4 py-2 font-semibold ${
                                    app.basvuru_durum === 'Onaylandı' ? 'text-green-600' :
                                    app.basvuru_durum === 'Beklemede' ? 'text-yellow-600' :
                                    'text-red-600'
                                }`}>
                                    {app.basvuru_durum}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <Tippy content="Başvuruyu İncele">
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            onClick={() => handleIncele(app.id)}
                                        >
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
