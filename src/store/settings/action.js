import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SETTING_LIST,
    POST_SETTING,
    POST_SETTING_SUCCESS,
    POST_SETTING_FAILED,
} from './actionType';

// 1. Get blog list

export const getSettingList = (page) => {
    return {
        type: GET_SETTING_LIST,
        payload: {
            page,
        },
    };
};

export const getSettingSuccess = (actionType, page, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        page,
        data,
    },
});

export const getSettingError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 2. Create new blog
export const postSetting = (body, page) => {
    return {
        type: POST_SETTING,
        payload: {
            body,
            page,
        },
    };
};

export const postSettingSuccess = ({ page, data }) => {
    console.log(page, data);
    return {
        type: POST_SETTING_SUCCESS,
        payload: {
            page,
            data,
        },
    };
};

export const postSettingError = (error) => ({
    type: POST_SETTING_FAILED,
    payload: error,
});
