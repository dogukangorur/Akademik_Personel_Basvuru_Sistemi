import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { IRootState } from '../../store';
import { format } from 'path';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AdminDuzenle = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('İlan Düzenle'));
    });

    const MySwal = withReactContent(Swal);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const ilanId = params.get('id');

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>("");
    const [date2, setDate2] = useState<any>("");

    const [baslik, setBaslik] = useState<any>("");
    const [fakulteAdi, setFakulteAdi] = useState<any[]>([]);
    const [bolumAdi, setBolumAdi] = useState<any[]>([]);
    const [arananKisiSayisi, setArananKisiSayisi] = useState<any>("");
    const [aciklama, setAciklama] = useState<any>("");
    const [selectedFakulte, setSelectedFakulte] = useState<any>("");
    const [arananUnvan, setArananUnvan] = useState<any>("");
    const [selectedBolum, setSelectedBolum] = useState<any>("");
    const [arananUnvanList, setArananUnvanList] = useState([]);
    const [duzenlenenList, setDuzenlenenList] = useState([]);


    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            id: ilanId,
            baslik: baslik,
            fakulteAdi: selectedFakulte,
            bolumAdi: selectedBolum,
            arananUnvan: arananUnvan,
            arananKisiSayisi,
            aciklama: aciklama,
            baslangicTarihi: date1,
            bitisTarihi: date2
        };

        const response = await fetch("http://localhost:8080/api/admin/ilanDuzenle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if(result){
            MySwal.fire({
                title: 'Düzenleme Başarılı',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                },
            }).then(()=>{
                navigate("/admin/anasayfa");
            });
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/unvanGetir")
            .then((res) => res.json())
            .then((data) => setArananUnvanList(data))
            .catch((err) => console.error("Fakülteler alınamadı", err));
    }, []);



    useEffect(() => {
        fetch("http://localhost:8080/api/admin/fakulteGetir")
            .then((res) => res.json())
            .then((data) => setFakulteAdi(data))
            .catch((err) => console.error("Fakülteler alınamadı", err));
    }, []);

    useEffect(() => {
        if (selectedFakulte && selectedFakulte != "") {
            fetch(`http://localhost:8080/api/admin/bolumGetir?fakulteId=${selectedFakulte}`)
                .then((res) => res.json())
                .then((data) => setBolumAdi(data))
                .catch((err) => console.error("Bölümler alınamadı", err));
        }

    }, [selectedFakulte]);

    


    useEffect(() => {
        if (!ilanId) return;
    
        fetch(`http://localhost:8080/api/admin/ilanGetir?id=${ilanId}`)
            .then((res) => res.json())
            .then((data) => {
                setBaslik(data[0].baslik || "");
                setArananKisiSayisi(data[0].aranan_sayi || "");
                setAciklama(data[0].aciklama || "");
                setDate1(data[0].baslangic_tarih?.substring(0, 10) || "");
                setDate2(data[0].bitis_tarih?.substring(0, 10) || "");
    
                // Artık doğrudan ID'leri kullanabilirsin
                setSelectedFakulte(data[0].fakulte_id || "");
                setSelectedBolum(data[0].bolum_id || "");
                setArananUnvan(data[0].kadro_id || "");
            })
            .catch((err) => console.error("İlan verisi alınamadı", err));
    }, [ilanId]);

    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
                <div className="flex justify-between items-center  pb-2">

                    <div className='w-full'>
                        <form onSubmit={handleSubmit} method='POST'>

                            <div className="relative z-0  mb-8 group ">
                                <input type="text" value={baslik} name="baslik" className="form-input border-2  focus:border-green-800" placeholder="İlan Başlığı" required onChange={(e) => setBaslik(e.target.value)} />
                            </div>

                            <div className="relative z-0  mb-8 group ">
                                <select id="select" value={selectedFakulte}
                                    onChange={(e) => setSelectedFakulte(e.target.value)} name='fakulteAdi' className="form-select border-2  focus:border-green-800" required>
                                    <option value={""} >Fakülte Adı</option>
                                    {fakulteAdi.map((fakulte: any) => (
                                        <option key={fakulte.id} value={fakulte.id}>
                                            {fakulte.fakulte_adi}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative z-0  mb-8 group ">
                                <select disabled={!selectedFakulte} name='bolumAdi' value={selectedBolum}
                                    onChange={(e) => setSelectedBolum(e.target.value)} className="form-select border-2  focus:border-green-800" required>
                                    <option value={""}  >Bolum Adı</option>
                                    {bolumAdi.map((bolum: any) => (
                                        <option key={bolum.id} value={bolum.id}>
                                            {bolum.bolum_adi}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative z-0  mb-8 group ">
                                <select id="select" name='arananUnvan' value={arananUnvan}
                                    onChange={(e) => setArananUnvan(e.target.value)} className="form-select border-2  focus:border-green-800" required>
                                    <option value={""}  >Aranan Unvan</option>
                                    {arananUnvanList.map((unvan: any) => (
                                        <option key={unvan.id} value={unvan.id}>
                                            {unvan.kadro_adi}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative z-0  mb-8 group ">
                                <input type="text" name="arananKisiSayisi" value={arananKisiSayisi} className="form-input border-2  focus:border-green-800" placeholder="Aranan Kişi Sayısı" required onChange={(e) => setArananKisiSayisi(e.target.value)} />
                            </div>

                            <div className="relative z-0  mb-8 group ">
                                <textarea name="aciklama" placeholder='Açıklama' value={aciklama} className='form-input border-2  focus:border-green-800' rows={10} required onChange={(e) => setAciklama(e.target.value)}></textarea>
                            </div>


                            <div className="relative z-0 mb-8 group">
                                <input
                                    type="date"
                                    value={date1}
                                    onChange={(e) => setDate1(e.target.value)}
                                    className="form-input"
                                    style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                                />
                            </div>

                            <div className="relative z-0 mb-8 group">
                                <input
                                    type="date"
                                    value={date2}
                                    onChange={(e) => setDate2(e.target.value)}
                                    className="form-input"
                                    style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-danger">Düzenle</button>


                        </form>

                    </div>


                </div>
            </div>

        </div>
    );
};

export default AdminDuzenle;
