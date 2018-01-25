import fundingType from './fundingType';
import countriesAndVillages from './countriesAndVillages';
import services from './services';
import sendDialog from './sendDialog';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  fundingType,
  countriesAndVillages,
  services,
  sendDialog
});

export default rootReducer;
