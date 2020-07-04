import React from 'react';
import './monthlyIncomePh.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList } from '../../api';

import { Toast, DatePicker,List,PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Spin } from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import moment from 'moment';
class monthlyIncomePh extends React.Component {

  state = {
    getVenueMoneyList: '',
    moneyList: [],
    start: '',
    end: '',
    current: 1,
    flag: false,
    spin: true,
  };
  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, localStorage.getItem('venue_token'))

   
     if (res.data.data.data !== undefined) {
      this.setState({ getVenueMoneyList: res.data.data, spin: false })
      this.setState({ moneyList: res.data.data.data, flag: false,refreshing:false })
    } else {
      Toast.fail(res.data.msg, 1)
      this.setState({ flag: true,refreshing:false })
    }
  }



  componentDidMount() {
    if (sessionStorage.getItem('income') === undefined) {
      this.props.history.goBack()
    } else {
      if (sessionStorage.getItem('income') === 'month') {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d
        let end = moment().endOf('day')._d
        this.setState({ qiStart: new Date(start), qiEnd: new Date(end) })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      } else if (sessionStorage.getItem('income') === 'day') {
        let start = moment().startOf('day')._d
        let end = moment().endOf('day')._d
        this.setState({ qiStart: new Date(start), qiEnd: new Date(end) })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      }else if(sessionStorage.getItem('qiStart')!==undefined){
    
        this.setState({ qiStart:new Date(sessionStorage.getItem('qiStart')) , qiEnd: new Date(sessionStorage.getItem('qiEnd')) })
        this.getVenueMoneyList({ start: new Date(sessionStorage.getItem('qiStart')), end: new Date(sessionStorage.getItem('qiEnd')), page: 1 })
      } else {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d
        let end = moment().endOf('day')._d
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
        this.setState({ qiStart: new Date(start), qiEnd: new Date(end)})
      }
    }
  }

  
  startDate = (date) => {
    this.setState({ start: date,qiStart: date  })
    this.getVenueMoneyList({ start: date.toLocaleDateString().replace(/\//g, "-"), end: this.state.end, page: this.state.current })
  }

  endDate = (date) => {
    this.setState({ end: date,qiEnd: date  })
    this.getVenueMoneyList({ start: this.state.start, end: date.toLocaleDateString().replace(/\//g, "-"), page: this.state.current })
  }

  

  pageChang = (page, pageSize) => {
    this.setState({ current: page })
    this.getVenueMoneyList({ start: this.state.qiStart, end: this.state.qiEnd, page: page })
  }

  detail = e => {
    this.props.history.push({ pathname: '/homePh/monthlyIncomePh/moneyDetailPh', query: e.currentTarget.dataset })
  }          

  reture = () => {
    this.props.history.goBack() 
  }

  refResh=() => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.getVenueMoneyList({ start: this.state.qiStart, end: this.state.qiEnd, page: this.state.current })
    }, 1000)
  }
  qiEnd=e=>{
    this.setState({qiEnd:e,current:1})
    this.getVenueMoneyList({ start: this.state.qiStart, end:e, page: 1 })

  }
  qiStart=e=>{
    console.log(e)
    this.setState({qiStart:e,current:1})
    this.getVenueMoneyList({ start:e, end: this.state.qiEnd, page: 1 })
  }

  render() {
    return (
      <div className="monthlyIncomePh">
        <div className="headerTitle">
          <LeftOutlined  onClick={this.reture} style={{ position: 'absolute', left:'0',width:'48px',height:'48px',lineHeight:'48px' }}/>
          {sessionStorage.getItem('income') === 'all'?'钱包明细':'' || sessionStorage.getItem('income')  === 'month' ? '本月收入' : '钱包明细' || sessionStorage.getItem('income')  === 'day' ? '今日收入' : '钱包明细'}
        </div>
        <div className="timer">
        <div style={sessionStorage.getItem('income')=== 'all' ?{}:{display:'none'}}>
          <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={this.state.qiStart}
          onChange={this.qiStart}
        >
          <List.Item  className="start" ></List.Item>
        </DatePicker>

         
             <span style={{float:'left',lineHeight:'3rem',marginLeft:'0.5rem',display:'block'}}>至</span>

          <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={this.state.qiEnd}
          onChange={this.qiEnd}
        >
          <List.Item  className="start" ></List.Item>
        </DatePicker>
        </div>

          <span className="text">收入￥{this.state.getVenueMoneyList.whereMoney === undefined ? '0.00' : this.state.getVenueMoneyList.whereMoney}</span>
        </div>

        <div className={this.state.moneyList.length!==0 ? 'content' : 'contentNone'}>

 
        <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'up' : 'down'}
        refreshing={this.state.refreshing}
        onRefresh={this.refResh}
      >
         <div className="moneyScroll">
            {
              this.state.moneyList.map((item, i) => (
                <div className="contentSon" key={i} data-time={item.time} data-money={item.money} data-public={item.public} data-qiStart={this.state.qiStart} data-qiEnd={this.state.qiEnd} onClick={this.detail}>
                  <div className="left"><span>场地费</span><span>{item.time}</span></div>
                  <img className="image" src={require("../../assets/right.png")} alt="下一步" />
                  <span className="right">+{item.money}</span>
                </div>
              )) 
            }

            <Pagination className="fenye" current={parseInt(this.state.current)}  hideOnSinglePage={true} showSizeChanger={false} size="small"  pageSize={10} total={this.state.getVenueMoneyList.count} onChange={this.pageChang} />
          </div>

      </PullToRefresh>

        </div>
        <div style={this.state.moneyList.length===0 ?{width:'100%'}:{display:'none'}}><img style={{width:'4rem',height:'4rem',display:'block',margin:'4rem auto 0'}} src={require('../../assets/xifen (7).png')} alt="555"/><span style={{display:'block',textAlign:'center'}}>您还没有收入!</span></div>
       <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />

      </div>
    )
  }
}

export default monthlyIncomePh