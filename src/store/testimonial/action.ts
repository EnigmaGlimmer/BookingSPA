import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_TESTIMONIAL_LIST,
    POST_TESTIMONIAL,
    POST_TESTIMONIAL_SUCCESS,
    POST_TESTIMONIAL_FAILED,
    PUT_TESTIMONIAL,
    PUT_TESTIMONIAL_FAILED,
    PUT_TESTIMONIAL_SUCCESS,
    DELETE_TESTIMONIAL,
    DELETE_TESTIMONIAL_SUCCESS,
    DELETE_TESTIMONIAL_FAILED,
} from './actionType';

export const getTestimonialList = () => ({
    type: GET_TESTIMONIAL_LIST,
});

export const getTestimonialListSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: {
        actionType,
        data,
    },
});

export const getTestimonialListFailed = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: {
        actionType,
        error,
    },
});

export const postNewTestimonial = () => ({
    type: POST_TESTIMONIAL,
});

export const postNewTestimonialSuccess = (data) => ({
    type: POST_TESTIMONIAL_SUCCESS,
    payload: data,
});

export const postNewTestimonialFailed = (error) => ({
    type: POST_TESTIMONIAL_FAILED,
    payload: error,
});

export const putTestimonial = (id) => ({
    type: PUT_TESTIMONIAL,
    payload: id,
});

export const putTestimonialSuccess = (id, data) => ({
    type: PUT_TESTIMONIAL_SUCCESS,
    payload: {
        id,
        data,
    },
});

export const putTestimonialFailed = (error) => ({
    type: PUT_TESTIMONIAL_FAILED,
    payload: error,
});

export const deleteTestimonial = (id) => ({
    type: DELETE_TESTIMONIAL,
    payload: id,
});

export const deleteTestimonialSuccess = (id) => ({
    type: DELETE_TESTIMONIAL_SUCCESS,
    payload: id,
});

export const deleteTestimonialFailed = (error) => ({
    type: DELETE_TESTIMONIAL_FAILED,
    payload: error,
});
