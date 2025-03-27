import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import Header from '../Parts/Header';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Giriş'));
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

    const [activeTab, setActiveTab] = useState("aday");

    return (
        <div>
            <Header />
            <div className="relative flex min-h-screen  justify-center  px-6 py-10 dark:bg-[#060818] sm:px-16">

                <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-[60vw] h-[500px] ">

                    <div className="mb-4 border-b border-dark-200 dark:border-dark-700">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                            <li className="me-2" role="presentation">
                                <button
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "aday"
                                            ? "text-green-800 border-green-800 dark:text-purple-500 dark:border-purple-500"
                                            : "text-gray-500 border-transparent hover:text-gray-600 hover:border-dark-300 dark:text-gray-400 dark:hover:text-gray-300"
                                        }`}
                                    onClick={() => setActiveTab("aday")}
                                    role="tab"
                                >
                                    Aday
                                </button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "admin"
                                            ? "text-green-800 border-green-800 dark:text-purple-500 dark:border-purple-500"
                                            : "text-gray-500 border-transparent hover:text-gray-600 hover:border-dark-300 dark:text-gray-400 dark:hover:text-gray-300"
                                        }`}
                                    onClick={() => setActiveTab("admin")}
                                    role="tab"
                                >
                                    Admin
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        {activeTab === "aday" && (
                            <div className="p-4 rounded-lg ">
                               <form action="#" className="flex items-center justify-center">
                                <div className='w-[200px] flex justify-center flex-col'>
                                    <div className="relative z-0  mb-8 group ">
                                        <input type="text" name="tcNo" id="tcNo" minLength={11} maxLength={11} className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="tcNo" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TC</label>
                                    </div>
                                    <div className="relative z-0  mb-8 group">
                                        <input type="password" name="password" id="floating_password" className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="password" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Şifre</label>
                                    </div>   
                                    <div className="flex items-start mb-8">
                                        <div className="flex items-start h-5 ">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                        </div>
                                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-dark-900 dark:text-dark-300">Beni Hatırla</label>
                                    </div>

                                    <div className="flex justify-center mb-6">
                                        <button type="submit" className="w-[120px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Giriş</button>
                                    </div>

                                    <div className="flex justify-center">
                                        <a href="#" className='text-green-800 hover:underline hover:underline-offset-8'>Şifremi Unuttum ?</a>
                                    </div>

                                </div>
                               </form>
                            </div>
                        )}

                        {activeTab === "admin" && (
                              <div className="p-4 rounded-lg ">
                               <form action="#" className="flex items-center justify-center">

                                <div className='w-[200px] flex justify-center flex-col'>

                                    <div className="flex justify-center mb-8">
                                        <label htmlFor="underline_select" className="sr-only text-dark-800">Rol</label>
                                            <select id="underline_select" className="block py-2.5 px-0 w-full text-sm text-dark-900 dark:text-dark-400 duration-300 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" required>
                                                <option selected>Rol</option>
                                                <option value="a">Admin</option>
                                                <option value="y">Yönetici</option>
                                                <option value="j">Jüri</option>
                                            </select>
                                    </div>

                                    <div className="relative z-0  mb-8 group ">
                                        <input type="text" name="tcNo" id="TcNo" minLength={11} maxLength={11} className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="tcNo" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">TC</label>
                                    </div>
                                    <div className="relative z-0  mb-8 group">
                                        <input type="password" name="password" id="floating_password" className="w-[100%] block py-2.5 px-0 w-full text-sm text-dark-900 bg-transparent border-0 border-b-2 border-dark-300 appearance-none dark:text-white dark:border-dark-600 dark:focus:border-green-800 focus:outline-none focus:ring-0 focus:border-green-800 peer" placeholder=" " required />
                                        <label  htmlFor="password" className="peer-focus:font-medium absolute text-sm text-dark-500 dark:text-dark-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Şifre</label>
                                    </div>   
                                    <div className="flex items-start mb-8">
                                        <div className="flex items-start h-5 ">
                                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                        </div>
                                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-dark-900 dark:text-dark-300">Beni Hatırla</label>
                                    </div>

                                    <div className="flex justify-center mb-6">
                                        <button type="submit" className="w-[120px] text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Giriş</button>
                                    </div>

                                    <div className="flex justify-center">
                                        <a href="#" className='text-green-800 hover:underline hover:underline-offset-8'>Şifremi Unuttum ?</a>
                                    </div>

                                </div>
                               </form>
                            </div>
                        
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
