import React from 'react';
import './appointmentList.css';
import 'antd/dist/antd.css';
import { Input, Row, Col, Select, Pagination, Spin, message, DatePicker, Modal, Radio, Drawer, InputNumber, Popover, Popconfirm } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { getReservationActivitieslist, getVenueReservation, getVenueSport, VenueSendMessage, VenueClickCancelPlace, getVenueComplainList, ContinuationRecord, BreakUpConsumptionDetails, VenueNewsHistoricalRecord, DelVenueNumberTitle, VenueNumberSporttypeSave, getVenueSporttypelist, VenueRemarksLabel, getVenueNumberTitleList, getVenueNumberTitleSave, DeductTheTimesOfClosing } from '../../api';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Search } = Input;




class appointmentList extends React.Component {

  state = {
    number: '1',
    sport: 0,
    status: '',
    listNot: '',
    list: [],
    dianIndex: '0',
    liNum: '1',
    loading: true,
    hidden: '',
    Reservations: [],
    letterNum: [],
    activityNav: [],
    tabelFlag: false,
    Oneloading: true,
    other: '',
    visible: false,
    sendCheck: 2,
    textArea: '',
    publicUUID: '',
    placeholder: '其他说明（选填）',
    page: 1,
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
    sportName: '',
    Complaints: false,
    listComplain: [],
    paied: '2',
    headTop: '0',
    confirmUUid: '',
    orderId: '',
    deducting: false,
    deductingdetails: [],
    isfinsh: 0,
    sportNameTwoyou: '',
    duration: false,
    Record: []
  };

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.setState({ activityNav: res.data.data })
      this.getVenueNumberTitleList({ sportid: this.state.liNum })
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
      message.success('删除成功')
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
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString, types: 1 })
    }
  }


  componentDidMount() {
    this.getVenueSport()
    if (this.props.location.query !== undefined) {
      this.setState({ headTop: this.props.location.query.typeid })
      this.getReservationActivitieslist({ page: 1, publicuid: this.props.location.query.uuid, sport: '', status: '', paied: this.state.paied, reserve: this.props.location.query.typeid })
    } else {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '', paied: this.state.paied, reserve: this.state.headTop })
    }


    this.setState({ dateString: new Date().toLocaleDateString().replace(/\//g, "-") })




    setInterval(() => {
      window.addEventListener('storage', sessionStorage.getItem('kood') === '2' ? this.getVenueNumberTitleList({ sportid: this.state.liNum }) : this);
    }, 2000)

  }

  dateonChangeS = (date, dateString) => {
    this.setState({ start: dateString[0], end: dateString[1], page: 1 })
    this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: this.state.status, startdate: dateString[0], enddate: dateString[1], paied: this.state.paied, reserve: this.state.headTop })
  }

  current = (page, pageSize) => {
    this.setState({ page: page })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: page, sport: this.state.sport, orderId: this.state.orderId, status: this.state.status, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })
    } else {
      this.getReservationActivitieslist({ page: page, sport: this.state.sport, orderId: this.state.orderId, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
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


  async getVenueReservation(data) {
    const res = await getVenueReservation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.topNumList.length > 0) {
        for (let j = 0; j < this.state.topNumList.length; j++) {
          if (res.data.data[0].c[this.state.topNumList[j].venueid - 1] !== undefined) {
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
          }
        }
      }
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c, otherType: res.data.other.sporttype, value: 'l', spinningTwo: false })
      sessionStorage.setItem('kood', 1)
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
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 + ':00' })
          }
        }
      }
    } else if (res.data.code === 4005) {
      this.setState({ lookList: res.data.data, spinningTwo: false })
      sessionStorage.setItem('kood', 1)
    } else if (res.data.code === 4003) {
      this.setState({ lookList: [], spinningTwo: false })
      sessionStorage.setItem('kood', 1)
    }
  }



  nameChang = (e) => {
    this.setState({ sport: e })
    this.setState({ page: 1 })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: 1, sport: e, status: this.state.status, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })
    } else {
      this.getReservationActivitieslist({ page: 1, sport: e, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
    }
  }
  activityChang = (e) => {
    this.setState({ status: e })
    this.setState({ page: 1 })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: e, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })
    } else {
      this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: e, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
    }
  }

  paied = e => {
    this.setState({ paied: e, page: 1 })

    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '', paied: e, reserve: this.state.headTop })
    } else {
      this.getReservationActivitieslist({ page: 1, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: e, reserve: this.state.headTop })
    }

  }




  clickLi = (e) => {
    this.getVenueNumberTitleList({ sportid: e.target.dataset.num })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num, spinningTwo: true })
    this.getVenueSporttypelist({ sportid: e.target.dataset.num })
  }
  dateChange = (data, datatring) => {
    this.setState({ dateString: datatring })
    this.getVenueReservation({ sportid: this.state.liNum, date: datatring, types: 1 })
  }
  Oneloading = () => {
    this.setState({ Oneloading: true })
    if (this.state.start === '开始日期') {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })
    } else {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
    }
  }
  handleCancel = () => {
    this.setState({ visible: false, info: false, duration: false })
  }

  async VenueSendMessage(data) {
    const res = await VenueSendMessage(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ visible: false })
      if (this.state.start === '开始日期') {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })
      } else {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
      }
    } else {
      message.error(res.data.msg)
    }
  }

  sending = e => {
    this.setState({ visible: true, publicUUID: e.currentTarget.dataset.uid, changNum: e.currentTarget.dataset.siteid, changName: e.currentTarget.dataset.sitenum })
  }


  textArea = e => {
    this.setState({ textArea: e.target.value })
  }
  sendingMessage = e => {
    let { publicUUID, textArea, changNum, changName } = this.state
    this.VenueSendMessage({ type: 2, publicUUID: publicUUID, content: textArea, venueid: changNum, venuenumber: changName })
  }

  async VenueClickCancelPlace(data) {
    const res = await VenueClickCancelPlace(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString, types: 1 })
      if (data.type === 1) {
        message.success('该场地该时间段已标记为线下占用')
      } else if (data.type === 2) {
        this.setState({ flagClick: 0 })
        message.success('该场地该时间段已向找对手线上释放')
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
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '', paied: this.state.paied, reserve: this.state.headTop })
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
    let scrollTop = this.scrollRef.scrollTop
    let scrollLeft = this.scrollRef.scrollLeft
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
      message.success(res.data.msg)
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
  Complaints = e => {
    this.setState({ Complaints: true })
    this.getVenueComplainList({ publicuuid: e.currentTarget.dataset.id })
  }
  ComplaintsTwo = () => {
    this.setState({ Complaints: false })
  }

  async getVenueComplainList(data) {
    const res = await getVenueComplainList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ listComplain: res.data.data })

    }
  }
  headTop = e => {
    this.setState({ headTop: e.currentTarget.dataset.index, page: 1, sport: '', status: '', start: '开始日期', end: '结束日期', paied: '2', Oneloading: true, orderId: '' })

    setTimeout(() => {
      if (this.state.start === '开始日期') {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })

      } else {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
      }
    }, 500)
  }

  onSearch = e => {
    this.setState({ orderId: e })
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', paied: '2', orderId: e, reserve: this.state.headTop })
  }
  confirmUUid = e => {
    this.setState({ confirmUUid: e.currentTarget.dataset.uuid })
  }
  async DeductTheTimesOfClosing(data) {
    const res = await DeductTheTimesOfClosing(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      setTimeout(() => {
        if (this.state.start === '开始日期') {
          this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, orderId: this.state.orderId, status: this.state.status, startdate: '', enddate: '', paied: this.state.paied, reserve: this.state.headTop })
        } else {
          this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sport, orderId: this.state.orderId, status: this.state.status, startdate: this.state.start, enddate: this.state.end, paied: this.state.paied, reserve: this.state.headTop })
        }
      }, 500)
    } else {
      message.warning(res.data.msg)
    }
  }
  confirm = () => {
    this.DeductTheTimesOfClosing({ breakupid: this.state.confirmUUid })

  }
  searchChange = e => {
    this.setState({ orderId: e.target.value })
  }


  async BreakUpConsumptionDetails(data) {
    const res = await BreakUpConsumptionDetails(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ deductingdetails: res.data.data.details, isfinsh: res.data.data.isfinsh })
    }
  }


  deducting = (e) => {
    this.setState({ deducting: true, sportNameTwoyou: e.currentTarget.dataset.sportname })

    this.BreakUpConsumptionDetails({ publicuuid: e.currentTarget.dataset.uuid })
  }
  deductingCel = () => {
    this.setState({ deducting: false })
  }


  async ContinuationRecord(data) {
    const res = await ContinuationRecord(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ Record: res.data.data, duration: true })
    } else {
      this.setState({ Record: [] })
    }
  }
  duration = (e) => {
    this.ContinuationRecord({ type: 2, publicuuid: e.currentTarget.dataset.uuid })

  }

  render() {
    let userMessage;
    if (this.state.list.length !== 0) {
      userMessage = (
        <div>
          {
            this.state.list.map((item, i) => (
              <Row key={i}>
                <Popover content={(<span>{item.orderId}</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 2 }}><span>{item.orderId}</span></Col>
                </Popover>
                <Popover content={(<span>{item.SportName}</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 2 }} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}><span>{item.SportName}</span></Col>
                </Popover>
                <Col xs={{ span: 2 }} style={this.state.headTop === '1' ? { display: 'none' } : {}}><div style={{ lineHeight: '25px', fontSize: '10px' }}>{item.StartTime === 0 ? '00:00' : item.StartTime.slice(0, 10)}</div><div style={{ lineHeight: '25px' }}>{item.StartTime === 0 ? '00:00' : item.StartTime.slice(11, 16)}</div></Col>
                <Col xs={{ span: 2 }}><div style={{ lineHeight: '25px', fontSize: '10px' }}>{item.FinishedTime.slice(0, 10)}</div><div style={{ lineHeight: '25px' }}>{item.FinishedTime.slice(11, 16)}</div></Col>
                <Col xs={{ span: 2 }}><span>{item.breakup.length === 0 ? item.PlayTime + '小时' : '无'}</span></Col>
                <Col xs={{ span: 1 }}><span style={{ color: '#4A90E2' }} onClick={this.duration} data-uuid={item.uuid}>查看详情</span></Col>

                <Col xs={{ span: 2 }} >{this.state.headTop === '1' ? item.breakup.length === 0 ? <Popover content={(<span>{item.venueid}</span>)} title='详情' trigger="click">
                  <div>{
                    item.venueid_details.map((itemKo, i) => (
                      <div key={i}>{itemKo.venueid}</div>
                    ))
                  }</div> </Popover> : <span><div>
                    {
                      item.breakup.map((itemTwo, i) => (
                        <div key={i} style={{ textAlign: 'center',lineHeight:'33px' }}>{itemTwo.venueid}</div>
                      ))
                    }
                  </div></span> : <span>{item.Shouldarrive}</span>}</Col>

                <Col xs={{ span: 2 }}>
                  <span>{this.state.headTop === '1' ? item.breakup.length === 0 ? <div>
                    {
                      item.venueid_details.map((itemHo, i) => (
                        <div key={i}>{itemHo.time}</div>
                      ))
                    }
                  </div> : <div>
                      {
                        item.breakup.map((itemTwo, i) => (
                          <div key={i} style={{ textAlign: 'center', lineHeight: '30px' }}>￥{itemTwo.price}/次</div>
                        ))
                      }
                    </div> : item.TrueTo}</span>
                </Col>
                <Col xs={{ span: 3 }} style={this.state.headTop === '1' ? {} : { display: 'none' }}><span>
                  {
                    item.breakup.map((itemThree, i) => (
                      <div key={i} style={{ overflow: 'hidden', marginTop: '6px' }}><div style={{ float: 'left', marginLeft: '35%' }}>{itemThree.frequency}</div>
                        {
                          itemThree.frequency === 0 || item.PublicStatus === '已完成' ?
                            <div className="sijn" style={itemThree.frequency === 0 || item.PublicStatus === '已完成' ? { background: '#9b9b9b' } : {}} onClick={this.confirmUUid} data-uuid={itemThree.uuid}>—</div>
                            :
                            <Popconfirm
                              placement="top"
                              title='您确定要扣除一次吗?'
                              onConfirm={this.confirm}
                              okText="确定"
                              cancelText="取消"
                            >
                              <div className="sijn" style={itemThree.frequency === 0 || item.PublicStatus === '已完成' ? { background: '#9b9b9b' } : {}} onClick={this.confirmUUid} data-uuid={itemThree.uuid}>—</div>
                            </Popconfirm>
                        }

                      </div>
                    ))
                  }</span> <span onClick={this.deducting} data-uuid={item.uuid} data-sportName={item.SportName} style={item.breakup.length === 0 ? { display: 'none' } : { float: 'left', color: '#4A90E2' }}>扣除<br />记录</span><span style={item.breakup.length === 0 ? {} : { display: 'none' }}>非散场</span></Col>
                <Col xs={{ span: 2 }}  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><span>{item.PublicStatus}<span onClick={this.Complaints} data-id={item.uuid} style={item.iscomplain === 1 ? { color: '#F6410C', fontSize: '12px' } : { display: 'none' }}>(有投诉)</span></span></Col>
                <Col xs={{ span: 2 }}><span>￥{item.SiteMoney}</span></Col>
                <Col xs={{ span: 2 }}><span>{item.SiteMoneyStatus}</span></Col>
                <Col xs={{ span: 2 }}>
                  <span>
                    <img className={item.breakup.length === 0 ? item.PublicStatus === '匹配中' ? 'img' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'img' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'img' : 'circumstanceT' : 'circumstanceT'} data-uid={item.uuid} data-siteid={item.venueid} data-sitenum={item.venuenumber} style={{ marginTop: '0' }} onClick={this.sending} src={require("../../assets/icon_pc_faNews.png")} alt="发送消息" />
                  </span>
                </Col>
              </Row>
            ))
          }
          <Pagination className="fenye" hideOnSinglePage={true} showTotal={total => `总计: ${total} `} showSizeChanger={false} current={this.state.page} total={this.state.other} onChange={this.current} />
        </div>
      )
    } else {
      userMessage = (
        <h2 className="mast">{this.state.listNot}</h2>
      )
    }
    return (
      <Spin spinning={this.state.Oneloading} style={{ height: '100%' }}>
        <div className="orderList">
          <div className="headTop">
            <div className="headTopBtn" onClick={this.headTop} data-index='0' style={this.state.headTop === '0' ? { color: '#fff', background: '#F5A623' } : {}}>找运动伙伴</div>
            <div className="headTopBtn" onClick={this.headTop} data-index='1' style={this.state.headTop === '1' ? { color: '#fff', background: '#F5A623' } : {}}>仅预订场馆</div>
          </div>
          <div className="xiange"></div>
          <div className="withPartner">
            <div className="navTab">
              <RangePicker
                style={{ float: 'left', marginTop: '7px', marginRight: '40px' }}
                onChange={this.dateonChangeS}
                locale={locale}
                value={this.state.start === '开始日期' ? '' : [moment(this.state.start, 'YYYY-MM-DD'), moment(this.state.end, 'YYYY-MM-DD')]}
                allowClear={false}
                placeholder={[this.state.start, this.state.end]}
              />
              <div className="screening">
                <Search
                  placeholder="活动编号"
                  allowClear
                  enterButton="查询"
                  size="large"
                  value={this.state.orderId}
                  onChange={this.searchChange}
                  onSearch={this.onSearch}
                />
              </div>
            </div>

            <div className={this.state.number === '1' ? 'listName' : 'listNameT'} style={{ height: '90%' }}>
              <div className="xiange"></div>

              <Row className="rowConten" style={{ background: '#FCF7EE', marginTop: 0 }}>
                <Col xs={{ span: 2 }}><span>活动编号</span></Col>
                <Col xs={{ span: 2 }}>
                  <span>
                    <Select className="selectName" defaultValue="项目名称" bordered={false} style={{ width: '100%', padding: 0 }} onChange={this.nameChang}>
                      <Option value="0">全部</Option>
                      <Option value="1">羽毛球</Option>
                      <Option value="2">兵乓球</Option>
                      <Option value="3">台球</Option>
                      <Option value="4">篮球</Option>
                      <Option value="5">足球</Option>
                      <Option value="6">排球</Option>
                      <Option value="7">网球</Option>
                    </Select>
                  </span>
                </Col>
                <Col xs={{ span: 2 }} style={this.state.headTop === '1' ? { display: 'none' } : {}}><span>开始时间</span></Col>
                <Col xs={{ span: 2 }}><span>结束时间</span></Col>
                <Col xs={{ span: 2 }}><span>时长</span></Col>
                <Col xs={{ span: 1 }}><span>续时</span></Col>
                <Col xs={{ span: 2 }}><span>{this.state.headTop === '1' ? '场地编号' : '应到人数'}</span></Col>
                <Col xs={{ span: 2 }}><span>{this.state.headTop === '1' ? '单价/时间段' : '已报名人数'}</span></Col>
                <Col style={this.state.headTop === '0' ? { display: 'none' } : {}} xs={{ span: 3 }}><span>剩余次数</span></Col>
                <Col xs={{ span: 2 }}>
                  <span>
                    <Select className="selectName" defaultValue="活动状态" bordered={false} listHeight={300} dropdownStyle={{ height: '300px', textAlign: 'center' }} style={{ width: '100%' }} onChange={this.activityChang} >
                      <Option value="0">全部</Option>
                      <Option value="1">匹配中</Option>
                      <Option value="2">待出发</Option>
                      <Option value="3">活动中</Option>
                      <Option value="9">投诉中</Option>
                      <Option value="4" title="待填写比赛结果">待填写比赛结果</Option>
                      <Option value="6">待评价</Option>
                      <Option value="5">已完成</Option>
                      <Option value="7">已取消</Option>
                    </Select>
                  </span>
                </Col>
                <Col xs={{ span: 2 }}><span>场地费用</span></Col>
                <Col xs={{ span: 2 }}>
                  <span>
                    <Select className="selectName" defaultValue="支付状态" bordered={false} dropdownStyle={{ textAlign: 'center' }} style={{ width: '100%' }} onChange={this.paied} >
                      <Option value="2">全部</Option>
                      <Option value="0">未到账</Option>
                      <Option value="1">已支付</Option>
                    </Select>
                  </span>
                </Col>
                <Col xs={{ span: 2 }}><span>发消息</span></Col>
              </Row>
              <div className={this.state.hidden === true ? '' : 'hidden'} style={{ height: '90%', overflowY: 'auto' }}>
                {userMessage}
              </div>
              <div style={this.state.hidden === true ? { display: 'none' } : { width: '100%' }}><img style={{ width: 84, height: 84, display: 'block', margin: '84px auto 0' }} src={require('../../assets/xifen (5).png')} alt="icon" /><span style={{ display: 'block', textAlign: 'center' }}>您的场馆没有相关活动!</span></div>
            </div>
          </div>

          <Modal
            title="扣除记录"
            visible={this.state.deducting}
            onCancel={this.deductingCel}
            className="ko"
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div className="Mtitle" style={this.state.isfinsh === 0 ? { display: 'none' } : { fontWeight: 'bold', fontSize: '14px' }}>所有次数已消费完</div>
            {
              this.state.deductingdetails.map((item, i) => (
                <div style={{ clear: 'both' }} key={i}><span style={{ float: 'left', width: '70%' }}>{item.comment}</span><span style={{ float: 'right' }}>{item.time}</span></div>
              ))
            }

          </Modal>





          <Modal
            title="给参与人员发送消息"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            className="mode"
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <Radio.Group onChange={this.sendCheck} value={this.state.sendCheck}>
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
            <TextArea style={{ marginTop: '20px' }} className="sending" maxLength={50} placeholder="请说明未预留场地原因" onChange={this.textArea} rows={4} />
            <div style={{ clear: 'both', height: '30px', marginTop: '10px' }}><span style={{ float: 'left' }}>还可以输入{50 - this.state.textArea.length}字</span>  </div>
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
            <div className="informDrawer" style={this.state.informList.length > 0 && this.state.informList[0].reserve === 0 ? {} : { display: 'none' }}>
              <span>应到人数：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].Shouldarrive : ''}</span>
            </div>

            <div className="informDrawer" style={this.state.informList.length > 0 && this.state.informList[0].reserve === 0 ? {} : { display: 'none' }}>
              <span>已报名人数：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].TrueTo : ''}</span>
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
            title="续时记录"
            visible={this.state.duration}
            onOk={this.handleOk}
            className='mode'
            onCancel={this.handleCancel}
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div style={this.state.Record.length!==0?{}:{display:'none'}}>
              <Row>
                <Col span={8}>开始时间</Col>
                <Col span={4}>时长</Col>
                <Col span={7}>操作时间</Col>
                <Col span={6}>价格</Col>
              </Row>
              {
                this.state.Record.map((item, i) => (
                  <Row key={i}>
                    <Col span={8}>{item.datetime}</Col>
                    <Col span={4}>{item.playtime}</Col>
                    <Col span={7}>{item.time}</Col>
                    <Col span={6}>￥{item.mone}</Col>
                  </Row>
                ))
              }
            </div>
            <div style={this.state.Record.length===0?{textAlign:'center'}:{display:'none'}}>暂无续时~</div>

          </Modal>



          <Modal
            title="请输入线下预订人的相关信息"
            visible={this.state.info}
            onOk={this.handleOk}
            className='mode'
            onCancel={this.handleCancel}
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
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

          <Drawer
            title='投诉详情'
            placement="right"
            closable={false}
            width='400px'
            onClose={this.ComplaintsTwo}
            visible={this.state.Complaints}
          >
            {
              this.state.listComplain.map((item, i) => (
                <div key={i} style={{ marginTop: '15px' }}>
                  <div><span style={{ fontSize: '16px', fontWeight: 'blod' }}>投诉类型:</span>{item.name}</div>
                  <div style={{ marginTop: '5px' }}><span style={{ fontSize: '16px', fontWeight: 'blod' }}>处理结果:</span>{item.comment}({item.handle})</div>
                  <div style={{ marginTop: '5px' }}><span style={{ fontSize: '16px', fontWeight: 'blod' }}>处理时间:</span>{item.date}</div>
                </div>
              ))
            }
          </Drawer>



        </div></Spin>
    )
  }
}

export default appointmentList;