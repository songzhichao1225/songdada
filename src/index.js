import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import RouterPh from './RouterPh';
import * as serviceWorker from './serviceWorker';
import { message } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

message.config({
  top: 100,
  duration:1,
  maxCount:1
  
})
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
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
    <Router />
  </ConfigProvider>, document.getElementById('root'));
} else if (goUrl === 1) {
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
  <RouterPh /> </ConfigProvider>, document.getElementById('root'));
}




serviceWorker.unregister();
