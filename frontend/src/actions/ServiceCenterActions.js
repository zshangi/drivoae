import {
    SERVICECENTER_LIST_REQUEST,
    SERVICECENTER_LIST_SUCCESS,
    SERVICECENTER_LIST_FAIL,
    SERVICECENTER_DETAILS_REQUEST,
    SERVICECENTER_DETAILS_SUCCESS,
    SERVICECENTER_DETAILS_FAIL,
    SERVICECENTER_TIMETABLE_LIST_REQUEST,
    SERVICECENTER_TIMETABLE_LIST_SUCCESS,
    SERVICECENTER_TIMETABLE_LIST_FAIL,

} from '../constants/servicecenterConstatns'
import axiosInstance from '../utils/axiosInstance'
import axios from 'axios'

export const fetchServicecenters =  () => (dispatch)  => {
    try {
        let d= (new Date());
        let n = d.getTime();
        console.log(n)
        //dispatch({ type: PRODUCT_LIST_REQUEST })
        console.log("test")
        fetch(`/api/v1/servicecenters`).then( data =>
            data.json().then( d => {
                console.log(d)
                dispatch({
                    type: SERVICECENTER_LIST_SUCCESS,
                    payload: d
                }) 
            })
        )
    } catch (error) {
        // dispatch({
        //     type: PRODUCT_LIST_FAIL,
        //     payload: error.response && error.response.data.detail
        //         ? error.response.data.detail
        //         : error.message
        // })

    }
}

export const getservicecenterDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type:     SERVICECENTER_DETAILS_REQUEST,       })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { data } = await authRequestAxios.get(
            `/api/v1/servicecenters//${id}`
        )

        dispatch({ type: SERVICECENTER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: SERVICECENTER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}



export const getMyTimetableList = () => async (dispatch) => {
    try {
        dispatch({ type: SERVICECENTER_TIMETABLE_LIST_REQUEST })
        const { data } = await axios.get('/api/v1/servicecenters/my')
        dispatch({
            type: SERVICECENTER_TIMETABLE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SERVICECENTER_TIMETABLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}