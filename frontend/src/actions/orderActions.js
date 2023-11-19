import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    PAYTAMARA_CREATE_REQUEST,
    PAYTAMARA_CREATE_SUCCESS,
    PAYTAMARA_CREATE_FAIL,

    PAYTAMARA_UPDATE_REQUEST,
    PAYTAMARA_UPDATE_SUCCESS,
    PAYTAMARA_UPDATE_FAIL,


    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,


    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,


} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstatns'

import axiosInstance from '../utils/axiosInstance'
import axios from 'axios'


export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { data } = await authRequestAxios.post(
            '/api/v1/orders/add/',
            order
        )
        console.log(data)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })

        dispatch({ type: CART_CLEAR_ITEMS })

        localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
        console.log(error.message)

    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { data } = await authRequestAxios.get(
            `/api/v1/orders/${id}/`
        )

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const getMyOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_MY_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { data } = await authRequestAxios.get(
            '/api/v1/orders/my/',
        )

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const goPayGate = (authRequestAxios, id) => {

    const response = authRequestAxios.get(
        `/api/v1/orders/${id}/pay/`,
    )
    return response
}


export const fetchOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/orders/`)
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}



export const  CreatePayTamara = (order_id,order_id_tamara,checkout_id,status) => async (dispatch,getState) => {
    try {
        dispatch({ type: PAYTAMARA_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const authRequestAxios = axiosInstance(userInfo, dispatch)

        const { data } = await authRequestAxios.post(
            '/api/v1/air/save-tamara-info/',
            { 'order_id': order_id, 'order_id_tamara': order_id_tamara, 'checkout_id': checkout_id, 'status':status}
        )

        dispatch({// USER_REGISTER_SUCCESS
            type: PAYTAMARA_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({// USER_REGISTER_FAIL
            type: PAYTAMARA_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}


export const  UpdatePayTamara = (order_id_tamara,status) => async (dispatch,getState) => {
    try {
        dispatch({ type: PAYTAMARA_UPDATE_REQUEST })
        const { data } = await axios.put(
            '/api/v1/air/update-tamara-info/',
            {  'order_id_tamara': order_id_tamara, 'status':status}
        )
        dispatch({
            type: PAYTAMARA_UPDATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({// USER_REGISTER_FAIL
            type: PAYTAMARA_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}