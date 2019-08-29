import React from 'react';
import {HashRouter, Route, Switch } from 'react-router-dom';
import loginPh from './phone/loginPh/loginPh';
import loginPhTeo from './phone/loginPhTeo/loginPhTeo';
import corporatePh from './phone/corporatePh/corporatePh';
import registerPh from './phone/registerPh/registerPh';




const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={loginPh}/>
            <Route exact path="/login" component={loginPhTeo}/>
            <Route exact path="/corporateLogin" component={corporatePh}/>
            <Route exact path="/registerPh" component={registerPh}/>
            
        </Switch>
    </HashRouter>
);




export default BasicRoute;