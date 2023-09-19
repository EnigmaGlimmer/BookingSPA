import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
    getBookingSuccess,
    getBookingError,
    postBookingSuccess,
    postBookingError,
    putBookingSuccess,
    putBookingError,
    deleteBookingSuccess,
    deleteBookingError,
} from './action';

import { GET_BOOKING, POST_BOOKING, PUT_BOOKING } from './actionType';

// API
import {
    getBookingList as getBookingListAPI,
    postBooking as postBookingAPI,
    updateBooking as updateBookingAPI,
    deleteBooking as deleteBookingAPI,
} from '../../api';

function* getBookings() {
    try {
        const response = yield call(getBookingListAPI, {
            skip: 0,
            take: 60,
            orderBy: 'CheckinDate',
            searchBy: 'None',
        });
        yield put(getBookingSuccess(GET_BOOKING, Array.isArray(response?.list) ? response?.list : []));
    } catch (error) {
        yield put(getBookingError(GET_BOOKING, error));
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
function* onDeleteBooking({ payload: { id } }) {
    try {
        yield call(deleteBookingAPI, id);
        yield put(deleteBookingSuccess(id));
    } catch (error) {
        yield put(deleteBookingError(error));
    }
}
export function* watchGetBooking() {
    yield takeEvery(GET_BOOKING, getBookings);
}

export function* watchPostNewBooking() {
    yield takeEvery(POST_BOOKING, onAddNewBooking);
}

export function* watchUpdateBooking() {
    yield takeEvery(PUT_BOOKING, onUpdateBooking);
}

export function* watchDeleteBooking() {
    yield takeEvery(PUT_BOOKING, onDeleteBooking);
}

function* bookingsaga() {
    yield all([fork(watchGetBooking), fork(watchPostNewBooking), fork(watchUpdateBooking), fork(watchDeleteBooking)]);
}

export default bookingsaga;
