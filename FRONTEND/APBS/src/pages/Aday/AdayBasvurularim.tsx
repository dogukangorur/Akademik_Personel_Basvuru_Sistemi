import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const AdayBasvurularim = () => {


    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    const [basvurularim, setBasvurularim] = useState<any[]>([]);


    useEffect(() => {
        fetch("http://localhost:8080/api/aday/basvuruGetir", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ kullaniciId: userInfo.kullaniciID })
          }).then(response => response.json()) 
          .then(data => {
              if (data.success) {
                 setBasvurularim(data.data);
              
              } else {
                  console.error("Veri alınamadı:", data.message);
              }
          })
          .catch(error => {
              console.error("Hata oluştu:", error);
          });
    }, []);
    
    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
                <div className="flex justify-between items-center  pb-2">
                    <div className="table-responsive mb-5 w-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fakülte</th>
                                    <th>Bölüm</th>
                                    <th>Kadro</th>
                                    <th>Başlık</th>
                                    <th>Tanım</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basvurularim.map((basvuru) => {
                                    return (
                                        <tr key={basvuru.id}>
                                            <td>
                                                {basvuru.fakulte_adi}
                                            </td>
                                            <td>
                                                {basvuru.bolum_adi}
                                            </td>
                                            <td>
                                                {basvuru.puanlanan_faaliyet_donemi}
                                            </td>
                                            <td>
                                                {basvuru.baslik}
                                            </td>
                                            <td>
                                                {basvuru.aciklama.substring(0, 50)}...
                                            </td>
                                            <td>{new Date(basvuru.basvuru_tarihi).toISOString().split("T")[0]}</td>
                                            <td >
                                                <div
                                                    className={`badge whitespace-nowrap text-center w-[100px] ${basvuru.basvuru_durum === 'Beklemede'
                                                        ? 'bg-primary   '
                                                        : basvuru.basvuru_durum === 'Onaylandı'
                                                            ? 'bg-success'
                                                            : basvuru.basvuru_durum === 'Reddedildi'
                                                                ? 'bg-danger' : ''
                                                        }`}
                                                >
                                                    {basvuru.basvuru_durum}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );

}


export default AdayBasvurularim;