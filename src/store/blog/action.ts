import { BlogRequest } from '../../api';
import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_BLOG_LIST,
    POST_BLOG,
    POST_BLOG_SUCCESS,
    POST_BLOG_FAILED,
    PUT_BLOG,
    PUT_BLOG_SUCCESS,
    PUT_BLOG_FAILED,
    DELETE_BLOG,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_FAILED,
} from './actionType';

// 1. Get blog list

export const getBlogList = (request: BlogRequest) => {
    return {
        type: GET_BLOG_LIST,
        payload: request,
    };
};

export const getSuccess = (actionType, { data, total }) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
        total,
    },
});

export const getError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

// 2. Create new blog
export const postBlog = (newBlog) => {
    return {
        type: POST_BLOG,
        payload: newBlog,
    };
};

export const postBlogSuccess = (data) => ({
    type: POST_BLOG_SUCCESS,
    payload: data,
});

export const postBlogError = (error) => ({
    type: POST_BLOG_FAILED,
    payload: error,
});

// 3. Update blog

export const putBlog = (id,data) => {
    return({
        type: PUT_BLOG,
        payload:{
            id,
            data
        }
    });
} 

export const putBlogSuccess = (data) => ({
    type: PUT_BLOG_SUCCESS,
    payload: {
        data
    },
});

export const putBlogError = (error) => ({
    type: PUT_BLOG_FAILED,
    payload: error,
});

// 4. Delete blog

export const deleteBlog = (id) => ({
    type: DELETE_BLOG,
    payload: {id}
});

export const deleteBlogSuccess = (id) => ({
    type: DELETE_BLOG_SUCCESS,
    payload: {id},
});

export const deleteBlogError = (error) => ({
    type: DELETE_BLOG_FAILED,
    payload: error,
});
