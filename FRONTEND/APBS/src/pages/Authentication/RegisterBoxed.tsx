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

const RegisterBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [date1, setDate1] = useState<any>('');

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState(themeConfig.locale);

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
                               <form action="#" className="flex items-center justify-center">
                                <div className='w-[400px] flex justify-center flex-col'>

                                      <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                         <input type="text" name='telefon' placeholder="Telefon" minLength={11} maxLength={11} className="form-input border-2  focus:border-green-800" required />
                                         <input type="text" name='tc' placeholder="TC" className="form-input border-2  focus:border-green-800" minLength={11} maxLength={11} required />
                                      </div>
                        
                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                        <input type="text" name='ad' placeholder="Ad" className="form-input border-2  focus:border-green-800" required />
                                        <input type="text" name='soyad' placeholder="Soyad" className="form-input border-2  focus:border-green-800" required />
                                    </div>

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-3">
                                        <input type="email" name="email" placeholder="Email" className="form-input border-2  focus:border-green-800"  required />
                                        <Flatpickr value={date1} options={{ dateFormat: 'd-m-Y', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" onChange={(date) => setDate1(date)} placeholder='Doğum Yılı'/>
                                    </div> 

                                    <div className="grid grid-cols-1 sm:flex justify-between gap-2 mb-6">
                                        <input type="sifre" name="sifre" placeholder="Şifre" className="form-input border-2  focus:border-green-800"  required />
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
