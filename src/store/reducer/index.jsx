import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import conversactionReducer from './conversactionReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    userReducer,
    conversactionReducer,
    messageReducer,
});

export default rootReducer;
