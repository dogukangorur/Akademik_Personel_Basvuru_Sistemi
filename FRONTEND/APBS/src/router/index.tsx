import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import AdminLayout from '../components/Layouts/AdminLayout';
import AdayLayout from '../components/Layouts/AdayLayout';
import JuriLayout from '../components/Layouts/JuriLayout';
import YoneticiLayout from '../components/Layouts/YoneticiLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    let element;

    switch (route.layout) {
        case 'blank':
            element = <BlankLayout>{route.element}</BlankLayout>;
            break;
        case 'juri':
            element = <JuriLayout>{route.element}</JuriLayout>;
            break;
        case 'aday':
            element = <AdayLayout>{route.element}</AdayLayout>;
            break;
        case 'admin':
            element = <AdminLayout>{route.element}</AdminLayout>;
            break;
        case 'yonetici':
            element = <YoneticiLayout>{route.element}</YoneticiLayout>;
            break;
        default:
            element = <BlankLayout>{route.element}</BlankLayout>;
            break;
    }

    return {
        ...route,
        element,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;