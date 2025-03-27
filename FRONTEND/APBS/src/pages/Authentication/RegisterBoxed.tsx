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
                                <div className='w-[200px] flex justify-center flex-col'>
                                    <div className="relative z-0  mb-8 group ">
                                        <input type="text" name="tcNo" id="tcNo" minLength={11} maxLength={11} className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="tcNo" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TC</label>
                                    </div>
                        
                                    <div className="relative z-0  mb-8 group ">
                                        <input type="text" name="ad" id="ad"  className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="ad" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ad</label>
                                    </div>

                                    <div className="relative z-0  mb-8 group ">
                                        <input type="text" name="soyad" id="soyad"  className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="soyad" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Soyad</label>
                                    </div>

                                    <div className="relative z-0  mb-8 group">
                                        <input type="password" name="password" id="floating_password" className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="password" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Şifre</label>
                                    </div> 
                                    
                                    <div className="flex justify-center mb-6">
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
