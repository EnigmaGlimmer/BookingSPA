import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import {
    getAssetListSuccess,
    getAssetListFailed,
    deleteAssetSuccess,
    deleteAssetFailed,
    postAssetSuccess,
    postAssetFailed,
} from './action';

import { GET_ASSET_LIST, POST_ASSET, DELETE_ASSET } from './actionType';

// API
import { getAssets, postAsset, deleteAsset } from '../../api';

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

function* onAddNewAsset({ payload: { asset: newAsset, config } }) {
    console.log(newAsset, config);
    try {
        const response = yield call(
            postAsset,
            {
                file: newAsset,
            },
            config,
        );
        yield put(postAssetSuccess(response));
    } catch (error) {
        yield put(postAssetFailed(error));
    }
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

export function* watchDeleteAsset() {
    yield takeEvery(DELETE_ASSET, onDeleteAsset);
}

function* uploadsaga() {
    yield all([fork(watchGetAssets), fork(watchPostNewAsset), fork(watchDeleteAsset)]);
}

export default uploadsaga;
