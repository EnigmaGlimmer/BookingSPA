// import { useEffect, useState } from 'react';
// PropTypes
// import PropTypes from 'prop-types';

// React Booking Calendar
import { Calendar } from '@demark-pro/react-booking-calendar';

// Custom
// import { DayCellFooter } from './day-cell-footer';

// Space Time Frame
// import SpaceTimeFrame from './space-time-frame';

// Css
import './style/booking.css';
import moment from 'moment';

function ReactBookingCalendar({
    initialDate = new Date(),
    allowDatesToBook = [],
    reserved = [],
    onChangeDate,
    onOverbook,
}) {
    return (
        <section className="calendar-root">
            <div className="calendar-frame">
                <Calendar
                    selected={[initialDate]}
                    onChange={(value) => {
                        const date = value[0];

                        onChangeDate(date);
                    }}
                    onOverbook={(e, error) => {
                        onOverbook();
                    }}
                    components={{
                        CalendarContainer: ({ innerProps, children }) => {
                            return <div {...innerProps}>{children}</div>;
                        },
                    }}
                    disabled={(date) => {
                        return (
                            moment(date).get('weekday') === 0 &&
                            !allowDatesToBook.some((allowDate) => moment(allowDate).isSame(date))
                        );
                    }}
                    reserved={reserved}
                    variant="booking"
                    dateFnsOptions={{ weekStartsOn: 1 }}
                    range={false}
                ></Calendar>
            </div>
        </section>
    );
}

// ReactBookingCalendar.propTypes = {
//     initialDate: PropTypes.objectOf(Date),
//     reserved: PropTypes.arrayOf(
//         PropTypes.shape({
//             startDate: PropTypes.objectOf(Date).isRequired,
//             endDate: PropTypes.objectOf(Date).isRequired,
//         }),
//     ),
//     onChangeDate: PropTypes.func.isRequired,
// };

export default ReactBookingCalendar;
