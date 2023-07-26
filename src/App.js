import './App.css';
import logo from './logo.svg';
import { BookingCalendar, TextEditor } from './components';

// WhatsApp Widgets
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

function Logo() {
    return <img src={logo}></img>;
}

function App() {
    return (
        <div
            className="container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <BookingCalendar
                onChangeDate={(date) => {
                    console.log(date);
                }}
                onChangeTimeStart={(startTime) => {
                    console.log(startTime);
                }}
                onChangeTimeEnd={(endTime) => {
                    console.log(endTime);
                }}
            ></BookingCalendar>
            <TextEditor></TextEditor>
            {/* <WhatsAppWidget
                CompanyIcon={Logo}
                phoneNumber="84398866140"
            ></WhatsAppWidget> */}
            {/* <script
                src="https://static.elfsight.com/platform/platform.js"
                data-use-service-core
                defer
            ></script>
            <div class="elfsight-app-f8919da2-fd64-4351-bb1e-db9b3f54da35"></div> */}
        </div>
    );
}

export default App;
