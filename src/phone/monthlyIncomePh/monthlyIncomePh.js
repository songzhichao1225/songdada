import React from 'react';
import './monthlyIncomePh.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList } from '../../api';

import { Toast, DatePicker,List,PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Result, Spin } from 'antd';
import {MoneyCollectOutlined,ArrowLeftOutlined} from '@ant-design/icons';
import moment from 'moment';
class monthlyIncomePh extends React.Component {

  state = {
    getVenueMoneyList: '',
    moneyList: [],
    start: '',
    end: '',
    current: '1',
    flag: '',
    spin: true,
  };
  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, localStorage.getItem('venue_token'))
    this.setState({ getVenueMoneyList: res.data.data, spin: false })

    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else if (res.data.data.data !== undefined) {
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
      } else {
        let start = moment().startOf('day')._d
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

  render() {
    return (
      <div className="monthlyIncomePh">
        <div className="headerTitle">
          <ArrowLeftOutlined onClick={this.reture} style={{ position: 'absolute', left:'0',width:'48px',height:'48px',lineHeight:'48px' }}/>
          {this.props.location.query !== undefined && this.props.location.query.income === 'month' ? '钱包明细' : '钱包明细'}
        </div>
        <div className="timer">
          {/* <DatePicker
            mode="date"
            extra="Optional"
            title='选择日期'
            onChange={this.startDate}
            value={this.state.qiStart}
          >
            <div className="start" style={{ lineHeight: '2rem', fontSize: '12px' }}>{this.state.start}</div>
          </DatePicker> */}


          <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={this.state.qiStart}
          onChange={qiStart => this.setState({ qiStart })}
        >
          <List.Item  className="start" ></List.Item>
        </DatePicker>

          {/* <DatePicker
            mode="date"
            extra="Optional"
            title='选择日期'
            onChange={this.endDate}
            value={this.state.qiEnd}
          >
            <div className="start" style={{ lineHeight: '2rem', fontSize: '12px' }}>{this.state.end}</div>
          </DatePicker> */}
             <span style={{float:'left',lineHeight:'3rem',marginLeft:'0.5rem',display:'block'}}>至</span>

          <DatePicker
          mode="date"
          title="选择日期"
          extra="Optional"
          value={this.state.qiEnd}
          onChange={qiEnd => this.setState({ qiEnd })}
        >
          <List.Item  className="start" ></List.Item>
        </DatePicker>

          <span className="text">收入￥{this.state.getVenueMoneyList.whereMoney === undefined ? '0.00' : this.state.getVenueMoneyList.whereMoney}</span>
        </div>

        <div className={this.state.flag === false ? 'content' : 'contentNone'}>

 
        <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
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
                <div className="contentSon" key={i} data-time={item.time} data-money={item.money} data-public={item.public} onClick={this.detail}>
                  <div className="left"><span>场地费</span><span>{item.time}</span></div>
                  <img className="image" src={require("../../assets/right.png")} alt="下一步" />
                  <span className="right">+{item.money}</span>
                </div>
              )) 
            }

            <Pagination className="fenye" current={parseInt(this.state.current)} size="small" pageSize={10} total={this.state.getVenueMoneyList.count} onChange={this.pageChang} />
          </div>

      </PullToRefresh>

        </div>
        <Result className={this.state.spin === false && this.state.flag === true ? '' : 'contentNone'} icon={ <MoneyCollectOutlined style={{ fontSize: '2rem',color:'#F5A623' }}/>} title="您还没有收入" />
        <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />

      </div>
    )
  }
}

export default monthlyIncomePh