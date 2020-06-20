import React from 'react';
import './myWalletPh.css';

import {} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {LeftOutlined} from '@ant-design/icons';
import {getVenueMoney } from '../../api';


class myWalletPh extends React.Component {

  state = {
    money:0.00,
  };

  async getVenueMoney(data) {
    const res = await getVenueMoney(data,localStorage.getItem('venue_token'))
    
      this.setState({money:res.data.data.money})
    
  }

  componentDidMount() {
    this.getVenueMoney()
  }

  withdrawalPh=()=>{
    this.props.history.push({pathname:'/homePh/withdrawalPh',query:{money:this.state.money}})
  }
 
  walletDetailsPh=()=>{
    sessionStorage.setItem('income','all')
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
           <div className="headerTitle"><LeftOutlined onClick={this.reture} style={{position:'absolute',left:'0',width:'48px',height:'48px',lineHeight:'48px'}}/>场馆钱包</div>
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