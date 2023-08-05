import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// List of pages
import { Home, Contact, Coupon, Service, NotFound, About, Promotion } from './pages';

// List of layout
import { Footer, Navbar } from './layout';

// React Icons

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
            </>
        ),
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'voucher',
                element: <Coupon />,
            },
            {
                path: 'promotion',
                element: <Promotion />,
            },
            {
                path: 'service',
                element: <Service />,
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
