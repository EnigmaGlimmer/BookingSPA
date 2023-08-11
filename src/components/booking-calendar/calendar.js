import { useState } from 'react';
// PropTypes
import PropTypes from 'prop-types';

// React Booking Calendar
import { Calendar } from '@demark-pro/react-booking-calendar';

// Custom
import { DayCellFooter } from './day-cell-footer';

// Space Time Frame
import SpaceTimeFrame from './space-time-frame';

// Css
import './style/booking.css';

// let reserved = [
//     {
//         startDate: new Date(),
//         endDate: new Date(2023, 12, 5),
//     },
// ];
function ReactBookingCalendar({ initialDate = new Date(), reserved = [], onChangeDate }) {
    const [selectedDates, setSelectedDates] = useState([]);

    return (
        <section>
            {/* <h2>Calendar</h2> */}
            <Calendar
                className='booking-root'
                selected={selectedDates}
                onChange={(value) => {
                    console.log(value);
                    setSelectedDates(value);
                }}
                onOverbook={(e, error) => {
                    console.log(e);
                    console.log(error);
                }}
                components={{
                    CalendarContainer: ({ innerProps, children }) => {
                        return (
                            <div
                                {...innerProps}
                            >
                                {children}
                            </div>
                        );
                    },
                }}
                // disabled={(date, state) => {
                //     console.log(date);
                //     console.log(state);
                //     return !state.isPast;
                // }}
                reserved={reserved}
                variant="booking"
                dateFnsOptions={{ weekStartsOn: 1 }}
                // range={true}
            ></Calendar>
        </section>
    );
}

ReactBookingCalendar.propTypes = {
    initialDate: PropTypes.objectOf(Date),
    reserved: PropTypes.arrayOf(
        PropTypes.shape({
            startDate: PropTypes.objectOf(Date).isRequired,
            endDate: PropTypes.objectOf(Date).isRequired,
        }),
    ),
    onChangeDate: PropTypes.func.isRequired,
};

export default ReactBookingCalendar;
