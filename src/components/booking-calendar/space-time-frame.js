import React from 'react';
// PropTypes
import './style/booking_time.css';
import { toast } from 'react-toastify';

//
import * as DOMPurify from 'dompurify';
import { Spinner } from 'react-bootstrap';
import { allIntersect } from '../../ultilies/intersection';
import moment from 'moment';

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

const SpaceTimeFrame = ({ initialSpaceTimes, loading, onChangeTimeStart, onChangeTimeEnd, ...contentProps }) => {
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
                {(!!loading && (
                    <div className="d-flex align-items-center justify-content-center p-5">
                        <Spinner></Spinner>
                    </div>
                )) ||
                    initialSpaceTimes.map((space, key) => {
                        const { startTime, endTime, isDisabled } = space;
                        let hasReserved = isDisabled;
                        let displayedStartTime = moment(startTime, 'hh:mm:ss').format('kk:mm');
                        let displayedEndTime = moment(endTime, 'hh:mm:ss').format('kk:mm');

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
                                    onChangeTimeStart(displayedStartTime);
                                    onChangeTimeEnd(displayedEndTime);
                                }}
                            >
                                {displayedStartTime}-{displayedEndTime}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
};

export default SpaceTimeFrame;
