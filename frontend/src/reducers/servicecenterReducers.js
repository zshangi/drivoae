import {
    SERVICECENTER_DETAILS_SUCCESS,
    SERVICECENTER_DETAILS_REQUEST,
    SERVICECENTER_DETAILS_FAIL,
    SERVICECENTER_LIST_SUCCESS,
    SERVICECENTER_LIST_REQUEST,
    SERVICECENTER_LIST_FAIL,
    SERVICECENTER_TIMETABLE_LIST_REQUEST,
    SERVICECENTER_TIMETABLE_LIST_SUCCESS,
    SERVICECENTER_TIMETABLE_LIST_FAIL,
} from '../constants/servicecenterConstatns'

export const listServicecenterReducer = (state = { servicecenters: [] }, action) => {

    switch (action.type) {
        case SERVICECENTER_LIST_REQUEST:
            return { servicecenters: [], loading: true }
        case SERVICECENTER_LIST_SUCCESS:
            return { servicecenters: action.payload, loading: false }
        case SERVICECENTER_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}


export const servicecenterDetailsReducer = (state = { loading: true, servicecenterItems: [] }, action) => {
    switch (action.type) {
        case SERVICECENTER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case SERVICECENTER_DETAILS_SUCCESS:
            return {
                loading: false,
                servicecenter: action.payload,
            }

        case SERVICECENTER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }

}

export const listServicecenterTimeTableReducer = (state = { servicecentertimetables: [] }, action) => {

    switch (action.type) {
        case SERVICECENTER_TIMETABLE_LIST_REQUEST:
            return { servicecentertimetables: [], loading: true }
        case  SERVICECENTER_TIMETABLE_LIST_SUCCESS:
            return { servicecentertimetables: action.payload, loading: false }
        case  SERVICECENTER_TIMETABLE_LIST_FAIL:
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

