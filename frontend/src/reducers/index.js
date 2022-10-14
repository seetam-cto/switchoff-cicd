import {combineReducers} from "@reduxjs/toolkit"
import {authReducer} from './auth'
import { propertyReducer } from "./property"

// combine multiple reducers
const rootReducer = combineReducers({
    auth: authReducer,
    property: propertyReducer
})

export default rootReducer