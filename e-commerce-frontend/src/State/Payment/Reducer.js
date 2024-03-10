import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE
} from './ActionType';

// Define initial state
const initialState = {
    creatingPayment: false,
    updatingPayment: false,
    error: ''
};

// Reducer function
const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
            return {
                ...state,
                creatingPayment: true,
                error: ''
            };
        case CREATE_PAYMENT_SUCCESS:
            return {
                ...state,
                creatingPayment: false,
                error: ''
            };
        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                creatingPayment: false,
                error: action.payload
            };
        case UPDATE_PAYMENT_REQUEST:
            return {
                ...state,
                updatingPayment: true,
                error: ''
            };
        case UPDATE_PAYMENT_SUCCESS:
            return {
                ...state,
                updatingPayment: false,
                error: ''
            };
        case UPDATE_PAYMENT_FAILURE:
            return {
                ...state,
                updatingPayment: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default paymentReducer;
