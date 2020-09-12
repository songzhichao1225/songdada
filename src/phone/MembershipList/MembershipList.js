import React from 'react';
import './MembershipList.css';
import { LeftOutlined } from '@ant-design/icons';
import { getVenueMembershipCardConsumptionList } from '../../api';
import { DatePicker, List } from 'antd-mobile';
import moment from 'moment';
import {Pagination } from 'antd';
class MembershipList extends React.Component {

  state = {
    chargeDetails: [],
    sumptionList: [],
    sumptionListNum: 0,
    sumptionListMoney:0,
    index: 1,
    pageTwo:1
  };

  async getVenueMembershipCardConsumptionList(data) {
    const res = await getVenueMembershipCardConsumptionList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ sumptionList: res.data.data, sumptionListNum: res.data.other.maxcount, sumptionListMoney:res.data.other.sumMoney})
    }
  }


  componentDidMount() {
    let myDate = new Date()
    let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
    let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
    console.log(start, end)
    this.getVenueMembershipCardConsumptionList({ page: this.state.pageTwo, type: this.state.index, startdate: start, enddate: end })
    this.setState({ qiStart: start, qiEnd: end })
  }

  Income = () => {
    this.setState({ index: 2, sumptionList: [] })
    this.getVenueMembershipCardConsumptionList({ page: this.state.pageTwo, type: 2, startdate: this.state.qiStart, enddate: this.state.qiEnd })
  }
  Outlay = () => {
    this.setState({ index: 1, sumptionList: [] })
    this.getVenueMembershipCardConsumptionList({ page: this.state.pageTwo, type: 1, startdate: this.state.qiStart, enddate: this.state.qiEnd })
  }


  sumptionListNumPage=(page,pageSize)=>{
    this.setState({pageTwo:page})
    this.getVenueMembershipCardConsumptionList({ page: page, type: this.state.index, startdate: this.state.qiStart, enddate: this.state.qiEnd })
 }

 qiStart=e=>{
   this.getVenueMembershipCardConsumptionList({ page: this.state.pageTwo, type: this.state.index, startdate: e.toLocaleDateString().replace(/\//g, "-"), enddate: this.state.qiEnd })
 }

 qiEnd=e=>{
  this.getVenueMembershipCardConsumptionList({ page: this.state.pageTwo, type: this.state.index, startdate: this.state.qiStart, enddate: e.toLocaleDateString().replace(/\//g, "-")})
}

  reture = () => {
    this.props.history.goBack()
  }


  render() {
    return (
      <div className="MembershipList" >
        <div className="headTitle"><LeftOutlined onClick={this.reture} style={{ position: 'absolute', left: '0', width: '48px', height: '48px', lineHeight: '48px' }} />会员卡明细</div>
        <div className="select"><span style={this.state.index === 1 ? { color: '#D85D27' } : {}} onClick={this.Outlay}>支出<span className="bottomSolid" style={this.state.index === 1 ? {} : { display: 'none' }}></span></span><span style={this.state.index === 2 ? { color: '#D85D27' } : {}} onClick={this.Income}>收入<span className="bottomSolid" style={this.state.index === 2 ? {} : { display: 'none' }}></span> </span></div>
        <div className="timeSelect">

          <DatePicker
            mode="date"
            title="选择日期"
            extra="Optional"
            value={new Date(this.state.qiStart)}
            onChange={this.qiStart}
          >
            <List.Item className="start"></List.Item>
          </DatePicker>
          <span style={{ float: 'left', lineHeight: '3rem', marginLeft: '0.5rem', display: 'block' }}>至</span>
          <DatePicker
            mode="date"
            title="选择日期"
            extra="Optional"
            value={new Date(this.state.qiEnd)}
            onChange={this.qiEnd}
          >
            <List.Item className="start" ></List.Item>
          </DatePicker>
          <span className="titleRight">{this.state.index===1?'支出':'收入'} ￥{this.state.sumptionListMoney}</span>

        </div>

        <div className="content">

          {this.state.sumptionList.map((item, i) => (
            <div className="listSon" key={i}>
              <div>
                <span style={this.state.index === 2 ? {} : { display: 'none' }}>充值{item.PlanRecharge}，送{item.givemoney}</span>
                <span style={this.state.index === 1 ? {} : { display: 'none' }}>ID：{item.orderid}</span>
                <span style={{ color: '#9B9B9B' }}>{item.date}</span>
              </div>
              <div>
                <span style={this.state.index === 2 ? { color: '#D85D27', fontSize: '0.88rem', lineHeight: '3rem' } : { display: 'none' }}>+{Number(item.PlanRecharge) + Number(item.givemoney) + '.00'}</span>
                <span style={this.state.index === 1 ? { color: '#D85D27', fontSize: '0.88rem', lineHeight: '3rem' } : { display: 'none' }}>-{item.money}</span>
              </div>
            </div>
          ))}
            <div style={this.state.sumptionList.length===0?{textAlign:'center',padding:'20px 0',borderTop:'1px solid #e1e0e1'}:{display:'none'}}>暂无{this.state.index===1?'支出':'收入'}明细</div>
            <Pagination className={this.state.sumptionList.length!==0 ? 'fenye' : 'hidden'} current={this.state.pageTwo} showSizeChanger={false} hideOnSinglePage={true} onChange={this.sumptionListNumPage} total={this.state.sumptionListNum === '' ? 0 : this.state.sumptionListNum} />
          




        </div>
      </div>
    );
  }
}

export default MembershipList;