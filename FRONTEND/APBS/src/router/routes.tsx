import { lazy } from 'react';
import AuthGuard from './AuthGuard';
import AdminDuzenle from '../pages/Admin/AdminDuzenle';
import path from 'path';
import AdminIlanBasvuru from '../pages/Admin/AdminIlanBasvuru';
import AdayProfilGoruntule from '../pages/Aday/AdayProfilGoruntule';
const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const Register = lazy(() => import('../pages/Authentication/Register'));

//Aday
const AdayAnasayfa = lazy(() => import('../pages/Aday/AdayAnasayfa'));
const AdayBasvurularim = lazy(() => import('../pages/Aday/AdayBasvurularim'));
const AdayProfil = lazy(() => import('../pages/Aday/AdayProfil'));
const AdayProfilDuzenle = lazy(() => import('../pages/Aday/AdayProfilDuzenle'));
//Admin
const AdminAnasayfa = lazy(() => import('../pages/Admin/AdminAnasayfa'));
const AdminEtkinlik = lazy(() => import('../pages/Admin/AdminEtkinlik'));
const AdminIlanOlustur = lazy(() => import('../pages/Admin/AdminIlanOlustur'));
const AdminProfilDuzenle = lazy(() => import('../pages/Admin/AdminProfilDuzenle'));

//Yonetici
const YoneticiAnasayfa = lazy(() => import('../pages/Yonetici/YoneticiAnasayfa'));
const YoneticiIlanNihaiKarar = lazy(() => import('../pages/Yonetici/YoneticiIlanNihaiKarar'));
const YoneticiIlanJuri = lazy(() => import('../pages/Yonetici/YoneticiIlanJuri'));
const YoneticiNihaiKarar = lazy(() => import('../pages/Yonetici/YoneticiNihaiKarar'));
const YoneticiJuriAtama = lazy(() => import('../pages/Yonetici/YoneticiJuriAtama'));
const YoneticiFaaliyetTablosu = lazy(() => import('../pages/Yonetici/YoneticiFaaliyetTablosu'));
const YoneticiEtkinlikSayıKriter = lazy(() => import('../pages/Yonetici/YoneticiEtkinlikSayıKriter'));
const YoneticiEtkinlikPuanKriter = lazy(() => import('../pages/Yonetici/YoneticiEtkinlikPuanKriter'));
const YoneticiProfilDuzenle = lazy(() => import('../pages/Yonetici/YoneticiProfilDuzenle'));
//Jüri
const JuriAnasayfa = lazy(() => import('../pages/Juri/JuriAnasayfa'));
const JuriBasvuru = lazy(() => import('../pages/Juri/JuriBasvuru'));
const JuriBasvuruDegerlendirme = lazy(() => import('../pages/Juri/JuriBasvuruDegerlendirme'));
const JuriProfilDuzenle = lazy(() => import('../pages/Juri/JuriProfilDuzenle'));

