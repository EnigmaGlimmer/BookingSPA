import React, { useEffect, useRef, useState } from 'react';

import './style/bookingCpn.css';

// Calendar
import { default as Calendar } from './calendar';

// Space Time Frame
import { default as SpaceTimeFrame } from './space-time-frame';

const Booking = ({
    initialTimeRange,
    allowDatesToBook = [],
    notAllowDatesToBook,
    reserved,
    timeFrameLoading,
    activeDate,
    onChangeDate,
    onChangeTimeStart,
    onChangeTimeEnd,
    onOverBook,
    title,
    content,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const scrolledElementOnChoice = useRef(null);

    useEffect(() => {
        onChangeDate(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        if (scrolledElementOnChoice?.current && initialTimeRange) {
            window.scrollTo({
                top: scrolledElementOnChoice.current.scrollHeight,
            });
        }
    }, [scrolledElementOnChoice, initialTimeRange, selectedDate, reserved]);

    return (
        <div className="booking-root">
            <div className="booking-root-date">
                <Calendar
                    initialDate={activeDate}
                    allowDatesToBook={allowDatesToBook}
                    reserved={notAllowDatesToBook}
                    onChangeDate={(date) => setSelectedDate(date)}
                    onOverbook={onOverBook}
                ></Calendar>
            </div>
            <div className="booking-root-time">
                <div className="calendar-space-time-frame" ref={scrolledElementOnChoice}>
                    {selectedDate && (
                        <SpaceTimeFrame
                            initialSpaceTimes={initialTimeRange}
                            reserved={reserved}
                            loading={timeFrameLoading}
                            onChangeTimeStart={onChangeTimeStart}
                            onChangeTimeEnd={onChangeTimeEnd}
                            title={title}
                            content={content}
                        ></SpaceTimeFrame>
                    )}
                </div>
                <div className="my-3">
                    <p>
                        If you don't see your preferred spot, please contact us directly at our hotline 0481 32 62 69 to
                        see any cancellations or reorganizations=
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Booking;
