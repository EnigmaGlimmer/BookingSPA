import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import {
    getAssetSuccess,
    getAssetFailed,
    putAssetSuccess,
    putAssetFailed,
    deleteAssetSuccess,
    deleteAssetFailed,
} from './action';

import { GET_ASSET_LIST, POST_ASSET, POST_ASSET_SUCCESS, PUT_ASSET } from './actionType';

// API
import {} from '../../api';

function* getAssets() {
    try {
        const response = yield call();
    } catch (error) {}
}

function* onAddNewAsset({ payload: newAsset }) {
    try {
        const response = yield call();
        yield put(getAssetSuccess(GET_ASSET_LIST, response?.result));
    } catch (error) {
        yield put(getAssetFailed(GET_ASSET_LIST, error));
    }
}

function* onUpdateAsset({ payload: updatedAsset }) {
    try {
        const response = yield call();
        yield put(putAssetSuccess(updatedAsset));
    } catch (error) {
        yield put(putAssetFailed(error));
    }
}

function* onDeleteAsset({ payload: deletedAsset }) {
    try {
        const response = yield call();
        yield put(deleteAssetSuccess(deletedAsset));
    } catch (error) {
        yield put(deleteAssetFailed(deletedAsset));
    }
}

export function* watchGetAssets() {
    yield takeEvery(GET_ASSET_LIST, getAssets);
}

export function* watchPostNewAsset() {
    yield takeEvery(POST_ASSET, onAddNewAsset);
}

export function* watchUpdateAsset() {
    yield takeEvery(PUT_ASSET, onUpdateAsset);
}

export function* watchDeleteAsset() {
    yield takeEvery(PUT_ASSET, onDeleteAsset);
}

function* uploadsaga() {
    yield all([fork(watchGetAssets), fork(watchPostNewAsset), fork(watchUpdateAsset), fork(watchDeleteAsset)]);
}

export default uploadsaga;
