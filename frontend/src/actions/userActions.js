import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,

    USERADDRESS_LIST_REQUEST,
    USERADDRESS_LIST_SUCCESS,
    USERADDRESS_LIST_FAIL,

    USERADDRESS_SUBMIT_REQUEST,
    USERADDRESS_SUBMIT_SUCCESS,
    USERADDRESS_SUBMIT_FAIL,

    VEHICLE_CREATE_REQUEST,
    VEHICLE_CREATE_SUCCESS,
    VEHICLE_CREATE_FAIL,

    USERVEHICLE_LIST_REQUEST,
    USERVEHICLE_LIST_SUCCESS,
    USERVEHICLE_LIST_FAIL,
    USERVEHICLE_LIST_RESET,

    USERVEHICLE_UPDATE_REQUEST,
    USERVEHICLE_UPDATE_SUCCESS,
    USERVEHICLE_UPDATE_FAIL,

    USERVEHICLE_DEL_REQUEST,
    USERVEHICLE_DEL_SUCCESS,
    USERVEHICLE_DEL_FAIL,

    USERADDRESS_DEL_REQUEST,
    USERADDRESS_DEL_SUCCESS,
    USERADDRESS_DEL_FAIL,

} from '../constants/userConstants'

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

import axios from 'axios'
import axiosInstance from '../utils/axiosInstance'


export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({// USER_LOGIN_REQUEST
            type: USER_LOGIN_REQUEST,
        })

        const config = {// request setting
            header: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(// send request login
            '/api/v1/users/login/',
            { 'username': email, 'password': password },
            config,
        )
 
        dispatch({// USER_LOGIN_SUCCESS
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem(// save user information in local storage
            'userInfo',
            JSON.stringify(data)
        )

    } catch (error) {
        dispatch({// USER_LOGIN_FAIL
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }

}


export const userLogoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USERVEHICLE_LIST_RESET })
}


export const userRegisterAction = (name, email, password,pno) => async (dispatch) => {
    try {
        dispatch({ // USER_REGISTER_REQUEST
            type: USER_REGISTER_REQUEST,
        })

        const config = {// request setting
            header: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(// register request
            '/api/v1/users/register/',
            { 'name': name, 'email': email, 'password': password, 'pno':pno},
            config
        )

        dispatch({// USER_REGISTER_SUCCESS
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem(// save user information in local storage
            'userInfo',
            JSON.stringify(data)
        )

    } catch (error) {
        dispatch({// USER_REGISTER_FAIL
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const getUserDetailsAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({// USER_DETAILS_REQUEST
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)
        const { data } = await authRequestAxios.get(
            `/api/v1/users/${id}`,
        )

        dispatch({// USER_DETAILS_SUCCESS
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        console.log(data)
    } catch (error) {
        dispatch({// USER_DETAILS_FAIL
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const updateUserProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({// USER_UPDATE_PROFILE_REQUEST
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
 

        const authRequestAxios = axiosInstance(userInfo, dispatch)
        const { data } = await authRequestAxios.put(// send update profile request
            '/api/v1/users/profile/update/',
            user,
        )
        userInfo.name = data.name

        dispatch({// USER_UPDATE_PROFILE_SUCCESS
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: userInfo
        })

        dispatch({// USER_LOGIN_SUCCESS
            type: USER_LOGIN_SUCCESS,
            payload: userInfo
        })

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (error) {
        dispatch({// USER_UPDATE_PROFILE_FAIL
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const updateAccessToken = (obj) => (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState()

    userInfo.access = obj.access
    userInfo.refresh = obj.refresh

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo })
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}



export const fetchUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })
        const { data } = await axios.get('/api/v1/users/')
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}


export const fetchUserAddresses = (id) => async (dispatch) => {
    try {
        dispatch({ type: USERADDRESS_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/users/addresses/${id}/`)
        dispatch({
            type: USERADDRESS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USERADDRESS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const  saveAdressAction = (address,lat,long,details,userid) => async (dispatch,getState) => {
    try {
        dispatch({ type: USERADDRESS_SUBMIT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { data } = await authRequestAxios.post(
            '/api/v1/users/addaddress/',
            { 'address': address, 'lat': lat, 'long': long, 'details':details,'userid':userid}
        )




        dispatch({// USER_REGISTER_SUCCESS
            type: USERADDRESS_SUBMIT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({// USER_REGISTER_FAIL
            type: USERADDRESS_SUBMIT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}



export const  saveVehicleUser = (trim,model,year,maketxt,main) => async (dispatch,getState) => {
    try {
        dispatch({ type: VEHICLE_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { dataa } = await authRequestAxios.post(
            '/api/v1/users/vehicleuser/add/',
            { 'trim':trim,'model':model,'year':year,'make':maketxt}
        )
        dispatch({// USERVEHICLE_SAVE_SUCCESS
            type: VEHICLE_CREATE_SUCCESS,
            payload: dataa,
            success:true
        })
        console.log("dasd")
        dispatch({ type: USERVEHICLE_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/users/vehicleuser/${userInfo.id}/`)
        dispatch({
            type: USERVEHICLE_LIST_SUCCESS,
            payload: data
        })
        console.log(data)
        console.log("model")
        
    } catch (error) {
        dispatch({// USER_REGISTER_FAIL
            type: VEHICLE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}



export const fetchVehicleUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USERVEHICLE_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/users/vehicleuser/${id}/`)
        dispatch({
            type: USERVEHICLE_LIST_SUCCESS,
            payload: data
        })
        console.log(data)

    } catch (error) {
        dispatch({
            type: USERVEHICLE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const updateVehicleuserMain = (id) => async (dispatch) => {
    try {
        dispatch({ type: USERVEHICLE_UPDATE_REQUEST })
        const { data } = await axios.put(`/api/v1/users/vehicleuser/update/${id}/`)
        dispatch({
            type: USERVEHICLE_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:  USERVEHICLE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}
export const delVehicleuser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USERVEHICLE_DEL_REQUEST })
        const { data } = await axios.put(`/api/v1/users/vehicleuser/del/${id}/`)
        dispatch({
            type: USERVEHICLE_DEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:  USERVEHICLE_DEL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const delAddressuser = (id) => async (dispatch) => {
    try {
        dispatch({ type: USERADDRESS_DEL_REQUEST })
        const { data } = await axios.put(`/api/v1/users/addressuser/del/${id}/`)
        dispatch({
            type: USERADDRESS_DEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:  USERADDRESS_DEL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}