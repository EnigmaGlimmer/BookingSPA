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

const INIT_STATE = {
    blogs: [],
    error: null,
    loading: false,
};

const Blogs = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_BLOG_LIST:
                    return {
                        ...state,
                        blogs: action.payload.result,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_BLOG_LIST:
                    return {
                        ...state,
                        blogs: action.payload.result,
                    };

                default:
                    return state;
            }

        default:
            break;
    }
};

export default Blogs;
