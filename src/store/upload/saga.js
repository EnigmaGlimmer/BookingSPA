import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import {
    getAssetListSuccess,
    getAssetListFailed,
    getAssetSuccess,
    getAssetFailed,
    putAssetSuccess,
    putAssetFailed,
    deleteAssetSuccess,
    deleteAssetFailed,
    postAssetSuccess,
    postAssetFailed,
} from './action';

import {
    GET_ASSET_LIST,
    GET_ASSET_SUCCESS,
    GET_ASSET_FAILED,
    POST_ASSET,
    POST_ASSET_SUCCESS,
    PUT_ASSET,
    POST_ASSET_FAILED,
    DELETE_ASSET,
} from './actionType';

// API
import { getAssets, postAsset, putAsset, deleteAsset } from '../../api';

function* onGetAssets({ payload }) {
    try {
        const response = yield call(getAssets, payload);

        yield put(
            getAssetListSuccess(GET_ASSET_LIST, {
                data: response?.list || response || [],
                total: response?.total || 0,
            }),
        );
    } catch (error) {
        yield put(getAssetListFailed(GET_ASSET_LIST, error));
    }
}

// function* onGetAsset({ payload: id }) {
//     try {
//         const response = yield call(getAsset, id);
//         yield put(getAssetSuccess());
//     } catch (error) {
//         yield put(getAssetFailed(error));
//     }
// }

function* onAddNewAsset({ payload: newAsset }) {
    try {
        const response = yield call(postAsset, {
            file: newAsset,
        });
        yield put(postAssetSuccess(response));
    } catch (error) {
        yield put(postAssetFailed(error));
    }
}

function* onUpdateAsset({ payload: updatedAsset }) {
    // try {
    //     const response = yield call(putAsset);
    //     yield put(putAssetSuccess(updatedAsset));
    // } catch (error) {
    //     yield put(putAssetFailed(error));
    // }
}

function* onDeleteAsset({ payload: { id } }) {
    try {
        yield call(deleteAsset, id);
        yield put(deleteAssetSuccess(id));
        toast.success(`Deleted asset #${id}`, {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(deleteAssetFailed(error));
        toast.error(`Failed to delete asset #${id}`, {
            autoClose: 3000,
        });
    }
}

export function* watchGetAssets() {
    yield takeEvery(GET_ASSET_LIST, onGetAssets);
}

export function* watchPostNewAsset() {
    yield takeEvery(POST_ASSET, onAddNewAsset);
}

export function* watchUpdateAsset() {
    yield takeEvery(PUT_ASSET, onUpdateAsset);
}

export function* watchDeleteAsset() {
    yield takeEvery(DELETE_ASSET, onDeleteAsset);
}

function* uploadsaga() {
    yield all([fork(watchGetAssets), fork(watchPostNewAsset), fork(watchUpdateAsset), fork(watchDeleteAsset)]);
}

export default uploadsaga;
