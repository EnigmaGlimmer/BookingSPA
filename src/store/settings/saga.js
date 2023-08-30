import { call, put, takeEvery, all, fork, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getSettingSuccess, getSettingError, postSettingSuccess, postSettingError } from './action';

import { GET_SETTING_LIST, POST_SETTING } from './actionType';

// API
import { getSetting as getSettingListAPI, postSetting as postSettingAPI } from '../../api';

function* getSetting({ payload: { page } }) {
    console.log(page);
    try {
        const response = JSON.parse(
            yield call(getSettingListAPI, {
                page,
            }),
        );

        console.log(response);

        yield put(getSettingSuccess(GET_SETTING_LIST, page, response));
    } catch (error) {
        yield put(getSettingError(GET_SETTING_LIST, error));
    }
}

function* onAddNewSetting(body, page) {
    try {
        const response = yield call(postSettingAPI, {
            body: JSON.stringify(body),
            page,
        });

        yield put(postSettingSuccess(response));
        toast.success('Setting Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postSettingError(error));
        toast.error('Setting Added Failed', {
            autoClose: 3000,
        });
    }
}

export function* watchGetSetting() {
    yield takeEvery(GET_SETTING_LIST, getSetting);
}

export function* watchSettingTest() {
    yield takeEvery(GET_SETTING_LIST, () => {
        console.log('watch setting testal');
    });
}

export function* watchPostNewSetting() {
    yield takeEvery(POST_SETTING, onAddNewSetting);
}

function* SettingGlobalSaga() {
    yield all([
        fork(watchGetSetting),
        // fork(watchSettingTest),
        fork(watchPostNewSetting),
    ]);
}

export default SettingGlobalSaga;
