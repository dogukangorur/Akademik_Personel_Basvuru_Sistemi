import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconInstagram from '../../components/Icon/IconInstagram';
import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
import IconTwitter from '../../components/Icon/IconTwitter';
import IconGoogle from '../../components/Icon/IconGoogle';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const AdayBasvurularim = () => {

    // veri tabanından bilgi gelecek öylesine bir veri seti
    const tableData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@yahoo.com',
            date: '10/08/2020',
            sale: 120,
            status: 'Beklemede',
            register: '5 min ago',
            progress: '40%',
            position: 'Developer',
            office: 'London',
        },
        {
            id: 2,
            name: 'Shaun Park',
            email: 'shaunpark@gmail.com',
            date: '11/08/2020',
            sale: 400,
            status: 'Beklemede',
            register: '11 min ago',
            progress: '23%',
            position: 'Designer',
            office: 'New York',
        },
        {
            id: 3,
            name: 'Alma Clarke',
            email: 'alma@gmail.com',
            date: '12/02/2020',
            sale: 310,
            status: 'Onaylandı',
            register: '1 hour ago',
            progress: '80%',
            position: 'Accountant',
            office: 'Amazon',
        },
        {
            id: 4,
            name: 'Vincent Carpenter',
            email: 'vincent@gmail.com',
            date: '13/08/2020',
            sale: 100,
            status: 'Reddedildi',
            register: '1 day ago',
            progress: '60%',
            position: 'Data Scientist',
            office: 'Canada',
        },
    ];
    
    return (
        <div>
            <div className="md:col-start-2 md:col-end-4 p-4 border rounded-lg bg-white shadow-lg w-full ">
                <div className="flex justify-between items-center  pb-2">
                    <div className="table-responsive mb-5 w-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>Başvuru</th>
                                    <th>Tarih</th>
                                    <th>Durum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                <div className="whitespace-nowrap">{data.name}</div>
                                            </td>
                                            <td>{data.date}</td>
                                            <td >
                                                <div
                                                    className={`badge whitespace-nowrap text-center w-[100px] ${data.status === 'Beklemede'
                                                        ? 'bg-primary   '
                                                        : data.status === 'Onaylandı'
                                                            ? 'bg-success'
                                                            : data.status === 'Reddedildi'
                                                                ? 'bg-danger' : ''
                                                        }`}
                                                >
                                                    {data.status}
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

}


export default AdayBasvurularim;