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
    total: 0,
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
                        blogs: action.payload.data,
                        total: action.payload.total,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_BLOG_LIST:
                    return {
                        ...state,
                        blogs: action.payload.error,
                    };
                default:
                    return state;
            }

        case POST_BLOG_SUCCESS:
            return { ...state, blogs: [...state.blogs, action.payload.data] };

        case POST_BLOG_FAILED:
            return { ...state, error: action.payload.error };

        case PUT_BLOG_SUCCESS:
            return { 
                ...state,
                blogs: state.blogs.map((item) => {
                    return item.blogId === action.payload.id ? {...item,...action.payload.data} : item
                })
            };

        case PUT_BLOG_FAILED:
            return { ...state, error: action.payload.error};

        case DELETE_BLOG_SUCCESS:
            return { ...state, blogs: state.blogs.filter(item => item.blogId !== action.payload.id)};

        case DELETE_BLOG_FAILED:
            return { ...state,error: action.payload.error };

        default:
            return state;
    }
};

export default Blogs;
