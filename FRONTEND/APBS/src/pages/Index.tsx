import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import ReactApexChart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../components/Dropdown';
import { setPageTitle } from '../store/themeConfigSlice';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import IconBell from '../components/Icon/IconBell';
import Header from './Parts/Header';
import Ilanlar from './Parts/Ilanlar';
const Index = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Anasayfa'));
    });

    return (
        <>
           <Header/>
           <div className='w-full h-screen bg-gray-100 flex justify-center items-start'>
                <div id="ilanlarCerceve" className='w-full flex justify-center px-20 mt-10 flex-col items-center'>
                    <Ilanlar/>
                </div>
           </div>
        </> 
    );
};


export default Index;
