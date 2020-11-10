import {combineReducers} from 'redux';
import songReducer from './songReducer';
import userReducer from './userReducer';

export default combineReducers({
    song: songReducer,
    user: userReducer
})