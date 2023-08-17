import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

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
} from './pages';

// List of layout
import { AdminNavbar, AdminSidebar, Footer, Navbar } from './layout';

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
                path: 'about',
                element: <About />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'booking',
                element: <BookingPage />,
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
    {
        path: 'admin',
        element: (
            <>
                <AdminNavbar></AdminNavbar>
                <AdminSidebar children={<Outlet></Outlet>}></AdminSidebar>
            </>
        ),
        errorElement: <NotFound></NotFound>,
        children: [
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
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
