import './App.css';
import logo from './logo.svg';
import React from 'react';
import { Booking } from './components';
import { TextEditor } from './components/index.tsx';

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
                initialTimeRange={[['', '']]}
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
            <TextEditor onChange={(output) => {}}></TextEditor>
        </div>
    );
}

export default App;
