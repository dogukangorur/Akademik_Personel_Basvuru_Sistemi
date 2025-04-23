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
const AdayBasvurularim=lazy(()=>import('../pages/Aday/AdayBasvurularim'));
const AdayProfil=lazy(()=>import('../pages/Aday/AdayProfil'));
const AdayProfilDuzenle = lazy(()=>import('../pages/Aday/AdayProfilDuzenle'));
//Admin
const AdminAnasayfa = lazy(() => import('../pages/Admin/AdminAnasayfa'));
const AdminEtkinlik = lazy(() => import('../pages/Admin/AdminEtkinlik'));
const AdminIlanOlustur = lazy(() => import('../pages/Admin/AdminIlanOlustur'));

//Yonetici
const YoneticiAnasayfa = lazy(() => import('../pages/Yonetici/YoneticiAnasayfa'));
const YoneticiIlanNihaiKarar = lazy(() => import('../pages/Yonetici/YoneticiIlanNihaiKarar'));
const YoneticiIlanJuri = lazy(() => import('../pages/Yonetici/YoneticiIlanJuri'));
const YoneticiNihaiKarar = lazy(() => import('../pages/Yonetici/YoneticiNihaiKarar'));
const YoneticiJuriAtama = lazy(() => import('../pages/Yonetici/YoneticiJuriAtama'));
const YoneticiFaaliyetTablosu = lazy(() => import('../pages/Yonetici/YoneticiFaaliyetTablosu'));
//Jüri
const JuriAnasayfa = lazy(() => import('../pages/Juri/JuriAnasayfa'));
const JuriBasvuru = lazy(() => import('../pages/Juri/JuriBasvuru'));
const JuriBasvuruDegerlendirme = lazy(() => import('../pages/Juri/JuriBasvuruDegerlendirme'));

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
        element:<AdminAnasayfa />,//buradaki indexler değişecek örnek olarak eklendi sayfanın tasarlaması lazım
        layout: 'admin',
    },
    //Admin ilan olusturma
    {
        path: '/admin/ilan-olustur',
        element:<AdminIlanOlustur />,
        layout: 'admin',
    },
    //Admin ilan duzenleme
    {
        path: '/admin/duzenle',
        element:<AdminDuzenle />,
        layout: 'admin',
    },
    //Admin etkinlik duzenleme
    {
        path: '/admin/etkinlik',
        element:<AdminEtkinlik />,
        layout: 'admin',
    },
    //Admin ilan başvurularını görüntüleme
    {
        path: '/admin/ilan-basvuru-goruntule',
        element:<AdminIlanBasvuru />,
        layout: 'admin',
    },

    

    //Aday
    //Aday ana sayfa
    {
        path: '/aday/anasayfa',
        element: <AdayAnasayfa />,
        layout: 'aday',
    },
    //Aday basvurularım
    {
        path: '/aday/basvurularım',
        element: <AdayBasvurularim />,
        layout: 'aday',
    },
    //Aday profil
    {
        path: '/aday/profil',
        element: <AdayProfil />,
        layout: 'aday',
    },
    //Aday profil goruntuleme
    {
        path: '/aday/profil-goruntule',
        element: <AdayProfilGoruntule />,
        layout: 'aday',
    },
    //Aday profil düzenleme
    {
        path: '/aday/duzenle',
        element: <AdayProfilDuzenle />,
        layout: 'aday',
    },

     //Jüri ana sayfa
     {
        path: '/juri/anasayfa',
        element: <JuriAnasayfa />,
        layout: 'juri',
    },
    //Jüri başvuru
 
    {
        path: '/juri/basvuru',
        element: <JuriBasvuru />,
        layout: 'juri',
    },
    //Jüri başvuru değerlendirme
    {
        path: '/juri/basvuru-degerlendirme',
        element: <JuriBasvuruDegerlendirme />,
        layout: 'juri',
    },

    //Yönetici
    //Yönetici ana sayfa
    {
        path: '/yonetici/anasayfa',
        //element: <AuthGuard allowedRoles={['y']}><YoneticiAnasayfa /></AuthGuard>,
        element: <YoneticiAnasayfa />,
        layout: 'yonetici',
    },
    //Yönetici İlan Nihai Karar
    {
        path: '/yonetici/ilanlar-nihai-karar',
        element: <YoneticiIlanNihaiKarar />,
        layout: 'yonetici',
    },
    //Yönetici İlan Jüri 
    {
        path: '/yonetici/ilanlar-juri-atama',
        element: <YoneticiIlanJuri />,
        layout: 'yonetici',
    },
    //Yönetici Nihai Karar
    {
        path: '/yonetici/nihai-karar',
        element: <YoneticiNihaiKarar />,
        layout: 'yonetici',
    },
    //Yönetici Jüri Atama
    {
        path: '/yonetici/juri-atama',
        element: <YoneticiJuriAtama />,
        layout: 'yonetici',
    },
    //Yönetici Faaliyet Tablosu
    {
        path: '/yonetici/faaliyet-tablosu',
        element: <YoneticiFaaliyetTablosu />,
        layout: 'yonetici',
    },

];

export { routes };
