import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

// List of pages
import {
    Home,
    Contact,
    BookingPage,
    Service,
    NotFound,
    About,
    Promotion,
    AdminBlog,
    AdminBooking,
    AdminServices,
    AdminWeb,
    AdminExports,
    AdminUploads,
    AdminTestimonials,
    AdminStaff,
    Login,
} from './pages';

// List of layout
import { AdminNavbar, AdminSidebar, Footer, Navbar } from './layout';
import { ScrollToTop } from './components';
import PrefetchAdmin from './context/prefetch';
import ModalContainer from './context/modalContext';

// React Icons
const signin = localStorage.getItem('signin');
const NotFoundPage = React.lazy(() => import('./pages/errors/400'));
const childrenAdmin = [
    {
        path: '',
        element: <Navigate to="booking" relative="true"></Navigate>,
    },
    {
        //Post Blog
        path: 'blog',
        element: <AdminBlog></AdminBlog>,
    },
    {
        path: 'booking',
        element: <AdminBooking></AdminBooking>,
    },
    {
        path: 'services',
        element: <AdminServices></AdminServices>,
    },
    {
        path: 'web',
        element: <AdminWeb></AdminWeb>,
    },
    {
        path: 'testimonials',
        element: <AdminTestimonials></AdminTestimonials>,
    },
    {
        path: 'exports',
        element: <AdminExports></AdminExports>,
    },
    {
        path: 'uploads',
        element: <AdminUploads></AdminUploads>,
    },
    { path: 'staff', element: <AdminStaff></AdminStaff> },
];
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ModalContainer>
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
                <ScrollToTop />
            </ModalContainer>
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
                path: 'booking',
                element: <BookingPage></BookingPage>,
            },
            {
                path: 'promotion',
                element: <Promotion />,
            },
            {
                path: 'service',
                element: <Service />,
            },
            {
                path: '*',
                element: <NotFoundPage></NotFoundPage>,
            },
        ],
    },
    {
        path: 'admin',
        element: (
            <PrefetchAdmin>
                <ModalContainer>
                    {signin === '456@456Aa' ? (
                        <>
                            <AdminNavbar></AdminNavbar>
                            <AdminSidebar children={<Outlet></Outlet>}></AdminSidebar>
                        </>
                    ) : (
                        <Login></Login>
                    )}
                    <ScrollToTop />
                </ModalContainer>
            </PrefetchAdmin>
        ),
        errorElement: <NotFound></NotFound>,
        children: childrenAdmin,
    },
]);

export default function AppRouter() {
    React.useEffect(() => {}, [localStorage.getItem('signin')]);
    return <RouterProvider router={router} />;
}
