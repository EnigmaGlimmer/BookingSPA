import { takeEvery, all, fork, put, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './action';
import * as api from 'api';
function* getUserList({ payload }) {
    try {
        const response = {
            list: [],
            total: 0,
        };

        yield put(
            actions.getUserListSuccess(actionTypes.GET_USER_LIST, {
                list: response?.list,
                total: response.total,
            }),
        );
    } catch (error) {
        yield put(actions.getUserListError(actionTypes.GET_USER_LIST, error));
    }
}

function* getStaffList({ payload }) {
    try {
        const response = yield call(api.getStaffList, payload);

        yield put(
            actions.getUserListSuccess(actionTypes.GET_STAFF_LIST, {
                list: response?.list,
                total: response.total,
            }),
        );
    } catch (error) {
        yield put(actions.getUserListError(actionTypes.GET_STAFF_LIST, error));
    }
}

function* onAddNewStaff({ payload }) {
    yield put(actions.addNewUserToLocal(payload));
}

//Watcher
export function* watchGetUserList() {
    yield takeEvery(actionTypes.GET_USER_LIST, getUserList);
}
export function* watchGetStaffList() {
    yield takeEvery(actionTypes.GET_STAFF_LIST, getStaffList);
}
export function* watchAddNewStaff() {
    yield takeEvery(actionTypes.ADD_NEW_STAFF, onAddNewStaff);
}
function* userSaga() {
    yield all([fork(watchGetUserList), fork(watchGetStaffList)]);
}
export default userSaga;
