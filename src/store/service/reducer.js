import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SERVICE_LIST,
    POST_SERVICE_SUCCESS,
    POST_SERVICE_FAILED,
    PUT_SERVICE_SUCCESS,
    PUT_SERVICE_FAILED,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILED,
} from './actionType';

const INIT_STATE = {
    services: [],
    error: null,
    loading: false,
};

const Service = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SERVICE_LIST:
                    return {
                        ...state,
                        services: action.payload.data,
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_SERVICE_LIST:
                    return {
                        ...state,
                        services: action.payload.error,
                    };

                default:
                    return state;
            }

        case POST_SERVICE_SUCCESS:
            return {
                ...state,
                services: [...state.services, action.payload.data],
            };
        case POST_SERVICE_FAILED:
            return {
                ...state,
                errors: action.payload.error,
            };

        case PUT_SERVICE_SUCCESS:
            return {
                ...state,
                services: state.services.map((s) => {
                    return s.serviceId === action.payload.serviceId ? { ...s, ...action.payload } : s;
                }),
            };
        case PUT_SERVICE_FAILED:
            return {
                ...state,
                errors: action.payload.error,
            };

        case DELETE_SERVICE_SUCCESS:
            return {
                ...state,
                services: state.services.filter((item) => item.serviceId !== action.payload.serviceId),
            };
        case DELETE_SERVICE_FAILED:
            return {
                ...state,
                errors: action.payload.error,
            };

        default:
            return state;
    }
};

export default Service;
