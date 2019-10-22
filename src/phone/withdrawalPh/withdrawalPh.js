import React from 'react';
import './withdrawalPh.css';
import { message,Icon } from 'antd';
import { getVenueWithdrawalOneList,getVenueMoney, VenueWithdrawal} from '../../api';


class withdrawalPh extends React.Component {

  state = {
    withdrawalPh:'',
    money:0.00,
    value:'',
  };

  async getVenueWithdrawalOneList(data) {
    const res = await getVenueWithdrawalOneList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if (res.data.code === 2000) {
      this.setState({ withdrawalPh: res.data.data })
    }
  }

  async getVenueMoney(data) {
    const res = await getVenueMoney(data,localStorage.getItem('venue_token'))
  
     
      this.setState({money:res.data.data.money})
    
  }

  componentDidMount() {
    this.getVenueWithdrawalOneList()
    this.getVenueMoney()
  }
  inputValue=e=>{
    this.setState({value:e.target.value})
  }
  all=()=>{
    this.setState({value:this.state.money})
  }
  async VenueWithdrawal(data) {
    const res = await VenueWithdrawal(data,localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      message.error('登录超时请重新登录')
    } else if(res.data.code!==4001&&res.data.data!==2000) {
      message.error(res.data.msg)
    }else{
      message.info('提现成功')
      setTimeout(()=>{
           this.props.history.goBack()
      },1000)
    }
  }
  comfirm=()=>{
    this.VenueWithdrawal({money:this.state.value})
  }
  reture=()=>{
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="withdrawalPh">
        <div className="headTitle"><Icon type="arrow-left" onClick={this.reture} style={{position:'absolute',left:'5%',top:'35%'}}/>提现</div>
        <div className="white"></div>
        <div className="bankCards">
          <span>{this.state.withdrawalPh.Settlement === 2 ? '法人账户' : '公司银行账户'}</span>
          <span>{this.state.withdrawalPh.Settlement === 2 ? "**" + this.state.withdrawalPh.legalname.slice(-1) : this.state.withdrawalPh.legalname}</span>
          <span>{this.state.withdrawalPh.OpeningBank} {this.state.withdrawalPh.Bankaccount}</span>
        </div>
        <div className="white"></div>
        <div className="money">
          <span className="title">提现金额</span>
          <div className="text">
            <span className="moneySon">￥</span><input value={this.state.value} onChange={this.inputValue} type="number" style={{float:'right',width:'80%',background:'transparent'}} />
          </div>
          <div className="bottomSpan">
            <span style={{display:'block'}}>{'可用金额'+this.state.money+'元'}</span>
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