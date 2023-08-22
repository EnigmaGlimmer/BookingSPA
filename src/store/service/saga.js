import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
    getSuccess,
    getError,
    postServiceSuccess,
    postServiceError,
    putServiceSuccess,
    putServiceError,
} from './action';

import { GET_SERVICE, POST_SERVICE, PUT_SERVICE } from './actionType';

// API
import {
    getService as getServiceAPI,
    postService as postServiceAPI,
    updateService as updateServiceAPI,
} from '../../api';

function* getService() {
    try {
        const response = yield call(getServiceAPI);
        yield put(getSuccess(GET_SERVICE, response?.result || []));
    } catch (error) {
        yield put(getError(GET_SERVICE, error));
    }
}

function* onAddNewService({ payload: newService }) {
    try {
        const response = yield call(postServiceAPI, newService);
        yield put(postServiceSuccess(response?.result));
        toast.success('Service Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postServiceError(error));
        toast.error('Service Added Failed', {
            autoClose: 3000,
        });
    }
}

function* onUpdateService({ payload: updatedService }) {
    try {
        const response = yield call(updateServiceAPI, updatedService);
        yield put(putServiceSuccess(response?.result));
    } catch (error) {
        yield put(putServiceError(error));
    }
}

export function* watchGetService() {
    yield takeEvery(GET_SERVICE, getService);
}

export function* watchPostNewService() {
    yield takeEvery(POST_SERVICE, onAddNewService);
}

export function* watchUpdateService() {
    yield takeEvery(PUT_SERVICE, onUpdateService);
}

function* servicesaga() {
    yield all([fork(watchGetService), fork(watchPostNewService), fork(watchUpdateService)]);
}

export default servicesaga;
