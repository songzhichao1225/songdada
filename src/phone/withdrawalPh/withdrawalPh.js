import React from 'react';
import './withdrawalPh.css';

import { Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { getVenueWithdrawalOneList, getVenueMoney, VenueWithdrawal } from '../../api';
import {LeftOutlined} from '@ant-design/icons';

class withdrawalPh extends React.Component {

  state = {
    withdrawalPh: '',
    money: 0.00,
    value: '',
    flag:0
  };

  async getVenueWithdrawalOneList(data) {
    const res = await getVenueWithdrawalOneList(data, localStorage.getItem('venue_token'))
     if (res.data.code === 2000) {
      res.data.data.Bankaccount=res.data.data.Bankaccount.slice(res.data.data.Bankaccount.length-4,res.data.data.Bankaccount.length)
      res.data.data.legalname='***'+res.data.data.legalname.slice(-1)
      this.setState({ withdrawalPh: res.data.data,flag:1 })
    }
  }

  async getVenueMoney(data) {
    const res = await getVenueMoney(data, localStorage.getItem('venue_token'))
    this.setState({ money: res.data.data.money })

  }

  componentDidMount() {
    this.getVenueWithdrawalOneList()
    this.getVenueMoney()
  }
  inputValue = e => {
    this.setState({ value: e.target.value })
  }
  all = () => {
    this.setState({ value: this.state.money })
  }
  async VenueWithdrawal(data) {
    const res = await VenueWithdrawal(data, localStorage.getItem('venue_token'))
    if (res.data.code !== 4001 && res.data.code !== 2000) {
      Toast.fail(res.data.msg, 1);
    } else {
      Toast.success('提现申请成功', 1);
      setTimeout(() => {
        this.props.history.goBack()
      }, 2000)
    }
  }
  comfirm = () => {
    this.VenueWithdrawal({ money: this.state.value })
  }
  reture = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="withdrawalPh" style={this.state.flag===1?{}:{display:'none'}}>
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', width:'48px',height:'48px',left:'0',lineHeight:'48px'}}/>提现</div>
        <div className="white"></div>
        <div className="bankCards">
          <span>{this.state.withdrawalPh.Settlement === 1 ? '法人账户' : '公司银行账户'}</span>
          <span>{this.state.withdrawalPh.legalname}</span>
          <span>{this.state.withdrawalPh.OpeningBank} | {'*****'+this.state.withdrawalPh.Bankaccount}</span>
        </div>
        <div className="white"></div>
        <div className="money">
          <span className="title">提现金额</span>
          <div className="text">
            <span className="moneySon">￥</span><input value={this.state.value} onChange={this.inputValue} type="number" style={{ float: 'right', width: '80%', background: 'transparent' }} />
          </div>
          <div className="bottomSpan">
            <span style={{ display: 'block' }}>{'可用金额' + this.state.money + '元'}</span>
            <span>到账时间 预计2-3个工作日</span>
            <span>提现时间 每月1号、15号</span>
            <div className="all" onClick={this.all}>全部提现</div>
          </div>
        </div>
        <div className="btnMoney" onClick={this.comfirm}>确认提现</div>

      </div>
    );
  }
}

export default withdrawalPh;