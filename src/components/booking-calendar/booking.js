import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Calendar
import { Calendar } from './calendar';

const Booking = ({ onChangeDate, onChangeTimeStart, onChangeTimeEnd }) => {
    useEffect(() => {
        setTimeout(() => {
            let date = new Date();

            onChangeDate(date);
        }, 4000);

        setTimeout(() => {
            let startTime = '11:00pm';

            onChangeTimeStart(startTime);
        }, 7000);

        setTimeout(() => {
            let endTime = '12:30pm';

            onChangeTimeEnd(endTime);
        }, 10000);

        return () => {};
    }, []);

    return <div>Booking</div>;
};

Booking.propTypes = {
    onChangeDate: PropTypes.func.isRequired,
    onChangeTimeStart: PropTypes.func.isRequired,
    onChangeTimeEnd: PropTypes.func.isRequired,
};

export default Booking;
