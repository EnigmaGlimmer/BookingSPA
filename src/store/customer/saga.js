import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import {
    getSuccess,
    getError,
    postCustomerSuccess,
    postCustomerError,
    putCustomerSuccess,
    putCustomerError,
} from './action';

import { GET_CUSTOMER, POST_CUSTOMER, PUT_CUSTOMER } from './actionType';

// API
import {
    getCustomer as getCustomerAPI,
    postCustomer as postCustomerAPI,
    updateCustomer as updateCustomerAPI,
} from '../../api';

function* getCustomer() {
    try {
        const response = yield call(getCustomerAPI);
        yield put(getSuccess(GET_CUSTOMER, response?.result || []));
    } catch (error) {
        yield put(getError(GET_CUSTOMER, error));
    }
}

function* onAddNewCustomer({ payload: newCustomer }) {
    try {
        const response = yield call(postCustomerAPI, newCustomer);
        yield put(postCustomerSuccess(response));
        toast.success('Customer Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postCustomerError(error));
        toast.error('Customer Added Failed', {
            autoClose: 3000,
        });
    }
}

function* onUpdateCustomer({ payload: updatedCustomer }) {
    try {
        const response = yield call(updateCustomerAPI, updatedCustomer);
        yield put(putCustomerSuccess(response?.result));
    } catch (error) {
        yield put(putCustomerError(error));
    }
}

export function* watchGetCustomer() {
    yield takeEvery(GET_CUSTOMER, getCustomer);
}

export function* watchPostNewCustomer() {
    yield takeEvery(POST_CUSTOMER, onAddNewCustomer);
}

export function* watchUpdateCustomer() {
    yield takeEvery(PUT_CUSTOMER, onUpdateCustomer);
}

function* CustomerSaga() {
    yield all([fork(watchGetCustomer), fork(watchPostNewCustomer), fork(watchUpdateCustomer)]);
}

export default CustomerSaga;
