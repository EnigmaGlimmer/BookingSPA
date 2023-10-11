import React from 'react';
// PropTypes
import './style/booking_time.css';
import { toast } from 'react-toastify';

//
import * as DOMPurify from 'dompurify';

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
                {initialSpaceTimes.map((space, key) => {
                    const hasReserved = reserved.some(({ startTime, endTime, isAllowed }) => {
                        const start = space[0];
                        const end = space[1];

                        let [totalStartSpaceUnit, totalEndSpaceUnit] = [
                            equalifyUnit({ timeString: start }),
                            equalifyUnit({ timeString: end }),
                        ];
                        let [totalStartReservedUnit, totalEndReservedUnit] = [
                            equalifyUnit({ timeString: startTime }),
                            equalifyUnit({ timeString: endTime }),
                        ];

                        return (
                            ((totalStartReservedUnit >= totalStartSpaceUnit &&
                                totalStartReservedUnit < totalEndSpaceUnit) ||
                                (totalEndReservedUnit > totalStartSpaceUnit &&
                                    totalEndReservedUnit <= totalEndSpaceUnit)) &&
                            !isAllowed
                        );
                    });

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
                            {start}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default SpaceTimeFrame;
