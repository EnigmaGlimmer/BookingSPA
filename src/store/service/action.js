import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SERVICE,
    POST_SERVICE,
    POST_SERVICE_SUCCESS,
    POST_SERVICE_FAILED,
    PUT_SERVICE,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_FAILED,
    DELETE_SERVICE,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILED,
} from './actionType';

// 1. Get SERVICE
export const getService = (actionType) => ({
    type: GET_SERVICE,
    payload: {
        actionType,
    },
});

export const getSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
    },
});

export const getError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 2. Create new SERVICE

export const postService = () => ({
    type: POST_SERVICE,
    payload: {},
});

export const postServiceSuccess = (data) => ({
    type: POST_SERVICE_SUCCESS,
    payload: {
        data,
    },
});

export const postServiceError = (error) => ({
    type: POST_SERVICE_FAILED,
    payload: {
        error,
    },
});

// 3. Update SERVICE

export const putService = () => ({
    type: PUT_SERVICE,
    payload: {},
});

export const putServiceSuccess = (data) => ({
    type: PUT_SERVICE_SUCCESS,
    payload: {
        data,
    },
});

export const putServiceError = (error) => ({
    type: PUT_SERVICE_FAILED,
    payload: {
        error,
    },
});

// 4. Delete SERVICE

export const deleteService = () => ({
    type: DELETE_SERVICE,
    payload: {},
});

export const deleteServiceSuccess = (data) => ({
    type: DELETE_SERVICE_SUCCESS,
    payload: {
        data,
    },
});

export const deleteServiceError = (error) => ({
    type: DELETE_SERVICE_FAILED,
    payload: {
        error,
    },
});
