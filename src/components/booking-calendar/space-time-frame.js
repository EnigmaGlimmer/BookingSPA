import React from 'react';
// PropTypes
import './style/booking_time.css';
import { toast } from 'react-toastify';

const SpaceTimeFrame = ({
    initialSpaceTimes = [
        ['1:00pm', '2:00pm'],
        ['3:00pm', '4:00pm'],
        ['5:00pm', '6:00pm'],
    ],
    reserved = [
        {
            startTime: '1:00pm',
            endTime: '2:00pm',
            isAllowed: true,
        },
    ],
    onChangeTimeStart,
    onChangeTimeEnd,
}) => {
    const [selected, setSelected] = React.useState(null);

    return (
        <div className="space-time">
            <h4 className="space-time-title">Choice Time</h4>
            <div className="space-time-info">
                <p>Choose your service hours on the</p>
                <div className="space-time-date"></div>
            </div>
            <div className="space-time-content">
                {initialSpaceTimes.map((space, key) => {
                    const hasReserved = reserved.some(({ startTime, endTime, isAllowed }) => {
                        const start = space[0];
                        const end = space[1];

                        return start === startTime && endTime === end && !isAllowed;
                    });

                    return (
                        <span
                            className="space-time-button"
                            data-selected={selected === key}
                            data-active={hasReserved}
                            key={key}
                            onClick={() => {
                                if (hasReserved) {
                                    toast.error('This has been reserved', {
                                        autoClose: 3000,
                                    });
                                    return;
                                }

                                setSelected(key);

                                let startTime = space[0];

                                onChangeTimeStart(startTime);

                                let endTime = space[1];

                                onChangeTimeEnd(endTime);
                            }}
                        >
                            {space.join(' - ')}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default SpaceTimeFrame;
