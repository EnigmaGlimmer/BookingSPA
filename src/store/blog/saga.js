import { call, put, takeEvery, all, fork } from 'redux-saga/effects';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
    getSuccess,
    getError,
    postBlogSuccess,
    postBlogError,
    putBlogSuccess,
    putBlogError,
    deleteBlogSuccess,
    deleteBlogError,
} from './action';

import { DELETE_BLOG, GET_BLOG_LIST, POST_BLOG, PUT_BLOG } from './actionType';

// API
import {
    BlogOrderBy,
    BlogSearchBy,
    getBlogList as getBlogListAPI,
    postBlog as postBlogAPI,
    putBlog as updateBlogAPI,
    deleteBlog as deleteBlogAPI,
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

function* onUpdateBlog({ payload: { id, data } }) {
    try {
        const response = yield call(updateBlogAPI, id, data);
        yield put(putBlogSuccess(id, response));
        toast.success('Update Blog Success', { autoClose: 3000 });
    } catch (error) {
        yield put(putBlogError(error));
        toast.error('Update Blog Failed', { autoClose: 3000 });
    }
}

function* onDeleteBlog({ payload: { id } }) {
    try {
        yield call(deleteBlogAPI, id);
        yield put(deleteBlogSuccess(id));
        toast.success('Delete Blog Success', { autoClose: 3000 });
    } catch (error) {
        yield put(deleteBlogError(error));
        toast.error('Delete Blog Failed', { autoClose: 3000 });
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

export function* watchDeleteBlog() {
    yield takeEvery(DELETE_BLOG, onDeleteBlog);
}

function* blogsaga() {
    yield all([fork(watchGetBlogs), fork(watchPostNewBlog), fork(watchUpdateBlog), fork(watchDeleteBlog)]);
}

export default blogsaga;
