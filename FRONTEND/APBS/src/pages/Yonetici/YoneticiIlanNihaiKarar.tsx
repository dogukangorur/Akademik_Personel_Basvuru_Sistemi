import { useEffect, useState } from 'react';
import axios from 'axios';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Ilan {
    id: number;
    ilanAdi: string;
    tarihAraligi: string;
    durum: string;
}

const YoneticiIlanNihaiKarar = () => {
    const [tableData, setTableData] = useState<Ilan[]>([]);

    useEffect(() => {
        const fetchIlanlar = async () => {
            try {
                const response = await axios.get('/api/juri/ilanlarim', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                console.log("API'den dönen veri:", response.data);

                if (Array.isArray(response.data)) {
                    setTableData(response.data);
                } else {
                    console.warn("Beklenmeyen veri formatı:", response.data);
                    setTableData([]); // hatalı veri gelirse boş dizi ata
                }

            } catch (error) {
                console.error("İlanlar alınırken hata oluştu:", error);
                setTableData([]); // hata durumunda yine boş dizi
            }
        };

        fetchIlanlar();
    }, []);

    const handleBasvuruyaGit = (ilanId: number) => {
        localStorage.setItem("secilenIlanId", ilanId.toString());
        window.location.href = "/yonetici/nihai-karar";//düzenlenecek
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold mb-3">Nihai Karar Aşamasındaki İlanlar</h2>
            </div>
            <div className="table-responsive mb-5">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 w-5/6">İlan Adı</th>
                            <th className="px-4 py-2 w-1/6 text-center">Başvuru Değerlendirmeleri</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => (
                            <tr key={data.id} className="hover:bg-gray-50">
                                <td className="border-gray-300 px-4 py-2">{data.ilanAdi}</td>
                                <td className="px-4 py-2 text-center">
                                    <Tippy content="Başvuruları Görüntüle">
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            onClick={() => handleBasvuruyaGit(data.id)}
                                        >
                                            Değerlendirmeler &gt;
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

export default YoneticiIlanNihaiKarar;
