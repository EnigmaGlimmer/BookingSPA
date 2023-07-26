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

const reserved = [
    {
        startDate: new Date(2030, 3, 22),
        endDate: new Date(2016, 4, 5),
    },
];

function ReactBookingCalendar({ activeDate }) {
    const [selectedDates, setSelectedDates] = useState([]);

    return (
        <>
            <div>Day 1</div>
            <div>Day 2</div>
            <SpaceTimeFrame></SpaceTimeFrame>
        </>
    );
}

ReactBookingCalendar.propTypes = {
    activeDate: PropTypes.objectOf(Date).isRequired,
};

export default ReactBookingCalendar;
