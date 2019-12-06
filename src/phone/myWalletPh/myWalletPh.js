import React from 'react';
import './myWalletPh.css';

import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Icon } from 'antd';
import {getVenueMoney } from '../../api';


class myWalletPh extends React.Component {

  state = {
    money:0.00,
  };

  async getVenueMoney(data) {
    const res = await getVenueMoney(data,localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else {
      this.setState({money:res.data.data.money})
    }
  }

  componentDidMount() {
    this.getVenueMoney()
  }

  withdrawalPh=()=>{
    this.props.history.push({pathname:'/homePh/withdrawalPh',query:{money:this.state.money}})
  }
 
  walletDetailsPh=()=>{
    this.props.history.push('/homePh/monthlyIncomePh')
  }

  recordPh=()=>{
    this.props.history.push('/homePh/recordPh')
  }
  reture=()=>{
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="myWalletPh">
         <div className="headBanner">
           <div className="headerTitle"><Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>场馆钱包</div>
           <div className="content">
             <span>账户余额(元)</span>
             <span>{this.state.money}</span>
           </div>
         </div>
         <ul className="mineList">
           <li onClick={this.walletDetailsPh}><img src={require("../../assets/money.png")} alt="icon"/><span>钱包明细</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li onClick={this.withdrawalPh}><img src={require("../../assets/tixian.png")} alt="icon"/><span>申请提现</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
           <li onClick={this.recordPh}><img src={require("../../assets/tixianjilu.png")} alt="icon"/><span>提现记录</span><img src={require("../../assets/right.png")}  alt="arrow"/></li>
        </ul>
      </div>
    );
  }
}

export default myWalletPh;