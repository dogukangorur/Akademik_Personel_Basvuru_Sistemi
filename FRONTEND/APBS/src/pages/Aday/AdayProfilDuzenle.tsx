import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';

const AdayProfilDuzenle = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Anasayfa'));

    });


    return (
        <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
            <div className="flex justify-between items-center border-b pb-2">
                <div className="p-4 rounded-lg w-full flex flex-col items-center">
                    <div className="flex flex-col items-center gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <label className="text-white-dark mb-1">TC</label>
                                    <input
                                        type="text"
                                        placeholder="12345678901"
                                        className="form-input w-[200px] disabled:pointer-events-none disabled:bg-[#eee] dark:disabled:bg-[#1b2e4b] cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                               
                            </div>
                        ))}
                    </div>
                      <br /><br /><br />      
                    <h4 className='mb-5 text-green-800 text-xl'>PROFİL GÜNCELLEME</h4>

                    <form action="#" className="flex items-center justify-center">
                        <div className='w-[400px] flex justify-center flex-col'>
                            <div className="grid grid-cols-1 flex flex-col sm:flex justify-between gap-2 mb-3">
                                <input type="password" name='password' placeholder="Şifre" className="form-input border-2  focus:border-green-800" required />
                                <br />
                                <input type="password" name='passwordAgain' placeholder="Şifre Tekrar" className="form-input border-2  focus:border-green-800" required />
                                <br />
                                <input type="email" name="email" placeholder="Email" className="form-input border-2  focus:border-green-800" required />
                                <br />
                                <button type="submit" className="w-[120px] text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Kaydet</button>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AdayProfilDuzenle;
