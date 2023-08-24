import { call, put, takeEvery, fork } from 'redux-saga/effects';

import { getTestimonials, postTestimonial } from '../../api';

import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_TESTIMONIAL_LIST,
    POST_TESTIMONIAL,
    PUT_TESTIMONIAL,
} from './actionType';

import { getTestimonialListSuccess, getTestimonialListFailed } from './action';
import { all } from 'axios';

function* onGetTestimonialList({ skip = 0, take = 10 }) {
    try {
        const response = yield call(getTestimonials, {
            skip: 0,
            take: 10,
        });
        yield put(getTestimonialListSuccess(GET_TESTIMONIAL_LIST, response));
    } catch (error) {
        yield put(getTestimonialListFailed(GET_TESTIMONIAL_LIST, error));
    }
}

function* onPostTestimonal({ payload: newData }) {
    try {
        const response = yield call(postTestimonial, newData);
        yield put(postTestimonial());
    } catch (error) {}
}

function* onPutTestimonial({ payload: updatedData }) {
    try {
    } catch (error) {}
}

function onDeleteTestimonial({ payload: { data, id } }) {}

function* watchGetTestimonialList() {
    yield takeEvery(GET_TESTIMONIAL_LIST, onGetTestimonialList);
}

function* watchPostTestimonal({ payload: testimonial }) {
    yield takeEvery(POST_TESTIMONIAL, onPostTestimonal);
}

function* watchPutTestimonial({ payload: testimonial, id }) {
    yield takeEvery(PUT_TESTIMONIAL);
}

export default function* testimonialsaga() {
    yield all([fork(watchGetTestimonialList)]);
}
