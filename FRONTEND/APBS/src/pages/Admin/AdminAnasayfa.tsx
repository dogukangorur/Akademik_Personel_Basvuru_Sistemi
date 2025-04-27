import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Dialog, Transition,Tab, TransitionChild, DialogPanel } from '@headlessui/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import IconTrash from '../../components/Icon/IconTrash';
import IconEdit from '../../components/Icon/IconEdit';
import IconEye from '../../components/Icon/IconEye';

const AdminAnasayfa = () => {
    const MySwal = withReactContent(Swal);

    const [ilanlar, setIlanlar] = useState<any[]>([]);

    const [isChecked, setIsChecked] = useState<boolean>(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('İlanlar'));
    });
    const [modal1, setModal1] = useState(false);


    useEffect(() => {
        fetch("http://localhost:8080/api/admin/ilanGetir")
            .then((res) => res.json())
            .then((data) => setIlanlar(data))
            .catch((err) => console.error("İlanlar alınamadı", err));
    }, []);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); 
    };
    const handleChange = async (id: number | null) => {
        if (id === null) return;
        const yeniDurum = !isChecked;
        setIsChecked(yeniDurum);

    const guncelDurum = yeniDurum ? "aktif" : "pasif";

    fetch(`http://localhost:8080/api/admin/ilanDurumGuncelle?id=${id}&durum=${guncelDurum}`)
            .then((res) => res.json())
            .then((data) => MySwal.fire({
                title: 'Durum Güncelleme Başarılı',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }}))
            .catch((err) => console.error("İlanlar alınamadı", err));
    
    };

    const handleGoruntule = (id:number) => {
        navigate(`/admin/ilan-basvuru-goruntule?id=${id}`);
      };    

    const navigate = useNavigate();
    const handleDuzenle = (id:number) => {
        navigate(`/admin/duzenle?id=${id}`);
      };

      const handleSil = (id: number | null) => {
        if (id === null) return;
        fetch(`http://localhost:8080/api/admin/ilanSil?id=${id}`)
            .then((res) => res.json())
            .then((data) => MySwal.fire({
                title: 'Silme İşlemi Başarılı',
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                }}))
            .catch((err) => console.error("İlanlar alınamadı", err));
      };  
     
      const [secilenIlanId, setSecilenIlanId] = useState<number | null>(null);
    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
                <div className="flex justify-between items-center  pb-2">
                    <div className="table-responsive mb-5 w-full">
                        <table className='table-fixed'>
                            <thead>
                                <tr>
                                    <th>İlan Id</th>
                                    <th>İlan Adı</th>
                                    <th>Açıklama</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ilanlar.map((ilan:any) => {
                                    return (
                                        <tr key={ilan.id}>
                                            <td>{ilan.id}</td>
                                            <td>
                                                <div className="whitespace-nowrap">{ilan.baslik.substring(0,25)}...</div>
                                            </td>
                                            <td>
                                                {ilan.aciklama.substring(0,40)}...
                                            </td>
                                            <td>{formatDate(ilan.baslangic_tarih)} / {formatDate(ilan.bitis_tarih)}</td>
                                            <td >
                                              
                                            <label className="w-12 h-6 relative">
                                                 <input type="checkbox" checked={isChecked} onChange={()=>handleChange(ilan.id)} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-success before:transition-all before:duration-300"></span>
                                            </label>
                                            </td>
                                            <td>
                                                <div className='flex w-10'>
                                                        <button type="button"  onClick={() => handleDuzenle(ilan.id)} className="btn btn-warning mx-1 "><IconEdit className="w-4 h-4"/></button>
                                                        <button type="button" className="btn btn-danger mx-1" onClick={() => {setModal1(true); setSecilenIlanId(ilan.id);}}><IconTrash className="w-4 h-4" /></button>
                                                        <button type="button" className="btn btn-primary mx-1" onClick={() => handleGoruntule(ilan.id)}><IconEye className="w-4 h-4" /></button>
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
            <Transition appear show={modal1} as={Fragment}>
                <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0" />
                    </TransitionChild>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-start justify-center min-h-screen px-4">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex  dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold pt-3"> Silmek isteğinizden emin misiniz ?</div>
                                        <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal1(false)}>
                                           
                                        </button>
                                    </div>
                                    <div className="p-5">
                                       
                                         
                                        
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModal1(false)}>
                                                Kapat
                                            </button>
                                            <button type="button" className="btn btn-danger ltr:ml-4 rtl:mr-4" onClick={() =>handleSil(secilenIlanId) }>
                                                Sil
                                            </button>
                                        </div>
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

export default AdminAnasayfa;
