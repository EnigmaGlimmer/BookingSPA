import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { getSuccess, getError, postBlogSuccess, postBlogError, putBlogSuccess, putBlogError } from './action';

import { GET_BLOG_LIST, POST_BLOG, PUT_BLOG } from './actionType';

// API
import {
    BlogOrderBy,
    BlogSearchBy,
    getBlogList as getBlogListAPI,
    postBlog as postBlogAPI,
    updateBlog as updateBlogAPI,
} from '../../api';

function* getBlogs({ payload }) {
    try {
        const response = yield call(getBlogListAPI, payload);

        yield put(getSuccess(GET_BLOG_LIST, { data: response?.list || [], total: response?.total || 0 }));
    } catch (error) {
        yield put(getError(GET_BLOG_LIST, error));
    }
}

function* onAddNewBlog({ payload: newBlog }) {
    try {
        const response = yield call(postBlogAPI, newBlog);

        yield put(postBlogSuccess(response));

        toast.success('Blog Added Successfully', {
            autoClose: 3000,
        });
    } catch (error) {
        yield put(postBlogError(error));
        toast.error('Blog Added Failed', {
            autoClose: 3000,
        });
    }
}

function* onUpdateBlog({ payload: updatedBlog }) {
    try {
        const response = yield call(updateBlogAPI, updatedBlog);
        yield put(putBlogSuccess(response?.result));
    } catch (error) {
        yield put(putBlogError(error));
    }
}

export function* watchGetBlogs() {
    yield takeEvery(GET_BLOG_LIST, getBlogs);
}

export function* watchPostNewBlog() {
    yield takeEvery(POST_BLOG, onAddNewBlog);
}

export function* watchUpdateBlog() {
    yield takeEvery(PUT_BLOG, onUpdateBlog);
}

function* blogsaga() {
    yield all([fork(watchGetBlogs), fork(watchPostNewBlog), fork(watchUpdateBlog)]);
}

export default blogsaga;
