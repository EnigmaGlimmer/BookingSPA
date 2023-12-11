import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_STAFF_LIST,
    GET_USER_LIST,
    ADD_NEW_STAFF,
    ADD_NEW_STAFF_TO_LOCAL,
} from './actionTypes';

export const getUserList = () => {
    return {
        type: GET_USER_LIST,
    };
};

export const getStaffList = (request) => {
    return {
        type: GET_STAFF_LIST,
        payload: request,
    };
};

export const getUserListSuccess = (actionType, data) => {
    return {
        type: API_RESPONSE_SUCCESS,
        payload: { actionType, data },
    };
};

export const getUserListError = (actionType, error) => {
    return {
        type: API_RESPONSE_ERROR,
        payload: { actionType, error },
    };
};

export const addNewUser = (newStaff) => {
    return {
        type: ADD_NEW_STAFF,
        payload: newStaff,
    };
};

export const addNewUserToLocal = (newStaff) => {
    return {
        type: ADD_NEW_STAFF_TO_LOCAL,
        payload: newStaff,
    };
};
