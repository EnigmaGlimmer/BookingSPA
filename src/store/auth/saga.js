import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getSuccess, getError, putAssignSuccess, putAssignError } from './action';

import { GET_ASSIGN, PUT_ASSIGN } from './actionType';

// API
import { getAssign as getAssignAPI, updateAssign as updateAssignAPI } from '../../api';

function* getAssign() {
    try {
        const response = yield call(getAssignAPI);
        yield put(getSuccess(GET_ASSIGN, response?.result || []));
    } catch (error) {
        yield put(getError(GET_ASSIGN, error));
    }
}

function* onUpdateAssign({ payload: updatedAssign }) {
    try {
        const response = yield call(updateAssignAPI, updatedAssign);
        yield put(putAssignSuccess(response?.result));
    } catch (error) {
        yield put(putAssignError(error));
    }
}

export function* watchGetAssign() {
    yield takeEvery(GET_ASSIGN, getAssign);
}

export function* watchUpdateAssign() {
    yield takeEvery(PUT_ASSIGN, onUpdateAssign);
}

function* assignsaga() {
    yield all([fork(watchGetAssign), fork(watchUpdateAssign)]);
}

export default assignsaga;
