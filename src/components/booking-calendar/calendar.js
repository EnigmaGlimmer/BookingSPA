import { useState } from 'react';
// PropTypes
import PropTypes from 'prop-types';

// React Booking Calendar
import { Calendar } from '@demark-pro/react-booking-calendar';
import {
    ScheduleComponent,
    Inject,
    Day,
    Week,
    Month,
    WorkWeek,
    MonthAgenda,
    Agenda,
} from '@syncfusion/ej2-react-schedule';
import '@syncfusion/ej2-react-schedule/styles/bootstrap-dark.css';

// Custom
import { DayCellFooter } from './day-cell-footer';

// Space Time Frame
import SpaceTimeFrame from './space-time-frame';

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
            <h2>Calendar</h2>

            <Calendar
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
                                style={{
                                    width: '680px',
                                }}
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
                range={true}
            ></Calendar>
        </section>
    );
}

ReactBookingCalendar.propTypes = {
    initialDate: PropTypes.objectOf(Date),
    activeDate: PropTypes.objectOf(Date).isRequired,
    reserved: PropTypes.arrayOf(
        PropTypes.shape({
            startDate: PropTypes.objectOf(Date).isRequired,
            endDate: PropTypes.objectOf(Date).isRequired,
        }),
    ),
    onChangeDate: PropTypes.func.isRequired,
};

export default ReactBookingCalendar;
