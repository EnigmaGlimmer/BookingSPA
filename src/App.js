import React from 'react';
import './App.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// App Router Component
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <AppRouter></AppRouter>
            <ToastContainer />
        </>
    );
}

export default App;

// WhatsApp Widgets
// import { WhatsAppWidget } from 'react-whatsapp-widget';
// import 'react-whatsapp-widget/dist/index.css';
