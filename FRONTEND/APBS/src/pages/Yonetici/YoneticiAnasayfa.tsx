import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Ilanlar from '../Parts/Ilanlar';

const YoneticiAnasayfa = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Yönetici Anasayfa'));
    });

    return (
        <div>
            <Ilanlar />
        </div>
    );
};

export default YoneticiAnasayfa;
