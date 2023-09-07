import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SERVICE_LIST,
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
export const getService = () => ({
    type: GET_SERVICE_LIST,
});

export const getServiceSuccess = (actionType: string, data: any) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
    },
});

export const getServiceError = (actionType: string, error: string) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 2. Create new SERVICE

export const postService = (asset: {
    serviceName: string;
    parentId?: number;
    createdDate: Date;
    price: number;
    promotion: any;
}) => {
    return {
        type: POST_SERVICE,
        payload: asset,
    };
};

export const postServiceSuccess = (data: any) => {
    return {
        type: POST_SERVICE_SUCCESS,
        payload: {
            data,
        },
    };
};

export const postServiceError = (error: string) => ({
    type: POST_SERVICE_FAILED,
    payload: {
        error,
    },
});

// 3. Update SERVICE

export const putService = () => ({
    type: PUT_SERVICE,
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

export const deleteService = (serviceId) => ({
    type: DELETE_SERVICE,
    payload: {
        serviceId,
    },
});

export const deleteServiceSuccess = (serviceId) => ({
    type: DELETE_SERVICE_SUCCESS,
    payload: {
        serviceId,
    },
});

export const deleteServiceError = (error) => ({
    type: DELETE_SERVICE_FAILED,
    payload: {
        error,
    },
});
