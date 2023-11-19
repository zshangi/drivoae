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

export const listVehicleReducer = (state = { vehicles: [] }, action) => {

    switch (action.type) {
        case VEHICLE_LIST_REQUEST:
            return { vehicles: [], loading: true }
        case VEHICLE_LIST_SUCCESS:
            return { vehicles: action.payload, loading: false }
        case VEHICLE_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const vehicleDetailsReducer = (state = { loading: true, vehicleItems: [] }, action) => {
    switch (action.type) {
        case VEHICLE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case VEHICLE_DETAILS_SUCCESS:
            return {
                loading: false,
                vehicle: action.payload,
            }

        case VEHICLE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const listMakeReducer = (state = { makes: [] }, action) => {

    switch (action.type) {
        case MAKE_LIST_REQUEST:
            return { makes: [], loading: true }
        case MAKE_LIST_SUCCESS:
            return { makes: action.payload, loading: false }
        case MAKE_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const listModelReducer = (state = { models: [] }, action) => {

    switch (action.type) {
        case MODEL_LIST_REQUEST:
            return { models: [], loading: true }
        case MODEL_LIST_SUCCESS:
            return { models: action.payload, loading: false }
        case MODEL_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const listModificationReducer = (state = { trims: [] }, action) => {

    switch (action.type) {
        case TRIM_LIST_REQUEST:
            return { trims: [], loading: true }
        case TRIM_LIST_SUCCESS:
            return { trims: action.payload, loading: false }
        case TRIM_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

export const listVehicleTyreReducer = (state = { vehicletyres: [] }, action) => {

    switch (action.type) {
        case VEHICLETYRE_LIST_REQUEST:
            return { vehicletyres: [], loading: true }
        case VEHICLETYRE_LIST_SUCCESS:
            return { vehicletyres: action.payload, loading: false }
        case VEHICLETYRE_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}