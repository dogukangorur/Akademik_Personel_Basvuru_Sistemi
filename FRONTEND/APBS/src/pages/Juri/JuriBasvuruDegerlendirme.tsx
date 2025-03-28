import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const JuriBasvuruDegerlendirme = () => {
    const tableData = [
        {
            id: 1,
            ilanAdi: 'Bilgisayar Mühendisliği Akademik Kadro',
            tarihAraligi: '01/04/2024 - 15/04/2024',
            status: 'Değerlendirme Aşamasında',
        },
        {
            id: 2,
            ilanAdi: 'Elektrik Elektronik Mühendisliği Yardımcı Doçent',
            tarihAraligi: '05/03/2024 - 20/03/2024',
            status: 'Tamamlandı',
        },
        {
            id: 3,
            ilanAdi: 'Makine Mühendisliği Öğretim Üyesi',
            tarihAraligi: '10/02/2024 - 25/02/2024',
            status: 'Başvuru Aşamasında',
        },
        {
            id: 4,
            ilanAdi: 'İnşaat Mühendisliği Profesörlük Kadrosu',
            tarihAraligi: '15/01/2024 - 30/01/2024',
            status: 'İptal Edildi',
        },
    ];
    
    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full">
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-semibold">Atanılan İlanlar</h2>
            </div>
            <div className="table-responsive mb-5">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">İlan Adı</th>
                            <th className="border border-gray-300 px-4 py-2">Tarih Aralığı</th>
                            <th className="border border-gray-300 px-4 py-2">Durum</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Başvurular</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data) => (
                            <tr key={data.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{data.ilanAdi}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.tarihAraligi}</td>
                                <td
                                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                                        data.status === 'Tamamlandı' ? 'text-green-600' :
                                        data.status === 'Değerlendirme Aşamasında' ? 'text-blue-600' :
                                        data.status === 'Başvuru Aşamasında' ? 'text-yellow-600' :
                                        data.status === 'İptal Edildi' ? 'text-red-600' :
                                        'text-gray-600'
                                    }`}
                                >
                                    {data.status}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <Tippy content="Başvuruları Görüntüle">
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            onClick={() => alert(`Başvurular sayfasına yönlendiriliyor: ${data.ilanAdi}`)}
                                        >
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
    
}
export default JuriBasvuruDegerlendirme;
