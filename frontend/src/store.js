import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { listProductReducer, detailsProductReducer,listTyreReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { listVehicleUserReducer,userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,listUserReducer,listAddressesReducer,addressCreateReducer,vehicleCreateReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer,orderListReducer,paytamaraUpdateReducer } from './reducers/orderReducers'
import { servicecenterDetailsReducer,listServicecenterReducer,listServicecenterTimeTableReducer } from './reducers/servicecenterReducers'
import { listModificationReducer,listModelReducer,vehicleDetailsReducer ,listVehicleReducer,listMakeReducer,listVehicleTyreReducer} from './reducers/vehicleReducers'
import { listPostReducer, detailsPostReducer } from './reducers/postReducers'

const reducer = combineReducers({
    listOrder : orderListReducer,
    listProduct: listProductReducer,
    listPost: listPostReducer,
    productDetails: detailsProductReducer,
    cart: cartReducer,
    listUser: listUserReducer,
    userLogin: userLoginReducer, 
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    listServicecenter: listServicecenterReducer,
    servicecenterDetails: servicecenterDetailsReducer,
    orderListMy: orderListMyReducer,
    vehicleDetails: vehicleDetailsReducer,
    listVehicle:listVehicleReducer,
    ListServiceCenterTimeTable:listServicecenterTimeTableReducer,
    ListAddress:listAddressesReducer,
    addressCreate:addressCreateReducer,
    vehicleCreate:vehicleCreateReducer,
    listVehicleUser:listVehicleUserReducer,
    listMake:listMakeReducer,
    listModel:listModelReducer,
    listTrim:listModificationReducer,
    listVehicleTyre:listVehicleTyreReducer,
    listTyre:listTyreReducer,
    payTamaraUpdate:paytamaraUpdateReducer,
})

const cartFromLocalStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const serviceCenterFromLocalStorage = localStorage.getItem('serviceCenter') ?
JSON.parse(localStorage.getItem('serviceCenter')) : {}   

const serviceMethodFromLocalStorage = localStorage.getItem('serviceMethod') ?
    JSON.parse(localStorage.getItem('serviceMethod')) : {}

    const basketFromLocalStorage = localStorage.getItem('basketNumber') ?
    JSON.parse(localStorage.getItem('basketNumber')) : {}

const initialState = {
    cart: {
        cartItems: cartFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
        serviceCenter: serviceCenterFromLocalStorage,
        serviceMethod: serviceMethodFromLocalStorage,
        basketNumber : basketFromLocalStorage,

    },
    userLogin: { userInfo: userInfoFromLocalStorage }
}
const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))


export default store