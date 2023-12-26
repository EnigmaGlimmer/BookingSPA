import React from 'react';
import { getTimeFrames } from 'api/booking';
import moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';
const BookingContext = React.createContext();

function BookingFormContainer({ children }) {
    const [timeFrames, setTimeFrames] = React.useState([]);
    const [state, setState] = React.useState({
        bookingDay: moment().format('YYYY-MM-DD'),
        serviceId: null,
        duration: 0,
    });

    const [startWorkingTime, setStartWorkingTime] = React.useState('8:00');
    const [endWorkingTime, setEndWorkingTime] = React.useState('18:00');
    const [loading, setLoading] = React.useState(false);

    const controller = new AbortController();

    React.useEffect(() => {
        if (state.bookingDay && state.serviceId) {
            setLoading(true);

            const signal = controller.signal;

            getTimeFrames(
                { bookingDay: state.bookingDay, serviceId: state.serviceId, startWorkingTime, endWorkingTime },
                {
                    signal,
                },
            )
                .then((response) => {
                    setTimeFrames(response);
                })
                .catch((error) => {
                    if (error !== 'Cancelled') {
                        toast.error('Failed to get time frames');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        return () => {
            controller.abort();
        };
    }, [state.bookingDay, state.serviceId]);

    function handleChange(bookingDay, serviceId, duration) {
        setState((i) => ({ ...i, bookingDay, serviceId, duration }));
    }

    let values = {
        ...state,
        timeFrames,
        loading,
        handleChange,
    };

    return <BookingContext.Provider value={values}>{children}</BookingContext.Provider>;
}

export function useBookingFormContext() {
    return React.useContext(BookingContext);
}
export default BookingFormContainer;
