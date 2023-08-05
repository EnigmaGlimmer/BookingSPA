import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// List of pages
import { Home, Contact, Coupon, Service, NotFound, About } from './pages';

// React Icons
import { Spinner } from 'react-bootstrap';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        errorElement: <NotFound></NotFound>,
        // loader: Spinner,
        children: [
            {
                path: '',
                element: <Home />,
                // loader: <Spinner></Spinner>,
            },
            {
                path: 'about',
                element: <About />,
                // loader: <Spinner></Spinner>,
            },
            {
                path: 'contact',
                element: <Contact />,
                // loader: <Spinner></Spinner>,
            },
            {
                path: 'voucher',
                element: <Coupon />,
                // loader: <Spinner></Spinner>,
            },
            {
                path: 'service',
                element: <Service />,
                // loader: <Spinner></Spinner>,
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
