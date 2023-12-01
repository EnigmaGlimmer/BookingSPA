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
    deleteManyBookingsSuccess,
    deleteManyBookingsFailed,
} from './action';

import { DELETE_MANY_BOOKING, GET_BOOKING, POST_BOOKING, PUT_BOOKING } from './actionType';

// API
import {
    getBookingList as getBookingListAPI,
    postBooking as postBookingAPI,
    putBooking as updateBookingAPI,
    deleteBooking as deleteBookingAPI,
} from '../../api';

function* getBookings({ payload: request }) {
    try {
        const response = yield call(getBookingListAPI, {
            skip: 0,
            take: 60,
            orderBy: 'CheckinDate',
            searchBy: 'None',
            ...request,
        });

        yield put(
            getBookingSuccess(GET_BOOKING, {
                list: Array.isArray(response?.list) ? response?.list : [],
                total: response.total,
            }),
        );
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

function* onUpdateBooking({ payload: { id, data: updatedBooking } }) {
    try {
        const response = yield call(updateBookingAPI, id, updatedBooking);
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
function* onDeleteManyBooking({ payload: deleteIds = [] }) {
    try {
        // const promiseAll = Promise.all(deleteIds.map((id) => deleteBookingAPI(id)));
        // yield call(promiseAll);
        toast.success(`Deleted ${deleteIds.length} items success`);
        yield put(deleteManyBookingsSuccess(deleteIds));
    } catch (error) {
        toast.error('Delete failed');
        yield put(deleteManyBookingsFailed('Delete failed'));
    }
}

// Watcher
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

export function* watchDeleteManyBookings() {
    yield takeEvery(DELETE_MANY_BOOKING, onDeleteManyBooking);
}
function* bookingsaga() {
    yield all([
        fork(watchGetBooking),
        fork(watchPostNewBooking),
        fork(watchUpdateBooking),
        fork(watchDeleteBooking),
        fork(watchDeleteManyBookings),
    ]);
}

export default bookingsaga;
