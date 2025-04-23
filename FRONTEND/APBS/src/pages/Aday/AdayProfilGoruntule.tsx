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
import IconCircleCheck from '../../components/Icon/IconCircleCheck';
import IconMinus from '../../components/Icon/IconMinus';
import IconMinusCircle from '../../components/Icon/IconMinusCircle';

const AdayProfilGoruntule = () => {

       const storedUserInfo = localStorage.getItem('userInfo');
       const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;


         const [makale, setMakale] = useState<any[]>([]);
         const [bilimsel, setBilimsel] = useState<any[]>([]);
         const [kitap ,setKitap] = useState<any[]>([]);
         const [atif, setAtif] = useState<any[]>([]);
         const [egitim, setEgitim] = useState<any[]>([]);
         const [tez, setTez] = useState<any[]>([]);
         const [patent, setPatent] = useState<any[]>([]);
         const [arastirma, setArastirma] = useState<any[]>([]);
         const [editor, setEditor] = useState<any[]>([]);
         const [odul, setOdul] = useState<any[]>([]);
         const [idari, setIdari] = useState<any[]>([]);
         const [guzel, setGuzel] = useState<any[]>([]);

        useEffect(() => {
            fetch("http://localhost:8080/api/aday/veriGetir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ kullaniciId: userInfo.kullaniciID })
              }).then(response => response.json()) 
              .then(data => {
                  if (data.success) {
                      setMakale(data.makaleler)
                      setBilimsel(data.BilimselToplantiFaaliyetleri);
                      setKitap(data.Kitaplar);
                      setAtif(data.Atiflar);
                      setEgitim(data.EgitimOgretimFaaliyetleri);
                      setTez(data.TezYoneticiligi);
                      setPatent(data.Patentler);
                      setArastirma(data.ArastirmaProjeleri);
                      setEditor(data.EditorlukHakemlik);
                      setOdul(data.Oduller);
                      setIdari(data.IdariGorevlerVeUniversiteyeKatkiFaaliyetleri);
                      setGuzel(data.GuzelSanatlarFaaliyetleri);
                  
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
                        <h4 className='mb-5 text-lg font-bold text-green-800'>Makalelerim</h4>
                        <table className='table-fixed'>
                            <thead>
                                <tr>
                                    <th>Yazarlar</th>
                                    <th>Makale Adı</th>
                                    <th>Dergi Adı</th>
                                    <th>Cilt No</th>
                                    <th>Kişi Sayisi</th>
                                    <th>Başlıca Yazar</th>
                                    <th>Asgari Çalışma</th>
                                    <th>Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {makale.map((makales,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{makales.yazarlar}</td>
                                            <td>{makales.makale_adi}</td>
                                            <td>{makales.dergi_adi}</td>
                                            <td>{makales.cilt_no}</td>
                                            <td>{makales.kisiSayisi}</td>
                                            <td>{makales.isBaslicaYazar === 1 ? <IconCircleCheck></IconCircleCheck> : <IconMinusCircle></IconMinusCircle>}</td>
                                            <td>{makales.isAsgariCalisma === 1 ? <IconCircleCheck></IconCircleCheck> : <IconMinusCircle></IconMinusCircle> }</td>
                                            <td>{makales.aciklama}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <h4 className='my-5 text-lg font-bold text-green-800'>Bilimsel Toplantı Faaliyetlerim</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    <th>Yazarlar</th>
                                    <th>Bildiri Adı</th>
                                    <th>Konferans</th>
                                    <th>Yapıldığı Yer</th>
                                    <th>Sayfa No</th>
                                    <th>Tarih</th>
                                    <th>Faaliyet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bilimsel.map((bilimsel,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{bilimsel.yazarlar}</td>
                                            <td>{bilimsel.bildiri_adi}</td>
                                            <td>{bilimsel.konferansin_adi}</td>
                                            <td>{bilimsel.yapildigi_yer}</td>
                                            <td>{bilimsel.sayfa_no}</td>
                                            <td>{new Date(bilimsel.tarih).toISOString().split("T")[0]}</td>
                                            <td>{bilimsel.aciklama}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> 




                        <h4 className='my-5 text-lg font-bold text-green-800'>Kitaplarım</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    <th>Yazarlar</th>
                                    <th>Kitap Adı</th>
                                    <th>Baskı Sayısı</th>
                                    <th>Yayınlandığı Yer</th>
                                    <th>Tarih</th>
                                    <th>Faaliyet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kitap.map((kitap,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{kitap.yazarlar}</td>
                                            <td>{kitap.kitap_adi}</td>
                                            <td>{kitap.baski_sayisi}</td>
                                            <td>{kitap.yayinlandigi_yer}</td>
                                            <td>{new Date(kitap.tarih).toISOString().split("T")[0]}</td>
                                            <td>{kitap.aciklama}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> 


<h4 className='my-5 text-lg font-bold text-green-800'>Kitaplarım</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    <th>Yazarlar</th>
                                    <th>Kitap Adı</th>
                                    <th>Baskı Sayısı</th>
                                    <th>Yayınlandığı Yer</th>
                                    <th>Tarih</th>
                                    <th>Faaliyet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kitap.map((kitap,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{kitap.yazarlar}</td>
                                            <td>{kitap.kitap_adi}</td>
                                            <td>{kitap.baski_sayisi}</td>
                                            <td>{kitap.yayinlandigi_yer}</td>
                                            <td>{new Date(kitap.tarih).toISOString().split("T")[0]}</td>
                                            <td>{kitap.aciklama}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> 


                        <h4 className='my-5 text-lg font-bold text-green-800'>Atıflarım</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    
                                    <th>Atıfın Yapıldığı Eser</th>
                                    <th>Atıf Sayısı</th>
                                    <th>Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {atif.map((atif,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{atif.atifin_yapildigi_eser}</td>
                                            <td>{atif.atif_sayisi}</td>
                                            <td>{atif.aciklama}</td>
                                           
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> 




                        <h4 className='my-5 text-lg font-bold text-green-800'>Eğitim Öğretim Faaliyetlerim</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    
                                    <th>Dersin Adı</th>
                                    <th>Programın Adı</th>
                                    <th>Eğitim Dönemi</th>
                                    <th>Eğitim Yılı</th>
                                    <th>Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {egitim.map((egitim,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{egitim.dersin_adi}</td>
                                            <td>{egitim.programin_adi}</td>
                                            <td>{egitim.donemi}</td>
                                            <td>{new Date(egitim.yili).toISOString().split("T")[0]}</td>
                                            <td>{egitim.aciklama}</td>
                                           
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>                               



                       <h4 className='my-5 text-lg font-bold text-green-800'>Tez Yöneticiliklerim</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    
                                    <th>Öğrenci Adı</th>
                                    <th>Tez Adı</th>
                                    <th>Enstütüsü</th>
                                    <th>Tez Yılı</th>
                                    <th>Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tez.map((tez,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{tez.ogrenci_adi}</td>
                                            <td>{tez.tezin_adi}</td>
                                            <td>{tez.enstitüsü}</td>
                                            <td>{tez.yili}</td>
                                            <td>{tez.aciklama}</td>
                                           
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>                 



                        <h4 className='my-5 text-lg font-bold text-green-800'>Patentlerim</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    
                                    <th>Patent Adı</th>
                                    <th>Tarihi</th>
                                    <th>Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patent.map((patent,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{patent.patent_adi}</td>
                                            <td>{new Date(patent.yili).toISOString().split("T")[0]}</td>
                                            <td>{patent.aciklama}</td>
                                           
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> 



                        <h4 className='my-5 text-lg font-bold text-green-800'>Araştırma Projelerim</h4>

                               <table className='table-fixed'>
                            <thead>
                                <tr>
                                    
                                    <th>Proje Adı</th>
                                    <th>Proje Numarası</th>
                                    <th>Kurum</th>
                                    <th>Yıl</th>
                                    <th>Etkinlik</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arastirma.map((arastirma,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{arastirma.projenin_adi}</td>
                                            <td>{arastirma.proje_numarasi}</td>
                                            <td>{arastirma.proje_kurum}</td>
                                            <td>{arastirma.yili}</td>
                                            <td>{arastirma.aciklama}</td>
                                           
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>          


                            <h4 className='my-5 text-lg font-bold text-green-800'>Editorluk Hakemliklerim</h4>

                                <table className='table-fixed'>
                                <thead>
                                <tr>
                                    
                                    <th>Derginin Adı</th>
                                    <th>Sayısı</th>
                                    <th>Yılı</th>
                                    <th>Etkinlik</th>
                                </tr>
                                </thead>
                                <tbody>
                                {editor.map((editor,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{editor.derginin_adi}</td>
                                            <td>{editor.sayisi}</td>
                                            <td>{new Date(editor.yili).toISOString().split("T")[0]}</td>
                                            <td>{editor.aciklama}</td>
                                            
                                        </tr>
                                    );
                                })}
                                </tbody>
                                </table>  




                            <h4 className='my-5 text-lg font-bold text-green-800'>Ödüllerim</h4>

                                    <table className='table-fixed'>
                                    <thead>
                                    <tr>
                                        
                                        <th>Ödül Veren Kurum Adı</th>
                                        <th>Yılı</th>
                                        <th>Etkinlik</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {odul.map((odul,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{odul.odul_veren_kurum_adi}</td>
                                                <td>{new Date(odul.yili).toISOString().split("T")[0]}</td>
                                                <td>{odul.aciklama}</td>
                                                
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                    </table>  


                                <h4 className='my-5 text-lg font-bold text-green-800'>İdari Görevler ve Üniversite Katkı Faaliyetlerim</h4>

                                    <table className='table-fixed'>
                                    <thead>
                                    <tr>
                                        
                                        <th>Görev Birimi</th>
                                        <th>Yılı</th>
                                        <th>Etkinlik</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {idari.map((idari,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{idari.gorev_birimi}</td>
                                                <td>{new Date(idari.yili).toISOString().split("T")[0]}</td>
                                                <td>{idari.aciklama}</td>
                                                
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                    </table> 




                                    <h4 className='my-5 text-lg font-bold text-green-800'>Güzel Sanatlar Faaliyetlerim</h4>

                                    <table className='table-fixed'>
                                    <thead>
                                    <tr>
                                        
                                        <th>Faaliyet Adı    </th>
                                        <th>Yılı</th>
                                        <th>Etkinlik</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {guzel.map((guzel,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{guzel.faaliyet_adi}</td>
                                                <td>{new Date(guzel.yili).toISOString().split("T")[0]}</td>
                                                <td>{guzel.aciklama}</td>
                                                
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


export default AdayProfilGoruntule;