import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SERVICE_CENTER
} from '../constants/cartConstatns'
import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {


    const { data } = await axios.get(`/api/v1/tyreproducts/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.imageurl,
            price: data.price,
            countInStock: data.countInStock,
            brand:data.brandorigin.brand.title,
            pattern:data.brandpattern.pattern,
            year:data.productionYear,
            size:data.tyre.name,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const saveServiceCenter = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SERVICE_CENTER, payload: data })
    localStorage.setItem('serviceCenter', JSON.stringify(data))
}

export const saveServiceMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
    localStorage.setItem('serviceMethod', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}