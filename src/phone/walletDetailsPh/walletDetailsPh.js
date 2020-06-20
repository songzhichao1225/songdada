import React from 'react';
import './walletDetailsPh.css';

import { } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { DatePicker, Pagination,Result } from 'antd';
import {MoneyCollectOutlined} from '@ant-design/icons';
import { getVenueMoneyList } from '../../api';
import moment from 'moment';
let start = moment().startOf('day').subtract(1, 'months')._d.toLocaleDateString().replace(/\//g, "-")
let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
let startTwo=start.split('-')
const startDate=startTwo[0]+'-'+startTwo[1]+'-'+startTwo[2]
let endTwo=end.split('-')
const endDate=endTwo[0]+'-'+endTwo[1]+'-'+endTwo[2]
class walletDetailsPh extends React.Component {

  state = {
    details: [],
    other: [],
    startDate: '',
    endDate: '',
    start:'',
    end:'',
    page:1
  };

  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, localStorage.getItem('venue_token'))
   if (res.data.code === 2000) {
      this.setState({ details: res.data.data.data, other: res.data.data })
    }
  }
  componentDidMount() {
    this.setState({startDate:startDate,endDate:endDate})
    this.getVenueMoneyList({ page: 1, start: startDate, end: endDate })
  }

  current = (page, pageSize) => {
    this.setState({page:page})
    this.getVenueMoneyList({ page: page, start: this.state.startDate, end: this.state.endDate })
  }

  onChangeStart=(dates,dataString)=>{
   this.setState({startDate:dataString})
   this.getVenueMoneyList({ page: 1, start: dataString, end: this.state.endDate })
  }

  onChangeEnd=(dates,dataString)=>{
    this.setState({endDate:dataString})
    this.getVenueMoneyList({ page: 1, start: this.state.startDate, end: dataString })
   }
 



  render() {
    return (
      <div className="walletDetailsPh">
        <div className="headTitle">钱包明细</div>
        <div className="timer">
          <DatePicker className="leftTime" defaultValue={moment(startDate, 'YYYY-MM-DD')} onChange={this.onChangeStart} /> 至 <DatePicker className="rightTime" defaultValue={moment(endDate, 'YYYY-MM-DD')} onChange={this.onChangeEnd} />
          <div className="rightMoneyAll">
            <span>收入 ￥{this.state.other.sumMoney}</span>
            <span>支出 ￥{this.state.other.whereMoney}</span>
          </div>
        </div>
        {
          this.state.details.map((item, i) => (
            <div className="sonList" key={i}>
              <div className="sonLeft"><span>{item.type === 1 ? '场地费' : '提现'}</span><span>{item.happeneddate}</span></div>
              <img className="arrow" src={require('../../assets/right.png')} alt="arrow" />
              <span className="moneyNum" style={item.type === 1 ? { color: 'rgba(216,93,39,1)' } : { color: '#333' }}>￥{item.money}</span>
            </div>
          ))
        }
        <Pagination className={this.state.details.length===0?'hidden':'fenye'} size="small" hideOnSinglePage={true} showSizeChanger={false} current={this.state.page} defaultCurrent={1} onChange={this.current} total={this.state.other.count} />
        <Result className={this.state.details.length===0?'':'hidden'} icon={<MoneyCollectOutlined />} title="没有发布消息" />
      </div>
    );
  }
}

export default walletDetailsPh;