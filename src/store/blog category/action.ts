import { SingleBlog } from '../../api';
import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_CATEGORY_LIST,
    POST_CATEGORY,
    POST_CATEGORY_SUCCESS,
    POST_CATEGORY_FAILED,
} from './actionType';

export const getCategoryList = () => {
    return {
        type: GET_CATEGORY_LIST,
    };
};

export const getCategorySuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
    },
});

export const getCategoryError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 2. Create new blog
export const postCategory = (body, page) => ({
    type: POST_CATEGORY,
    payload: {
        body,
        page,
    },
});

export const postCategorySuccess = (data) => ({
    type: POST_CATEGORY_SUCCESS,
    payload: data,
});

export const postCategoryError = (error) => ({
    type: POST_CATEGORY_FAILED,
    payload: error,
});
