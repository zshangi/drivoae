import {
    VEHICLE_LIST_REQUEST,
    VEHICLE_LIST_SUCCESS,
    VEHICLE_LIST_FAIL,

    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
 
    MAKE_LIST_REQUEST,
    MAKE_LIST_SUCCESS,
    MAKE_LIST_FAIL,

    MODEL_LIST_REQUEST,
    MODEL_LIST_SUCCESS,
    MODEL_LIST_FAIL,

    
    TRIM_LIST_REQUEST,
    TRIM_LIST_SUCCESS,
    TRIM_LIST_FAIL,

    VEHICLETYRE_LIST_REQUEST,
    VEHICLETYRE_LIST_SUCCESS,
    VEHICLETYRE_LIST_FAIL,


} from '../constants/vehicleConstants'


import axios from 'axios'

export const fetchVehicles = (makeTxt,modelTxt,yearTxt) => async (dispatch) => {
    try {
        dispatch({ type: VEHICLE_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/vehicles?make=${makeTxt}&&model=${modelTxt}&&year=${yearTxt}`)
        dispatch({
            type: VEHICLE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VEHICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const getvehicleDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: VEHICLE_DETAILS_REQUEST })



        const { data } = await axios.get(
            `/api/v1/vehicles/${id}/`
        )

        dispatch({ type: VEHICLE_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type:  VEHICLE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const fetchMakes = () => async (dispatch) => {
        try {
            let d= (new Date());
            let n = d.getTime();
            console.log(n)
            //dispatch({ type: PRODUCT_LIST_REQUEST })
            console.log("test")
            fetch(`/api/v1/vehicles/make/`).then( data =>
                data.json().then( d => {
                    console.log(d)
                    dispatch({
                        type: MAKE_LIST_SUCCESS,
                        payload: d
                    }) 
                })
            )

    } catch (error) {
        dispatch({
            type: MAKE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
} 

export const fetchModels = (make) => async (dispatch) => {
    try {
        let d= (new Date());
        let n = d.getTime();
        console.log(n)
        console.log("test")
        fetch(`/api/v1/vehicles/model/`).then( data =>
            data.json().then( d => {
                console.log(d)
                dispatch({
                    type: MODEL_LIST_SUCCESS,
                    payload: d
                }) 
            })
        )

    } catch (error) {
        dispatch({
            type: MODEL_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const fetchTrims = (model) => async (dispatch) => {
    try {
        dispatch({ type: TRIM_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/vehicles/trim/`)
        dispatch({
            type: TRIM_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TRIM_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const fetchVehicleTyres = (id) => async (dispatch) => {
    try {
        dispatch({ type: VEHICLETYRE_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/vehicles/vehicletyre/${id}/`)
        dispatch({
            type: VEHICLETYRE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VEHICLETYRE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}