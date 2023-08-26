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
    booking: [],
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
                        booking: action.payload.result,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_BOOKING:
                    return {
                        ...state,
                        booking: action.payload.result,
                    };

                default:
                    return state;
            }
        case POST_BOOKING_SUCCESS:
            return {
                ...state,
                new: action.payload.result,
                booking: action.payload.data,
            };
        case POST_BOOKING_FAILED:
        case POST_BOOKING:
            return {
                ...state,
                booking: action.payload.error,
            };
        case PUT_BOOKING_SUCCESS:
            return {
                ...state,
                booking: action.payload.data,
            };
        case PUT_BOOKING_FAILED:
            return {
                ...state,
                booking: action.payload.error,
            };
        default:
            return state;
    }
};

export default Booking;
