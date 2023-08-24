import {
    API_RESPONSE_ERROR,
    API_RESPONSE_SUCCESS,
    GET_TESTIMONIAL_LIST,
    POST_TESTIMONIAL_FAILED,
    POST_TESTIMONIAL_SUCCESS,
    PUT_TESTIMONIAL_FAILED,
    PUT_TESTIMONIAL_SUCCESS,
    DELETE_TESTIMONIAL_FAILED,
    DELETE_TESTIMONIAL_SUCCESS,
} from './actionType';

const INIT_STATE = {
    testimonials: null,
    errors: null,
};

export const testimonialReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_TESTIMONIAL_LIST:
                    return {
                        ...state,
                        testimonials: [...(state.testimonials || []), ...action.payload.data],
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_TESTIMONIAL_LIST:
                    return {
                        ...state,
                        errors: action.payload.error,
                    };

                default:
                    return state;
            }

        case POST_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                testimonials: [...(state.testimonials || []), action.payload],
            };
        case POST_TESTIMONIAL_FAILED:
            return {
                ...state,
                errors: action.payload,
            };

        case PUT_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                testimonials: (state.testimonials || []).map((t) =>
                    t.testimonialId === action.payload.id ? action.payload.data : t,
                ),
            };
        case PUT_TESTIMONIAL_FAILED:
            return { ...state, errors: action.payload };

        case DELETE_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                testimonials: (state.testimonials || []).filter((t) => t.testimonialId !== action.payload),
            };
        case DELETE_TESTIMONIAL_FAILED:
            return { ...state, errors: action.payload };

        default:
            return state;
    }
};

export default testimonialReducer;
