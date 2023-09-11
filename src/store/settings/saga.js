import { call, put, takeEvery, all, fork, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getSettingSuccess, getSettingError, postSettingSuccess, postSettingError } from './action';

import { GET_SETTING_LIST, POST_SETTING } from './actionType';

// API
import { getSetting as getSettingListAPI, postSetting as postSettingAPI } from '../../api';
import { isString } from 'lodash';

function* getSetting({ payload: { page } }) {
    try {
        const response = JSON.parse(
            yield call(getSettingListAPI, {
                page,
            }),
        );

        yield put(getSettingSuccess(GET_SETTING_LIST, page, response));
    } catch (error) {
        yield put(getSettingError(GET_SETTING_LIST, error));
    }
}

function* onAddNewSetting({ payload: { body, page } }) {
    try {
        const response = yield call(postSettingAPI, {
            body,
            page,
        });

        yield put(postSettingSuccess({ page, data: !!response ? JSON.parse(response) : null }));

        toast.success('Setting Edited Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postSettingError(error));
        toast.error('Edit Setting Failed', {
            autoClose: 3000,
        });
    }
}

export function* watchGetSetting() {
    yield takeEvery(GET_SETTING_LIST, getSetting);
}

export function* watchPostNewSetting() {
    yield takeEvery(POST_SETTING, onAddNewSetting);
}

function* SettingGlobalSaga() {
    yield all([fork(watchGetSetting), fork(watchPostNewSetting)]);
}

export default SettingGlobalSaga;
