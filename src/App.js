import React from 'react';
import './App.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// App Router Component
import AppRouter from './router';

function App() {
    const [formValue, setFormValue] = React.useState({
        email: '',
        phone: '',
        date: null,
        timestart: '',
        timeend: '',
    });

    React.useEffect(() => {
        console.log(formValue);
        return () => {};
    }, [formValue]);

    return <AppRouter></AppRouter>;
}

export default App;

// WhatsApp Widgets
// import { WhatsAppWidget } from 'react-whatsapp-widget';
// import 'react-whatsapp-widget/dist/index.css';
