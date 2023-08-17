import React from 'react';
// PropTypes
import PropTypes from 'prop-types';
import './style/booking_time.css';

const SpaceTimeFrame = ({
    reserved = [
        ['1:00pm', '2:00pm'],
        ['4:00pm', '5:00pm'],
    ],
    onChangeTimeStart,
    onChangeTimeEnd,
}) => {
    const spaces = [
        ['1:00pm', '2:00pm'],
        ['3:00pm', '4:00pm'],
        ['5:00pm', '6:00pm'],
    ];

    return (
        <div className='space-time'>
            <h4 className='space-time-title'>Choice Time</h4>
            <div className='space-time-info'>
                <p>Choose your service hours on the</p>
                <div className='space-time-date'>30th July</div>
            </div>
            <div className='space-time-content'>
                {spaces.map((space, key) => {
                    return (
                        <button
                            className='space-time-button'
                            key={key}
                            onClick={() => {
                                let startTime = space[0];

                                onChangeTimeStart(startTime);

                                let endTime = space[1];

                                onChangeTimeEnd(endTime);
                            }}
                        >
                            {space.join(' - ')}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

SpaceTimeFrame.propTypes = {
    // reserved: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.string.isRequired)),
};

export default SpaceTimeFrame;
