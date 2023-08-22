import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_ASSET_LIST,
    POST_ASSET,
    POST_ASSET_SUCCESS,
    POST_ASSET_FAILED,
    PUT_ASSET,
    PUT_ASSET_SUCCESS,
    PUT_ASSET_FAILED,
    DELETE_ASSET,
    DELETE_ASSET_SUCCESS,
    DELETE_ASSET_FAILED,
    GET_ASSET_SUCCESS,
    GET_ASSET_FAILED,
} from './actionType';

export const getAssetListSuccess = (actionType, data) => {
    return {
        type: API_RESPONSE_SUCCESS,
        payload: { actionType, data },
    };
};

export const getAssetListFailed = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAssetList = () => ({
    type: GET_ASSET_LIST,
});

export const getAssetSuccess = (data) => ({
    type: GET_ASSET_SUCCESS,
    payload: data,
});

export const getAssetFailed = (error) => ({
    type: GET_ASSET_FAILED,
    payload: error,
});

export const postAsset = (asset) => ({
    type: POST_ASSET,
    payload: asset,
});

export const postAssetSuccess = (asset) => ({
    type: POST_ASSET_SUCCESS,
    payload: asset,
});

export const postAssetFailed = (error) => ({
    type: POST_ASSET_FAILED,
    payload: error,
});

export const putAsset = (asset) => ({
    type: PUT_ASSET,
    payload: asset,
});

export const putAssetSuccess = (asset) => ({
    type: PUT_ASSET_SUCCESS,
    payload: asset,
});

export const putAssetFailed = (error) => ({
    type: PUT_ASSET_FAILED,
    payload: error,
});

export const deleteAsset = (asset) => ({
    type: DELETE_ASSET,
});

export const deleteAssetSuccess = (asset) => ({
    type: DELETE_ASSET_SUCCESS,
});

export const deleteAssetFailed = (asset) => ({
    type: DELETE_ASSET_FAILED,
});
