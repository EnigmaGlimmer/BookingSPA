import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CUSTOMER,
    POST_CUSTOMER,
    POST_CUSTOMER_SUCCESS,
    POST_CUSTOMER_FAILED,
    PUT_CUSTOMER,
    PUT_CUSTOMER_SUCCESS,
    PUT_CUSTOMER_FAILED,
    DELETE_CUSTOMER,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILED,
} from './actionType';

// 1. Get CUSTOMER
export const getCustomer = (actionType) => ({
    type: GET_CUSTOMER,
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

// 2. Create new CUSTOMER

export const postCustomer = (asset: { customerName: string; customerEmail: string; customerPhone: string }) => ({
    type: POST_CUSTOMER,
    payload: {
        asset,
    },
});

export const postCustomerSuccess = (data: any) => ({
    type: POST_CUSTOMER_SUCCESS,
    payload: {
        data,
    },
});

export const postCustomerError = (error: string) => ({
    type: POST_CUSTOMER_FAILED,
    payload: {
        error,
    },
});

// 3. Update CUSTOMER

export const putCustomer = () => ({
    type: PUT_CUSTOMER,
    payload: {},
});

export const putCustomerSuccess = (data) => ({
    type: PUT_CUSTOMER_SUCCESS,
    payload: {
        data,
    },
});

export const putCustomerError = (error) => ({
    type: PUT_CUSTOMER_FAILED,
    payload: {
        error,
    },
});

// 4. Delete CUSTOMER

export const deleteCustomer = () => ({
    type: DELETE_CUSTOMER,
    payload: {},
});

export const deleteCustomerSuccess = (data) => ({
    type: DELETE_CUSTOMER_SUCCESS,
    payload: {
        data,
    },
});

export const deleteCustomerError = (error) => ({
    type: DELETE_CUSTOMER_FAILED,
    payload: {
        error,
    },
});
