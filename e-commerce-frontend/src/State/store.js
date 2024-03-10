import {legacy_createStore,combineReducers,applyMiddleware}from "redux"
import {thunk} from "redux-thunk"
import { authReducer } from "./Auth/Reducer"
import { customerProductReducer } from "./Product/Reducer"
import { cartReducer } from "./Cart/Reducer"
import { orderReducer } from "./Order/reducer"
import paymentReducer from "./Payment/Reducer"

const rootReducers =combineReducers({
       auth:authReducer,
       products:customerProductReducer,
       cart:cartReducer,
       order:orderReducer,
       payment:paymentReducer
})

export const store =legacy_createStore(rootReducers,applyMiddleware(thunk))