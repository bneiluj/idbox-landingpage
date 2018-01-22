import scanner from './scanner';
import identityInfo from './identityInfo';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  scanner,
  identityInfo
});

export default rootReducer;