const routes = [
    // index sayfası
    {
        path: '/',
        element: <Index />,
        layout: 'blank',
    },
    //login
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    //register
    {
        path: '/register',
        element: <Register />,
        layout: 'blank',
    },

    //Admin <AuthGuard allowedRoles={['a']}>
    //Admin ana sayfa
    {
        path: '/admin/anasayfa',
        element: (
            <AuthGuard allowedRoles={['1']}>
                <AdminAnasayfa />
            </AuthGuard>
        ), //buradaki indexler değişecek örnek olarak eklendi sayfanın tasarlaması lazım
        layout: 'admin',
    },
    //Admin ilan olusturma
    {
        path: '/admin/ilan-olustur',
        element: (
            <AuthGuard allowedRoles={['1']}>
                <AdminIlanOlustur />
            </AuthGuard>
        ),
        layout: 'admin',
    },
    //Admin ilan duzenleme
    {
        path: '/admin/duzenle',
        element: (
            <AuthGuard allowedRoles={['1']}>
                {' '}
                <AdminDuzenle />
            </AuthGuard>
        ),
        layout: 'admin',
    },
    //Admin etkinlik duzenleme
    {
        path: '/admin/etkinlik',
        element: (
            <AuthGuard allowedRoles={['1']}>
                {' '}
                <AdminEtkinlik />
            </AuthGuard>
        ),
        layout: 'admin',
    },
    //Admin ilan başvurularını görüntüleme
    {
        path: '/admin/ilan-basvuru-goruntule',
        element: (
            <AuthGuard allowedRoles={['1']}>
                <AdminIlanBasvuru />
            </AuthGuard>
        ),
        layout: 'admin',
    },
    //Admin profil duzenleme
    {
        path: '/admin/profil-duzenle',
        element: (
            <AuthGuard allowedRoles={['1']}>
                <AdminProfilDuzenle />
            </AuthGuard>
        ),
        layout: 'admin',
    },

    //Aday
    //Aday ana sayfa
    {
        path: '/aday/anasayfa',
        element: (
            <AuthGuard allowedRoles={['2']}>
                <AdayAnasayfa />
            </AuthGuard>
        ),
        layout: 'aday',
    },
    //Aday basvurularım
    {
        path: '/aday/basvurularım',
        element: (
            <AuthGuard allowedRoles={['2']}>
                <AdayBasvurularim />
            </AuthGuard>
        ),
        layout: 'aday',
    },
    //Aday profil
    {
        path: '/aday/profil',
        element: (
            <AuthGuard allowedRoles={['2']}>
                <AdayProfil />
            </AuthGuard>
        ),
        layout: 'aday',
    },
    //Aday profil goruntuleme
    {
        path: '/aday/profil-goruntule',
        element: (
            <AuthGuard allowedRoles={['2']}>
                <AdayProfilGoruntule />
            </AuthGuard>
        ),
        layout: 'aday',
    },
    //Aday profil düzenleme
    {
        path: '/aday/profil-duzenle',
        element: (
            <AuthGuard allowedRoles={['2']}>
                <AdayProfilDuzenle />
            </AuthGuard>
        ),
        layout: 'aday',
    },

    //Jüri ana sayfa
    {
        path: '/juri/anasayfa',
        element: (
            <AuthGuard allowedRoles={['3']}>
                <JuriAnasayfa />
            </AuthGuard>
        ),
        layout: 'juri',
    },
    //Jüri başvuru

    {
        path: '/juri/basvuru',
        element: (
            <AuthGuard allowedRoles={['3']}>
                <JuriBasvuru />
            </AuthGuard>
        ),
        layout: 'juri',
    },
    //Jüri başvuru değerlendirme
    {
        path: '/juri/basvuru-degerlendirme',
        element: (
            <AuthGuard allowedRoles={['3']}>
                <JuriBasvuruDegerlendirme />
            </AuthGuard>
        ),
        layout: 'juri',
    },
    //Jüri profil düzenleme
    {
        path: '/juri/profil-duzenle',
        element: (
            <AuthGuard allowedRoles={['3']}>
                <JuriProfilDuzenle />
            </AuthGuard>
        ),
        layout: 'juri',
    },

    //Yönetici
    //Yönetici ana sayfa
    {
        path: '/yonetici/anasayfa',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiAnasayfa />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici İlan Nihai Karar
    {
        path: '/yonetici/ilanlar-nihai-karar',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiIlanNihaiKarar />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici İlan Jüri
    {
        path: '/yonetici/ilanlar-juri-atama',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiIlanJuri />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici Nihai Karar
    {
        path: '/yonetici/nihai-karar',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiNihaiKarar />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici Jüri Atama
    {
        path: '/yonetici/juri-atama',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiJuriAtama />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici Faaliyet Tablosu
    {
        path: '/yonetici/faaliyet-tablosu',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiFaaliyetTablosu />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici Etkinlik Sayı Kriterleri Tablosu
    {
        path: '/yonetici/etkinlik-sayi-kriterleri',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiEtkinlikSayıKriter />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici Etkinlik Puan Kriterleri Tablosu
    {
        path: '/yonetici/etkinlik-puan-kriterleri',
        element: (
            <AuthGuard allowedRoles={['4']}>
                {' '}
                <YoneticiEtkinlikPuanKriter />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
    //Yönetici profil düzenleme
    {
        path: '/yonetici/profil-duzenle',
        element: (
            <AuthGuard allowedRoles={['4']}>
                <YoneticiProfilDuzenle />
            </AuthGuard>
        ),
        layout: 'yonetici',
    },
];

export { routes };
