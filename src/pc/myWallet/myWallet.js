import React from 'react';
import './myWallet.css';
import 'antd/dist/antd.css';
import { getVenueMoneyList, getVenueWithdrawalList, getVenueWithdrawalOneList, VenueWithdrawal } from '../../api';
import { DatePicker, Row, Col, Pagination, message,  Input } from 'antd';
import {} from '@ant-design/icons';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';

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
    pageOne:1,
    kod:0,
    maxmoney:'0.00',
    koL:true
  }

  dateChange = (data, dateString) => {
    
    this.setState({ dateString: dateString, start: dateString[0], end: dateString[1],kod:1 })
  }
  search = () => {
    this.setState({kod:0})
    this.getVenueMoneyList({ start: this.state.dateString[0], end: this.state.dateString[1], page: 1 })
  }
 
  async getVenueMoneyList(data) {
    const res = await getVenueMoneyList(data, sessionStorage.getItem('venue_token'))

    if (res.data.code !== 2000) {
      this.setState({ loading: false, hidden: false })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else {
      this.setState({ moneyList: res.data.data.data, sumMoney: res.data.data.sumMoney, whereMoney: res.data.data.whereMoney, other: parseInt(res.data.data.count), loading: false, hidden: true })
    }
  }

  async getVenueWithdrawalList(data) {
    const res = await getVenueWithdrawalList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.data.length < 1) {
      this.setState({ hiddenTwo: false })
    } else {
      this.setState({ recordList: res.data.data, recordListOther: res.data.other.maxcount,maxmoney:res.data.other.maxmoney, hiddenTwo: true })
    }
  }

  componentDidMount() {
    setInterval(() => {
      if(sessionStorage.getItem('wallet')==='false'){
        this.setState({flag:1})
        sessionStorage.setItem('wallet',true)
      }
    }, 50);
    console.log(sessionStorage.getItem('incomtime'))
    if (sessionStorage.getItem('incomtime') !== 'null'&&sessionStorage.getItem('incomtime') !== null) {
      if (sessionStorage.getItem('incomtime')=== '1') {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end,dateString:[start,end],koL:false })
        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      } else if (sessionStorage.getItem('incomtime') === '2') {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end,dateString:[start,end],koL:false }) 

        this.getVenueMoneyList({ start: start, end: end, page: 1 })
      }
    } else if (sessionStorage.getItem('incomtime') === 'null') {
      let start = moment().startOf('day').subtract(6, 'days')._d.toLocaleDateString().replace(/\//g, "-")
      let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
      this.setState({ start: start, end: end,dateString:[start,end],koL:true })
      this.getVenueMoneyList({ start: start, end: end, page: 1 })
    }

  }
  record = () => {
    this.setState({ flag: 2,pageOne:1 })
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
      message.error('登录超时请重新登录!')
    } else {
      res.data.data.Bankaccount=res.data.data.Bankaccount.slice(res.data.data.Bankaccount.length-4,res.data.data.Bankaccount.length)
      res.data.data.legalname='***'+res.data.data.legalname.slice(-1)
      this.setState({ walletList: res.data.data })
    }
  }
  async VenueWithdrawal(data) {
    const res = await VenueWithdrawal(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.setState({ flag: 1 })
      message.success('提现申请成功')
      this.getVenueMoneyList({ start: this.state.dateString[0], end: this.state.dateString[1], page: 1 })
    } else {
      message.error(res.data.msg)
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
    this.setState({pageOne:page})
    this.getVenueWithdrawalList({ page: page })
  }
  render() {
    return (
      <div style={{height:'98%'}}>
        <div className={this.state.flag === 1 ? 'myWallet' : 'myWalletNone'}>
          <div className="header">
            <span className="select"></span>
            <RangePicker
              placeholder={[this.state.start, this.state.end]}
              style={this.state.koL===false?{display:'none'}:{marginTop:'8px',float:'left',marginLeft:'10px'}}
              locale={locale}
              allowClear={false}
              onChange={this.dateChange}
            />
            <span className="query" style={this.state.kod===1?{display:'block'}:{display:'none'}} onClick={this.search}>查询</span>
            <div className="rightMoney">
              <span className="sum">钱包余额(元): ￥{this.state.sumMoney} </span>
              <span className="withdrawal" onClick={this.withdrawal}>申请提现</span>
              <span className="withdrawal" onClick={this.record}>提现记录</span>
            </div>
          </div>
          <div className="xiange"></div>
            <div className={this.state.moneyList.length !==0 ? 'listMoney' : 'hidden'} >
              <Row>
                <Col className="oneText" xs={{ span: 4 }}>到账时间</Col>
                <Col xs={{ span: 16 }}>明细</Col>
                <Col xs={{ span: 4, }}>金额(元)</Col>
              </Row>
              <div style={{position:'relative'}}>
              {
                this.state.moneyList.map((item, i) => (  
                  <Row key={i} >
                    <Col className="oneText" xs={{ span: 4 }}>{item.time}</Col>
                    <Col xs={{ span: 16 }}>{item.public}</Col>
                    <Col xs={{ span: 4 }}>￥{item.money}</Col>
                  </Row>
                ))
              }
              <div className="moneyFoucs">查询期间收入(元)：￥{this.state.whereMoney}</div>
              </div>
              <Pagination current={this.state.page} className={this.state.moneyList.length===0 ? 'myWalletNone' : 'fenye'}  hideOnSinglePage={true} showSizeChanger={false} onChange={this.moneyFen} total={this.state.other} />
            </div>
            <div style={this.state.moneyList.length !== 0 ?{display:'none'}:{width:'100%'}}><img style={{width:84,height:84,display:'block',margin:'84px auto 0'}} src={require('../../assets/xifen (7).png')} alt="icon"/><span style={{display:'block',textAlign:'center'}}>您没有收入记录!</span></div>
        
        </div>
        <div className={this.state.flag === 2 ? 'record myWallet' : 'myWalletNone'}>
          
          <div className="header">
            <span className="previousStep" onClick={this.returnN}>我的钱包 ></span><span style={{color:'#F5A623'}}>提现记录</span>
            <div style={{float:'right',fontSize:'16px',marginRight:'130px',lineHeight:'46px'}}>总计:￥{this.state.maxmoney}</div>
          </div>
          <div className="xiange"></div>
          <div className={this.state.hiddenTwo === true ? '' : 'hidden'} >
            <Row>
              <Col className="oneText" xs={{ span: 5 }}>申请时间</Col>
              <Col xs={{ span: 7, offset: 0 }}>账户名称</Col>
              <Col xs={{ span: 4, offset: 0 }}>处理时间</Col>
              <Col xs={{ span: 4, offset: 0 }}>金额</Col>
              <Col xs={{ span: 4, offset: 0 }}>提现进度</Col>
            </Row>
            {
              this.state.recordList.map((item, i) => (
                <Row key={i} >
                  <Col className="oneText" xs={{ span: 5 }}>{item.SubmitDate}</Col>
                  <Col xs={{ span: 7, offset: 0 }}>{item.OpeningBank}|{'*' + item.BankCard.slice(-4)}|{'*' + item.BankName.slice(-1)}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.FinishedDate === null ? '---' : item.FinishedDate}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>￥{item.RequestMoney}</Col>
                  <Col xs={{ span: 4, offset: 0 }}>{item.status === 1 ? '待处理' : ''||item.status === 2 ? '已处理' : ''||item.status === 3 ? '未通过' : ''}</Col>
                </Row>
              ))
            }
          </div>
          <Pagination className={this.state.hiddenTwo === true ? 'fenye' : 'hidden'} current={this.state.pageOne} showSizeChanger={false} hideOnSinglePage={true} onChange={this.recordListOther} total={this.state.recordListOther===''?0:this.state.recordListOther} />
          <div style={this.state.hiddenTwo === true ?{display:'none'}:{width:'100%'}}><img style={{width:84,height:84,display:'block',margin:'84px auto 0'}} src={require('../../assets/xifen (8).png')} alt="icon"/><span style={{display:'block',textAlign:'center'}}>您还没有提现记录!</span></div>
        </div>
        <div className={this.state.flag === 3 ? 'withdrawal myWallet' : 'myWalletNone'}>
          
          <div className="header">
            <span className="previousStep" onClick={this.returnN}>我的钱包> </span><span>提现</span>
          </div>
          <div className="xiange"></div>
          <div className="balance">
            <span>钱包余额</span> <span>{this.state.walletList.money}</span><span>元</span>
          </div>
          <div className="home">
            <span style={{ marginLeft: -15 }}>提现银行卡:</span><span className="textNext">{'******'+this.state.walletList.Bankaccount} {this.state.walletList.OpeningBank}</span>
            <div className="listSon">
              <span>提现金额:</span>
              <Input className="input" onChange={this.allNow} value={this.state.moneyYuan} />&nbsp;&nbsp;&nbsp;元
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