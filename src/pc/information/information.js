import React from 'react';
import './information.css';
import 'antd/dist/antd.css';
import { Input, Button, Row, Col, Select, Pagination, Spin, message, Result,DatePicker, Modal, Radio, Drawer, InputNumber, Popover,Tooltip } from 'antd';
import {BankOutlined,SyncOutlined,CloseOutlined,CheckOutlined,FundOutlined} from '@ant-design/icons';
import { getReservationActivitieslist, getVenueReservationss, getVenueSport, VenueSendMessage, VenueClickCancelPlace, VenueNewsHistoricalRecord, DelVenueNumberTitle, VenueNumberSporttypeSave, getVenueSporttypelist, VenueRemarksLabel, getVenueNumberTitleList, getVenueNumberTitleSave } from '../../api';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


const antIcon =<SyncOutlined  style={{ fontSize: 24, color: 'black' }} spin/>;

class information extends React.Component {

  state = {
    number: '1',
    sport: 0,
    status: '',
    listNot: '',
    list: [],
    dianIndex: '0',
    liNum: '',
    loading: true,
    hidden: '',
    Reservations: [],
    letterNum: [],
    activityNav: [],
    tabelFlag: false,
    Oneloading: false,
    other: '',
    visible: false,
    sendCheck: 2,
    textArea: '',
    publicUUID: '',
    placeholder: '其他说明（选填）',
    page: 0,
    macNum: [],
    lookList: [],
    dateString: '',
    informVisible: false,
    informList: [],
    start: '开始日期',
    end: '结束日期',
    lastTime: '',
    changNum: 0,
    changName: [0],
    History: false,
    historyNews: [],
    minHeight: sessionStorage.getItem('min-height'),
    left: '',
    top: '',
    time: '',
    num: '',
    info: false,
    placeName: '',
    placePhone: '',
    placeHui: '',
    placeQi: '',
    nownum: '',
    nowtime: '',
    lotime: [],
    tooltip: false,
    otherObj: '',
    menu: 2,
    topNumList: [],
    flagClick: 0,
    uuidClick: '',
    spinningTwo: true,
    visibleTwo: false,
    tilValue: '',
    activityNavTwo: [],
    otherType: [],
    sportName: ''
  }

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.code === 2000) {
      this.setState({ activityNav: res.data.data, liNum: res.data.data[0].id })
      this.getVenueNumberTitleList({ sportid: res.data.data[0].id })
    }
  }



  async getVenueSporttypelist(data) {
    const res = await getVenueSporttypelist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ activityNavTwo: res.data.data })
    }
  }


  async DelVenueNumberTitle(data) {
    const res = await DelVenueNumberTitle(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('删除成功')
      this.getVenueNumberTitleList({ sportid: this.state.liNum })
    }
  }


  async VenueNumberSporttypeSave(data) {
    await VenueNumberSporttypeSave(data, sessionStorage.getItem('venue_token'))
  }


  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
      this.getVenueReservationss({ sportid: this.state.liNum, date: this.state.dateString, types: 1 })
    }
  }
 

  componentDidMount() {
    this.getVenueSport()
    this.setState({ dateString: new Date().toLocaleDateString().replace(/\//g, "-") })
    if (this.props.location.query !== undefined) {
      if (this.props.location.query.time === 1) {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })

      } else if (this.props.location.query.time === 2) {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })

      } else if (this.props.location.query.uuid) {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        this.setState({ visible: true, publicUUID: this.props.location.query.uuid })
      }
    } else {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
    }
    
    setInterval(()=>{
      window.addEventListener('storage',sessionStorage.getItem('kood')==='2'? this.getVenueNumberTitleList({ sportid: this.state.liNum }):this);
    },2000)
  }

  dateonChangeS = (date, dateString) => {
    this.setState({ start: dateString[0], end: dateString[1] })
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: dateString[0], enddate: dateString[1] })
  }

  current = (page, pageSize) => {
    this.setState({ page: page })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: page, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '' })
    } else {
      this.getReservationActivitieslist({ page: page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
    }
  }


  handelClick = (e) => {
    this.setState({ number: e.target.dataset.num })
    if (e.target.dataset.num === '1') {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
    }
  }

  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ list: res.data.data.data, informList: res.data.data.data, other: res.data.other, loading: false, hidden: true, Oneloading: false })
    } else {
      this.setState({ loading: false, hidden: false, Oneloading: false })
    }
  }


  async getVenueReservationss(data) {
    const res = await getVenueReservationss(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.topNumList.length > 0) {
        for (let j = 0; j < this.state.topNumList.length; j++) {
          if(res.data.data[0].c[this.state.topNumList[j].venueid - 1]!==undefined){
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
          }
        }
      }
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c, otherType: res.data.other.sporttype, value: 'l', spinningTwo: false})
      sessionStorage.setItem('kood',1)
      if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) < 24) {
        if (res.data.data[res.data.data.length - 1].a.slice(-2) === '00') {
          if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) < 10) {
            this.setState({ lastTime: '0' + (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2))) + ':30' })
          } else {
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + ':30' })
          }
        } else if (res.data.data[res.data.data.length - 1].a.slice(-2) === '30') {
          if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 < 10) {
            this.setState({ lastTime: '0' + (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1) + ':00' })
          } else {
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 +  ':00' })
          }
        }
      }
    } else if (res.data.code === 4005) {
      this.setState({ lookList: res.data.data, spinningTwo: false })
      sessionStorage.setItem('kood',1)
    } else if (res.data.code === 4003) {
      this.setState({ lookList: [], spinningTwo: false })
      sessionStorage.setItem('kood',1)
    }
  }



  nameChang = (e) => {
    this.setState({ sport: e })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: this.state.page, sport: e, status: this.state.status, startdate: '', enddate: '' })
    } else {
      this.getReservationActivitieslist({ page: this.state.page, sport: e, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
    }
  }
  activityChang = (e) => {
    this.setState({ status: e })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: e, startdate: '', enddate: '' })
    } else {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: e, startdate: this.state.start, enddate: this.state.end })
    }
  }
  clickLi = (e) => {
    this.getVenueNumberTitleList({ sportid: e.target.dataset.num })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num, spinningTwo: true })
    this.getVenueSporttypelist({ sportid: e.target.dataset.num })
  }
  dateChange = (data, datatring) => {
    this.setState({ dateString: datatring })
    this.getVenueReservationss({ sportid: this.state.liNum, date: datatring, types: 1 })
  }
  Oneloading = () => {
    this.setState({ Oneloading: true })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '' })
    } else {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
    }
  }
  handleCancel = () => {
    this.setState({ visible: false, info: false })
  }

  async VenueSendMessage(data) {
    const res = await VenueSendMessage(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.setState({ visible: false })
      if (this.state.start === '开始日期') {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '' })
      } else {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end })
      }
    } else {
      message.error(res.data.msg)
    }
  }

  sending = e => {
    this.setState({ visible: true, publicUUID: e.currentTarget.dataset.uid, changNum: e.currentTarget.dataset.siteid, changName: e.currentTarget.dataset.sitenum })
  }

  sendCheck = e => {
    this.setState({ sendCheck: e.target.value })
    if (e.target.value === 2) {
      this.setState({ placeholder: '请说明未预留场地原因' })
    } else {
      this.setState({ placeholder: '其他说明（选填）' })
    }
  }
  textArea = e => {
    this.setState({ textArea: e.target.value })
  }
  sendingMessage = e => {
    let { publicUUID, sendCheck, textArea, changNum, changName } = this.state
    this.VenueSendMessage({ type: sendCheck, publicUUID: publicUUID, content: textArea, venueid: changNum, venuenumber: changName })
  }

  async VenueClickCancelPlace(data) {
    const res = await VenueClickCancelPlace(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueReservationss({ sportid: this.state.liNum, date: this.state.dateString, types: 1 })
      if (data.type === 1) {
        message.info('该场地该时间段已标记为线下占用')
      } else if (data.type === 2) {
        this.setState({ flagClick: 0 })
        message.info('该场地该时间段已向找对手线上释放')
      }
      this.setState({ info: false, lotime: [] })
    } else {
      message.error('操作失败')
    }
  }





  lookPlate = e => {
    let uuid = e.currentTarget.dataset.uuid
    this.setState({ uuidClick: uuid })
    let lotime = e.currentTarget.dataset.lo
    if (e.currentTarget.dataset.type !== '3' && e.currentTarget.dataset.type !== '2') {
      if (e.currentTarget.dataset.type === '1') {
        if (this.state.lotime.length > 0) {
          if (this.state.lotime.indexOf(lotime) !== -1) {
            this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
          } else {
            this.setState({ lotime: [...this.state.lotime, lotime] })
          }
        } else {
          this.setState({ lotime: [...this.state.lotime, lotime] })
        }
      } else if (e.currentTarget.dataset.type === '4') {
        this.VenueRemarksLabel({ uuid: e.currentTarget.dataset.uuid })
      }
    } else if (e.currentTarget.dataset.type === "3") {
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '' })
      this.setState({ informVisible: true })
    }
  }



  lookPlateTwo = e => {
    let time = e.currentTarget.dataset.time
    let uuid = e.currentTarget.dataset.uuid
    let num = e.currentTarget.dataset.num
    this.VenueClickCancelPlace({ date: this.state.dateString, uuid: uuid, time: time, venueid: num, sportid: this.state.liNum, other: '', type: 2 })
  }



  informOnClose = () => {
    this.setState({ informVisible: false })
  }



  changNum = (e) => {
    this.setState({ changNum: e })
  }

  changName = (e) => {
    this.setState({ changName: e })
  }

  async VenueNewsHistoricalRecord(data) {
    const res = await VenueNewsHistoricalRecord(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ historyNews: res.data.data })
    }
  }

  History = () => {
    this.setState({ History: true })
    this.VenueNewsHistoricalRecord({ publicuuid: this.state.publicUUID })
  }
  historyClose = () => {
    this.setState({ History: false })
  }

  scroll = () => {
    let scrollTop = this.scrollRef.scrollTop;
    let scrollLeft = this.scrollRef.scrollLeft;
    this.setState({ left: scrollLeft, top: scrollTop })
  }



  async VenueRemarksLabel(data) {
    const res = await VenueRemarksLabel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let ko = JSON.parse(res.data.data)
      let arrObj = <div>
        <div>姓名：{ko.placeName}</div>
        <div>手机号：{ko.placePhone}</div>
        <div>会员卡号：{ko.placeHui}</div>
        <div>其他：{ko.placeQi}</div>
      </div>
      this.setState({ otherObj: arrObj, menu: 1, History: true })
    }
  }



  menu = (e) => {
    if (e.currentTarget.dataset.type === '1') {
      this.setState({ otherObj: '', menu: 2 })
      if (this.state.lotime.length !== 0) {
        let num = ''
        let time = ''
        for (let i in this.state.lotime) {
          num += this.state.lotime[i].split('-')[1] + ','
          time += this.state.lotime[i].split('-')[0] + ','
        }
        this.setState({ info: true, num: num, time: time })
      }
    } else if (e.currentTarget.dataset.type === '4') {
      this.setState({ flagClick: 1 })
    } else {
      this.setState({ otherObj: '', menu: 2 })
    }
  }
  placeName = e => {
    this.setState({ placeName: e.target.value })
  }
  placePhone = e => {
    this.setState({ placePhone: e.target.value })
  }

  placeHui = e => {
    this.setState({ placeHui: e.target.value })
  }
  placeQi = e => {
    this.setState({ placeQi: e.target.value })
  }



  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info(res.data.msg)
      this.getVenueNumberTitleList({ sportid: this.state.liNum })
    }
  }

 

  tilBlur = e => {
    this.getVenueNumberTitleSave({ sportid: this.state.liNum, veneuid: e.currentTarget.dataset.num, title: e.target.value, uuid: e.currentTarget.dataset.uuid })
    this.setState({ value: 'l' })
  }

  tilChange = e => {
    this.setState({ tilValue: e.target.value })
  }



  noneBox = e => {
    this.setState({ value: e.currentTarget.dataset.num })
  }



  placeSubmit = () => {
    let { num, time, placeHui, placeName, placePhone, placeQi } = this.state
    let obj = {
      placeHui: placeHui,
      placeName: placeName,
      placePhone: placePhone,
      placeQi: placeQi,
    }
    this.VenueClickCancelPlace({ uuid: '', date: this.state.dateString, venueid: num.slice(0, num.length - 1), other: JSON.stringify(obj), time: time.slice(0, time.length - 1), sportid: this.state.liNum, type: 1 })
  }

  

  handleVisibleChange = visible => {
    this.setState({ visibleTwo: visible })
  }

  classList = e => {
    this.setState({ sportName: e })
    this.VenueNumberSporttypeSave({ sportid: this.state.liNum, sporttype: e.split('-')[0], venueid: e.split('-')[1] })
  }


  delTitle = e => {
    this.DelVenueNumberTitle({ uuid: e.currentTarget.dataset.uuid })

  }


  render() {
    let userMessage;
    if (this.state.list.length !== 0) {
      userMessage = (
        <div>
          {
            this.state.list.map((item, i) => (
              <Row key={i}>
                <Col xs={{ span: 3 }}>{item.orderId}</Col>
                <Col xs={{ span: 2 }}>{item.SportName}</Col>
                <Col xs={{ span: 3 }}>{item.StartTime}</Col>
                <Col xs={{ span: 3 }}>{item.FinishedTime}</Col>
                <Col xs={{ span: 1 }}>{item.PlayTime}小时</Col>
                <Col xs={{ span: 2 }}>{item.Shouldarrive}</Col>
                <Col xs={{ span: 2 }}>{item.TrueTo}</Col>
                <Col xs={{ span: 2 }}>{item.PublicStatus}</Col>
                <Col xs={{ span: 2 }}>{item.SiteMoney}</Col>
                <Col xs={{ span: 2 }}>{item.SiteMoneyStatus}</Col>
                <Col xs={{ span: 2 }}>
                  <img className={item.PublicStatus === '匹配中' ? 'img' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'img' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'img' : 'circumstanceT'} data-uid={item.uuid} data-siteid={item.venueid} data-sitenum={item.venuenumber} onClick={this.sending} src={require("../../assets/icon_pc_faNews.png")} alt="发送消息" />
                </Col>
              </Row>
            ))
          }
          <Pagination className="fenye" defaultCurrent={1} total={this.state.other} onChange={this.current} />
        </div>
      )
    } else {
      userMessage = (
        <h2 className="mast">{this.state.listNot}</h2>
      )
    }
    return (

      <div className="orderList">
        <div className="navTab">
          <Button onClick={this.handelClick} className={this.state.number === '1' ? 'colorGo' : 'colorNot'} data-num='1'>预约活动列表</Button>
          <Button onClick={this.handelClick} data-num='2' className={this.state.number === '2' ? 'colorGo' : 'colorNot'}>场地预约情况</Button>
          <div className="sping"><SyncOutlined  className={this.state.Oneloading === true || this.state.number === '2' ? 'hidden' : 'block'} onClick={this.Oneloading} style={{ fontSize: 24, marginTop: 15 }}/><Spin indicator={antIcon} spinning={this.state.Oneloading} /></div>
        </div>
        <div className="xiange"></div>
        <div className={this.state.number === '1' ? 'listName' : 'listNameT'}>
          <div className="dateSelect">
            <RangePicker
              style={{ float: 'right', lineHeight: '46px', marginRight: '40px' }}
              onChange={this.dateonChangeS}
              placeholder={[this.state.start, this.state.end]}
            />
          </div>


          <div className="xiange"></div>
          <Spin spinning={this.state.loading} style={{ minHeight: 600 }} size="large">

            <Row className="rowConten">
              <Col xs={{ span: 3 }}>活动编号</Col>
              <Col xs={{ span: 2 }}>
                <Select className="selectName" defaultValue="项目名称" style={{ width: 100 }} onChange={this.nameChang}>
                  <Option value="0">全部</Option>
                  <Option value="1">羽毛球</Option>
                  <Option value="2">乒乓球</Option>
                  <Option value="3">台球</Option>
                  <Option value="4">篮球</Option>
                  <Option value="5">足球</Option>
                  <Option value="6">排球</Option>
                  <Option value="7">网球</Option>
                  <Option value="8">高尔夫</Option>
                </Select>
              </Col>
              <Col xs={{ span: 3 }}>开始时间</Col>
              <Col xs={{ span: 3 }}>结束时间</Col>
              <Col xs={{ span: 1 }}>时长</Col>
              <Col xs={{ span: 2 }}>应到人数</Col>
              <Col xs={{ span: 2 }}>已报名人数</Col>
              <Col xs={{ span: 2 }}>
                <Select className="selectName" defaultValue="活动状态" style={{ width: 100 }} onChange={this.activityChang} >
                  <Option value="0">全部</Option>
                  {/* <Option value="1">匹配中</Option> */}
                  <Option value="2">待出发</Option>
                  <Option value="3">活动中</Option>
                  <Option value="4" title="待填写结果/待确认结束">待填写结果/待确认结束</Option>
                  <Option value="6">待评价</Option>
                  <Option value="5">已完成</Option>
                  <Option value="7">已取消</Option>
                </Select>
              </Col>
              <Col xs={{ span: 2 }}>场地费金额</Col>
              <Col xs={{ span: 2 }}>场地费状态</Col>
              <Col xs={{ span: 2 }}>发消息</Col>
            </Row>
            <div className={this.state.hidden === true ? '' : 'hidden'}>
              {userMessage}
            </div>
            <Result className={this.state.hidden === true ? 'hidden' : ''} icon={<BankOutlined style={{color:'#F5A623'}}/>} title="您还没有预约活动！" />,
          </Spin>



        </div>
        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'}>
          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span></span><span>不可选</span></div>
            <div><span></span><span>线下占用</span></div>
            <div><span></span><span>线上占用</span></div>
          </div>
          <ul className="activityNav">
            {
              this.state.activityNav.map((item, i) => (
                <li key={i} onClick={this.clickLi} data-index={i} data-num={item.id} className={parseInt(this.state.dianIndex) === i ? 'borderLi' : ''}>{item.name}</li>
              ))
            }
          </ul>
          <ul className="rightNav">
            <li className="dateSelect"><DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} locale={zh_CN} placeholder="请选择日期" className="DatePicker" onChange={this.dateChange} /></li>
          </ul>
          <div className="xiange"></div>
          <Spin spinning={this.state.spinningTwo} style={{ minHeight: 600 }} size="large">
            <div className="lookList" onScrollCapture={this.scroll} ref={c => { this.scrollRef = c }} style={this.state.lookList.length < 1 ? { display: 'none' } : { display: 'block', height: this.state.minHeight - 250 + 'px' }}>
              <div className="headerSon" style={{ width: '' + (this.state.macNum.length + 1) * 68 + 'px' }}>
                <div className="topFixd" style={{ top: this.state.top, minWidth: '100%', width: '' + (this.state.macNum.length + 1) * 68 + 'px' }}>
                  <span>场地号<span style={this.state.liNum!=='3'&&this.state.liNum!=='5'&&this.state.liNum!=='8'?{display:'none'}:{cursor: 'pointer'}}><br/> <Tooltip placement="topLeft" title="请为各场地选择对应的场地类型，如1号场地为11人制足球场地；2号场地为5人制足球场地等">场地类型</Tooltip></span><br/><span style={{cursor: 'pointer'}}><Tooltip placement="topLeft" title="请为各场地填写标签，如普通、VIP、赛台、独立包间、楼上、楼下、人造草皮、真草皮等标签，也可不填写">标签</Tooltip></span></span>
                  {
                    this.state.macNum.map((item, i) => (
                      <span key={i}>{i + 1}
                        <div className="boxBoss" style={{ position: 'relative', width: '100%', height: '26px' }}>
                          <Select
                            placeholder={Object.keys(this.state.otherType).indexOf("" + parseInt(i + 1) + "") !== -1 ? Object.values(this.state.otherType)[Object.keys(this.state.otherType).indexOf("" + parseInt(i + 1) + "")].sporttypename : '请选择'}
                            className="lookFir"
                            key={'-' + i + this.state.liNum}
                            showArrow={false}
                            dropdownMenustyle={{ width: '100%', padding: '0', margin: '0' }}
                            style={this.state.liNum === '3' ? { display: 'block', border: '1px solid #ccc', borderRadius: '4px', margin: '0' } : { display: 'none' } && this.state.liNum === '5' ? { display: 'block', border: '1px solid #ccc', borderRadius: '4px', margin: '0' } : { display: 'none' } && this.state.liNum === '8' ? { display: 'block', border: '1px solid #ccc', borderRadius: '4px', margin: '0' } : { display: 'none' }}
                            dropdownStyle={{ right: '0', marginRight: '0', padding: '0' }}
                            onChange={this.classList}
                          >
                            {
                              this.state.activityNavTwo.map((itemS, j) => (
                                <Option key={j} style={{ padding: '0' }} value={itemS.sporttype + '-' + parseInt(i + 1)}>{itemS.sporttypename}</Option>
                              ))
                            }

                          </Select>
                          <Input className='inputAppList'
                            key={parseInt(i + this.state.liNum + 'l')}
                            placeholder={item.title===''?'普通/VIP':item.title}
                            style={{ height: '26px' }}
                            data-uuid={item.uuid}
                            onChange={this.tilChange}
                            data-num={i + 1}
                            onBlur={this.tilBlur}
                            suffix={item.title === '' ? '' : <CloseOutlined data-uuid={item.uuid} onClick={this.delTitle} style={{ color: 'rgba(0,0,0,.25)' }}/>}
                            onFocus={this.tilFocus}
                            maxLength={5} />
                        </div>
                      </span>
                    ))
                  }
                </div>
                <div style={{ height: 98 }}></div>
                {
                  this.state.lookList.map((index, i) => (
                    <div key={i} className="sonList">
                      <span style={{ left: this.state.left }}>{index.a}<br />{i === this.state.lookList.length - 1 ? this.state.lastTime : ''}</span>
                      <span></span>
                      {
                        this.state.lookList[i].c.map((item, i) => (
                          <Popover style={{ padding: 0, margin: 0 }} placement="right" key={i}
                            content={item.type === 4 ? (
                              <div className="shifang" onClick={this.lookPlateTwo} data-time={index.a}
                                data-num={i + 1}
                                data-uuid={item.uuid}
                                data-type={item.type}>释放该场地</div>) : this.state.lotime.indexOf(index.a + '-' + (i + 1)) !== -1 ? (<div data-time={index.a}
                                  data-num={i + 1}
                                  data-uuid={item.uuid}
                                  data-type={item.type} className="shifang" onClick={this.menu}>选中场地添加信息</div>) : (<div >请选择场地</div>)} trigger="contextMenu" >
                            <span
                              className='spanFa'
                              data-time={index.a}
                              data-num={i + 1}
                              data-uuid={item.uuid}
                              data-type={item.type}
                              onClick={this.lookPlate}
                              // onContextMenu={this.menu}
                              data-lo={index.a + '-' + (i + 1)}
                              style={item.type === 1 ? { background: '#6FB2FF', marginTop: '0.12rem', color: '#fff' } : {} && item.type === 2 ? { background: '#6FB2FF', marginTop: '0.12rem', color: '#fff', opacity: '.3' } : {} && item.type === 3 ? { background: '#F5A623', marginTop: '0.12rem', color: '#fff' } : {} && item.type === 4 ? { background: 'red', marginTop: '0.12rem', color: '#fff' } : {}}
                            >
                              {this.state.lotime.indexOf(index.a + '-' + (i + 1)) !== -1 ? <CheckOutlined />: ''}
                              {item.type === 1 ? item.money : ''}
                            </span>
                          </Popover>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>
            <Result className={this.state.lookList.length === 0 ? '' : 'hidden'} icon={<FundOutlined style={{color:'#F5A623'}}/>} title="您没有预约情况！" />

          </Spin>
        </div>
        <Modal
          title="给参与人员发送消息"
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Radio.Group onChange={this.sendCheck} value={this.state.sendCheck}>
            {/* <Radio value={1}>预留场地</Radio> */}
            <Radio value={2}>未预留场地</Radio>
          </Radio.Group>
          <div style={this.state.sendCheck === 1 ? {} : { display: 'none' }}>
            <span>场馆号</span>
            <Select className='changName' value={this.state.changName} onChange={this.changName} style={{ width: 100, height: 30 }}>
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
            </Select>
            <span style={{ paddingLeft: 20 }}>场地号</span> <InputNumber style={{ height: '30px' }} max={999} value={this.state.changNum} placeholder="场地号" onChange={this.changNum} className="changNum" />
          </div>
          <TextArea style={{ marginTop: '20px' }} className="sending" maxLength={200} placeholder={this.state.placeholder} onChange={this.textArea} rows={4} />
          <div style={{ clear: 'both', height: '30px', marginTop: '10px' }}><span style={{ float: 'left' }}>还可以输入{200 - this.state.textArea.length}字</span>  <span style={{ display: 'block', float: 'right', color: '#F5A623', cursor: 'pointer' }} onClick={this.History}>历史记录...</span></div>
          <div className="sending">
            <div onClick={this.handleCancel}>取消</div>
            <div onClick={this.sendingMessage}>发送</div>
          </div>
        </Modal>
        <Drawer
          title="该活动详细信息"
          placement="right"
          closable={false}
          width='400px'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >
          <div className="informDrawer">
            <span>活动编号：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].orderId : ''}</span>
          </div>
          <div className="informDrawer">
            <span>项目名称：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SportName : ''}</span>
          </div>
          <div className="informDrawer">
            <span>开始时间：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].StartTime : ''}</span>
          </div>
          <div className="informDrawer">
            <span>结束时间：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].FinishedTime : ''}</span>
          </div>
          <div className="informDrawer">
            <span>时长：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].PlayTime : ''}</span>
          </div>
        
          <div className="informDrawer">
            <span>场地费金额：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney : ''}</span>
          </div>
          <div className="informDrawer">
            <span>场地费状态：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
          </div>
        </Drawer>
        <Drawer
          title={this.state.meun !== 1 ? '线下预订人信息' : '预约情况详情'}
          placement="right"
          closable={false}
          width='400px'
          onClose={this.historyClose}
          visible={this.state.History}
        >
          <div style={this.state.menu !== 1 ? { display: 'block' } : { display: 'none' }}>
            <div style={this.state.historyNews.length === 0 ? { display: 'block' } : { display: 'none' }}>没有历史记录...</div>
            <div style={this.state.historyNews.length > 0 ? { display: 'block' } : { display: 'none' }}>
              {
                this.state.historyNews.map((item, i) => (
                  <div key={i} style={{ marginTop: '15px' }}>
                    <span style={{ display: 'block' }}>{item.comment}</span>
                    <span style={{ display: 'block' }}>{item.intime}</span>
                  </div>
                ))
              }
            </div>
          </div>
          <div style={this.state.menu === 1 ? { display: 'block' } : { display: 'none' }}>
            {this.state.otherObj}
          </div>

        </Drawer>


        <Modal
          title="请输入线下预订人的相关信息"
          visible={this.state.info}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{ overflow: 'hidden' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>姓名：  </span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placeName} placeholder='(选填)' />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>手机号：</span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placePhone} placeholder="(选填)" />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>会员卡卡号：</span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placeHui} placeholder="(选填)" />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>其他：</span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placeQi} placeholder="(选填)" />
          </div>
          <span onClick={this.placeSubmit} style={{ cursor: 'pointer', padding: '4px 8px', background: '#F5A623', color: '#fff', float: 'right', marginRight: '125px', marginTop: '20px' }}>提交</span>
        </Modal>


      </div>
    )
  }
}

export default information;