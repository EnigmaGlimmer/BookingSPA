import './App.css';
import logo from './logo.svg';
import React from 'react';
import { Booking, TextEditor } from './components';

// WhatsApp Widgets
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

function Logo() {
    return <img src={logo}></img>;
}

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

    return (
        <div
            className="container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Booking
                activeDate={formValue.date}
                onChangeDate={(date) => {
                    setFormValue({
                        ...formValue,
                        date: date,
                    });
                }}
                onChangeTimeStart={(startTime) => {
                    setFormValue((i) => ({
                        ...i,
                        timestart: startTime,
                    }));
                }}
                onChangeTimeEnd={(endTime) => {
                    setFormValue((i) => ({
                        ...i,
                        timeend: endTime,
                    }));
                }}
            ></Booking>
            <TextEditor></TextEditor>
            {/* <WhatsAppWidget
                CompanyIcon={Logo}
                phoneNumber="84398866140"
            ></WhatsAppWidget> */}
        </div>
    );
}

export default App;
