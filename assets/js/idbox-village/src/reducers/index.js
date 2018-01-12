import scanner from './scanner';
import textbox from './textbox';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  scanner,
  textbox
});

export default rootReducer;
