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
            switch (action.payload.actionType) {
                case POST_BOOKING:
                    return {
                        ...state,
                        booking: action.payload.result,
                    };
                default:
                    return state;
            }
        case POST_BOOKING_FAILED:
            switch (action.payload.actionType) {
                case POST_BOOKING:
                    return {
                        ...state,
                        booking: action.payload.result,
                    };
                default:
                    return state;
            }
        case PUT_BOOKING_SUCCESS:
            switch (action.payload.actionType) {
                case PUT_BOOKING:
                    return {
                        ...state,
                        booking: action.payload.result,
                    };
                default:
                    return state;
            }
        case PUT_BOOKING_FAILED:
            switch (action.payload.actionType) {
                case PUT_BOOKING:
                    return {
                        ...state,
                        booking: action.payload.result,
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
};

export default Booking;
