import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,

} from '../constants/postConstatns'
import axios from 'axios'



export const fetchPosts = () => async (dispatch) => {
    try {
        let d= (new Date());
        let n = d.getTime();
        console.log(n)
        dispatch({ type: POST_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/posts`)
        let dd= (new Date());
        let nn= dd.getTime();
        console.log(nn)
        console.log(nn-n)
        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}


export const fetchPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/posts/${id}`)

        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}