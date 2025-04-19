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

const AdminIlanBasvuru = () => {
    const MySwal = withReactContent(Swal);

    const [basvurular, setBasvurular] = useState<any[]>([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('İlanlar'));
    });

    const params = new URLSearchParams(location.search);
    const basvuruId = params.get('id');

    useEffect(() => {
       async function fetchBasvuru() {
        const response= await fetch(`http://localhost:8080/api/admin/ilanBasvuruGoruntule?id=${basvuruId}`);
        const result = await response.json();
        if(result.success){
            setBasvurular(result.data);
        }
        else{
            console.log(result.message);
        }
      }
      

      fetchBasvuru();
    }, []);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); 
    };
    

    const navigate = useNavigate();
  
    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
                <div className="flex justify-between items-center  pb-2">
                    <div className="table-responsive mb-5 w-full">
                        <table className='table-fixed'>
                            <thead>
                                <tr>
                                    <th>Başvuru ID</th>
                                    <th>Başvuran</th>
                                    <th>Pozisyon</th>
                                    <th>Durum</th>
                                    <th>Kurum</th>
                                    <th>Tarih</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basvurular.map((basvuru:any) => {
                                    return (
                                        <tr key={basvuru.id}>
                                            <td>{basvuru.id}</td>
                                            <td>{basvuru.ad} {basvuru.soyad}</td>
                                            <td>{basvuru.puanlanan_faaliyet_donemi}</td>
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
                                            <td>{basvuru.kurumu}</td>
                                            <td>{formatDate(basvuru.basvuru_tarihi)}</td>
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
};

export default AdminIlanBasvuru;
