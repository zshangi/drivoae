import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,

} from '../constants/postConstatns'


export const listPostReducer = (state = { posts: [] }, action) => {

    switch (action.type) {
        case POST_LIST_REQUEST:
            return { posts: [], loading: true }
        case POST_LIST_SUCCESS:
            return { posts: action.payload, loading: false }
        case POST_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const detailsPostReducer = (state = { post: { reviews: [] } }, action) => {

    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { ...state, loading: true }
        case POST_DETAILS_SUCCESS:
            return { post: action.payload, loading: false }
        case POST_DETAILS_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}