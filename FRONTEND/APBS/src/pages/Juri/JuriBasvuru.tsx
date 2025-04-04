import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const applicationData = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        date: '10/03/2024',
        status: 'İncelendi',
    },
    {
        id: 2,
        name: 'Mehmet Demir',
        date: '12/03/2024',
        status: 'İncelenmedi',
    },
    {
        id: 3,
        name: 'Zeynep Kaya',
        date: '15/03/2024',
        status: 'İncelendi',
    },
    {
        id: 4,
        name: 'Elif Çelik',
        date: '18/03/2024',
        status: 'İncelenmedi',
    },
];

export default function ApplicationReviewTable() {
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
                            <th className="px-4 py-2 text-center">İncele </th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicationData.map((data) => (
                            <tr key={data.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-center">{data.id}</td>
                                <td className="px-4 py-2">{data.name}</td>
                                <td className="px-4 py-2">{data.date}</td>
                                <td
                                    className={`px-4 py-2 font-semibold ${
                                        data.status === 'İncelendi' ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {data.status}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <Tippy content="Başvuruyu İncele">
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            onClick={() => alert(`Başvuru inceleniyor: ${data.name}`)}
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
