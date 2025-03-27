import React from "react";

const announcements = [
  { date: "15", month: "Nis", title: "Bilişim Sistemleri Mühendisliği Bölümüne Dr. Öğr. Üyesi Alımı", category: "Akademik Kadro", author: "Üniversite Personel Daire Başkanlığı" },
  { date: "10", month: "Nis", title: "Elektrik-Elektronik Mühendisliği Bölümüne Prof. Dr. Kadrosu Açıldı", category: "Akademik Kadro", author: "Üniversite Personel Daire Başkanlığı" },
  { date: "05", month: "Nis", title: "Mimarlık Fakültesine Öğretim Görevlisi Alımı Yapılacaktır", category: "Akademik Kadro", author: "Mimarlık Fakültesi Dekanlığı" },
  { date: "28", month: "Mar", title: "İşletme Fakültesi Araştırma Görevlisi Kadrosu İçin Başvurular Başladı", category: "Akademik Kadro", author: "Üniversite Personel Daire Başkanlığı" },
  { date: "20", month: "Mar", title: "Hukuk Fakültesine Dr. Öğr. Üyesi Alımı Yapılacaktır", category: "Akademik Kadro", author: "Hukuk Fakültesi Dekanlığı" },
  { date: "15", month: "Mar", title: "Sağlık Bilimleri Fakültesi İçin Yeni Akademik Kadro Duyurusu", category: "Akademik Kadro", author: "Üniversite Personel Daire Başkanlığı" }
];

const Ilanlar = () => {
  return (
    <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-bold">İlanlar</h2>
        <a href="/duyurular" className="text-blue-600 hover:underline">+ Tümü</a>
      </div>
      <div className="news-list flex flex-col mt-2 h-[420px] overflow-auto">
        {announcements.map((item, index) => (
          <a href={"#" + (index + 1)} className="hover:text-green-700">
            <div key={index} className="flex items-center p-2 transition">
              <div className="text-center w-12 flex-shrink-0">
                <span className="block text-lg font-bold">{item.date}</span>
                <span className="block text-sm text-gray-500">{item.month}</span>
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-md font-semibold line-clamp-2">{item.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-1">{item.category}</p>
                <span className="text-xs text-gray-500 flex items-center mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015" stroke="currentColor" stroke-width="1.5"></path></svg> {item.author}
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Ilanlar;