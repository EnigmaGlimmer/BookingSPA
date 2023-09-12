import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_SETTING_LIST,
    POST_SETTING_SUCCESS,
    POST_SETTING_FAILED,
} from './actionType';

import homeContent from '../../config/content/home.json';

import aboutContent from '../../config/content/about.json';

import bookingContent from '../../config/content/booking.json';

import contactContent from '../../config/content/contact.json';

const INIT_STATE = {
    setting: {
        content: {
            home: homeContent,
            about: aboutContent,
            booking: bookingContent,
            contact: contactContent,
        },
    },
    error: null,
    loading: false,
};

const Setting = (state = INIT_STATE, action) => {
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SETTING_LIST:
                    return {
                        ...state,
                        setting: {
                            ...state.setting,
                            content: {
                                ...state.setting.content,
                                [action.payload.page]: action.payload.data,
                            },
                        },
                    };

                default:
                    return state;
            }

        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_SETTING_LIST:
                    return {
                        ...state,
                        error: action.payload.error,
                    };

                default:
                    return state;
            }

        case POST_SETTING_SUCCESS:
            switch (action.payload.actionType) {
                case GET_SETTING_LIST:
                    return {
                        ...state,
                        setting: action.payload.data,
                    };

                default:
                    return state;
            }

        case POST_SETTING_FAILED:
            return {
                ...state,
                error: action.payload.error,
            };

        default:
            return state;
    }
};

export default Setting;
