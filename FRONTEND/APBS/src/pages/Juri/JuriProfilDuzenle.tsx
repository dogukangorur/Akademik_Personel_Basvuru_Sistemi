import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const JuriProfilDuzenle = () => {
    const location = useLocation();
    const storedUserInfo = localStorage.getItem('userInfo');
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    const dispatch = useDispatch();

    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(setPageTitle('Anasayfa'));
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (password !== passwordAgain) {
            MySwal.fire({
                title: 'Şifreler uyuşmuyor!',
                icon: 'warning',
                toast: true,
                position: 'bottom-start',
                timer: 2000,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: { popup: 'color-warning' },
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/kullanici/update-password', {
                tc: userInfo?.TC,
                newPassword: password,
            });

            if (response.data.success) {
                MySwal.fire({
                    title: 'Şifre başarıyla güncellendi!',
                    icon: 'success',
                    toast: true,
                    position: 'bottom-start',
                    timer: 1500,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-success' },
                });

                setPassword('');
                setPasswordAgain('');
                setMessage(''); // eski message temizlensin
            } else {
                MySwal.fire({
                    title: 'Şifre güncellenemedi!',
                    text: response.data.message,
                    icon: 'error',
                    toast: true,
                    position: 'bottom-start',
                    timer: 2000,
                    showConfirmButton: false,
                    showCloseButton: true,
                    customClass: { popup: 'color-error' },
                });
            }
        } catch (error) {
            console.error(error);

            MySwal.fire({
                title: 'Sunucu hatası oluştu!',
                icon: 'error',
                toast: true,
                position: 'bottom-start',
                timer: 2000,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: { popup: 'color-error' },
            });
        }
    };

    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
            {/* Profil Bilgileri (önceki kodun) */}
            <div className="flex justify-between items-center border-b pb-2">
                <div className="p-4 rounded-lg w-full flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-4">
                        <div>
                            <label htmlFor="browserFname">Ad</label>
                            <input id="browserFname" type="text" value={userInfo?.Ad} className="form-input" readOnly />
                        </div>
                        <div>
                            <label htmlFor="browserLname">Soyad</label>
                            <input id="browserLname" type="text" value={userInfo?.Soyad} className="form-input" readOnly />
                        </div>
                        <div>
                            <label htmlFor="browserTC">TC</label>
                            <input id="browserEmail" type="text" value={userInfo?.TC} className="form-input" readOnly />
                        </div>
                        <div>
                            <label htmlFor="browserBorn">Doğum Tarihi</label>
                            <input id="browserBorn" type="text" value={userInfo?.DogumTarihi?.substring(0, 10)} className="form-input" readOnly />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-4">
                        <div>
                            <label htmlFor="browserTel">Telefon</label>
                            <input id="browserTel" type="text" value={userInfo?.Telefon} className="form-input" readOnly />
                        </div>
                        <div>
                            <label htmlFor="browserMail">E-Mail</label>
                            <input id="browserCountry" type="text" value={userInfo?.Mail} className="form-input" readOnly />
                        </div>
                        <div>
                            <label htmlFor="browserCorporation">Kurum</label>
                            <input id="browserState" type="text" value={userInfo?.Kurumu} className="form-input" readOnly />
                        </div>
                        <div>
                            <label htmlFor="browserStaff">Kadro</label>
                            <input id="browserZip" type="text" value={userInfo?.Kadro} className="form-input" readOnly />
                        </div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <h4 className="mb-5 text-green-800 text-xl">ŞİFRE GÜNCELLEME</h4>

                    <form onSubmit={handleSubmit} className="flex items-center justify-center">
                        <div className="w-[400px] flex justify-center flex-col">
                            <div className="grid grid-cols-1 flex flex-col sm:flex justify-between gap-2 mb-3 items-center">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Yeni Şifre"
                                    className="form-input border-2  focus:border-green-800"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <br />
                                <input
                                    type="password"
                                    name="passwordAgain"
                                    placeholder="Şifre Tekrar"
                                    className="form-input border-2  focus:border-green-800"
                                    value={passwordAgain}
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    required
                                />
                                <br />
                                <button
                                    type="submit"
                                    className="w-[120px] text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                >
                                    Kaydet
                                </button>
                            </div>
                            {message && <p className="text-center text-sm mt-2 text-red-600">{message}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JuriProfilDuzenle;
