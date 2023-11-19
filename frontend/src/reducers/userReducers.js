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
    USER_UPDATE_PROFILE_RESET,
    
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
    USERVEHICLE_DEL_FAIL
    
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}   

export const listUserReducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case USER_LIST_REQUEST:
            return { users: [], loading: true }
        case USER_LIST_SUCCESS:
            return { users: action.payload, loading: false }
        case USER_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const listAddressesReducer = (state = { addresses: [] }, action) => {

    switch (action.type) {
        case USERADDRESS_LIST_REQUEST:
            return { addresses: [], loading: true }
        case USERADDRESS_LIST_SUCCESS:
            return { addresses: action.payload, loading: false }
        case USERADDRESS_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}


export const addressCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case USERADDRESS_SUBMIT_REQUEST:
            return {
                loading: true
            }


        case USERADDRESS_SUBMIT_SUCCESS:
            return {
                loading: false,
                success: true,
                address: action.payload,
            }

        case USERADDRESS_SUBMIT_FAIL:
            return {
                loading: false,
                error: action.payload,
            }


        default:
            return state
    }
}

export const vehicleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case VEHICLE_CREATE_REQUEST:
            return {
                loading: true
            }


        case VEHICLE_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case VEHICLE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }


        default:
            return state
    }
}


export const listVehicleUserReducer = (state = { vehicleuser: [] }, action) => {

    switch (action.type) {
        case USERVEHICLE_LIST_REQUEST:
            return { vehicleuser: [], loading: true }
        case USERVEHICLE_LIST_SUCCESS:
            return { vehicleuser: action.payload, loading: false }
        case USERVEHICLE_LIST_FAIL:
            return { error: action.payload, loading: false }
            case  USERVEHICLE_LIST_RESET:
                return { vehicleuser: {},loading: false }    
        default:
            return state
    }
}

export const updateVehicleuserReducer = (state = {}, action) => {
    switch (action.type) {
        case USERVEHICLE_UPDATE_REQUEST:
            return { loading: true }

        case USERVEHICLE_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USERVEHICLE_UPDATE_FAIL:
            return {}

        default:
            return state
    }
} 


export const delehicleuserReducer = (state = {}, action) => {
    switch (action.type) {
        case USERVEHICLE_DEL_REQUEST:
            return { loading: true }

        case USERVEHICLE_DEL_SUCCESS:
            return { loading: false, success: true }

        case USERVEHICLE_DEL_FAIL:
            return { loading: false, error: action.payload }

        case USERVEHICLE_DEL_FAIL:
            return {}

        default:
            return state
    }
} 