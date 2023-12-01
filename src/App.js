import React, { Suspense } from 'react';
import './App.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// App Router Component
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Event } from './layout';
import Preloading from 'components/loading/preloading';

function App() {
    return (
        <>
            <Suspense fallback={<Preloading></Preloading>}>
                <AppRouter></AppRouter>
            </Suspense>

            <ToastContainer />
            <Event></Event>
        </>
    );
}

export default App;

// WhatsApp Widgets
// import { WhatsAppWidget } from 'react-whatsapp-widget';
// import 'react-whatsapp-widget/dist/index.css';
