import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_BOOKING,
    POST_BOOKING,
    POST_BOOKING_SUCCESS,
    POST_BOOKING_FAILED,
    PUT_BOOKING,
    PUT_BOOKING_SUCCESS,
    PUT_BOOKING_FAILED,
    DELETE_BOOKING,
    DELETE_BOOKING_SUCCESS,
    DELETE_BOOKING_FAILED,
    DELETE_MANY_BOOKING,
    DELETE_MANY_BOOKING_SUCCESS,
    DELETE_MANY_BOOKING_FAILED,
} from './actionType';

const INIT_STATE = {
    bookings: [],
    new: null,
    total: 0,
    error: null,
    loading: false,
};

const Booking = (state = INIT_STATE, action) => {
    let newBookings;
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_BOOKING:
                    return {
                        ...state,
                        bookings: action.payload.data.list,
                        total: action.payload.data.total,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_BOOKING:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return state;
            }
        case POST_BOOKING_SUCCESS:
            return {
                ...state,
                new: action.payload.result,
                bookings: action.payload.data,
            };
        case POST_BOOKING_FAILED:
            return {
                ...state,
                errors: action.payload.error,
            };
        case POST_BOOKING:
            return {
                ...state,
                bookings: action.payload.error,
            };

        case PUT_BOOKING_SUCCESS:
            return {
                ...state,
                bookings: state.bookings.map((item) =>
                    item.bookingId === action.payload.data?.bookingId ? { ...item, ...action.payload.data } : item,
                ),
            };
        case PUT_BOOKING_FAILED:
            return {
                ...state,
                bookings: action.payload.error,
            };

        case DELETE_BOOKING_SUCCESS:
            newBookings = state.bookings.filter((item) => item.bookingId !== action.payload.id);

            return {
                ...state,
                bookings: newBookings,
            };
        case DELETE_BOOKING_FAILED:
            return {
                error: action.payload.error,
            };

        case DELETE_MANY_BOOKING_SUCCESS:
            let deleteIds = action.payload;
            newBookings = state.bookings.filter((item) => deleteIds.includes(item.bookingId));
            return {
                ...state,
                bookings: newBookings,
            };
        case DELETE_MANY_BOOKING_FAILED:
            return { state, error: action.payload };

        default:
            return state;
    }
};

export default Booking;
