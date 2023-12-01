import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getCategorySuccess, getCategoryError, postCategorySuccess, postCategoryError } from './action';

import { GET_CATEGORY_LIST, POST_CATEGORY } from './actionType';

// API
import { getCategoryList as getCategoryListAPI, postCategory as postCategoryAPI } from '../../api';

function* getCategoryList() {
    try {
        const response = yield call(getCategoryListAPI, {
            skip: 0,
            take: 10,
        });
        yield put(getCategorySuccess(GET_CATEGORY_LIST, response || []));
    } catch (error) {
        yield put(getCategoryError(GET_CATEGORY_LIST, error));
    }
}

function* onAddNewCategory({ payload: { parentId, createdDate, categoryName, price, promotion } }) {
    try {
        const response = yield call(postCategoryAPI, {
            parentId,
            createdDate,
            categoryName,
            price,
            promotion,
        });

        yield put(postCategorySuccess(response));
        toast.success('Category Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postCategoryError(error));
        toast.error('Category Added Failed', {
            autoClose: 3000,
        });
    }
}

export function* watchGetCategory() {
    yield takeEvery(GET_CATEGORY_LIST, getCategoryList);
}

export function* watchPostNewCategory() {
    yield takeEvery(POST_CATEGORY, onAddNewCategory);
}

function* categorysaga() {
    yield all([fork(watchGetCategory), fork(watchPostNewCategory)]);
}

export default categorysaga;
