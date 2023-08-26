import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
    getSuccess,
    getError,
    postBookingSuccess,
    postBookingError,
    putBookingSuccess,
    putBookingError,
} from './action';

import { GET_BOOKING, POST_BOOKING, PUT_BOOKING } from './actionType';

// API
import {
    getBooking as getBookingAPI,
    postBooking as postBookingAPI,
    updateBooking as updateBookingAPI,
} from '../../api';

function* getBooking() {
    try {
        const response = yield call(getBookingAPI);
        yield put(getSuccess(GET_BOOKING, response?.result || []));
    } catch (error) {
        yield put(getError(GET_BOOKING, error));
    }
}

function* onAddNewBooking({ payload: newBooking }) {
    try {
        const response = yield call(postBookingAPI, newBooking);
        yield put(postBookingSuccess(response));
        toast.success('Booking Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postBookingError(error));
        toast.error('Booking Added Failed', {
            autoClose: 3000,
        });
    }
}

function* onUpdateBooking({ payload: updatedBooking }) {
    try {
        const response = yield call(updateBookingAPI, updatedBooking);
        yield put(putBookingSuccess(response?.result));
    } catch (error) {
        yield put(putBookingError(error));
    }
}

export function* watchGetBooking() {
    yield takeEvery(GET_BOOKING, getBooking);
}

export function* watchPostNewBooking() {
    yield takeEvery(POST_BOOKING, onAddNewBooking);
}

export function* watchUpdateBooking() {
    yield takeEvery(PUT_BOOKING, onUpdateBooking);
}

function* bookingsaga() {
    yield all([fork(watchGetBooking), fork(watchPostNewBooking), fork(watchUpdateBooking)]);
}

export default bookingsaga;
