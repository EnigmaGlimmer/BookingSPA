import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style/bookingCpn.css'

// Calendar
import { default as Calendar } from './calendar';

// Space Time Frame
import { default as SpaceTimeFrame } from './space-time-frame';

const Booking = ({ initialTimeRange, activeDate, onChangeDate, onChangeTimeStart, onChangeTimeEnd }) => {
    return (
        <div className='booking-root'>
            <div className='booking-root-date'>
                {/* <h2>Booking</h2> */}
                <Calendar
                    reserved={[
                        {
                            startDate: new Date(),
                            endDate: new Date(2023, 6, 31),
                        },
                    ]}
                    onChangeDate={onChangeDate}
                ></Calendar>
            </div>
            <div className='booking-root-time'>
                {!!onChangeDate && (
                <SpaceTimeFrame
                    reserved={[
                        {
                            startDate: '1:00pm',
                            endDate: '2:00pm',
                        },
                    ]}
                    onChangeTimeStart={onChangeTimeStart}
                    onChangeTimeEnd={onChangeTimeEnd}
                ></SpaceTimeFrame>
            )}
            </div>
        </div>
    );
};

export default Booking;
