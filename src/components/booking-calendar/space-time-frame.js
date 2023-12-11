import React from 'react';
// PropTypes
import './style/booking_time.css';
import { toast } from 'react-toastify';

//
import * as DOMPurify from 'dompurify';
import { Spinner } from 'react-bootstrap';
import { allIntersect } from '../../ultilies/intersection';

function equalifyUnit(args) {
    // timeString: "HH:MM"
    let { timeString = null, hour = null, minute = null } = args;
    let uniformedUnit = 0;

    if (!!timeString) {
        let timeRanges = timeString.split(':');
        hour = timeRanges[0];
        minute = timeRanges[1];
    }

    if (!!hour && !!minute) {
        uniformedUnit = Number(hour) * 60 + Number(minute);
    }

    return uniformedUnit;
}

const SpaceTimeFrame = ({
    initialSpaceTimes = [
        ['1:00pm', '2:00pm'],
        ['3:00pm', '4:00pm'],
        ['5:00pm', '6:00pm'],
    ],
    reserved = [
        {
            startTime: '13:00',
            endTime: '14:00',
            isAllowed: true,
        },
    ],
    loading,
    onChangeTimeStart,
    onChangeTimeEnd,
    ...contentProps
}) => {
    const [selected, setSelected] = React.useState(null);

    const { title, content } = contentProps;

    return (
        <div className="space-time">
            <h4 className="space-time-title">{title}</h4>
            <div className="space-time-info">
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content),
                    }}
                ></div>
                <div className="space-time-date"></div>
            </div>
            <div className="space-time-content">
                {(loading && (
                    <div className="d-flex align-items-center justify-content-center p-5">
                        <Spinner></Spinner>
                    </div>
                )) ||
                    initialSpaceTimes.map((space, key) => {
                        const hasReserved = reserved.some(
                            ({ startTime: startBookedTime, endTime: endBookedTime, isAllowed }) => {
                                const [startCalendarTime, endCalendarTime] = space;

                                let [totalStartCalendarUnit, totalEndCalendarUnit] = [
                                    equalifyUnit({ timeString: startCalendarTime }),
                                    equalifyUnit({ timeString: endCalendarTime }),
                                ];
                                let [totalStartReservedUnit, totalEndReservedUnit] = [
                                    equalifyUnit({ timeString: startBookedTime }),
                                    equalifyUnit({ timeString: endBookedTime }),
                                ];

                                let hasIntersect = allIntersect([
                                    { min: totalStartCalendarUnit, max: totalEndCalendarUnit },
                                    { min: totalStartReservedUnit, max: totalEndReservedUnit },
                                ]);

                                return hasIntersect && !isAllowed;
                            },
                        );

                        const [start] = space;

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
                                {start} - {space[1]}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
};

export default SpaceTimeFrame;
