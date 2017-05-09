/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
// Replace line below once you have several reducers with
import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import stationReducer from './stationReducer';
const rootReducer = combineReducers({
    'home': homeReducer,
    'login': loginReducer,
    'station': stationReducer
});
// const rootReducer = homeReducer;

export default rootReducer;
