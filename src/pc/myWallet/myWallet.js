import React from 'react';
import './myWallet.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList, getVenueWithdrawalList, getVenueWithdrawalOneList, VenueWithdrawal } from '../../api';
import { DatePicker, Row, Col, Pagination, message, Spin, Result, Icon, Input } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;






class myWallet extends React.Component {

  state = {
    flag: 1,//是否点击了提现记录
    moneyList: [],//钱包列表
    recordList: [],//提现记录
    loading: true,
    hidden: '',
    hiddenTwo: '',
    walletList: [],
    moneyYuan: '',
    allNow: '',
    sumMoney: '0',
    whereMoney: '0',
    start: '',
    end: '',
    dateString: [],
    other: 0,
    page: 1,
    recordListOther: '',
  };

  dateChange = (data, dateString) => {
    this.setState({ dateString: dateString, start: dateString[0], end: dateString[1] })
  }
  search = () => {
    this.getVenueMoneyList({ start: this.state.dateString[0], end: this.state.dateString[1], page: this.state.page })

  }

  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, sessionStorage.getItem('venue_token'))

    if (res.data.code !== 2000) {
      this.setState({ loading: false, hidden: false })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ moneyList: res.data.data.data, sumMoney: res.data.data.sumMoney, whereMoney: res.data.data.whereMoney, other: parseInt(res.data.data.count), loading: false, hidden: true })
    }
  }

  async getVenueWithdrawalList(data) {
    const res = await getVenueWithdrawalList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.data.length < 1) {
      this.setState({ hiddenTwo: false })
    } else {
      this.setState({ recordList: res.data.data, recordListOther: res.data.other, hiddenTwo: true })
    }
  }

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      if (this.props.location.query.time === 1) {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      } else if (this.props.location.query.time === 2) {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      }
    } else if (this.props.location.query === undefined) {
      let start = moment().startOf('day').subtract(6, 'days')._d.toLocaleDateString().replace(/\//g, "-")
      let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
      this.setState({ start: start, end: end })
      this.getVenueMoneyList({ start: start, end: end, page: 1 })
    }

  }
  record = () => {
    this.setState({ flag: 2 })
    this.getVenueWithdrawalList({ page: 1 })
  }
  returnN = () => {
    this.setState({ flag: 1 })
  }
  withdrawal = () => {
    this.setState({ flag: 3 })
    this.getVenueWithdrawalOneList()
  }

  moneyFen = (page, pageSize) => {
    this.setState({ page: page })
    this.getVenueMoneyList({ start: this.state.start, end: this.state.end, page: page })
  }



  async getVenueWithdrawalOneList(data) {
    const res = await getVenueWithdrawalOneList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ walletList: res.data.data })
    }
  }
  async VenueWithdrawal(data) {
    const res = await VenueWithdrawal(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.code === 2000) {
      this.setState({ flag: 1 })
      message.info('提现申请成功')
    } else {
      message.info(res.data.msg)
    }
  }
  all = () => {
    this.setState({ moneyYuan: this.state.walletList.money })
  }
  allNow = e => {
    this.setState({ moneyYuan: e.target.value })
  }
  comfir = () => {
    this.VenueWithdrawal({ money: this.state.moneyYuan })
  }
  recordListOther = (page, pageSize) => {
    this.getVenueWithdrawalList({ page: page })
  }
  render() {
    return (
      <div>
        <div className={this.state.flag === 1 ? 'myWallet' : 'myWalletNone'}>
          <div className="xiange"></div>
          <div className="header">
            <span className="select">选择时间</span>
            <RangePicker
              placeholder={[this.state.start, this.state.end]}
              onChange={this.dateChange}
            />
            <span className="query" onClick={this.search}>查询</span>
            <div className="rightMoney">
              <span className="sum">钱包余额(元): ￥{this.state.sumMoney} </span>
              <span className="withdrawal" onClick={this.withdrawal}>申请提现</span>
              <span className="withdrawal" onClick={this.record}>提现记录</span>
            </div>
          </div>
          <div className="xiange"></div>
          <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">
            <div className={this.state.hidden === true ? '' : 'hidden'}>
              <Row>
                <Col className="oneText" xs={{ span: 4 }}>到账时间</Col>
                <Col xs={{ span: 16 }}>明细</Col>
                <Col xs={{ span: 4, }}>金额(元)</Col>
              </Row>
              {
                this.state.moneyList.map((item, i) => (
                  <Row key={i} >
                    <Col className="oneText" xs={{ span: 4 }}>{item.time}</Col>
                    <Col xs={{ span: 16 }}>{item.public}</Col>
                    <Col xs={{ span: 4 }}>￥{item.money}</Col>
                  </Row>
                ))
              }
              <span style={{ float: 'right', marginRight: '110px', marginTop: '30px' }}>查询期间收入(元)：￥{this.state.whereMoney}</span>
              <Pagination defaultCurrent={1} className={this.state.moneyList.length < 1 ? 'myWalletNone' : 'fenye'} onChange={this.moneyFen} total={this.state.other} />
            </div>
            <Result className={this.state.hidden === true ? 'hidden' : ''} icon={<Icon type="money-collect" theme="twoTone" twoToneColor="#F5A623" />} title="还没有人预约您的场馆！" />
          </Spin>
        </div>
        <div className={this.state.flag === 2 ? 'record myWallet' : 'myWalletNone'}>
          <div className="xiange"></div>
          <div className="header">
            <span className="previousStep" onClick={this.returnN}>我的钱包 ></span><span>提现记录</span>
          </div>
          <div className="xiange"></div>
          <div className={this.state.hiddenTwo === true ? '' : 'hidden'}>
            <Row>
              <Col className="oneText" xs={{ span: 4 }}>申请时间</Col>
              <Col xs={{ span: 7, offset: 0 }}>账户名称</Col>
              <Col xs={{ span: 4, offset: 0 }}>处理时间</Col>
              <Col xs={{ span: 4, offset: 0 }}>金额</Col>
              <Col xs={{ span: 4, offset: 0 }}>提现进度</Col>
            </Row>
            {
              this.state.recordList.map((item, i) => (
                <Row key={i} >
                  <Col className="oneText" xs={{ span: 4 }}>{item.SubmitDate}</Col>
                  <Col xs={{ span: 7, offset: 0 }}>{item.OpeningBank}|{'*' + item.BankCard.slice(-4)}|{'*' + item.BankName.slice(-1)}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.FinishedDate === null ? '---' : item.FinishedDate}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>￥{item.RequestMoney}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.status === 1 ? '待处理' : ''||item.status === 2 ? '已处理' : ''||item.status === 3 ? '未通过' : ''}</Col>
                </Row>
              ))
            }
          </div>
          <Pagination className="fenye" defaultCurrent={1} onChange={this.recordListOther} total={this.state.recordListOther===''?0:this.state.recordListOther} />
          <Result className={this.state.hiddenTwo === true ? 'hidden' : ''} icon={<Icon type="reconciliation" theme="twoTone" twoToneColor="#F5A623" />} title="您还没有提现记录！" />
        </div>
        <div className={this.state.flag === 3 ? 'withdrawal myWallet' : 'myWalletNone'}>

          <div className="xiange"></div>
          <div className="header">
            <span className="previousStep" onClick={this.returnN}>我的钱包 ></span><span>提现</span>
          </div>
          <div className="xiange"></div>
          <div className="balance">
            <span>钱包余额</span> <span>{this.state.walletList.money}</span><span>元</span>
          </div>
          <div className="home">
            <span style={{ marginLeft: -15 }}>提现银行卡:</span><span className="textNext">{this.state.walletList.Bankaccount} {this.state.walletList.OpeningBank}</span>
            <div className="listSon">
              
              <span>提现金额:</span>
              <Input className="input" onChange={this.allNow} value={this.state.moneyYuan} />元
              <span className="all" onClick={this.all}>全部提现</span>
            </div>
            <div className="listSon">
              <span>到账时间:</span>
              <span className="textNext">预计 2-3 个工作日到账</span>
            </div>
            <div className="listSon">
              <span>提现时间:</span>
              <span className="textNext">每月1号、15号</span>
            </div>
            <div className="comfir" onClick={this.comfir}>确定</div>

          </div>



        </div>





      </div>
    );
  }
}

export default myWallet;