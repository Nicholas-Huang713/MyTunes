import {combineReducers} from 'redux';
import songReducer from './songReducer';
import userReducer from './userReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    song: songReducer,
    user: userReducer,
    page: pageReducer
})