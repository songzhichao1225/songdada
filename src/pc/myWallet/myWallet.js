import React from 'react';
import './myWallet.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList, getVenueWithdrawalList, getVenueWithdrawalOneList,VenueWithdrawal } from '../../api';
import { DatePicker, Row, Col, Pagination, message, Spin, Result, Icon, Input } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const defaultSelectDate = {
  startDate: moment().startOf('day').subtract(6, 'days'),
  endDate: moment().endOf('day')
}





class myWallet extends React.Component {

  state = {
    flag: 1,//是否点击了提现记录
    moneyList: [],//钱包列表
    recordList: [],//提现记录
    loading: true,
    hidden: '',
    hiddenTwo: '',
    walletList:[],
    moneyYuan:'',
    allNow:'',
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
      this.setState({ loading: false, hidden: false })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ moneyList: res.data.data, loading: false, hidden: true })
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
      this.setState({ recordList: res.data.data, hiddenTwo: true })
    }

  }

  componentDidMount() {

    let start = moment().startOf('day').subtract(6, 'days')._d.toLocaleDateString().replace(/\//g, "-")
    let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
    this.getVenueMoneyList({ start: start, end: end, page: 1 })
  }
  record = () => {
    this.setState({ flag: 2 })
    this.getVenueWithdrawalList()
  }
  returnN = () => {
    this.setState({ flag: 1 })
  }
  withdrawal = () => {
    this.setState({ flag: 3 })
    this.getVenueWithdrawalOneList()
  }



  async getVenueWithdrawalOneList(data) {
    const res = await getVenueWithdrawalOneList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({walletList:res.data.data})
    }

  }
  async VenueWithdrawal(data) {
    const res = await VenueWithdrawal(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    }else if(res.data.code === 2000){
      this.setState({ flag: 1 })
      message.info('提现申请成功')
    } else{
     message.info(res.data.msg)
    }

  }
  
  all=()=>{
    this.setState({moneyYuan:this.state.walletList.money})
  }
  allNow=e=>{
    this.setState({moneyYuan:e.target.value})
  }
  comfir=()=>{
    this.VenueWithdrawal({money:this.state.moneyYuan})
  }


  render() {
    return (
      <div>
        <div className={this.state.flag === 1 ? 'myWallet' : 'myWalletNone'}>
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
              <span className="sum">钱包余额(元):0 </span>
              <span className="withdrawal" onClick={this.withdrawal}>申请提现</span>
              <span className="withdrawal" onClick={this.record}>提现记录</span>
            </div>
          </div>
          <div className="xiange"></div>
          <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">
            <div className={this.state.hidden === true ? '' : 'hidden'}>
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
              <Col xs={{ span: 4, offset: 0 }}>账户名称</Col>
              <Col xs={{ span: 4, offset: 0 }}>处理时间</Col>
              <Col xs={{ span: 4, offset: 0 }}>金额</Col>
              <Col xs={{ span: 4, offset: 0 }}>提现进度</Col>
            </Row>
            {
              this.state.recordList.map((item, i) => (
                <Row key={i} >
                  <Col className="oneText" xs={{ span: 4 }}>{item.SubmitDate}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.bankCarType}|{item.BankCard}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.RequestMoney}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.minxi}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.status}</Col>
                </Row>
              ))
            }
          </div>
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
            <span style={{marginLeft:-15}}>提现银行卡:</span><span className="textNext">{this.state.walletList.Bankaccount} {this.state.walletList.OpeningBank}</span>
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
              <span>体现时间:</span>
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