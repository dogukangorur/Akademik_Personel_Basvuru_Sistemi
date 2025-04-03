import { lazy } from 'react';
import AuthGuard from './AuthGuard';
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
//Yonetici
const YoneticiAnasayfa = lazy(() => import('../pages/Yonetici/YoneticiAnasayfa'));
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

    //Admin
    //Admin ana sayfa
    {
        path: '/admin/anasayfa',
        element:<AuthGuard allowedRoles={['a']}><AdminAnasayfa /></AuthGuard>,//buradaki indexler değişecek örnek olarak eklendi sayfanın tasarlaması lazım
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
        element: <AuthGuard allowedRoles={['y']}><YoneticiAnasayfa /></AuthGuard>,
        layout: 'yonetici',
    },
];

export { routes };
