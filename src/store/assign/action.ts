import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ASSIGN_LIST,
    PUT_ASSIGN,
    PUT_ASSIGN_SUCCESS,
    PUT_ASSIGN_FAILED,
} from './actionType';

// 1. Get ASSIGN
export const getASSIGN = () => ({
    type: GET_ASSIGN_LIST,
});

export const getSuccess = (actionType: string, data: any) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
    },
});

export const getError = (actionType: string, error: string) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 3. Update ASSIGN

export const putAssign = () => ({
    type: PUT_ASSIGN,
});

export const putAssignSuccess = (data) => ({
    type: PUT_ASSIGN_SUCCESS,
    payload: {
        data,
    },
});

export const putAssignError = (error) => ({
    type: PUT_ASSIGN_FAILED,
    payload: {
        error,
    },
});
