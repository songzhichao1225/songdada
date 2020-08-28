import React from 'react';
import './recordPh.css';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Spin } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import { getVenueWithdrawalList } from '../../api';


class recordPh extends React.Component {

  state = {
    recordPhList: [],
    other: 0,
    spin: true,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
    page:1
  };
  async getVenueWithdrawalList(data) {
    const res = await getVenueWithdrawalList(data, localStorage.getItem('venue_token'))
      this.setState({ recordPhList: res.data.data, other: res.data.other.maxcount,maxmoney:res.data.other.maxmoney, spin: false,refreshing:false })
  }


 
  componentDidMount() {
    this.getVenueWithdrawalList({ page: 1 })
   
  }

  current = (page, pageSize) => {
    this.setState({page:page})
    this.getVenueWithdrawalList({ page: page })
  }
  reture = () => {
    this.props.history.goBack()
  }
  refResh=() => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.getVenueWithdrawalList({ page: this.state.page })
    }, 1000);
  }


  render() {
    return (
      <div className="recordPh">


        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left:'0',width:'48px',height:'48px',lineHeight:'48px' }} /> 提现记录</div>
        <div style={{width:'100%',textAlign:'right',paddingRight:'1rem',height:'3rem',lineHeight:'3rem',background:'rgba(245,245,245,1)'}}>总计:￥{this.state.maxmoney}</div>
        <div style={this.state.recordPhList.length>0?{height:'83%',overflowY:'auto',paddingBottom:'3rem'}:{display:'none'}}>
   
        
       
          {
            this.state.recordPhList.map((item, i) => (
              <div className="recordSon" key={i}>
                <div className="left">
                  <span>{item.OpeningBank.slice(0,6)+'***'}|{'**' + item.BankCard.slice(-4)}|{'**' + item.BankName.slice(-1)}</span>
                  <span>{item.SubmitDate}</span>
                </div>
                <div className="right">
                  <span>￥{item.RequestMoney}</span>
                  <span>{item.status === 1 ? '待处理' : '' || item.status === 2 ? '已处理' : '' || item.status === 3 ? '未通过' : ''}</span>
                </div>
              </div>
            ))
          }
           <Pagination className={this.state.recordPhList.length === 0 ? 'hidden' : 'fenye'} hideOnSinglePage={true} showSizeChanger={false} current={this.state.page} onChange={this.current} size='small' defaultCurrent={1} total={this.state.other} />
      
       </div>

        <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />
       
       <div style={this.state.spin === false && this.state.recordPhList.length === 0?{width:'100%'}:{display:'none'}}><img style={{width:'4rem',height:"4rem",display:'block',margin:'4rem auto 0'}} src={require('../../assets/xifen (8).png')}  alt="555"/><span style={{display:'block',textAlign:'center'}}>没有提现记录!</span></div>
      </div>
    )
  }
}

export default recordPh;  