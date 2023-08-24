const { APIClient } = require('../api_helper');
const url = require('../url_helper');
const { serialize } = require('object-to-formdata');

const api = new APIClient();

export const getTestimonials = (request, config) => {
    return api.get(url.GET_TESTIMONIAL_LIST, request, config);
};

export const getTestimonial = (id, request, config) => {
    return api.get(`${url.GET_TESTIMONIAL}/${id}`, request, config);
};

export const postTestimonial = (body, config) => {
    const formData = serialize(body);

    return api.create(url.POST_TESTIMONIAL, formData, {
        ...config,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const putTestimonial = (id, body, config) => {
    return api.put(`${url.PUT_TESTIMONIAL}/${id}`, body);
};

export const deleteTestimonial = (id) => {
    return api.delete(`${url.DELETE_TESTIMONIAL}/${id}`);
};
