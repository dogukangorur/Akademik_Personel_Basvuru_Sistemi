import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';



const AdminAnasayfa = () => {

    const [ilanlar, setIlanlar] = useState<any[]>([]);

    const [isChecked, setIsChecked] = useState<boolean>(true);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Coming Soon Boxed'));
    });



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
    const handleChange = () => {
        setIsChecked((prevChecked) => !prevChecked);
    };

    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
                <div className="flex justify-between items-center  pb-2">
                    <div className="table-responsive mb-5 w-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>İlan Id</th>
                                    <th>İlan Adı</th>
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
                                                <div className="whitespace-nowrap">{ilan.baslik}</div>
                                            </td>
                                            <td>{formatDate(ilan.baslangic_tarih)} / {formatDate(ilan.bitis_tarih)}</td>
                                            <td >
                                              
                                            <label className="w-12 h-6 relative">
                                                 <input type="checkbox" checked={isChecked}
                onChange={handleChange} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-success before:transition-all before:duration-300"></span>
                                            </label>
                                            </td>
                                            <td>
                                                <div className='flex w-10'>
                                                        <button type="button" className="btn btn-warning mx-2 ">D</button>
                                                        <button type="button" className="btn btn-danger mx-2 ">S</button>
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

        </div>
    );
};

export default AdminAnasayfa;
