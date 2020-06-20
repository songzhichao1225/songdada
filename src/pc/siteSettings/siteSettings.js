import React from 'react';
import './siteSettings.css';
import 'antd/dist/antd.css';
import { getSiteSettingList, addVenueField, getVenueSport, AddSiteSetting, DelSiteSetting, getVenueSportidTitle, DelVenueTitle, SiteSettingDiscountSave, getVenueNumberTitleFirst, getSiteSettingFirst, getSiteSelectedTitle, DelVenueNumberTitle, getSiteSelectedVenueid, getVenueTitleSave, getVenueNumberTitleSave, getVenueNumberTitleList, DelSiteSettingDiscount } from '../../api';
import { Select, Row, Col, Modal, DatePicker, InputNumber, Input, message, Pagination, Popconfirm, Divider, Popover, Spin } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { Option } = Select;
const { TextArea } = Input;

const { RangePicker } = DatePicker;




class siteSettings extends React.Component {

  state = {
    visible: false,
    ListSport: [],
    list: [],
    runId: '',//运动项目id
    runIdTwo: '',//运动项目id设置价格
    runName: '',//运动项目名称
    tags: '',
    openday: '',//营业时间段Id
    opendayname: '',//营业时间端名称
    starttime: '',//开始时间
    endtime: '',//结束时间
    costperhour: '',//价格
    number: 1,//数量
    maxScheduledDate: '',//最长可预定日期、
    appointmenttime: '',//最短可提前预定时间
    comment: '',//备注
    loading: true,//加载
    Disid: '',
    hidden: '',
    other: 0,
    page: 1,
    deletUid: 0,
    maxScheduledDateName: [],
    siteEditor: 0,//场地设置打开修改
    headerData: '1',
    joinXi: false,
    joinTil: [],
    items: ['jack', 'lucy'],
    name: '',
    joinB: true,
    serialNumber: false,
    arrNum: [],
    arrCheked: [],//选择完的场地
    arrChekedLen: 0,//选择场地的数量
    interpretation: false,
    nameChang: '',
    joinXiList: [],
    otherseris: 0,
    venNumid: '',
    confirmserisa: '',
    nosubdivisions: false,
    selecdTil: [],
    arrTitle: [],
    tagsTwo: '',
    chekedTwo: '',
    chekedTwoLen: 0,
    tagsTwoId: '',
    arrJoinTil: [],
    moneyId: '',
    pageOne: 1,
    Preferential: false,
    firstList: '',
    arrNumTwo: [],
    siteListId: '',
    typeList: null,
    chekedThree: '',
    discount_edate: null,
    discount_end: null,
    discount_sdate: null,
    discount_start: null,
    typeDetel: 0,
    tooltip: false,
    update: 0,
    chekedFour: [],
    lppd: 0,
    lppding: true,
    titleDel:'',
    timer: [{ name: '00:00' }, { name: '00:30' }, { name: '01:00' }, { name: '01:30' }, { name: '02:00' }, { name: '02:30' }, { name: '03:00' }, { name: '03:30' }, { name: '04:00' }, { name: '04:30' }, { name: '05:00' }, { name: '05:30' }, { name: '06:00' }, { name: '06:30' }, { name: '07:00' }, { name: '07:30' }, { name: '08:00' }, { name: '08:30' }, { name: '09:00' }, { name: '09:30' }, { name: '10:00' }, { name: '10:30' }, { name: '11:00' }, { name: '11:30' }, { name: '12:00' }, { name: '12:30' }, { name: '13:00' }, { name: '13:30' }, { name: '14:00' }, { name: '14:30' }, { name: '15:00' }, { name: '15:30' }, { name: '16:00' }, { name: '16:30' }, { name: '17:00' }, { name: '17:30' }, { name: '18:00' }, { name: '18:30' }, { name: '19:00' }, { name: '19:30' }, { name: '20:00' }, { name: '20:30' }, { name: '21:00' }, { name: '21:30' }, { name: '22:00' }, { name: '22:30' }, { name: '23:00' }, { name: '23:30' }, { name: '24:00' }]
  };
  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆!')
    }
    this.setState({ ListSport: res.data.data })
  }





  async getSiteSettingList(data) {
    const res = await getSiteSettingList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].maxScheduledDate === '0.1') {
          res.data.data[i].maxScheduledDateTwo = '1周'
        } else if (res.data.data[i].maxScheduledDate === '0.2') {
          res.data.data[i].maxScheduledDateTwo = '2周'
        } else if (res.data.data[i].maxScheduledDate === '0.3') {
          res.data.data[i].maxScheduledDateTwo = '3周'
        } else if (res.data.data[i].maxScheduledDate === '1') {
          res.data.data[i].maxScheduledDateTwo = '1个月'
        } else if (res.data.data[i].maxScheduledDate === '2') {
          res.data.data[i].maxScheduledDateTwo = '2个月'
        }
      }

      for (let i in res.data.data) {
        if (res.data.data[i].openday.split(',').indexOf('1') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周一'
        } if (res.data.data[i].openday.split(',').indexOf('2') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周二'
        } if (res.data.data[i].openday.split(',').indexOf('3') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周三'
        } if (res.data.data[i].openday.split(',').indexOf('4') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周四'
        } if (res.data.data[i].openday.split(',').indexOf('5') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周五'
        } if (res.data.data[i].openday.split(',').indexOf('6') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周六'
        } if (res.data.data[i].openday.split(',').indexOf('7') !== -1) {
          res.data.data[i].opendayname = res.data.data[i].opendayname + ',周日'
        }
      }

      this.setState({ list: res.data.data, other: res.data.other, loading: false, hidden: true, lppding: false })
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({ list: res.data.data, loading: false, hidden: false, lppding: false })
    }
  }

  componentDidMount() {


    this.getVenueSport()
    this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page })
    sessionStorage.setItem('siteSettings', '')
    if (this.state.runId !== '') {
      this.setState({
        joinB: false
      })
    }
    let arrNum = []
    for (let i = 1; i <= 100; i++) {
      let p = {
        id: i, cheked: false
      }
      arrNum.push(p)
    }
    this.setState({
      arrNum: arrNum
    })

    this.getVenueNumberTitleList({ sportid: this.state.nameChang })

  }

  nameChang = e => {
    this.setState({
      nameChang: e
    })
    if (this.state.headerData === '1') {
      this.setState({pageOne:1})
      this.getVenueNumberTitleList({ sportid: e, page: 1 })
    } else {
      this.setState({page:1})
      this.getSiteSettingList({ sportid: e, page: 1 })
    }
  }



  handleOk = e => {
    this.setState({
      visible: false,
      update: 0
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false, update: 0, Disid: '',
      // runIdTwo: '', tagsTwo: '', opendayname: '', openday: '', starttime: '',
      // endtime: '', costperhour: '', chekedTwo: '', chekedTwoLen: 0, appointmenttime: '',
      // tagsTwoId: '', comment: '', maxScheduledDate: '', maxScheduledDateName: [], runNameTwo: '', Disid: ''   用于价格设置弹窗清空
    })
  }
  handleChangeOne = e => {
    this.setState({ runId: e, joinB: false, tags: '' })
    this.getVenueSportidTitle({ sportid: e })
    let day = ''
    switch (parseInt(e)) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球中式黑八";
        break;
      case 4:
        day = "台球美式九球";
        break;
      case 5:
        day = "台球斯诺克";
        break;
      case 6:
        day = "篮球";
        break;
      case 7:
        day = "足球11人制";
        break;
      case 8:
        day = "足球8人制";
        break;
      case 9:
        day = "足球7人制";
        break;
      case 10:
        day = "足球5人制";
        break;
      case 11:
        day = "排球";
        break;
      case 12:
        day = "网球";
        break;
      default:
        day = "";
    }
    this.setState({ runName: day })
  }


  handleChangeOneTwo = e => {
    this.getSiteSelectedTitle({ sportid: e })
    this.setState({ runIdTwo: e, joinB: false, tagsTwo: '', chekedTwo: '', chekedTwoLen: 0 })
    this.getVenueSportidTitle({ sportid: e })
    let day = ''
    switch (parseInt(e)) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球中式黑八";
        break;
      case 4:
        day = "台球美式九球";
        break;
      case 5:
        day = "台球斯诺克";
        break;
      case 6:
        day = "篮球";
        break;
      case 7:
        day = "足球11人制";
        break;
      case 8:
        day = "足球8人制";
        break;
      case 9:
        day = "足球7人制";
        break;
      case 10:
        day = "足球5人制";
        break;
      case 11:
        day = "排球";
        break;
      case 12:
        day = "网球";
        break;
      default:
        day = "";
    }
    this.setState({ runNameTwo: day })
  }



  handleChangeTwo = e => {
    if (typeof (e) === 'object') {
      this.setState({ openday: e })
    } else {
      this.setState({ openday: parseInt(e) })
      let day = ''
      switch (parseInt(e)) {
        case 1:
          day = "周一";
          break;
        case 2:
          day = "周二";
          break;
        case 3:
          day = "周三";
          break;
        case 4:
          day = "周四";
          break;
        case 5:
          day = "周五";
          break;
        case 6:
          day = "周六";
          break;
        case 7:
          day = "周日";
          break;
        default:
          day = "";
      }
      this.setState({ opendayname: day })
    }
  }

  handleChangThree = (time, timeString) => {
    this.setState({
      starttime: timeString[0],
      endtime: timeString[1]
    })
  }
  starttime=e=>{
    this.setState({
      starttime:e
    })
  }
  endtime=e=>{
    console.log(this.state.starttime)
    if(this.state.starttime===e){
     message.error('开始时间不能等于结束时间')
     this.setState({endtime:''})
    }else{
      this.setState({endtime:e})
    }
  }

  
  money = e => {
    this.setState({ costperhour: e })
  }
  moneyTwo = e => {
    this.setState({ costperhourTwo: e })
  }
  handleChangeFour = e => {
    this.setState({ maxScheduledDate: e })
    let dayTwo = ''
    switch (e) {
      case '0.1':
        dayTwo = "一周";
        break;
      case '0.2':
        dayTwo = "两周";
        break;
      case '0.3':
        dayTwo = "三周";
        break;
      case '1':
        dayTwo = "一个月";
        break;
      case '2':
        dayTwo = "两个月";
        break;
      default:
        dayTwo = "请选择";
    }
    this.setState({ maxScheduledDateName: dayTwo })
  }
  handleChangeFive = e => {
    this.setState({ appointmenttime: parseInt(e) })
  }
  textArea = e => {
    this.setState({ comment: e.target.value })
  }

  jian = () => {
    if (this.state.number > 0) {
      this.setState({ number: this.state.number - 1 })
    }
  }

  jia = () => {
    if (this.state.number < 100) {
      this.setState({ number: this.state.number + 1 })
    }
  }

  async addVenueField(data) {
    const res = await addVenueField(data, sessionStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      message.error(res.data.msg)
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else {
      this.setState({
        visible: false,
        update: 0,
        // starttime: '',
        // endtime: '',
      })
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page })
    }
  }



  async AddSiteSetting(data) {
    const res = await AddSiteSetting(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page })
      this.setState({
        visible: false, update: 0, Disid: '',
      })
    } else {
      message.error(res.data.msg)
    }
  }

  submit = (e) => {
    let { runIdTwo, runNameTwo, tagsTwo, openday, starttime, endtime, costperhour, chekedTwo, chekedTwoLen, maxScheduledDate, appointmenttime, comment, tagsTwoId } = this.state
    if (runIdTwo === '') {
      message.warning('请选择场地类型')
    } else if (tagsTwo === '') {
      message.warning('请选择细分标签类型')
    } else if (openday.length === 0) {
      message.warning('请选择星期')
    } else if (starttime === '') {
      message.warning('请选择时间范围（开始时间）')
    } else if (endtime === '') {
      message.warning('请选择时间范围（结束时间）')
    } else if (costperhour === '') {
      message.warning('请填写价格')
    } else if (maxScheduledDate === '') {
      message.warning('请选择最长可预定日期')
    } else if (appointmenttime === '') {
      message.warning('请选择最短提前预定时间')
    } else {
      let obj = {
        uuid: e.currentTarget.dataset.uuid,
        sportid: runIdTwo,
        sportname: runNameTwo,
        tags: tagsTwo,
        openday: typeof (openday) === 'string' ? openday : openday.join(','),
        opendayname: '',
        starttime: starttime,
        endtime: endtime,
        costperhour: costperhour,
        venueid: chekedTwo,
        sitenumber: chekedTwoLen,
        maxScheduledDate: maxScheduledDate,
        appointmenttime: appointmenttime,
        comment: comment,
        tags_id: tagsTwoId,
      }
      this.AddSiteSetting(obj)
    }
  }




  update = e => {
    this.setState({
      visible: true,
      update: 1
    });

    this.getSiteSettingFirst({ uuid: e.currentTarget.dataset.uid })
  }



  async getSiteSettingFirst(data) {
    const res = await getSiteSettingFirst(data, sessionStorage.getItem('venue_token'))
    let attop = []
    if (res.data.data[0].openday.split(',').indexOf('1') !== -1) {
      attop.push('周一')
    } if (res.data.data[0].openday.split(',').indexOf('2') !== -1) {
      attop.push('周二')
    } if (res.data.data[0].openday.split(',').indexOf('3') !== -1) {
      attop.push('周三')
    } if (res.data.data[0].openday.split(',').indexOf('4') !== -1) {
      attop.push('周四')
    } if (res.data.data[0].openday.split(',').indexOf('5') !== -1) {
      attop.push('周五')
    } if (res.data.data[0].openday.split(',').indexOf('6') !== -1) {
      attop.push('周六')
    } if (res.data.data[0].openday.split(',').indexOf('7') !== -1) {
      attop.push('周日')
    }
    let dayTwo = ''
    switch (res.data.data[0].maxScheduledDate) {
      case '0.1':
        dayTwo = "一周";
        break;
      case '0.2':
        dayTwo = "两周";
        break;
      case '0.3':
        dayTwo = "三周";
        break;
      case '1':
        dayTwo = "一个月";
        break;
      case '2':
        dayTwo = "两个月";
        break;
      default:

        dayTwo = "请选择";
    }
    this.setState({ maxScheduledDateName: dayTwo })
    this.setState({
      runId: res.data.data[0].sportid, tags: res.data.data[0].tags,
      discount_sdate: res.data.data[0].discount_sdate, discount_edate: res.data.data[0].discount_edate, discount_start: res.data.data[0].discount_start,
      discount_end: res.data.data[0].discount_end, costperhourTwo: res.data.data[0].discount_costperhour === null ? res.data.data[0].costperhour : res.data.data[0].discount_costperhour,
      runIdTwo: res.data.data[0].sportid, tagsTwo: res.data.data[0].tags, opendayname: attop, openday: res.data.data[0].openday.split(','), starttime: res.data.data[0].starttime,
      endtime: res.data.data[0].endtime, costperhour: res.data.data[0].costperhour, chekedTwo: res.data.data[0].venueid, chekedFour: res.data.data[0].venueid, chekedThree: res.data.data[0].discount_venueid !== null ? res.data.data[0].discount_venueid : res.data.data[0].venueid, chekedTwoLen: res.data.data[0].sitenumber, appointmenttime: res.data.data[0].appointmenttime,
      tagsTwoId: res.data.data[0].tags_id, comment: res.data.data[0].comment, maxScheduledDate: res.data.data[0].maxScheduledDate, runNameTwo: res.data.data[0].sportname, Disid: res.data.data[0].uuid
    })
    if (this.state.runIdTwo !== '') {
      this.getVenueSportidTitle({ sportid: this.state.runIdTwo })
      this.getSiteSelectedTitle({ sportid: this.state.runIdTwo })
    }
  }

  delet = e => {
    this.setState({ deletUid: e.target.dataset.uid })
  }

  deletTwoMoney = e => {
    this.setState({
      moneyId: e.currentTarget.dataset.uuid
    })
  }
  current = (page, pageSize) => {
    this.setState({ page: page })
    this.getSiteSettingList({ sportid: this.state.nameChang, page: page })
  }
  recordListOther = (page, pageSize) => {
    this.setState({ pageOne: page })
    this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: page })
  }
  headerCli = e => {
    if(e.currentTarget.dataset.id==='2'){
      this.getSiteSettingList({ sportid: this.state.nameChang, page: 1 })
    }else if(e.currentTarget.dataset.id==='1'){
      this.getVenueNumberTitleList({ sportid: this.state.nameChang, page:1 })
    }
    this.setState({
      headerData: e.currentTarget.dataset.id,
    })
  }
  handlejoinXi = () => {
    this.setState({
      joinXi: false,
      typeDetel: 0,
      lppd: 0,
    })
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value,
    })
  };
  async getVenueSportidTitle(data) {
    const res = await getVenueSportidTitle(data, sessionStorage.getItem('venue_token'))
    // if (res.data.data.length === 0 && this.state.headerData === '2') {
    //   this.setState({
    //     nosubdivisions: true
    //   })
    // }
    let arrJoinTil = []
    for (let i in res.data.data) {
      arrJoinTil.push(res.data.data[i].title)
    }

    const arrTo = [{ title: '普通', uuid: 1 }, { title: 'VIP', uuid: 1 }]

    this.setState({
      joinTil: [...arrTo, ...res.data.data]
    })

    this.setState({ arrJoinTil: arrJoinTil, name: '', })
  }



  async getVenueTitleSave(data) {
    const res = await getVenueTitleSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueSportidTitle({ sportid: this.state.runId })
    } else {
      message.warning(res.data.msg)
    }
  }


  addItem = () => {
    const { name } = this.state;
    if (name === '') {
      message.warning('请输入标签')
    } else if (name === '普通') {
      message.warning('该标签已存在')
    } else if (name.toUpperCase() === 'VIP') {
      message.warning('该标签已存在')
    } else {
      this.getVenueTitleSave({ sportid: this.state.runId, title: name })
    }
  }

  closeDelet = e => {
    console.log(e.currentTarget.dataset.id)
  }

  title = e => {
    this.setState({
      tags: e
    })
  }
  serial = () => {
    let { arrNum } = this.state
    if (this.state.runId === '') {
      message.error('请选择场地类型')
    } else if (this.state.tags === '') {
      message.error('请选择细分标签')
    } else {
      for (let i in arrNum) {
        arrNum[i].cheked = false
      }
      this.getSiteSelectedVenueid({ sportid: this.state.runId })
      this.setState({
        serialNumber: true
      })
    }
  }
  handleserialNumber = () => {
    this.setState({
      serialNumber: false
    })
  }

  handleserialNumberTwo = () => {
    this.setState({
      interpretation: false,
      serialNumberTwo: false,
      arrNumTwo: []
    })
  }

  seriaSon = e => {
    let { arrNum } = this.state
    if (arrNum[e.currentTarget.dataset.id - 1].cheked === true) {
      arrNum[e.currentTarget.dataset.id - 1].cheked = false
    } else if (arrNum[e.currentTarget.dataset.id - 1].cheked === false) {
      arrNum[e.currentTarget.dataset.id - 1].cheked = true
    }
    this.setState({
      arrNum: arrNum
    })
  }
  allOfThem = () => {
    let { arrNum } = this.state
    for (let i in arrNum) {
      if (arrNum[i].cheked !== 'no') {
        arrNum[i].cheked = true
      }
    }
    this.setState({
      arrNum: arrNum
    })
  }
  reverseElection = () => {
    let { arrNum } = this.state
    for (let i in arrNum) {
      if (arrNum[i].cheked === true) {
        arrNum[i].cheked = false
      } else if (arrNum[i].cheked === false) {
        arrNum[i].cheked = true
      }
    }
    this.setState({
      arrNum: arrNum
    })
  }

  serialComfir = () => {
    let { arrNum } = this.state
    let arrCheked = []
    for (let i in arrNum) {
      if (arrNum[i].cheked === true) {
        arrCheked.push(arrNum[i].id)
      }
    }
    if (arrCheked.length === 0) {
      message.warning('请选择场地编号')
    } else {
      this.setState({
        arrCheked: arrCheked,
        serialNumber: false,
        arrChekedLen: arrCheked.length
      })
    }

  }

  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ joinXi: false, arrCheked: [], lppd: 0, })
      this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: this.state.pageOne })
    } else if (res.data.code === 4002) {
      message.warning('请选择场地类型')
    } else {
      message.warning(res.data.msg)
    }
  }

  subSiteSubdivision = (e) => {
    let { runId, tags, arrCheked, arrChekedLen } = this.state
    let obj = {
      sportid: runId,
      title: tags,
      venueid: typeof (arrCheked) === 'string' ? arrCheked : arrCheked.join(),
      number: arrChekedLen,
      uuid: e.currentTarget.dataset.id
    }
    this.getVenueNumberTitleSave(obj)

  }

  interpretation = () => {
    this.setState({
      interpretation: true
    })
  }


  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {

      for (let i in res.data.data) {
        if (res.data.data[i].sportid === 1) {
          res.data.data[i].sportid = '羽毛球'
        } else if (res.data.data[i].sportid === 2) {
          res.data.data[i].sportid = '兵乓球'
        } else if (res.data.data[i].sportid === 3) {
          res.data.data[i].sportid = '台球中式黑八'
        } else if (res.data.data[i].sportid === 4) {
          res.data.data[i].sportid = '台球美式九球'
        } else if (res.data.data[i].sportid === 5) {
          res.data.data[i].sportid = '台球斯诺克'
        } else if (res.data.data[i].sportid === 6) {
          res.data.data[i].sportid = '篮球'
        } else if (res.data.data[i].sportid === 7) {
          res.data.data[i].sportid = '足球11人制'
        } else if (res.data.data[i].sportid === 8) {
          res.data.data[i].sportid = '足球8人制'
        } else if (res.data.data[i].sportid === 9) {
          res.data.data[i].sportid = '足球7人制'
        } else if (res.data.data[i].sportid === 10) {
          res.data.data[i].sportid = '足球5人制'
        } else if (res.data.data[i].sportid === 11) {
          res.data.data[i].sportid = '排球'
        } else if (res.data.data[i].sportid === 12) {
          res.data.data[i].sportid = '网球'
        }
      }
      this.setState({ joinXiList: res.data.data, otherseris: res.data.other })
    }
  }


  showModal = () => {
    this.setState({
      joinXi: true,
      runId: '', joinB: false, tags: '', arrCheked: [], venNumid: '', typeDetel: 1
    });
  };

  async getVenueNumberTitleFirst(data) {
    const res = await getVenueNumberTitleFirst(data, sessionStorage.getItem('venue_token'))
    this.getVenueSportidTitle({ sportid: res.data.data[0].sportid })
    this.setState({
      runId: res.data.data[0].sportid, joinB: false, tags: res.data.data[0].title, arrCheked: res.data.data[0].venueid.split(','), arrChekedTwope: res.data.data[0].venueid.split(','), venNumid: res.data.data[0].uuid
    })

  }

  async getSiteSelectedVenueid(data) {
    let { arrNum } = this.state
    const res = await getSiteSelectedVenueid(data, sessionStorage.getItem('venue_token'))
    for (let i in res.data.data) {
      arrNum[parseInt(res.data.data[i]) - 1].cheked = 'no'
    }
    if (this.state.lppd === 1) {
      if (this.state.arrCheked.length > 0) {
        for (let k in this.state.arrChekedTwope) {
          arrNum[parseInt(this.state.arrChekedTwope[k]) - 1].cheked = false
        }
        for (let j in this.state.arrCheked) {
          arrNum[parseInt(this.state.arrCheked[j]) - 1].cheked = true
        }
      } else if (res.data.data.length === 0 && this.state.arrCheked === 0) {
        for (let i in arrNum) {
          arrNum[i].cheked = false
        }
      }
    } else {
      if (this.state.arrCheked.length > 0) {
        for (let j in this.state.arrCheked) {
          arrNum[parseInt(this.state.arrCheked[j]) - 1].cheked = true
        }
      } else if (res.data.data.length === 0 && this.state.arrCheked === 0) {
        for (let i in arrNum) {
          arrNum[i].cheked = false
        }
      }
    }




  }

  modification = e => {
    let obj = {
      uuid: e.currentTarget.dataset.uuid
    }
    this.getVenueNumberTitleFirst(obj)
    this.setState({
      joinXi: true,
      lppd: 1,
      typeDetel: 0,
    })
  }

  deletserisa = e => {
    this.setState({
      confirmserisa: e.currentTarget.dataset.id
    })
  }

  async DelVenueNumberTitle(data) {
    const res = await DelVenueNumberTitle(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('删除成功')
      this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: this.state.pageOne })
    } else {
      message.error(res.data.msg)
    }
  }

  confirmserisa = e => {
    this.DelVenueNumberTitle({ uuid: this.state.confirmserisa })
  }

  showModalTwo = () => {
    this.setState({
      visible: true,
      update: 0,
      // starttime: '',
      // endtime: '',
    })
    if (this.state.update === 0 && this.state.runNameTwo !== '' && this.state.runNameTwo !== undefined) {
      this.getSiteSelectedTitle({ sportid: this.state.runIdTwo })
    }

  }
  toSetUp = () => {
    this.setState({
      headerData: '1',
      nosubdivisions: false,
      visible: false,
      joinXi: true,
      update: 0,
      // starttime: '',
      // endtime: '',
      typeDetel: 1,
      runIdTwo:'',
    })
  }
  async getSiteSelectedTitle(data) {
    const res = await getSiteSelectedTitle(data, sessionStorage.getItem('venue_token'))
    if (res.data.data.length === 0 && this.state.headerData === '2'&&this.state.runIdTwo!=='') {
      this.setState({
        nosubdivisions: true,
        runId: data.sportid
      })
    }
    let title = res.data.data
    let arrTitle = []
    for (let i in title) {
      arrTitle.push(title[i].title)
    }

    this.setState({
      selecdTil: res.data.data,
      arrTitle: arrTitle
    })
  }
  handleChangeTags = e => {
    if (this.state.arrTitle.indexOf(e) === -1) {
      this.setState({
        nosubdivisions: true
      })
    } else {
      this.setState({
        tagsTwo: e,
        tagsTwoId: this.state.selecdTil[this.state.arrTitle.indexOf(e)].uuid,
        chekedTwo: this.state.selecdTil[this.state.arrTitle.indexOf(e)].venueid,
        chekedTwoLen: this.state.selecdTil[this.state.arrTitle.indexOf(e)].venueid.split(',').length
      })
    }
  }

  async DelSiteSetting(data) {
    const res = await DelSiteSetting(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('删除成功')
      this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: this.state.pageOne })
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page })
    } else {
      message.error(res.data.msg)
    }
  }



  confirmMoney = () => {
    this.DelSiteSetting({ uuid: this.state.moneyId })
  }

  preferential = (e) => {
    this.getSiteSettingFirst({ uuid: e.currentTarget.dataset.uid })
    this.setState({
      Preferential: true,
      siteListId: e.currentTarget.dataset.uid,
      typeList: e.currentTarget.dataset.type
    })
  }
  PreferentialCan = () => {
    this.setState({
      Preferential: false, runIdTwo: '', tagsTwo: '', opendayname: '', openday: '', starttime: '00:00',
      endtime: '', costperhour: '', chekedTwo: '', chekedTwoLen: '', appointmenttime: '',
      tagsTwoId: '', comment: '', maxScheduledDate: '', maxScheduledDateName: [], runNameTwo: '', Disid: '', runId: '', tags: '', update: 0
    })
  }

  serialTwo = () => {
    let chekedTwoarr = typeof (this.state.chekedThree) === 'string' ? this.state.chekedThree.split(',') : this.state.chekedThree
    let chekedFour = typeof (this.state.chekedFour) === 'string' ? this.state.chekedFour.split(',') : this.state.chekedFour
    if (this.state.arrNumTwo.length === 0) {
      let arrNumTwo = []
      for (let i in chekedFour) {
        let obj = {
          idIdx: chekedFour[i],
          cheked: false
        }
        arrNumTwo.push(obj)
        if (chekedTwoarr.indexOf(chekedFour[i]) !== -1) {
          arrNumTwo[i].cheked = true
        }

      }

      this.setState({
        serialNumberTwo: true,
        arrNumTwo: arrNumTwo
      })

    } else {
      this.setState({
        serialNumberTwo: true,
        arrNumTwo: this.state.arrNumTwo
      })
    }
  }

  seriaSonTwo = e => {
    let { arrNumTwo } = this.state
    if (arrNumTwo[e.currentTarget.dataset.id].cheked === true) {
      arrNumTwo[e.currentTarget.dataset.id].cheked = false
    } else if (arrNumTwo[e.currentTarget.dataset.id].cheked === false) {
      arrNumTwo[e.currentTarget.dataset.id].cheked = true
    }
    this.setState({
      arrNumTwo: arrNumTwo
    })
  }
  serialComfirTwo = () => {
    let { arrNumTwo } = this.state
    let arrCheked = []
    for (let i in arrNumTwo) {
      if (arrNumTwo[i].cheked === true) {
        arrCheked.push(arrNumTwo[i].idIdx)
      }
    }
    this.setState({
      chekedThree: arrCheked,
      serialNumberTwo: false,
      arrNumTwo: []
    })
  }
  startDate = (date, dateString) => {
    this.setState({
      discount_sdate: dateString[0].slice(0, 10),
      discount_start: dateString[0].slice(11, 16),
      discount_edate: dateString[1].slice(0, 10),
      discount_end: dateString[1].slice(11, 16),
    })

  }
  endDate = (date, dateString) => {
    this.setState({
      discount_edate: dateString.replace(/['/']/g, '-').slice(0, 10),
      discount_end: dateString.replace(/['/']/g, '-').slice(11, 16)
    })
  }


  async SiteSettingDiscountSave(data) {
    const res = await SiteSettingDiscountSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        Preferential: false
      })
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page })
    } else {
      message.error(res.data.msg)
    }
  }

  PreferentialComfir = (e) => {
    let { siteListId, chekedThree, discount_sdate, discount_start, discount_edate, discount_end, costperhourTwo } = this.state

    if (e.currentTarget.dataset.type === '2') {
      let obj = {
        uuid: siteListId,
        discount_start: null,
        discount_end: null,
        discount_venueid: typeof (chekedThree) === 'string' ? chekedThree : chekedThree.join(),
        discount_costperhour: null,
        discount_sdate: null,
        discount_edate: null
      }
      this.SiteSettingDiscountSave(obj)
    } else {
      let obj = {
        uuid: siteListId,
        discount_start: discount_start,
        discount_end: discount_end,
        discount_venueid: typeof (chekedThree) === 'string' ? chekedThree : chekedThree.join(),
        discount_costperhour: costperhourTwo,
        discount_sdate: discount_sdate,
        discount_edate: discount_edate
      }
      this.SiteSettingDiscountSave(obj)
    }

  }
  tooltip = () => {
    this.setState({
      tooltip: true
    })
  }

  async DelSiteSettingDiscount(data) {
    const res = await DelSiteSettingDiscount(data, sessionStorage.getItem('venue_token'))

    if (res.data.code === 2000) {
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page })
      this.setState({
        Preferential: false
      })
      message.info(res.data.msg)
    } else {
      message.error(res.data.msg)
    }
  }

  DelSiteSettingcount = () => {
    this.DelSiteSettingDiscount({ uuid: this.state.siteListId })
  }
  async DelVenueTitle(data) {
    const res = await DelVenueTitle(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.info('删除成功')
      if(this.state.titleDel===this.state.tags){
        this.setState({tags:''})
      }
      this.getVenueSportidTitle({ sportid: this.state.runId })
    } else {
      message.error(res.data.msg)
    }
  }
  deletSelect = (e) => {
    this.setState({titleDel:e.currentTarget.dataset.title})
    
    this.DelVenueTitle({ uuid: e.currentTarget.dataset.id })
  }
  getPosition = e => {
    const titleDom = e.target
    const X = titleDom.getBoundingClientRect().left
    const Y = document.getElementsByClassName('group')[0].offsetTop
    let mouseX = e.pageX
    let mouseY = e.screenY
    const diffX = mouseX - X
    const diffY = mouseY - Y
    return { X, Y, mouseX, mouseY, diffX, diffY }
  }
  onMouseDown = e => {
    const position = this.getPosition(e)
    window.onmousemove = this.onMouseMove
    window.onmouseup = this.onMouseUp
    this.setState({ moving: true, diffX: position.diffX, diffY: position.diffY })
  }
  onMouseUp = e => {
    const { moving } = this.state
    moving && this.setState({ moving: false });
  }

  onMouseMove = e => {
    const { moving, diffX, diffY } = this.state
    if (moving) {
      const position = this.getPosition(e)
      const x = position.mouseX - diffX
      const y = position.mouseY - diffY
      const { clientWidth, clientHeight } = document.documentElement
      const modal = document.getElementsByClassName("group")[0]
      if (modal) {
        const maxHeight = clientHeight - modal.offsetHeight
        const maxWidth = clientWidth - modal.offsetWidth
        const left = x > 0 ? (x < maxWidth ? x : maxWidth) : 0
        const top = y > 0 ? (y < maxHeight ? y : maxHeight) : 0
        this.setState({ pageX: left, pageY: top })
      }
    }
  }

  render() {
    const { name } = this.state;
    return (
      <Spin spinning={this.state.lppding} style={{ height: '100%' }}>
        <div className="siteStting">
          <div className="header">
            <div className="left" style={this.state.headerData === '1' ? { color: '#fff', background: '#F5A623', border: '1px solid #F5A623' } : {}} onClick={this.headerCli} data-id='1'>场地细分</div>
            <div className="left" style={this.state.headerData === '2' ? { color: '#fff', background: '#F5A623', border: '1px solid #F5A623' } : {}} onClick={this.headerCli} data-id='2'>价格设置</div>
            <div className="right"><span>场地类型</span>
              <Select className="selectName" defaultValue="类型名称" value={this.state.nameChang === '' ? '全部' : this.state.nameChang} style={{ width: 130, padding: 0, textAlign: 'center' }} onChange={this.nameChang}>
                <Option value="0">全部</Option>
                <Option value="1">羽毛球</Option>
                <Option value="2">兵乓球</Option>
                <Option value="3">台球中式黑八</Option>
                <Option value="4">台球美式九球</Option>
                <Option value="5">台球斯诺克</Option>
                <Option value="6">篮球</Option>
                <Option value="7">足球11人制</Option>
                <Option value="8">足球8人制</Option>
                <Option value="9">足球7人制</Option>
                <Option value="10">足球5人制</Option>
                <Option value="11">排球</Option>
                <Option value="12">网球</Option>
              </Select>
            </div>
          </div>
          <div className="xiange"></div>
          <div style={this.state.headerData === '2' ? { overflowY: 'auto', height: '89%' } : { display: 'none' }}>
            <div className='siteList' style={{ paddingBottom: 0 }}>
              <Row className="rowConten" style={{ background: '#FCF7EE' }}>
                <Col xs={{ span: 2 }}>场地类型</Col>
                <Col xs={{ span: 2 }}>细分标签</Col>
                <Col xs={{ span: 2 }}>场地编号</Col>
                <Col xs={{ span: 2 }}>场地数量</Col>
                <Col xs={{ span: 2 }}>星期</Col>
                <Col xs={{ span: 2 }}>时间范围</Col>
                <Col xs={{ span: 2 }}>价格<span className="fontColor">(元/时)</span></Col>
                <Popover content={(<span>最长提前预定时间</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 2 }}>最长提前预定时间</Col>
                </Popover>
                <Popover content={(<span>最短提前预定时间</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 2 }}>最短提前预定时间</Col>
                </Popover>
                <Col xs={{ span: 2 }}>备注</Col>
                <Col xs={{ span: 2 }}>打折优惠</Col>
                <Col xs={{ span: 2, }}>操作</Col>
              </Row>
              <div className="dataList">
                {
                  this.state.list.map((item, i) => (
                    <Row key={i} className="rowList">
                      <Col xs={{ span: 2 }}>{item.sportname}</Col>
                      <Col xs={{ span: 2 }}>{item.tags}</Col>
                      <Popover content={(<div className="titleVenid">{item.venueid}</div>)} title='详情' trigger="click">
                        <Col xs={{ span: 2 }}>{item.venueid}</Col>
                      </Popover>
                      <Col xs={{ span: 2 }}>{item.sitenumber}</Col>
                      <Popover content={(<span>{item.opendayname.slice(1, item.opendayname.length)}</span>)} title='详情' trigger="click">
                        <Col xs={{ span: 2 }}>{item.opendayname.slice(1, item.opendayname.length)}</Col>
                      </Popover>
                      <Col xs={{ span: 2 }} style={{ lineHeight: '24px' }}>{item.starttime}<br />{item.endtime}</Col>
                      <Col xs={{ span: 2 }}>{item.costperhour}</Col>
                      <Col xs={{ span: 2 }}>{item.maxScheduledDate === null ? '' : item.maxScheduledDateTwo}</Col>
                      <Col xs={{ span: 2 }}>{item.appointmenttime === null ? '' : item.appointmenttime / 60 + '小时'}</Col>
                      <Popover content={(<span>{item.comment === '' ? '无' : item.comment}</span>)} title='详情' trigger="click">
                        <Col xs={{ span: 2 }} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.comment === '' ? '无' : item.comment}</Col>
                      </Popover>
                      <Col xs={{ span: 2 }} style={{ cursor: 'pointer' }} data-uid={item.uuid} data-type={item.discount_edate} onClick={this.preferential}>{item.discount_edate === null ? '添加' : '查看'}</Col>
                      <Col xs={{ span: 2 }}>
                        <img onClick={this.update} data-uid={item.uuid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />&nbsp;&nbsp;&nbsp;
                      <Popconfirm
                          title={"你确定要删除该条价格设置么?删除后用户将无法预定" + item.sportname + '的' + item.tags + '场地'}
                          onConfirm={this.confirmMoney}
                          onCancel={this.cancel}
                          okText="确定"
                          cancelText="取消"
                        >
                          <img onClick={this.deletTwoMoney} data-uuid={item.uuid} src={require("../../assets/icon_pc_delet.png")} alt="删除" />
                        </Popconfirm>
                      </Col>
                    </Row>
                  ))
                }
              </div>
            </div>
            
             <div style={this.state.list.length === 0?{width:'100%'}:{display:'none'}}><img style={{width:'84px',height:'84px',display:'block',margin:'64px auto 0'}} src={require('../../assets/xifen (6).png')} alt='icon'/><span style={{display:'block',textAlign:'center'}}>您还没有设置场地价格!</span></div>
            <Pagination style={{ marginBottom: '15px' }}  hideOnSinglePage={true} showSizeChanger={false}  className={this.state.hidden === true ? 'fenye' : 'hidden'} current={this.state.page} total={this.state.other} onChange={this.current} />
          </div>

          <div className="join" style={this.state.headerData === '2' ? {} : { display: 'none' }} onClick={this.showModalTwo}><div id="join" style={{ textAlign: 'center', width: '150px', margin: '0 auto' }}>+添加价格设置</div></div>
          <div style={this.state.headerData === '1' ? { overflowY: 'auto', height: '89%' } : { display: 'none' }}>
            <Row className="rowConten" style={{ background: '#FCF7EE', borderBottom: '1px solid #E1E0E1' }}>
              <Col xs={{ span: 5 }}>场地类型</Col>
              <Col xs={{ span: 5 }}>细分标签</Col>
              <Col xs={{ span: 5 }}>场地编号</Col>
              <Col xs={{ span: 5 }}>场地数量</Col>
              <Col xs={{ span: 3 }}>操作</Col>
            </Row>
            {
              this.state.joinXiList.map((item, i) => (
                <Row key={i} style={{ borderBottom: '1px solid #E1E0E1' }}>
                  <Col xs={{ span: 5 }}>{item.sportid}</Col>
                  <Col xs={{ span: 5 }}>{item.title}</Col>
                  <Popover content={(<div className="titleVenid">{item.venueid}</div>)} title='详情' trigger="click">
                    <Col xs={{ span: 5 }} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} onClick={this.tooltip}>{item.venueid}</Col>
                  </Popover>

                  <Col xs={{ span: 5 }}>{item.number}</Col>
                  <Col xs={{ span: 3 }}>
                    <img onClick={this.modification} data-uuid={item.uuid} style={{ marginRight: '5px' }} src={require("../../assets/icon_pc_updata.png")} alt="修改" />
                    <Popconfirm
                      title={'您确定要删除该条场地细分么?删除后用户将无法预定' + item.sportid + '的' + item.title + '场地'}
                      onConfirm={this.confirmserisa}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <img style={{ marginLeft: '5px' }} onClick={this.deletserisa} data-id={item.uuid} src={require("../../assets/icon_pc_delet.png")} alt="删除" />
                    </Popconfirm>
                  </Col>
                </Row>
              ))
            }
           
            <div style={this.state.joinXiList.length === 0?{width:'100%'}:{display:'none'}}><img style={{width:'84px',height:'84px',display:'block',margin:'64px auto 0'}} src={require('../../assets/xifen (1).png')} alt='icon'/><span style={{display:'block',textAlign:'center'}}>您还没有设置场地细分!</span></div>
            <Pagination style={{ marginBottom: '15px' }} hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageOne} onChange={this.recordListOther} total={this.state.otherseris} />
          </div>
          <div className="join" style={this.state.headerData === '1' ? {} : { display: 'none' }} onClick={this.showModal}><div style={{ textAlign: 'center', width: '150px', margin: '0 auto' }}>+添加场地细分</div></div>
          <Modal
            title="添加/修改价格设置"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={630}
            className='model'
            style={{ marginLeft: this.state.pageX, marginTop: this.state.pageY }}
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}

          >
            <div className="group" onClick={this.getPosition} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}>
            </div>
            <div className="modelList" style={{ height: '32px' }}>
              <span>场地类型</span>
              <Select placeholder="请选择" onInputKeyDown={this.ko} disabled={this.state.update === 1 ? true : false} value={this.state.runIdTwo === '' ? [] : this.state.runIdTwo} className="selectModel" style={{ width: 269, height: 32 }} onChange={this.handleChangeOneTwo}>
                {
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>细分标签</span>
              <Select placeholder="请选择" disabled={this.state.update === 1 ? true : false} value={this.state.tagsTwo === '' ? [] : this.state.tagsTwo} className="selectModel" style={{ width: 269, height: 32 }} onChange={this.handleChangeTags}>
                {
                  this.state.selecdTil.map((item, i) => (
                    <Option key={i} value={item.title}>{item.title}</Option>
                  ))
                }
              </Select>
            </div>
            <div className="modelList" style={{ height: '32px' }}>
              <span>场地编号</span>
              <Input className="startTime" style={{ paddingLeft: '10px', height: 32, width: 269, background: '#fff', cursor: 'pointer' }} value={this.state.chekedTwo === '' ? [] : this.state.chekedTwo} disabled={true} placeholder="点击进行添加" onChange={this.money} />
            </div>
            <div className="modelList">
              <span>场地总数量</span>
              <div className="startTime" style={{ marginRight: 168 }}>{this.state.chekedTwoLen}</div>
            </div>

            <div className="modelList" style={{ height: 'auto' }}>
              <span>星期</span>
              <Select placeholder="请选择" mode='multiple' className="selectModel"
                value={this.state.openday === '' ? [] : this.state.openday}
                style={{ width: 269, height: 'auto' }} onChange={this.handleChangeTwo}>
                <Option value="1">周一</Option>
                <Option value="2">周二</Option>
                <Option value="3">周三</Option>
                <Option value="4">周四</Option>
                <Option value="5">周五</Option>
                <Option value="6">周六</Option>
                <Option value="7">周日</Option>
              </Select>
            </div>

            {/* <div className="modelList" style={this.state.update === 0 ? { height: '32px' } : { display: 'none' }}>
            <span>时间范围</span>
            <RangePicker style={{ float: 'right', marginRight: 150, width: 269 }} minuteStep={30} format={format} locale={locale} onChange={this.handleChangThree} />
          </div> */}

            <div className="modelList" style={{ height: '32px' }}>
              <span>时间范围</span>
              <Select style={{ width: 128, height: 'auto',marginLeft:88 }} value={this.state.starttime===''?undefined:this.state.starttime} onChange={this.starttime} placeholder="开始时间">
              {this.state.timer.map((item,i)=>(
                <Option key={i} value={item.name}>{item.name}</Option>
              ))}
            </Select>
            ~
            <Select style={{ width: 130, height: 'auto' }} value={this.state.endtime===''?undefined:this.state.endtime} onChange={this.endtime} placeholder="结束时间">
              {this.state.timer.map((item,i)=>(
                <Option key={i} value={item.name}>{item.name}</Option>
              ))}
            </Select>

              {/* <RangePicker showTime order={false} dropdownClassName="timeRange" placeholder={['开始时间', '结束时间']} style={{ float: 'right', marginRight: 150, width: 269 }} value={this.state.starttime === '' ? '' : [moment(this.state.starttime === '' ? '' : this.state.starttime, 'HH:mm:'), moment(this.state.endtime === '' ? '' : this.state.endtime, 'HH:mm:')]} minuteStep={30} format='HH:mm' locale={locale} onChange={this.handleChangThree} /> */}
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>价格</span><span>（元/小时）</span>
              <InputNumber className="startTime" value={this.state.costperhour} defaultValue={0} min={0} style={{ paddingLeft: '10px', height: 32, width: 269 }} placeholder="请输入" onChange={this.money} />
            </div>
            <div className="modelList" style={{ height: 32 }}>
              <span>最长提前预定时间</span>
              <Select placeholder="请选择" className="selectModel" value={this.state.maxScheduledDateName} style={{ width: 269, height: 32 }} onChange={this.handleChangeFour}>
                <Option value="0.1">一周</Option>
                <Option value="0.2">两周</Option>
                <Option value="0.3">三周</Option>
                <Option value="1">一个月</Option>
                <Option value="2">两个月</Option>
              </Select>
            </div>
            <div className="modelList" style={{ height: 32 }}>
              <span>最短提前预定时间</span>
              <Select placeholder="请选择" className="selectModel"
                defaultActiveFirstOption={false}
                value={
                  this.state.appointmenttime === 0 ? '0分钟' : []
                    && this.state.appointmenttime === 30 ? '30分钟' : []
                      && this.state.appointmenttime === 60 ? '60分钟' : []
                        && this.state.appointmenttime === 120 ? '2小时' : []
                          && this.state.appointmenttime === 180 ? '3小时' : []
                            && this.state.appointmenttime === 240 ? '4小时' : []
                              && this.state.appointmenttime === 300 ? '5小时' : []
                                && this.state.appointmenttime === 360 ? '6小时' : []
                                  && this.state.appointmenttime === 1140 ? '24小时' : []
                                    && this.state.appointmenttime === 2880 ? '48小时' : []
                                      && this.state.appointmenttime === 4320 ? '72小时' : []
                }
                style={{ width: 269, height: 32 }}
                onChange={this.handleChangeFive}
              >
                <Option value="0">0分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="120">2小时</Option>
                <Option value="180">3小时</Option>
                <Option value="240">4小时</Option>
                <Option value="300">5小时</Option>
                <Option value="360">6小时</Option>
                <Option value="1140">24小时</Option>
                <Option value="2880">48小时</Option>
                <Option value="4320">72小时</Option>

              </Select>
            </div>
            <div className="modelListT">
              <span>备注</span>
              <TextArea className="textArea" rows={4} placeholder='请输入' maxLength={50} style={{ marginRight: 151, width: 269 }} value={this.state.comment} onChange={this.textArea} />
            </div>
            <div className="submit" data-uuid={this.state.Disid !== '' ? this.state.Disid : ''} onClick={this.submit}>提交</div>
          </Modal>




          <Modal
            title="添加/修改场地细分"
            visible={this.state.joinXi}
            onOk={this.handleOk}
            onCancel={this.handlejoinXi}
            width={500}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
<span style={{ position: 'absolute', bottom: 70, left: 45, color: '#F5A623', cursor: 'pointer' }} onClick={this.interpretation}>什么是细分标签?</span>
            <div className="modelList" style={{ height: '32px' }}>
              <span>场地类型</span>
              <Select placeholder="请选择" className="selectModel" disabled={this.state.typeDetel === 0 ? true : false} value={this.state.runId === '' ? [] : this.state.runId} style={{ width: 249, height: 32,marginRight:100 }} onChange={this.handleChangeOne}>
                {
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>



            <div className="modelList" style={{ height: '32px' }}>
              <span>细分标签</span>
              <Select
                style={{ width: 249, height: 32,marginRight:100 , background: '#fff' }}
                placeholder="请选择/添加后选择"
                className="selectModel"
                onChange={this.title}
                value={this.state.tags === '' ? [] : this.state.tags}
                disabled={this.state.typeDetel === 0 ? true : false}
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', padding: 8 }}>
                      <Input style={{ height: 32, background: '#fff' }} value={name} onChange={this.onNameChange} maxLength={5} />
                      <span style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} onClick={this.addItem}>
                        <PlusOutlined />自定义(5个汉字以内)
                  </span>
                    </div>
                  </div>
                )}
              >
                {this.state.joinTil.map((item, i) => (
                  <Option key={i} onContextMenu={this.deletSelect} data-id={item.uuid} data-title={item.title} value={item.title}><div><span>{item.title}</span><span style={item.uuid === 1 ? { display: 'none' } : { float: 'right', fontSize: '12px', color: '#ccc' }}>(右键删除)</span></div></Option>
                ))}
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }} onClick={this.serial}>
              <span>场地编号</span>
              <Input className="startTime" value={this.state.arrCheked.length !== 0 ? this.state.arrCheked : []} style={{ paddingLeft: '10px', height: 32, background: '#fff', cursor: 'pointer',marginRight:100  }} disabled={true} placeholder="点击进行添加" />
            </div>

            <div className="modelList" style={{ height: '32px' }} >
              <span>场地数量</span>
              <div className="startTime" style={{marginRight:100 }}>{this.state.arrCheked.length}</div>
            </div>
            <div className="footerLok">
            <div className="submit" data-id={this.state.venNumid} onClick={this.subSiteSubdivision}>提交</div>
            </div>
          </Modal>



          <Modal
            title="添加场地编号"
            visible={this.state.serialNumber}
            onOk={this.handleOk}
            onCancel={this.handleserialNumber}
            width={630}
            style={{ zIndex: 999 }}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div className="serialNumberTop"><span>请选择您要设置的场地编号</span><div onClick={this.reverseElection}>反选</div><div onClick={this.allOfThem} style={{ marginRight: '10px' }}>全选</div></div>
            {
              this.state.arrNum.map((item, i) => (
                <div key={i} className="serialSon" onClick={this.seriaSon} data-id={item.id} style={item.cheked === true ? { color: '#fff', background: '#F5A623', transition: '0.3s' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', transition: '0.3s', opacity: '0.2' } : {}}>{item.id}</div>
              ))
            }
            <div className="footerSerial">
              <div className="seriaComfir" onClick={this.serialComfir}>提交</div>
            </div>
          </Modal>


          <Modal
            title="什么是细分标签?"
            visible={this.state.interpretation}
            onOk={this.handleOk}
            onCancel={this.handleserialNumberTwo}
            width={630}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div>请对所选场地类型进行再细分，如场地类型选择的是羽毛球，贵场馆羽毛球场地是否有普通场、VIP场等之分? 如没有，则所有场地选择一个标签即可，如有，则分开设置标签及对应的场地编号”。总之，同一时刻，不同价格的场地须细分并给出标签。</div>
          </Modal>


          <Modal
            title="提示"
            visible={this.state.nosubdivisions}
            onOk={this.handleOk}
            width={350}
            closable={false}
            style={{ paddingBottom: '0' }}
            className='model'
          >
            <div>您还没对<span style={{ color: '#F5A623' }}>{this.state.runNameTwo}场地</span>进行场地细分，无法选择细分标签，请先去进行场地细分，谢谢！ </div>
            <div onClick={this.toSetUp} style={{ width: '100px', height: '26px', background: '#F5A623', fontSize: '14px', color: '#fff', textAlign: 'center', lineHeight: '26px', margin: '30px auto 0', cursor: 'pointer' }}>确定,去设置</div>
          </Modal>



          <Modal
            title="添加/修改优惠设置"
            visible={this.state.Preferential}
            onOk={this.handleOk}
            onCancel={this.PreferentialCan}
            width={630}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div className="modelList" style={{ height: '32px' }}>
              <span>场地类型</span>
              <Select placeholder="请选择" disabled={true} value={this.state.runIdTwo === '' ? [] : this.state.runIdTwo} className="selectModel" style={{ width: 330, height: 32, marginRight: 100, cursor: 'pointer' }} onChange={this.handleChangeOneTwo}>
                {
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>场地标签</span>
              <Select placeholder="请选择" disabled={true} value={this.state.tagsTwo === '' ? [] : this.state.tagsTwo} className="selectModel" style={{ width: 330, height: 32, marginRight: 100 }} onChange={this.handleChangeTags}>
                {
                  this.state.joinTil.map((item, i) => (
                    <Option key={i} value={item.title}>{item.title}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList" style={{ height: 'auto' }}>
              <span>星期</span>
              <Select placeholder="请选择" disabled={true} mode='multiple' className="selectModel"
                value={this.state.openday === '' ? [] : this.state.openday}
                style={{ width: 330, height: 'auto', marginRight: 100 }} onChange={this.handleChangeTwo}>
                <Option value="1">周一</Option>
                <Option value="2">周二</Option>
                <Option value="3">周三</Option>
                <Option value="4">周四</Option>
                <Option value="5">周五</Option>
                <Option value="6">周六</Option>
                <Option value="7">周日</Option>
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>时间范围</span>
              <RangePicker disabled={true} style={{ float: 'right', marginRight: 100, width: 330 }} value={[moment(this.state.starttime === '' ? '00:00' : this.state.starttime, 'HH:mm:'), moment(this.state.endtime === '' ? '00:00' : this.state.endtime, 'HH:mm:')]} minuteStep={30} format='HH:mm' locale={locale} onChange={this.handleChangThree} />
            </div>
            <div className="modelList" style={{ height: '32px' }} onClick={this.serialTwo}>
              <span>参加优惠的场地号</span>
              <Input className="startTime" style={{ paddingLeft: '10px', height: 32, width: 330, background: '#fff', cursor: 'pointer', marginRight: 100 }} disabled={true} value={this.state.chekedThree === '' ? [] : this.state.chekedThree} placeholder="点击进行添加" onChange={this.money} />
            </div>
            <div className="modelList" style={{ height: '32px' }}>
              <span>优惠期限</span>
              {/* <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              minuteStep={30}
              locale={locale}
              allowClear={false}
              onChange={this.startDate}
              disabledDate={disabledDate}
              placeholder="开始日期"
              value={this.state.discount_sdate === null?'':moment(this.state.discount_sdate + this.state.discount_start, 'YYYY-MM-DD HH:mm')}
              style={{ float: 'left', marginLeft: 88, width: 170 }}
            />


            <div style={{ width: '25px', textAlign: 'center', float: 'left' }}>~</div>
            <DatePicker
              showTime={{ defaultValue: moment('00:00', 'HH:mm') }}
              format="YYYY-MM-DD HH:mm"
              minuteStep={30}
              allowClear={false}
              placeholder="结束日期"
              locale={locale}
              disabledDate={disabledDate}
              value={this.state.discount_edate === null?'':moment(this.state.discount_edate + this.state.discount_end, 'YYYY-MM-DD HH:mm')}
              onChange={this.endDate}
              style={{ float: 'right', marginRight: 50, width: 170 }}
            />
          */}
              <RangePicker
                showTime={{ defaultValue:  [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')] }}
                locale={locale}
                style={{ float: 'left', marginLeft: 78, width: 330 }}
                format="YYYY-MM-DD HH:mm"
                minuteStep={30}
                allowClear={false}
                value={this.state.discount_sdate === null ? '' : [moment(this.state.discount_sdate + this.state.discount_start, 'YYYY-MM-DD HH:mm'), moment(this.state.discount_edate + this.state.discount_end, 'YYYY-MM-DD HH:mm')]}
                onChange={this.startDate}
              />
            </div>
            <div className="modelList" style={{ height: '32px' }}>
              <span>优惠后价格</span><span style={{ marginLeft: 0 }}>(元/小时)</span>
              <InputNumber className="startTime" value={this.state.costperhourTwo} min={0} style={{ paddingLeft: '10px', height: 32, width: 330, marginRight: 100 }} placeholder="请输入" onChange={this.moneyTwo} />
            </div>


            <div className="footerSerial">
              <div className="seriaComfir" onClick={this.PreferentialComfir} data-type="1">{this.state.typeList === undefined ? '提交' : '提交修改'}</div>
              <Popconfirm
                title="您确定删除该条优惠设置么?"
                onConfirm={this.DelSiteSettingcount}
                onCancel={this.btncancel}
                okText="确定"
                cancelText="删除"
              >
                <div className="seriaComfir" data-type="2" style={this.state.typeList === undefined ? { display: 'none' } : { display: 'block', marginRight: '15px' }}>删除</div>
              </Popconfirm>
            </div>
          </Modal>



          <Modal
            title="添加场地编号"
            visible={this.state.serialNumberTwo}
            onOk={this.handleOk}
            onCancel={this.handleserialNumberTwo}
            width={630}
            style={{ zIndex: 999 }}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div className="serialNumberTop"><span>请选择您要设置的场地编号</span></div>
            {
              this.state.arrNumTwo.map((item, i) => (
                <div key={i} className="serialSon" onClick={this.seriaSonTwo} data-id={i} style={item.cheked === true ? { color: '#fff', background: '#F5A623', transition: '0.3s' } : {}}>{item.idIdx}</div>
              ))
            }
            <div className="footerSerial" style={{ marginTop: '60px' }}>
              <div className="seriaComfir" onClick={this.serialComfirTwo}>确定</div>
            </div>
          </Modal>




        </div ></Spin>
    )
  }
}

export default siteSettings;