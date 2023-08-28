import React, { useEffect, useState } from 'react';

import './style/bookingCpn.css';

// Calendar
import { default as Calendar } from './calendar';

// Space Time Frame
import { default as SpaceTimeFrame } from './space-time-frame';

const Booking = ({ initialTimeRange, reserved, activeDate, onChangeDate, onChangeTimeStart, onChangeTimeEnd }) => {
    const [selectedDate, setSelectedDate] = useState();

    useEffect(() => {
        onChangeDate(selectedDate);
    }, [selectedDate]);

    return (
        <div className="booking-root">
            <div className="booking-root-date">
                {/* <h2>Booking</h2> */}
                <Calendar initialDate={activeDate} onChangeDate={(date) => setSelectedDate(date)}></Calendar>
            </div>
            <div className="booking-root-time">
                <div className="calendar-space-time-frame">
                    {selectedDate && (
                        <SpaceTimeFrame
                            initialSpaceTimes={initialTimeRange}
                            reserved={reserved}
                            onChangeTimeStart={onChangeTimeStart}
                            onChangeTimeEnd={onChangeTimeEnd}
                        ></SpaceTimeFrame>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
