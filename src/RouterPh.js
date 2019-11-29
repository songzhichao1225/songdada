import React from 'react';
import {HashRouter, Route, Switch } from 'react-router-dom';
import loginPh from './phone/loginPh/loginPh';
import loginPhTeo from './phone/loginPhTeo/loginPhTeo';
import corporatePh from './phone/corporatePh/corporatePh';
import registerPh from './phone/registerPh/registerPh';
import stadiumInformationPh from './phone/stadiumInformationPh/stadiumInformationPh';
import mapPh from './phone/mapPh/mapPh';
import qualificationPh from './phone/qualificationPh/qualificationPh';
import idCardPh from './phone/idCardPh/idCardPh';
import resultsAuditsPh from './phone/resultsAuditsPh/resultsAuditsPh';
import forgetPasswordPh from './phone/forgetPasswordPh/forgetPasswordPh';
import homePh from './phone/homePh/homePh';
import monthlyIncomePh from './phone/monthlyIncomePh/monthlyIncomePh';
import moneyDetailPh from './phone/moneyDetailPh/moneyDetailPh';
import commentPh from './phone/commentPh/commentPh';
import myWalletPh from './phone/myWalletPh/myWalletPh';
import withdrawalPh from './phone/withdrawalPh/withdrawalPh';
import walletDetailsPh from './phone/walletDetailsPh/walletDetailsPh';
import recordPh from './phone/recordPh/recordPh';
import sittingPh from './phone/sittingPh/sittingPh';
import temporaryPh from './phone/temporaryPh/temporaryPh';
import untiePhonePh from './phone/untiePhonePh/untiePhonePh';
import resetPasswordPh from './phone/resetPasswordPh/resetPasswordPh';
import inforSitePh from './phone/inforSitePh/inforSitePh';
import appOrder from './phone/appOrder/appOrder';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={loginPh}/>
            <Route exact path="/login" component={loginPhTeo}/>
            <Route exact path="/corporateLogin" component={corporatePh}/>
            <Route exact path="/registerPh" component={registerPh}/>
            <Route exact path="/stadiumInformationPh" component={stadiumInformationPh}/>
            <Route exact path="/mapPh" component={mapPh}/>
            <Route exact path="/qualificationPh" component={qualificationPh}/>
            <Route exact path="/idCardPh" component={idCardPh}/>
            <Route exact path="/resultsAuditsPh" component={resultsAuditsPh}/>
            <Route exact path="/forgetPasswordPh" component={forgetPasswordPh}/>
            <Route exact path="/homePh/monthlyIncomePh" component={monthlyIncomePh}/>
            <Route exact path="/homePh/monthlyIncomePh/moneyDetailPh" component={moneyDetailPh}/>
            <Route exact path="/homePh/commentPh" component={commentPh}/>
            <Route exact path="/homePh/myWalletPh" component={myWalletPh}/>
            <Route exact path="/homePh/withdrawalPh" component={withdrawalPh}/>
            <Route exact path="/homePh/walletDetailsPh" component={walletDetailsPh}/>
            <Route exact path="/homePh/recordPh" component={recordPh}/>
            <Route exact path="/homePh/sittingPh" component={sittingPh}/>
            <Route exact path="/homePh/temporaryPh" component={temporaryPh}/>
            <Route exact path="/homePh/untiePhonePh" component={untiePhonePh}/>
            <Route exact path="/homePh/resetPasswordPh" component={resetPasswordPh}/>
            <Route exact path="/homePh/inforSitePh" component={inforSitePh}/>
            <Route  path="/homePh" component={homePh}/>
            <Route exact path="/appOrder" component={appOrder}/>
        </Switch>
    </HashRouter>
);




export default BasicRoute;