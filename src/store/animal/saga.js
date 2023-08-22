import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getSuccess, getError } from './action';

import { GET_ANIMAL_LIST, API_RESPONSE_SUCCESS, API_RESPONSE_ERROR } from './actionType';

// API
import { getAnimalList } from '../../api/animal';

function* getBlogs() {
    try {
        const response = yield call(getAnimalList);
        console.log(response);
        yield put(getSuccess(GET_ANIMAL_LIST, response || []));
    } catch (error) {
        yield put(getError(GET_ANIMAL_LIST, error));
    }
}

export function* watchGetBlogs() {
    yield takeEvery(GET_ANIMAL_LIST, getBlogs);
}

function* animalsaga() {
    yield all([fork(watchGetBlogs)]);
}

export default animalsaga;
