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
} from './actionType';

const INIT_STATE = {
    bookings: [],
    new: null,
    error: null,
    loading: false,
};

const Booking = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_BOOKING:
                    return {
                        ...state,
                        bookings: action.payload.data,
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
            return {
                ...state,
                bookings: state.bookings.filter((item) => item.bookingId !== action.payload.id),
            };
        case DELETE_BOOKING_FAILED:
            return {
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default Booking;
