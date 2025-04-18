import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Header from '../Parts/Header';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const RegisterBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Kayıt Ol'));
    });
    const navigate = useNavigate();

    const [date1, setDate1] = useState<any>('');

    const [ad, setAd] = useState<any>('');
    const [soyad, setSoyad] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [telNo, setTelNo] = useState<any>('');
    const [tc, setTc] = useState<any>('');
    const [sifre, setSifre] = useState<any>('');
    const [kurum, setKurum] = useState<any>('');
    const [kadroId, setKadroId] = useState<any>('');

    const MySwal = withReactContent(Swal);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            tc:tc,
            ad:ad,
            soyad:soyad,
            dogumYili:date1,
            telNo:telNo,
            kurum:kurum,
            email:email,
            kadroId:kadroId,
            sifre:sifre
        };

        const response = await fetch("http://localhost:8080/api/aday/postAdayKayit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if(result.success){
            MySwal.fire({
                title: result.message,
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 1500,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                },
            }).then(() => {
                navigate('/login'); // örnek olarak giriş sayfasına yönlendir
              });;
        }
        else{
            MySwal.fire({
                title: result.message,
                toast: true,
                position: 'bottom-start',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-danger`,
                },
            });
        }
    };



    const submitForm = () => {
        navigate('/');
    };

    return (
        <div>
            <Header />
            <div className="relative flex min-h-screen  justify-center  px-6 py-10 dark:bg-[#060818] sm:px-16">

                <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-[60vw] h-[500px] ">
                <div className="mb-4 border-b border-dark-200 dark:border-dark-700">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                            <li className="me-2" role="presentation">
                                <button className="inline-block p-4 border-b-2 rounded-t-lg text-green-800 border-green-800 dark:text-purple-500 dark:border-purple-500" role="tab">
                                    Kayıt
                                </button>
                            </li>
                           </ul>
                         </div>   
                        
                            <div className="p-4 rounded-lg ">
                               <form onSubmit={handleSubmit} className="flex items-center justify-center">
                                <div className='w-[400px] flex justify-center flex-col'>

                                      <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                         <input type="text" name='telefon' placeholder="Telefon" minLength={11} maxLength={11} pattern='[0-9]{11}' className="form-input border-2  focus:border-green-800" onChange={(e) => setTelNo(e.target.value)} required />
                                         <input type="text" name='tc' placeholder="TC" className="form-input border-2  focus:border-green-800" minLength={11} maxLength={11} onChange={(e) => setTc(e.target.value)} required />
                                      </div>
                        
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                        <input type="text" name='ad' placeholder="Ad" className="form-input border-2  focus:border-green-800" onChange={(e) => setAd(e.target.value)} required />
                                        <input type="text" name='soyad' placeholder="Soyad" className="form-input border-2  focus:border-green-800" onChange={(e) => setSoyad(e.target.value)} required />
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                        <input type="text" name='kurum' placeholder="Kurum" className="form-input border-2  focus:border-green-800" onChange={(e) => setKurum(e.target.value)} required />
                                        <select name="kadroId" className="form-select border-2  focus:border-green-800" onChange={(e) => setKadroId(e.target.value)} required>
                                            <option>Kadro Seçimi</option>
                                            <option value="1">Lisans</option>
                                            <option value="2">Yük. Lis.</option>
                                            <option value="3">Dr.</option>
                                            <option value="4">Ar. Gör.</option>
                                            <option value="5">Öğr. Üyesi</option>
                                            <option value="6">Dr. Öğr. Üyes</option>
                                            <option value="7">Doçent</option>
                                            <option value="8">Profesör</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                        <input type="email" name="email" placeholder="Email" className="form-input border-2  focus:border-green-800" onChange={(e) => setEmail(e.target.value)} required />
                                        <input type="date" name="dogumYili" className="form-input" onChange={(e) => setDate1(e.target.value)} />
                                    </div> 

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-6">
                                        <input type="password" name="sifre" placeholder="Şifre" className="form-input border-2  focus:border-green-800" onChange={(e) => setSifre(e.target.value)}  required />
                                    </div>


                                    <div className="flex justify-center mb-3">
                                        <button type="submit" className="w-[120px] text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kayıt Ol</button>
                                    </div>

                                </div>
                               </form>
                            </div>
                        

                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
