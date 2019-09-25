import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import RouterPh from './RouterPh';
import * as serviceWorker from './serviceWorker';


var sUserAgent = navigator.userAgent;
var mobileAgents = ['Android', 'iPhone'];
var goUrl = 0;
for (let index = 0; index < mobileAgents.length; index++) {
  if (sUserAgent.indexOf(mobileAgents[index]) > -1) {
    goUrl = 1;
    break;
  }
}
if (goUrl === 0) {
  ReactDOM.render(<Router />, document.getElementById('root'));
} else if (goUrl === 1) {
  ReactDOM.render(<RouterPh />, document.getElementById('root'));
}






serviceWorker.unregister();
