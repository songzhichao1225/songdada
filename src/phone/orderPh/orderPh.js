import React from 'react';
import './orderPh.css';

import { DatePicker, Toast, Card, Modal, InputItem, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, Spin, Table, Checkbox,Row, Col } from 'antd';
import { getReservationActivitieslist, VenueSendMessage, getVenueReservation, getVenueSport, VenueClickCancelPlace,BreakUpConsumptionDetails,ContinuationRecord, getVenueNumberTitleList, VenueRemarksLabel, VenueNumberSporttypeSave, DelVenueNumberTitle, getVenueNumberTitleSave, DeductTheTimesOfClosing } from '../../api';
const prompt = Modal.prompt;
const alert = Modal.alert;

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}



class orderPh extends React.Component {

  state = {
    activityList: true,
    activeSon: [],
    index: null,
    total: null,
    visible: false,
    sendCheck: 1,
    textArea: '',
    publicUUID: '',
    Drawervisible: false,
    lookList: [],
    macNum: [],
    sportid: 1,
    sportIdVal: 0,
    statusIdVal: 0,
    flag: false,
    remList: [],
    dataString: '选择时间',
    informVisible: false,
    informList: [],
    liIndex: 0,
    left: 0,
    top: 0,
    spin: true,
    sport: [
      { name: '全部', id: 0 },
      { name: '羽毛球', id: 1 },
      { name: '乒乓球', id: 2 },
      { name: '台球', id: 3 },
      { name: '篮球', id: 4 },
      { name: '足球', id: 5 },
      { name: '排球', id: 6 },
      { name: '网球', id: 7 },
    ],
    status: [
      { name: '全部', id: 0 },
      { name: '匹配中', id: 1 },
      { name: '待出发', id: 2 },
      { name: '活动中', id: 3 },
      { name: '投诉中', id: 9 },
      { name: '待填写比赛结果', id: 4 },
      { name: '待评价', id: 6 },
      { name: '已完成', id: 5 },
      { name: '已取消', id: 7 },
    ],
    paiedArr: [
      { name: '全部', id: 2 },
      { name: '未到账', id: 0 },
      { name: '已支付', id: 1 },

    ],
    page: 1,
    clenTop: 0,
    clickY: 0,
    moveY: 0,
    spinFlag: false,

    start: '',
    end: '',
    nowDate: '',
    qiDate: '',
    qiStart: '',
    qiEnd: '',


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
    venueid: '',



    data: [],
    touchStartX: 0,
    touchStartY: 0,

    arrTimeT: [],

    otherType: [],
    activityNavTwo: [],


    modalTwo: false,
    timeOutEvent: 0,
    liNum: '1',
    loadingTwo: true,
    cofirmZ: 0,
    Cancels: 0,
    arrTimeuid: [],
    info: false,
    venueidids: [],
    lood: false,
    calesRed: 0,
    paied: 2,
    textNuma: '您还没有进行场地设置,请前往设置',
    headTop: '0',
    onSearchInput: '',
    deducting:false,
    deductingdetails: [],
    isfinsh:0,
    week:'',
    isloop:2,
    duration:false,
    Record:[]
  }


  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.qiDate })
    }
  }




  async getVenueReservation(data) {
    const res = await getVenueReservation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ calesRed: 0 })
      if (this.state.topNumList.length > 0) {
        for (let j = 0; j < this.state.topNumList.length; j++) {
          if (res.data.data[0].c[this.state.topNumList[j].venueid - 1] !== undefined) {
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
            res.data.data[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
          }
        }
      }
      for (let i in res.data.data) {
        for (let j in res.data.data[i].c) {
          res.data.data[i].c[j].checked = false
          if (res.data.data[i].c[j].type === 4) {
            this.setState({ calesRed: 1 })
          }
        }
      }
      let arrTime = []
      for (let i in res.data.data) {
        arrTime.push(res.data.data[i].a)
      }

      let ko = ''
      if (new Date().getMinutes() >= 30) {
        ko = new Date().getHours() + ':30'
      } else {
        ko = new Date().getHours() + ':00'
      }
      setTimeout(() => {
        if (document.querySelector('.ant-table-body') !== null) {
          document.querySelector('.ant-table-body').scrollTo(0, arrTime.indexOf(ko) * 50)
        }
      }, 2000)

      this.setState({
        resData: res.data.data
      })
      this.hoode(res.data.data)
      for (let i in res.data.other) {
        res.data.other[i].dataIndex = res.data.other[i].venueid
        res.data.other[i].title = <div>{res.data.other[i].venueid}<br />{res.data.other[i].title}</div>
        res.data.other[i].width = 80
      }
      let ploboj = {
        title: <div>场地号<br />标签</div>,
        fixed: 'left',
        width: 80,
        dataIndex: 'lppd',
      }
      res.data.other.unshift(ploboj)
      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c, otherType: res.data.other, value: 'l', spinningTwo: false, loadingTwo: false })
      sessionStorage.setItem('kood', 1)

    } else if (res.data.code === 4005) {
      this.setState({ lookList: res.data.data, spinningTwo: false, loadingTwo: false, lppding: false })
      sessionStorage.setItem('kood', 1)
    } else if (res.data.code === 4003) {
      this.setState({ otherType: [], lookBan: [], loadingTwo: false, lppding: false })
      sessionStorage.setItem('kood', 1)
    } else if (res.data.code === 4004) {
      this.setState({ lppding: false, textNuma: res.data.msg })
    }
  }


  hoode = (resData) => {
    let jood = []
    for (let i in resData) {
      let obj = {}
      for (let j in resData[i].c) {
        obj.key = i + 1
        let key = resData[i].c[j].venueids
        let value = <div><div data-type={resData[i].c[j].type} data-uuid={resData[i].c[j].uuid} onClick={this.lookDeta} style={resData[i].c[j].type === 1 ? { background: '#6FB2FF', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 4 ? { background: 'red', height: 45, color: 'transparent', lineHeight: 3 } : {}}><Checkbox className="chePe" idx={i} jdx={j} checked={resData[i].c[j].checked} onChange={this.checkbox} dtype={resData[i].c[j].type} time={resData[i].a} venueid={resData[i].c[j].venueids} uuid={resData[i].c[j].uuid} style={resData[i].c[j].type === 1 && this.state.cofirmZ === 1 ? {} : { display: 'none' } && resData[i].c[j].type === 4 && this.state.Cancels === 1 ? {} : { display: 'none' }} />{resData[i].c[j].money}</div></div>
        obj[key] = value
        let koTwo = parseInt(resData[i].a.slice(1, 2)) + 1 + ':00'
        obj.lppd = <div style={{ color: '#F5A623' }}>{resData[i].a}<br />{resData[i].a.slice(3, resData[i].a.length) === '00' ? resData[i].a.slice(0, 2) + ':30' : koTwo === '10:00' && resData[i].a !== '19:30' ? '10:00' : resData[i].a === '19:30' ? '20:00' : resData[i].a.slice(0, 1) + koTwo}</div>
      }
      jood.push(obj)
    }


    this.setState({
      lookBan: jood,
      lppding: false
    })




  }

  lookDeta = e => {
    if (e.currentTarget.dataset.type === "3") {
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '', paied: 0 })
      this.setState({ informVisible: true })
    } else if (e.currentTarget.dataset.type === '4' && this.state.Cancels === 0) {
      if (this.state.lood === false) {
        this.setState({ lood: true })
        this.VenueRemarksLabel({ uuid: e.currentTarget.dataset.uuid })
      }

    }
  }


  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ activeSon: res.data.data.data, informList: res.data.data.data, total: res.data.other, flag: false, spin: false })
    } else if (res.data.code === 4002) {
      this.setState({ activeSon: [], flag: true, refreshing: false })
    }
    this.setState({ spin: false, spinFlag: false, refreshing: false })
  }



  async getVenueSport(data) {
    const res = await getVenueSport(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({liNum:res.data.data[0].id})
      this.getReservationActivitieslist({ page: 1, sport: 0, status: 0, paied: 2, reserve: this.state.headTop })
      if (res.data.data.length > 0) {
        this.setState({ remList: res.data.data })
      }
    }
  }


  async VenueNumberSporttypeSave(data) {
    await VenueNumberSporttypeSave(data, localStorage.getItem('venue_token'))
  }

  async DelVenueNumberTitle(data) {
    const res = await DelVenueNumberTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('删除成功', 1)
      this.getVenueNumberTitleList({ sportid: this.state.liNum })
    }
  }


  componentDidMount() {
    let week=['周日','周一','周二','周三','周四','周五','周六']
    this.setState({ qiDate: new Date(), nowDate: new Date().toLocaleDateString().replace(/\//g, "-"),week:week[new Date().getDay()] })
   
    this.getVenueSport()
    if (this.props.location.query !== undefined) {
      this.setState({
        activityList: false,
        liIndex: this.props.location.query.liIndex,
      })
      
      this.setState({ liNum: this.props.location.query.id, liIndex: this.props.location.query.liIndex })
      this.getVenueNumberTitleList({ sportid: this.props.location.query.id })
    }
  }
  activityList = () => {
    this.setState({ activityList: true, sportIdVal: 0, statusIdVal: 0, paied: 2, start: '', end: '' })
    this.setState({ page: 1 })
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', publicuid: '', paied: 2, reserve: this.state.headTop })
  }
  bookingKanban = () => {
    this.getVenueNumberTitleList({ sportid: this.state.liNum })
    this.setState({ activityList: false })
  }
  select = (e) => {
    if (this.state.index === e.currentTarget.dataset.index) {
      this.setState({ index: 'l' })
    } else if (this.state.index !== e.currentTarget.dataset.index) {
      this.setState({ index: e.currentTarget.dataset.index })
    }
  }
  current = (page, pageSize) => {
    let startT = ''
    let endT = ''
    if (this.state.start !== '') {
      let start = this.state.start.toLocaleDateString().replace(/\//g, "-").split('-')
      let end = this.state.end.toLocaleDateString().replace(/\//g, "-").split('-')
      if (start[0].length === 4) {
        startT = start[0] + '-' + start[1] + '-' + start[2]
        endT = end[0] + '-' + end[1] + '-' + end[2]
      } else if (start[0].length !== 4) {
        startT = start[2] + '-' + start[0] + '-' + start[1]
        endT = end[2] + '-' + end[0] + '-' + end[1]
      }
    }
    this.setState({ page: page })
    this.getReservationActivitieslist({
      page: page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '',
      startdate: this.state.start === '' ? '' : startT, enddate: this.state.end === '' ? '' : endT, orderId: this.state.onSearchInput, paied: this.state.paied, reserve: this.state.headTop
    })
  }



  handleOk = e => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }
  sendCheck = e => {
    this.setState({ sendCheck: e.target.value })
  }
  textArea = e => {
    this.setState({ textArea: e.target.value })
  }

  async VenueSendMessage(data) {
    const res = await VenueSendMessage(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      this.setState({ visible: false })

      let start = this.state.start.format("yyyy-MM-dd").split('-')
      let end = this.state.end.format("yyyy-MM-dd").split('-')

      let startT = ''
      let endT = ''
      if (start[0].length === 4) {
        startT = start[0] + '-' + start[1] + '-' + start[2]
        endT = end[0] + '-' + end[1] + '-' + end[2]
      } else {
        startT = start[2] + '-' + start[0] + '-' + start[1]
        endT = end[2] + '-' + end[0] + '-' + end[1]
      }
      this.getReservationActivitieslist({
        page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '' ? '' : startT,
        enddate: this.state.end === '' ? '' : endT, paied: this.state.paied, reserve: this.state.headTop
      })
    }
  }



  showModal = (e) => {

    this.setState({
      visible: true,
      publicUUID: e.currentTarget.dataset.uid,
      venueid: e.currentTarget.dataset.venueid
    })


    prompt('发送通知', '未预留场地说明', [
      { text: '取消' },
      { text: '发送', onPress: value => this.VenueSendMessage({ type: 2, publicUUID: this.state.publicUUID, content: value, venuenumber: '', venueid: this.state.venueid }) },
    ])
  }
  showDrawer = () => {
    this.setState({
      Drawervisible: true
    })
  }
  onClose = () => {
    this.setState({
      Drawervisible: false,
      modalTwo: false,
      duration:false
    })
  }
  sport = e => {
    this.setState({ sportIdVal: e.currentTarget.dataset.id })
  }
  status = e => {
    this.setState({ statusIdVal: e.currentTarget.dataset.id })
  }
  paiedArr = e => {
    this.setState({ paied: e.currentTarget.dataset.id })
  }

  drawerInputOrderDate = (date) => {

    this.setState({ start: date })

  }



  drawerInputOrderDateTwo = (date) => {
    this.setState({ end: date.toLocaleDateString(), qiEnd: date })
  }

  submitVal = () => {
    if (this.state.start === '') {
      Toast.fail('请选择开始时间', 1)
    } else if (this.state.end === '') {
      Toast.fail('请选择结束时间', 1)
    } else {
      console.log(this.state.start)
      let start = this.state.start.format("yyyy-MM-dd").split('-')
      let end = this.state.end.format("yyyy-MM-dd").split('-')
      let startT = ''
      let endT = ''
      if (start[0].length === 4) {
        startT = start[0] + '-' + start[1] + '-' + start[2]
        endT = end[0] + '-' + end[1] + '-' + end[2]
      } else {
        startT = start[2] + '-' + start[0] + '-' + start[1]
        endT = end[2] + '-' + end[0] + '-' + end[1]
      }
      this.getReservationActivitieslist({
        page: 1, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '' ? '' : startT,
        enddate: this.state.end === '' ? '' : endT, paied: this.state.paied, reserve: this.state.headTop
      })
      this.setState({
        Drawervisible: false, page: 1
      })
    }

  }

  sportName = e => {
    this.setState({ liNum: e.currentTarget.dataset.id, liIndex: e.currentTarget.dataset.index })
    this.getVenueNumberTitleList({ sportid: e.target.dataset.id })
  }

  informOnClose = () => {
    this.setState({ informVisible: false })
  }

  async VenueClickCancelPlace(data) {
    const res = await VenueClickCancelPlace(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ cofirmZ: 0, venueidids: [], dtime: [], Cancels: 0, vIpChang: '', nameChang: '', phoneChang: '', qitaChang: '' })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.qiDate })
      if (data.type === 1) {
        Toast.success('该场地该时间段已标记为线下占用', 1)
      } else if (data.type === 2) {
        Toast.success('该场地该时间段已向找对手线上释放', 1)
      }
      this.setState({ info: false, lotime: [], arrTimeuid: [],isloop:2 })
    } else {
      Toast.fail('操作失败', 1)
    }
  }

  async VenueRemarksLabel(data) {
    const res = await VenueRemarksLabel(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ lood: true })
      let ko = JSON.parse(res.data.data)
      let arrObj = <div style={{ textAlign: 'left' }}>
        <div>{ko.placeName !== undefined ? '姓名:' + ko.placeName : ''}</div>
        <div>{ko.placePhone !== undefined ? '手机号:' + ko.placePhone : ''}</div>
        <div>{ko.placeHui !== undefined ? '会员卡号:' + ko.placeHui : ''}</div>
        <div>{ko.placeQi !== undefined ? '其他:' + ko.placeQi : ''}</div>
      </div>
      alert('预订情况详情', arrObj, [
        { text: '关闭', onPress: () => this.setState({ lood: false }) },
      ])
    }
  }









  valChange = (vals) => {
    let monut = parseInt(vals[1]) + 1
    this.setState({ nowDate: vals[0] + '-' + monut + '-' + vals[2] })
  }


  onTouchStart = (e) => {

    this.setState({ evet: e.currentTarget.dataset.type, evetId: e.currentTarget.dataset.uuid })
    this.timeOutEvent = setTimeout(() => {
      this.timeOutEvent = 0;
      this.menu()
    }, 400);
  }




  menu = () => {

    if (this.state.evet === '1') {
      this.setState({ otherObj: '', menu: 2 })
      if (this.state.lotime.length !== 0) {
        let num = ''
        let time = ''
        for (let i in this.state.lotime) {
          num += this.state.lotime[i].split('-')[1] + ','
          time += this.state.lotime[i].split('-')[0] + ','
        }

        this.setState({ modalTwo: true, changNum: num, changTime: time })
      } else {
        Toast.fail('请选择场地', 1)
      }
    } else if (this.state.evet === '4') {

      if (this.state.lood === false) {
        this.setState({ lood: true })
        this.VenueRemarksLabel({ uuid: this.state.evetId })
      }




    } else {
      this.setState({ otherObj: '', menu: 2 })
    }
  }


  vIpChang = val => {
    this.setState({ vIpChang: val })
  }
  nameChang = val => {
    this.setState({ nameChang: val })
  }
  qitaChang = val => {
    this.setState({ qitaChang: val })
  }

  phoneChang = val => {
    this.setState({ phoneChang: val })
  }

  CheckboxOnChange=(e)=>{
    if(e.target.checked===true){
      this.setState({isloop:1})
    }else{
     this.setState({isloop:2})
    }
   }

  placeSubmit = () => {
    let { venueidids, dtime, vIpChang, nameChang, phoneChang, qitaChang } = this.state
   
      let obj = {
        placeHui: vIpChang,
        placeName: nameChang,
        placePhone: phoneChang,
        placeQi: qitaChang,
      }
      this.VenueClickCancelPlace({ uuid: '', date: this.state.qiDate, venueid: venueidids, other: JSON.stringify(obj), time: dtime, sportid: this.state.liNum, type: 1,isloop:this.state.isloop })

    


  }




  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.fail(res.data.msg, 1)
      this.getVenueNumberTitleList({ sportid: this.state.liNum })
    }
  }

  tilBlur = e => {
    this.getVenueNumberTitleSave({ sportid: this.state.liNum, veneuid: e.currentTarget.dataset.num, title: e.target.value, uuid: e.currentTarget.dataset.uuid })
    this.setState({ value: 'l' })
  }

  noneBox = e => {
    this.setState({ value: e.currentTarget.dataset.num })
  }
  refResh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end, paied: this.state.paied, reserve: this.state.headTop })
    }, 1000)
  }

  delTitle = e => {
    this.DelVenueNumberTitle({ uuid: e.currentTarget.dataset.uuid })
  }


  classList = e => {
    this.setState({ sportName: e })
    this.VenueNumberSporttypeSave({ sportid: this.state.liNum, sporttype: e.split('-')[0], venueid: e.split('-')[1] })
  }

  dateChange = (date) => {
    let week=['周日','周一','周二','周三','周四','周五','周六']
    this.setState({week:week[new Date(date).getDay()]})
    this.getVenueNumberTitleList({ sportid: this.state.liNum })
  }

  totitle = e => {
    if (e.currentTarget.dataset.type === '1') {
      Toast.info('请为各场地选择对应的场地类型，如1号场地为11人制足球场地；2号场地为5人制足球场地等', 5);
    } else {
      Toast.info('请为各场地填写标签，如普通、VIP、赛台、独立包间、楼上、楼下、人造草皮、真草皮等标签，也可不填写', 5);
    }
  }

  cofirmZ = () => {
    this.setState({
      cofirmZ: 1,
      chePe: false
    })
    setTimeout(() => {
      this.hoode(this.state.resData)
    }, 50)

  }

  checkbox = e => {
    if (this.state.resData[e.target.idx].c[e.target.jdx].checked === false) {
      let items = this.state.resData
      items[e.target.idx].c[e.target.jdx].checked = true
      this.hoode(items)
    } else {
      let items = this.state.resData
      items[e.target.idx].c[e.target.jdx].checked = false
      this.hoode(items)
    }
    let timUid = e.target.uuid + '#' + e.target.time + '#' + e.target.venueid
    if (this.state.arrTimeuid.indexOf(timUid) !== -1) {
      this.state.arrTimeuid.splice(this.state.arrTimeuid.indexOf(timUid), 1)
    } else {
      this.setState({ arrTimeuid: [...this.state.arrTimeuid, timUid] })
    }





  }

  shour = () => {
    let { arrTimeuid } = this.state
    let venueidids = []
    let dtime = []
    for (let i in arrTimeuid) {

      venueidids.push(arrTimeuid[i].split('#')[2])
      dtime.push(arrTimeuid[i].split('#')[1])
    }
    if (venueidids.length !== 0) {
      this.setState({
        info: true,
        venueidids: typeof (venueidids) === 'string' ? venueidids : venueidids.join(','),
        dtime: typeof (dtime) === 'string' ? dtime : dtime.join(',')
      })
    } else {
      Toast.fail('请选择空闲场地', 1)

    }

  }
  shourTwo = () => {
    this.setState({
      cofirmZ: 0, venueidids: [], dtime: [], arrTimeuid: []
    })
    setTimeout(() => {
      let items = this.state.resData
      for (let i in items) {
        for (let j in items[i].c) {

          items[i].c[j].checked = false
        }
      }
      this.hoode(items)
    }, 50)
  }

  Cancels = () => {
    this.setState({
      Cancels: 1
    })
    setTimeout(() => {
      this.hoode(this.state.resData)
    }, 50)
  }

  Cancelsshour = () => {
    let { arrTimeuid, liNum } = this.state
    let venueidids = []
    let dtime = []
    let duuid = []
    for (let i in arrTimeuid) {

      venueidids.push(arrTimeuid[i].split('#')[2])
      dtime.push(arrTimeuid[i].split('#')[1])
      duuid.push(arrTimeuid[i].split('#')[0])
    }

    const lp=alert('提示', <div><div style={{fontSize:'0.75rem'}}>将所选线下占用场地时间段释放到线上?</div><div><Checkbox style={{marginTop:'1rem',fontSize:'0.75rem'}} onChange={this.CheckboxOnChange}>将所选场地时间段在每{this.state.week}都释放</Checkbox></div></div>, [
      { text: '取消', onPress: () =>console.log() },
      {
        text: '确定',
        onPress: () =>
          new Promise((resolve) => {
            if (venueidids.length !== 0) {
              this.VenueClickCancelPlace({ date:this.state.qiDate.format("yyyy-MM-dd"), sportid: liNum, type: 2, time: dtime.join(','), venueid: venueidids.join(','), uuid: duuid.join(','), other: '',isloop:this.state.isloop })
              lp.close()
            } else {
              Toast.fail('请选择需要释放的场地', 1)
            }
          }),
      },
    ])

    
  }
  CancelsshourTwo = () => {
    this.setState({
      venueidids: [],
      dtime: [],
      duuid: [],
      Cancels: 0,
      arrTimeuid: []
    })
    setTimeout(() => {
      let items = this.state.resData
      for (let i in items) {
        for (let j in items[i].c) {
          items[i].c[j].checked = false
        }
      }
      this.hoode(items)
    }, 50)
  }

  onCloseKO = () => {
    this.setState({ info: false })
  }
  headTop = e => {
    this.setState({ headTop: e.currentTarget.dataset.index, page: 1, sportIdVal: '', statusIdVal: '', start: '', end: '', paied: '2',onSearchInput:'' })
    setTimeout(() => {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end, paied: this.state.paied, reserve: this.state.headTop })
    }, 500)
  }
  onSearchInput = e => {
    this.setState({ onSearchInput: e.target.value })
  }

  onSearch = e => {
    this.setState({page:1})
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', paied: '2', orderId: this.state.onSearchInput, reserve: this.state.headTop })
  }

  async DeductTheTimesOfClosing(data) {
    const res = await DeductTheTimesOfClosing(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      setTimeout(() => {
        this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end, paied: this.state.paied, reserve: '1' })
      }, 500)
    } else {
      Toast.fail(res.data.msg)
    }
  }

  confirm = e => {
    let ko = e.currentTarget.dataset.uuid
    alert('提示', '您确定要扣除一次吗?', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => this.DeductTheTimesOfClosing({ breakupid: ko }) },
    ]);
  }


  async BreakUpConsumptionDetails(data) {
    const res = await BreakUpConsumptionDetails(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ deductingdetails: res.data.data.details,isfinsh:res.data.data.isfinsh })
    } 
  }



  deducting=e=>{
    this.setState({deducting:true})
    this.BreakUpConsumptionDetails({publicuuid:e.currentTarget.dataset.uuid})
  }

  deductingTwo=()=>{
    this.setState({deducting:false})
  }

  async ContinuationRecord(data) {
    const res = await ContinuationRecord(data, localStorage.getItem('venue_token'))
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
    return (
      <div className="orderPh">
        <div className="headerNav">
          <div onTouchStart={this.activityList} style={this.state.activityList === true ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>预约活动列表</div>
          <div onTouchStart={this.bookingKanban} style={this.state.activityList === false ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>场地预约情况</div>
        </div>
        <div className="head" style={this.state.activityList === true ? {} : { display: 'none' }}>
          <div className="headTop" onTouchStart={this.headTop} data-index='0' style={this.state.headTop === '0' ? { color: '#fff', background: '#F5A623' } : {}}>找运动伙伴</div>
          <div className="headTop" onTouchStart={this.headTop} data-index='1' style={this.state.headTop === '1' ? { color: '#fff', background: '#F5A623' } : {}}>仅预订场馆</div>
          <div><input type="number" style={{ width: '7rem', height: '1.6rem', marginLeft: '0.5rem', paddingLeft: '0.3rem' }} value={this.state.onSearchInput} placeholder="活动编号" onChange={this.onSearchInput} /><button onTouchStart={this.onSearch}>查询</button></div>
        </div>

        <div className={this.state.activityList === true ? 'activityList' : 'hidden'}>
          <div className="screen" onClick={this.showDrawer}><span style={{ paddingRight: '0.2rem' }}>筛选</span><img style={{ marginTop: '-0.2rem' }} src={require('../../assets/shaixuan.png')} alt="筛选" /></div>

          <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin}>

            <div style={this.state.activeSon.length === 0 ? { display: 'none' } : { height: '100%', overflow: 'scroll', paddingBottom: '4rem' }}>
              {
                this.state.activeSon.map((item, i) => (
                  <div key={i}>
                    <Card>
                      <Card.Header
                        title={'**' + item.orderId.slice(-10) + item.SportName}
                        thumb={
                               item.PublicStatus === '匹配中' ? require('../../assets/pipei.png') : ''
                            || item.PublicStatus === '待评价' ? require('../../assets/pinjia.png') : ''
                            || item.PublicStatus === '活动中' ? require('../../assets/huodong.png') : ''
                            || item.PublicStatus === '待填写比赛结果' ? require('../../assets/jieguo.png') : ''
                            || item.PublicStatus === '待确认结束' ? require('../../assets/jieshu.png') : ''
                            || item.PublicStatus === '已取消' ? require('../../assets/tuichu.png') : ''
                            || item.PublicStatus === '已完成' ? require('../../assets/wancheng.png') : ''
                            || item.PublicStatus === '待出发' ? require('../../assets/dai.png') : ''
                            || item.PublicStatus === '投诉中' ? require('../../assets/tousua.png') : ''}
                        extra={<div className="cardHeader">{item.StartTime === 0 ? item.FinishedTime.slice(0, 10) : item.StartTime.slice(0, 10)}<br />{item.StartTime === 0 ? '' : item.StartTime.slice(10, item.StartTime.length) + ' -'}{item.FinishedTime.slice(10, item.FinishedTime.length)}</div>}
                      />
                      <Card.Body className="cardBody">
                        <div>
                          <span className="footerOne" >金额:￥{item.SiteMoney}</span>
                          <span style={{float:'left' }}>支付状态:{item.SiteMoneyStatus}</span>
                          <span style={item.reserve !== 1 ? { display: 'none' } : {marginLeft:'5%',float:'left'}}>续时:<span style={{color:'#4A90E2'}} onClick={this.duration} data-uuid={item.uuid}>查看记录</span></span>
                          <span style={item.reserve === 1 ? { display: 'none' } : { display: 'block', width: '90px', float: 'left',marginLeft:'6%' }}>应到人数:{item.Shouldarrive}人</span>
                        </div>
                       
                        <div style={item.breakup.length === 0 && item.reserve === 1 ? { width: '25%', marginLeft: '0.5rem', float: 'left' } : { display: 'none' }}>场地编号
                      {
                            item.venueid_details.map((itemKo, i) => (
                              <div key={i}>{itemKo.venueid}</div>
                            ))
                          }</div>

                        <div style={item.breakup.length === 0 && item.reserve === 1 ? { width: '25%', marginLeft: '0.5rem', float: 'left' } : { display: 'none' }}>
                          <div style={{ textAlign: 'center' }}>时间段</div>
                          {
                            item.venueid_details.map((itemKo, i) => (
                              <div style={{ textAlign: 'center' }} key={i}>{itemKo.time}</div>
                            ))
                          }</div>


                        <div style={item.breakup.length === 0 ? { display: 'none' } : {}}>
                          <div style={{ width:'25%', marginLeft: '0.5rem', float: 'left' }}>
                            <div>场地编号</div>
                            {
                              item.breakup.map((itemTwo, i) => (
                                <div key={i}>{itemTwo.venueid}</div>
                              ))
                            }
                          </div>
                          <div style={{ width: '25%', marginLeft: '0.5rem', float: 'left', textAlign: 'center' }}>
                            <div>单价</div>
                            {
                              item.breakup.map((itemTwo, i) => (
                                <div key={i}>{itemTwo.price}/次</div>
                              ))
                            }
                          </div>

                          <div style={{ width: '25%', marginLeft: '0.5rem', float: 'left', textAlign: 'center' }}>
                            <div>剩余次数</div>
                            {
                              item.breakup.map((itemTwo, i) => (
                                <div key={i}>{itemTwo.frequency}<button style={itemTwo.frequency===0||item.PublicStatus ==='已完成' ?{display:'none'}:{ marginLeft: "0.5rem" }} onClick={this.confirm} data-uuid={itemTwo.uuid}>－</button></div>
                              ))
                            }
                          </div>
                        
                          <div style={{color:'#4A90E2',marginTop:'25px'}} data-uuid={item.uuid} onClick={this.deducting}>扣除<br/>记录</div>
                        </div>
                        <div>
                          <span className="footerOne" style={this.state.headTop === '0' ? {} : { display: 'none' }}>时长:{item.breakup.length===0?item.PlayTime+'小时':'无'}</span>
                          <span style={item.reserve === 1 ? { display: 'none' } : {display:'block',width:'90px',float:'left'}}>报名人数:{item.TrueTo}人</span>
                          <span style={item.reserve === 1 ? { display: 'none' } : {marginLeft:'5%',float:'left'}}>续时:<span style={{color:'#4A90E2'}} onClick={this.duration} data-uuid={item.uuid}>查看记录</span></span>
                          <i onClick={this.showModal} data-venueid={item.venueid} data-uid={item.uuid} className={item.breakup.length === 0 ?item.PublicStatus === '匹配中' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'sendingTwo' : 'circumstanceT':'circumstanceT'} >
                            <svg t="1577274065679" className="icon" viewBox="0 0 1235 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15123" width="30" height="30"><path d="M899.65056 979.48672c-120.35072 0-218.2656-97.95584-218.2656-218.35776s97.91488-218.35776 218.2656-218.35776 218.2656 97.95584 218.2656 218.35776S1020.0028 979.48672 899.65056 979.48672M899.65056 498.25792c-144.88576 0-262.76352 117.92384-262.76352 262.87104S754.75968 1024 899.65056 1024s262.76352-117.92384 262.76352-262.87104S1045.53984 498.25792 899.65056 498.25792M586.60864 862.70976 130.58048 862.70976c-17.21344 0-31.21152-14.53568-31.21152-32.41472L99.36896 112.66048c0-17.86368 14.0032-32.39936 31.21152-32.39936l926.38208 0c17.21344 0 31.2064 14.53568 31.2064 32.39936l0 377.84576c0 12.29824 9.6 22.25664 21.43744 22.25664 11.83232 0 21.43744-9.9584 21.43744-22.25664L1131.04384 112.66048c0-42.40896-33.23392-76.91264-74.08128-76.91264L130.58048 35.74784c-40.84736 0-74.0864 34.50368-74.0864 76.91264l0 717.63456c0 42.41408 33.23904 76.928 74.0864 76.928l456.02816 0c11.83744 0 21.43744-9.96352 21.43744-22.25664S598.44608 862.70976 586.60864 862.70976M1042.52928 95.83616l-448.768 343.95648c-0.87552 0.24064-2.25792 0.24576-3.10272 0.03072l-445.5936-343.936c-8.63232-8.74496-22.72256-8.832-31.4624-0.18944-8.74496 8.6272-8.82688 22.72768-0.19456 31.47264l447.42144 345.7792c0.7168 0.73216 1.48992 1.41312 2.30912 2.03264 8.28416 6.33856 18.6624 9.51296 29.05088 9.51296 10.37824 0 20.76672-3.1744 29.05088-9.50784 0.79872-0.60928 1.55136-1.26976 2.25792-1.98144l450.5856-345.7792c8.66304-8.71936 8.6272-22.8096-0.08704-31.47776C1065.27232 87.08608 1051.17696 87.11168 1042.52928 95.83616M779.74016 783.3856l186.10176 0-44.78976 44.8c-8.68864 8.69376-8.68864 22.784 0 31.47776 8.68352 8.69376 22.76864 8.69376 31.4624 0.00512l82.7648-82.79552c0.16384-0.16384 0.27136-0.36352 0.43008-0.52736 0.83456-0.88576 1.63328-1.81248 2.31424-2.82112 0.26624-0.39936 0.44544-0.83968 0.68096-1.2544 0.49152-0.83968 0.9984-1.67424 1.37216-2.57536 0.20992-0.50176 0.31232-1.03424 0.48128-1.55136 0.28672-0.86528 0.60928-1.70496 0.7936-2.60608 0.29184-1.43872 0.44544-2.91328 0.44544-4.40832l0 0 0 0c0-0.05632-0.02048-0.11264-0.02048-0.17408-0.01024-1.42848-0.14848-2.8416-0.42496-4.224-0.20992-1.024-0.55808-1.99168-0.896-2.95936-0.13824-0.39424-0.21504-0.80896-0.37376-1.19296-0.44544-1.07008-1.024-2.05824-1.62304-3.03104-0.1536-0.26112-0.26112-0.54272-0.42496-0.78848-0.81408-1.21344-1.7408-2.3552-2.76992-3.38432l-82.75456-98.23232c-4.34688-4.34176-10.0352-6.51776-15.73376-6.51776-5.68832 0-11.392 2.176-15.73376 6.51776-8.68864 8.69376-8.68864 38.23616 0 46.92992l44.78976 44.8-186.10176 0c-12.288 0-22.2464 9.96352-22.2464 22.25664S767.45216 783.3856 779.74016 783.3856" p-id="15124" fill='#888'></path></svg>
                          </i></div>
                      </Card.Body>
                      <Card.Footer />
                    </Card>
                  </div>

                ))
              }

              <Pagination hideOnSinglePage={true} showSizeChanger={false} current={this.state.page} className={this.state.activeSon.length > 0 ? 'fenye' : 'hidden'} style={{ marginTop: '10px' }} size="small" defaultCurrent={1} onChange={this.current} total={this.state.total} />
            </div>
            <div style={this.state.spin === false && this.state.activeSon.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (5).png')} alt="444" /><span style={{ display: 'block', textAlign: 'center' }}>没有预约活动!</span></div>
          </Spin>
        </div>


        <Modal
          visible={this.state.deducting}
          transparent
          onClose={this.deductingTwo}
          title="扣除记录"
          style={{width:'90%',minHeight:'10rem'}}
        >
          <div style={this.state.isfinsh===0?{display:'none'}:{fontSize:'14px',fontWeight:'bold',color:'#333'}}>所有散场次数已消费完</div>
          {
            this.state.deductingdetails.map((item,i)=>(
            <div key={i} style={{fontSize:'12px',clear:'both',lineHeight:'25px'}}><span style={{float:'left',width:'60%',textAlign:'left'}}>{item.comment}</span><span style={{float:'right'}}>{item.time}</span></div>
            ))
          }
        </Modal>



        <div className={this.state.activityList === false ? 'bookingKanban' : 'hidden'}>
          <DatePicker
            mode="date"
            extra='选择日期'
            title='选择日期'
            value={this.state.qiDate}
            onChange={qiDate => this.setState({ qiDate })}
            onOk={this.dateChange}

          >
            <List.Item className="dateT" style={{ fontSize: '14px' }}></List.Item>
          </DatePicker>
          <div className="modTitle">
            <span className="blue"></span><span>空闲</span><span className="white"></span><span>不可选</span><span className="yellow"></span><span>线上占用</span><span className="red"></span><span>线下占用</span>
            <br />
            <span className="btnSi" style={this.state.cofirmZ === 1 || this.state.otherType.length === 0 || this.state.Cancels === 1 ? { display: 'none' } : { display: 'block' }} onClick={this.cofirmZ}><span>设置占用</span></span>
            <span style={this.state.cofirmZ === 1 ? { display: 'block' } : { display: 'none' }}><div className="cofirmZText" onClick={this.shour}>确定</div><div style={{ marginLeft: '2px' }} className="cofirmZText" onClick={this.shourTwo}>取消</div></span>
            <span className="btnSi" style={this.state.Cancels === 1 || this.state.otherType.length === 0 || this.state.calesRed === 0 || this.state.cofirmZ === 1 ? { display: 'none' } : { display: 'block' }} onClick={this.Cancels}>释放占用</span>
            <span style={this.state.Cancels === 1 ? { display: 'block' } : { display: 'none' }}><div className="cofirmZText" onClick={this.Cancelsshour}>确定</div><div style={{ marginLeft: 2 }} className="cofirmZText" onClick={this.CancelsshourTwo}>取消</div></span>
          </div>

          <div style={{ width: '100%', overflowX: 'auto' }}>
            <div className="locaList">
              {
                this.state.remList.map((item, i) => (
                  <div key={i} data-id={item.id} data-index={i} onClick={this.sportName} style={parseInt(this.state.liIndex) === i ? { borderBottom: '0.06rem solid #D85D27', color: '#D85D27' } : {}}>{item.name}</div>
                ))
              }
            </div>
          </div>
          {/* 看板渲染标签 */}
          <Table loading={this.state.loadingTwo} style={this.state.otherType.length === 0 ? { display: 'none' } : { maxWidth: this.state.otherType.length * 80 }} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 76, minWidth: 40, y: '90%' }} />,
            <div style={this.state.activityList === false && this.state.otherType.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (2).png')} alt="555" /><span style={{ textAlign: 'center', display: "block" }}>{this.state.textNuma}!</span></div>
        </div>



        <Drawer
        title="续时记录"
        placement="bottom"
        height='70%'
        onClose={this.onClose}
        className="momo"
        visible={this.state.duration}
      >
        <div style={this.state.Record.length!==0?{}:{display:'none'}}>
              <Row>
                <Col span={8}>开始时间</Col>
                <Col span={4}>时长</Col>
                <Col span={8}>操作时间</Col>
                <Col span={4}>价格</Col>
              </Row>
              {
                this.state.Record.map((item, i) => (
                  <Row key={i}>
                    <Col span={8}>{item.datetime}</Col>
                    <Col span={4}>{item.playtime}</Col>
                    <Col span={8}>{item.time}</Col>
                    <Col span={4}>￥{item.mone}</Col>
                  </Row>
                ))
              }
            </div>
            <div style={this.state.Record.length===0?{textAlign:'center'}:{display:'none'}}>暂无续时~</div>

       
      </Drawer>





        <Drawer
          title="筛选活动列表"
          placement="right"
          closable={true}
          width='100%'
          onClose={this.onClose}
          visible={this.state.Drawervisible}
          bodyStyle={{ padding: '4px' }}
          className='kodrAwer'
        >
          <span>项目名称</span>
          <div className="drawerBoss">
            {
              this.state.sport.map((item, i) => (
                <div key={i} onClick={this.sport} data-index={i} data-id={item.id} style={parseInt(this.state.sportIdVal) === item.id ? { background: '#D85D27', color: '#fff' } : {}}>{item.name}</div>
              ))
            }
          </div>
          <span style={{ clear: 'both', display: 'block', marginTop: '1rem' }}>活动状态</span>
          <div className="drawerBossTwo">
            {
              this.state.status.map((item, i) => (
                <div key={i} data-id={item.id} onClick={this.status} style={parseInt(this.state.statusIdVal) === item.id ? { background: '#D85D27', color: '#fff' } : {}}>{item.name}</div>
              ))
            }
          </div>

          <span style={{ clear: 'both', display: 'block', marginTop: '1rem' }}>支付状态</span>
          <div className="drawerBossTwo">
            {
              this.state.paiedArr.map((item, i) => (
                <div key={i} data-id={item.id} onClick={this.paiedArr} style={parseInt(this.state.paied) === item.id ? { background: '#D85D27', color: '#fff' } : {}}>{item.name}</div>
              ))
            }
          </div>

          <div className='drawerInputOrder'>
            <span style={{ clear: 'both', display: 'block', marginTop: '1rem' }}>选择日期</span>
            <div style={{ width: '100%', height: '3rem' }}>
              <DatePicker
                mode="date"
                extra='选择'
                title='选择日期'
                value={this.state.start}
                onChange={start => this.setState({ start, end: '' })}
              >
                <List.Item arrow="horizontal">开始日期</List.Item>
              </DatePicker>



            </div>
            <div style={{ width: '100%', height: '3rem' }}>
              <DatePicker
                mode="date"
                extra='选择'
                title='选择日期'
                minDate={this.state.start}
                value={this.state.end}
                onChange={end => this.setState({ end })}
              >
                <List.Item arrow="horizontal" style={{ fontSize: '14px' }}>结束日期</List.Item>
              </DatePicker>

            </div>
          </div>
          <div className="drawerBtn">
            <div onTouchStart={this.onClose}>取消</div>
            <div onTouchStart={this.submitVal}>确定</div>
          </div>
        </Drawer>











        <Modal
          visible={this.state.info}
          transparent
          onClose={this.onCloseKO}
          title="请输入线下预订人的相关信息"
          footer={[{ text: '提交', onPress: () => { this.placeSubmit(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <InputItem className="inputModel" style={{ fontSize: '12px' }} placeholder="(选填)" value={this.state.nameChang} maxLength={20} onChange={this.nameChang} ><span style={{ fontSize: '12px' }}>姓名:</span></InputItem>
          <InputItem className="inputModel" style={{ fontSize: '12px' }} placeholder="(选填)" value={this.state.phoneChang} maxLength={11} onChange={this.phoneChang}  ><span style={{ fontSize: '12px' }}>手机号:</span></InputItem>
          <InputItem className="inputModel" style={{ fontSize: '12px' }} placeholder="(选填)" value={this.state.vIpChang} maxLength={20} onChange={this.vIpChang}  ><span style={{ fontSize: '12px' }}>会员卡:</span></InputItem>
          <InputItem className="inputModel" style={{ fontSize: '12px' }} placeholder="(选填)" value={this.state.qitaChang} maxLength={50} onChange={this.qitaChang}  ><span style={{ fontSize: '12px' }}>其他:</span></InputItem>
          <Checkbox style={{marginTop:'1rem'}} onChange={this.CheckboxOnChange}>将所选场地时间段在每{this.state.week}都预留给该线下用户</Checkbox>
        </Modal>




        <Drawer
          title="该场地详细信息"
          placement="right"
          closable={false}
          width='80%'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>活动编号：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].orderId : ''}</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>项目名称：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SportName : ''}</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>开始时间：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].StartTime : ''}</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>结束时间：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].FinishedTime : ''}</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>时长：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].PlayTime : ''}小时</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>应到人数：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].Shouldarrive : ''}</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>场地费金额：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney + '元' : ''}</span>
          </div>
          <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
            <span>场地费状态：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default orderPh;