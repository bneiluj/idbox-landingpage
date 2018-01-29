import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App/App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

// Note: we change the deployment div depending on if we're in development or production
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'root' : 'rootVillagePage') // If in production render App in a special div on page with ID "rootVillagePage"
);
registerServiceWorker();
