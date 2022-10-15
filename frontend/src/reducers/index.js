import {combineReducers} from "@reduxjs/toolkit"
import {authReducer} from './auth'
import { propertyAddStageReducer, propertyReducer } from "./property"

// combine multiple reducers
const rootReducer = combineReducers({
    auth: authReducer,
    property: propertyReducer,
    propStage: propertyAddStageReducer
})

export default rootReducer