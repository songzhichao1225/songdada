import React from 'react';
import {HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pc/Login/Login';
import forgetPassword from './pc/forgetPassword/forgetPassword';
import register from './pc/register/register';
import perfect from './pc/perfect/perfect';
import qualification from './pc/qualification/qualification';
// import map from './pc/map/map';
import statusAudits from './pc/statusAudits/statusAudits';
import home from './pc/home/home';
import Agreement from './pc/Agreement/Agreement';

import lazyLoad from './lazyLoad';
const map = lazyLoad(() => import('./pc/map/map'));





const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/forgetPassword" component={forgetPassword}/>    
            <Route exact path="/register" component={register}/>
            <Route exact path="/perfect" component={perfect}/>
            <Route exact path="/qualification" component={qualification}/>
            <Route exact path="/map" component={map}/>
            <Route exact path="/statusAudits" component={statusAudits}/>
            <Route  path="/home" component={home}/>
            <Route  path="/Agreement" component={Agreement}/>
        </Switch>
    </HashRouter>
)




export default BasicRoute;
 