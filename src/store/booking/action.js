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

// 1. Get booking
export const getBookings = () => ({
    type: GET_BOOKING,
});

export const getBookingSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
    },
});

export const getBookingError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 2. Create new booking

export const postBooking = () => ({
    type: POST_BOOKING,
    payload: {},
});

export const postBookingSuccess = (data) => ({
    type: POST_BOOKING_SUCCESS,
    payload: {
        data,
    },
});

export const postBookingError = (error) => ({
    type: POST_BOOKING_FAILED,
    payload: {
        error,
    },
});

// 3. Update booking

export const putBooking = (id, data) => ({
    type: PUT_BOOKING,
    payload: {
        id,
        data,
    },
});

export const putBookingSuccess = (data) => ({
    type: PUT_BOOKING_SUCCESS,
    payload: {
        data,
    },
});

export const putBookingError = (error) => ({
    type: PUT_BOOKING_FAILED,
    payload: {
        error,
    },
});

// 4. Delete booking

export const deleteBooking = () => ({
    type: DELETE_BOOKING,
    payload: {},
});

export const deleteBookingSuccess = (id) => ({
    type: DELETE_BOOKING_SUCCESS,
    payload: {
        id,
    },
});

export const deleteBookingError = (error) => ({
    type: DELETE_BOOKING_FAILED,
    payload: {
        error,
    },
});
