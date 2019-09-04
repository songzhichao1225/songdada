import React from 'react';
import {HashRouter, Route, Switch } from 'react-router-dom';
import loginPh from './phone/loginPh/loginPh';
import loginPhTeo from './phone/loginPhTeo/loginPhTeo';
import corporatePh from './phone/corporatePh/corporatePh';
import registerPh from './phone/registerPh/registerPh';
import stadiumInformationPh from './phone/stadiumInformationPh/stadiumInformationPh';
import mapPh from './phone/mapPh/mapPh';
import qualification from './phone/qualification/qualification';
import idCardPh from './phone/idCardPh/idCardPh';
import resultsAuditsPh from './phone/resultsAuditsPh/resultsAuditsPh';
import forgetPasswordPh from './phone/forgetPasswordPh/forgetPasswordPh';
import homePh from './phone/homePh/homePh';
import monthlyIncomePh from './phone/monthlyIncomePh/monthlyIncomePh';
import moneyDetailPh from './phone/moneyDetailPh/moneyDetailPh';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={loginPh}/>
            <Route exact path="/login" component={loginPhTeo}/>
            <Route exact path="/corporateLogin" component={corporatePh}/>
            <Route exact path="/registerPh" component={registerPh}/>
            <Route exact path="/stadiumInformationPh" component={stadiumInformationPh}/>
            <Route exact path="/mapPh" component={mapPh}/>
            <Route exact path="/qualification" component={qualification}/>
            <Route exact path="/idCardPh" component={idCardPh}/>
            <Route exact path="/resultsAuditsPh" component={resultsAuditsPh}/>
            <Route exact path="/forgetPasswordPh" component={forgetPasswordPh}/>
            <Route exact path="/homePh" component={homePh}/>
            <Route exact path="/homePh/monthlyIncomePh" component={monthlyIncomePh}/>
            <Route exact path="/homePh/monthlyIncomePh/moneyDetailPh" component={moneyDetailPh}/>
            
            
        </Switch>
    </HashRouter>
);




export default BasicRoute;