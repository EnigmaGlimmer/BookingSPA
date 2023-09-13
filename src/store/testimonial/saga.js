import { call, put, takeEvery, fork } from 'redux-saga/effects';

import { getTestimonials as getTestimonialListAPI, postTestimonial as postTestimonialAPI } from '../../api';

import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_TESTIMONIAL_LIST,
    POST_TESTIMONIAL,
    PUT_TESTIMONIAL,
} from './actionType';

import {
    getTestimonialListSuccess,
    getTestimonialListFailed,
    postNewTestimonialSuccess,
    postNewTestimonialFailed,
} from './action';
import { all } from 'axios';

function* onGetTestimonialList() {
    try {
        const response = yield call(getTestimonialListAPI);

        yield put(getTestimonialListSuccess(GET_TESTIMONIAL_LIST, response));
    } catch (error) {
        yield put(getTestimonialListFailed(GET_TESTIMONIAL_LIST, error));
    }
}

function* onPostTestimonal({ payload: newData }) {
    try {
        const response = yield call(postTestimonialAPI, newData);
        console.log(response);
        yield put(postNewTestimonialSuccess(response));
    } catch (error) {
        yield put(postNewTestimonialFailed(error));
    }
}

function* onPutTestimonial({ payload: updatedData }) {
    try {
    } catch (error) {}
}

function onDeleteTestimonial({ payload: { data, id } }) {}

function* watchGetTestimonialList() {
    yield takeEvery(GET_TESTIMONIAL_LIST, onGetTestimonialList);
}

function* watchPostTestimonal() {
    yield takeEvery(POST_TESTIMONIAL, onPostTestimonal);
}

function* watchPutTestimonial() {
    yield takeEvery(PUT_TESTIMONIAL, onPutTestimonial);
}

export default function* testimonialsaga() {
    yield all([fork(watchGetTestimonialList), fork(watchPostTestimonal)]);
}
