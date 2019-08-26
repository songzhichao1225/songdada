import React from 'react';
import './myWallet.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList, getVenueWithdrawalList } from '../../api';
import { DatePicker, Row, Col, Pagination, message } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const defaultSelectDate = {
  startDate: moment().startOf('day').subtract(6, 'days'),
  endDate: moment().endOf('day')
}





class myWallet extends React.Component {

  state = {
    flag: false,//是否点击了提现记录
    moneyList: [],//钱包列表
    recordList: [],//提现记录
    list: [
      { time: '2018-5-02', minxi: 'sruhgdnjfgihdfvgndiurhgdrjgiej', money: '￥300' },
      { time: '2018-5-02', minxi: 'sruhgdnjfgihdfvgndiurhgdrjgiej', money: '￥300' },
      { time: '2018-5-02', minxi: 'sruhgdnjfgihdfvgndiurhgdrjgiej', money: '￥300' },
      { time: '2018-5-02', minxi: 'sruhgdnjfgihdfvgndiurhgdrjgiej', money: '￥300' },
      { time: '2018-5-02', minxi: 'sruhgdnjfgihdfvgndiurhgdrjgiej', money: '￥300' },
    ],
  };

  dateChange = (data, dateString) => {
    console.log(dateString)
  }

  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, sessionStorage.getItem('venue_token'))
    console.log(res)
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else {
      this.setState({ moneyList: res.data.data })
    }

  }



  async getVenueWithdrawalList(data) {
    const res = await getVenueWithdrawalList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    }else if(res.data.data.length<1){
      message.error('没有更多的提现记录')
    } else {
      this.setState({ recordList: res.data.data })
    }

  }

  componentDidMount() {

    let start = moment().startOf('day').subtract(6, 'days')._d.toLocaleDateString().replace(/\//g, "-")
    let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
    this.getVenueMoneyList({ start: start, end: end, page: 1 })
  }
  record = () => {
    this.setState({ flag: true })

    this.getVenueWithdrawalList()
  }



  render() {
    return (
      <div>
        <div className={this.state.flag === false ? 'myWallet' : 'myWalletNone'}>
          <div className="xiange"></div>
          <div className="header">
            <span className="select">选择时间</span>
            <RangePicker
              defaultValue={[defaultSelectDate.startDate, defaultSelectDate.endDate]}
              placeholder={['开始日期', '结束日期']}
              onChange={this.dateChange}
            />
            <span className="query">查询</span>
            <div className="rightMoney">
              <span className="sum">钱包余额(元): </span>
              <span className="withdrawal">申请提现</span>
              <span className="withdrawal" onClick={this.record}>提现记录</span>
            </div>
          </div>
          <div className="xiange"></div>
          <Row>
            <Col className="oneText" xs={{ span: 4 }}>到账时间</Col>
            <Col xs={{ span: 8, offset: 4 }}>明细</Col>
            <Col xs={{ span: 4, offset: 4 }}>金额(元)</Col>
          </Row>
          {
            this.state.moneyList.map((item, i) => (
              <Row key={i} >
                <Col className="oneText" xs={{ span: 4 }}>{item.time}</Col>
                <Col xs={{ span: 8, offset: 4 }}>{item.public}</Col>
                <Col xs={{ span: 4, offset: 4 }}>{item.money}</Col>
              </Row>
            ))
          }
          <Pagination defaultCurrent={1} className={this.state.moneyList.length < 1 ? 'myWalletNone' : 'fenye'} total={10} />
        </div>
        <div className={this.state.flag === true ? 'record myWallet' : 'myWalletNone'}>
          <div className="xiange"></div>
          <div className="header">
            <span className="previousStep">我的钱包 ></span><span>提现记录</span>
          </div>
          <div className="xiange"></div>
          <Row>
            <Col className="oneText" xs={{ span: 4 }}>申请时间</Col>
            <Col xs={{ span: 4, offset: 0 }}>账户名称</Col>
            <Col xs={{ span: 4, offset: 0 }}>处理时间</Col>
            <Col xs={{ span: 4, offset: 0 }}>金额</Col>
            <Col xs={{ span: 4, offset: 0 }}>提现进度</Col>
            <Col xs={{ span: 4, offset: 0 }}>操作</Col>
          </Row>
          {
            this.state.recordList.map((item, i) => (
              <Row key={i} >
                <Col className="oneText" xs={{ span: 4 }}>{item.SubmitDate}</Col>
                <Col xs={{ span: 4, offset: 0 }}>{item.bankCarType}|{item.BankCard}</Col>
                <Col xs={{ span: 4, offset: 0 }}>{item.RequestMoney}</Col>
                <Col xs={{ span: 4, offset: 0 }}>{item.minxi}</Col>
                <Col xs={{ span: 4, offset: 0 }}>{item.status}</Col>
                <Col xs={{ span: 4, offset: 0 }}><img src={require('../../assets/icon_pc_delet.png')} alt="删除"/></Col>
              </Row>
            ))
          }

        </div>


      </div>
    );
  }
}

export default myWallet;