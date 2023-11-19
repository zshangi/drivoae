import { GiConsoleController } from 'react-icons/gi';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    TYRE_LIST_REQUEST,
    TYRE_LIST_SUCCESS,
    TYRE_LIST_FAIL,

} from '../constants/productConstatns'
import axios from 'axios'


export const fetchProducts =  () =>async (dispatch)  => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/api/v1/tyreproducts`)


        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const fetchProductvehicle =  (id) => (dispatch)  => {
    try {
        let d= (new Date());
        let n = d.getTime();
        console.log(n)
        dispatch({ type: PRODUCT_LIST_REQUEST })
        console.log("test")
        
        fetch(`/api/v1/tyreproducts/tyre/${id}`).then( data =>
            data.json().then( d => {
                console.log(d)
                dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: d
                }) 
            })
        )
        /*const { data } = await axios.get(`/api/v1/products?name=${searchTxt}&&width=${widthTxt}&&profile=${profileTxt}&&diameter=${diameterTxt}`)
        let dd= (new Date());
        let nn= dd.getTime();
        console.log(nn)
        console.log(nn-n)
        console.log("Data size", JSON.stringify(data).length)

        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })*/

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message
         })

    }
}
export const fetchProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/tyreproducts/${id}`)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        console.log(data)
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
             payload: error.response && error.response.data.detail
                 ? error.response.data.detail
                 : error.message
         })
     
        }

}

export const fetchTyres = () => async (dispatch) => {
    try {
        let d= (new Date());
        let n = d.getTime();
        console.log(n)
        //dispatch({ type: PRODUCT_LIST_REQUEST })
        console.log("test")
        fetch(`/api/v1/tyres/`).then( data =>
            data.json().then( d => {
                console.log(d)
                dispatch({
                    type: TYRE_LIST_SUCCESS,
                    payload: d
                }) 
            })
        )

} catch (error) {
    dispatch({
        type: TYRE_LIST_FAIL,
        payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
    })

}
} 