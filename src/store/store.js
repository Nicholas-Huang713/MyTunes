import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {reduxFirestore, getFirestore} from 'redux-firestore';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
// import firebaseConfig from '../firebase/firebase';

const initialState = {};

const middleware = [thunk.withExtraArgument({getFirebase, getFirestore })];

const store = createStore(rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middleware),
        // reduxFirestore(firebaseConfig),
        // reactReduxFirebase(firebaseConfig),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    
)
export default store;