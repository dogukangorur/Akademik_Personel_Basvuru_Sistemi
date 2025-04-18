import React, { Fragment } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Header from '../Parts/Header';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Dialog, Transition,Tab, TransitionChild, DialogPanel,DialogTitle } from '@headlessui/react';


type Ilan = {
  id: number;
  baslik: string;
  bolum_adi: string;
  baslangic_tarih: string;
  bitis_tarih: string;
  aranan_sayi:number;
  aciklama: string;
  durum: string;
  fakulte_adi:string;
  kadro_adi:string;
};

const Ilanlar = () => {

  const [ilanlar, setIlanlar] = useState<any[]>([]);
  const [kontrol, setKontrol] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [secilenIlan, setSecilenIlan] = useState<Ilan | null>(null);


  const aylar = [
    "Ocak", "Şub", "Mart", "Nis", "May", "Haz",
    "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
  ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/anasayfa/ilanGetir");
      const result = await response.json();
      if(result.success)
      {
        
        setKontrol(true);
        setIlanlar(result.data);
      }
      else{
        setKontrol(false);
      }

    };
  
    fetchData();
    }, []);
    const handleIlanClick = (ilan:Ilan) => {
      setSecilenIlan(ilan);
      setModalOpen(true);
    };


    return (
      <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold">İlanlar</h2>
        </div>
        <div className="news-list flex flex-col mt-2 h-[420px] overflow-auto">
          {ilanlar && ilanlar.filter(ilan => ilan.durum === "aktif").map((ilan, index) => (
            <button key={index} onClick={() => handleIlanClick(ilan)} className="text-left hover:text-green-700">
              <div className="flex items-center p-2 transition">
                <div className="text-center w-12 flex-shrink-0">
                  <span className="block text-lg font-bold">{parseInt(ilan.baslangic_tarih.split("-")[0])}</span>
                  <span className="block text-sm text-gray-500">{aylar[parseInt(ilan.baslangic_tarih.split("-")[1]) - 1]}</span>
                </div>
                <div className="ml-4 flex-grow">
                  <h2 className="text-md font-semibold line-clamp-2">{ilan.baslik}</h2>
                  <p className="text-sm text-gray-600 line-clamp-1">Akademik Kadro</p>
                  <span className="text-xs text-gray-500 flex items-center mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015" stroke="currentColor" stroke-width="1.5"></path></svg>
                    {ilan.bolum_adi}
                  </span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </button>
          ))}
        </div>
  
        {/* Modal */}
        <Transition appear show={modalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setModalOpen(false)}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-60" />
            </TransitionChild>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex justify-between items-center border-b pb-2">
                      <DialogTitle as="h1" className="text-lg font-medium leading-6 text-gray-900 w-full flex justify-between">
                        <div className="w-full flex justify-between">
                          <div className="w-full"><b>{secilenIlan?.baslangic_tarih} | {secilenIlan?.bitis_tarih}</b></div>
                          <div className="w-full text-end mx-5">{secilenIlan?.bolum_adi} , <b>{secilenIlan?.fakulte_adi}</b></div>
                        </div>
                      </DialogTitle>
                      <button onClick={() => setModalOpen(false)} className="text-gray-500 hover:text-gray-800">
                        ✕
                      </button>
                    </div>
                    <div className="mt-4">
                        <p className="my-5 text-md text-gray-700">{secilenIlan?.aciklama || 'Açıklama girilmemiş'}</p>
                        <hr />
                        <p className="my-2 text-md text-gray-700"><b>Aranan Kadro : </b>{secilenIlan?.kadro_adi}</p>
                        <p className="my-2 text-md text-gray-700"><b>{secilenIlan?.aranan_sayi} Kontenjan bulunmaktadır.</b></p>

                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setModalOpen(false)}
                      >
                        Kapat
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
};

export default Ilanlar;