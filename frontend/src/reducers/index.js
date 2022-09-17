import {combineReducers} from "@reduxjs/toolkit"
import {authReducer} from './auth'

// combine multiple reducers
const rootReducer = combineReducers({
    user: authReducer
})

export default rootReducer