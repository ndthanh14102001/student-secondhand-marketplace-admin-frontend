// third-party
import { combineReducers } from 'redux'

// project import
import menu from './menu'
import loginReducer from './login'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, login: loginReducer })

export default reducers
