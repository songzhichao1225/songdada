import React from 'react';
import './sitePh.css';

import { Toast, Picker, DatePicker } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Row, Col, Input, Pagination, Drawer, Select, Result, Icon, Popconfirm, Spin, InputNumber } from 'antd';
import { getVenueFieldList, getVenueSport, addVenueField, getFirstField, getVenueDiscountList, addVenueDiscount, delVenueField, DelVenueDiscount, getFirstDiscount, getSetUpFieldSportId } from '../../api';

import zh_CN from 'antd/es/date-picker/locale/zh_CN';



const { Option } = Select;
class sitePh extends React.Component {

  state = {
    getVenueFieldList: [],
    total: 0,
    clickNum: 1,
    sportid: '',
    selectNum: null,
    flag: false,
    flagTwo: false,
    visible: false,
    userPickerVisible: false,
    addressPickerVisible: false,
    defaultValue: { name: '足球', value: 5 },
    address: this.defaultAddress,
    sValue: ['2013', '春'],
    sportList: [],
    DrawerVisible: false,
    addsporId: [],
    runName: '请选择',
    dateChange: '',
    startTime: '00:00',
    endTime: '00:00',
    price: '',
    num: '',
    weekChange: '请选择',
    timeChange: '请选择',
    comment: '',
    getVenueDiscountList: [],
    Youtotal: 1,
    selectNumTwo: null,
    Youvisible: false,
    siteDeletId: '',//删除某一条场地设置
    sitePage: 1,//场地设置当前页
    siteEditor: 0,//场地设置打开修改
    editorListId: '',
    opendayname: '',

    projectTwoId: '',
    projectTwoName: '请选择',
    startDateTwo: '选择开始日期',
    qiStart: '',
    endDateTwo: '请选择结束日期',
    qiEnd: '',
    startTimeTwo: '00:00',
    endTimeTwo: '00:00',
    priceTwo: '',
    numTwo: 0,
    timeChangeTwo: '请选择',
    timeChangeTwoNa: [],
    commentTwo: '',
    perDeletId: '',//删除某一条优惠活动id
    perPage: 1,//优惠活动当前页
    YouId: '',
    siteSportId: 0,
    activitySportId: 0,
    spin: true,

    clenTop: 0,  //下拉加载参数
    clickY: 0,
    moveY: 0,
    spinFlag: false,
    upSportid: [],
    numTwoMax: 0,
    time: [
      { label: '00:00', value: '00:00' },
      { label: '00:30', value: '00:30' },
      { label: '01:00', value: '01:00' },
      { label: '01:30', value: '01:30' },
      { label: '02:00', value: '02:00' },
      { label: '02:30', value: '02:30' },
      { label: '03:00', value: '03:00' },
      { label: '03:30', value: '03:30' },
      { label: '04:00', value: '04:00' },
      { label: '04:30', value: '04:30' },
      { label: '05:00', value: '05:00' },
      { label: '05:30', value: '05:30' },
      { label: '06:00', value: '06:00' },
      { label: '06:30', value: '06:30' },
      { label: '07:00', value: '07:00' },
      { label: '07:30', value: '07:30' },
      { label: '08:00', value: '08:00' },
      { label: '08:30', value: '08:30' },
      { label: '09:00', value: '09:00' },
      { label: '09:30', value: '09:30' },
      { label: '10:00', value: '10:00' },
      { label: '10:30', value: '10:30' },
      { label: '11:00', value: '11:00' },
      { label: '11:30', value: '11:30' },
      { label: '12:00', value: '12:00' },
      { label: '12:30', value: '12:30' },
      { label: '13:00', value: '13:00' },
      { label: '13:30', value: '13:30' },
      { label: '14:00', value: '14:00' },
      { label: '14:30', value: '14:30' },
      { label: '15:00', value: '15:00' },
      { label: '15:30', value: '15:30' },
      { label: '16:00', value: '16:00' },
      { label: '16:30', value: '16:30' },
      { label: '17:00', value: '17:00' },
      { label: '17:30', value: '17:30' },
      { label: '18:00', value: '18:00' },
      { label: '18:30', value: '18:30' },
      { label: '19:00', value: '19:00' },
      { label: '19:30', value: '19:30' },
      { label: '20:00', value: '20:00' },
      { label: '20:30', value: '20:30' },
      { label: '21:00', value: '21:00' },
      { label: '21:30', value: '21:30' },
      { label: '22:00', value: '22:00' },
      { label: '22:30', value: '22:30' },
      { label: '23:00', value: '23:00' },
      { label: '23:30', value: '23:30' },
      { label: '24:00', value: '24:00' },
    ],

    moodArr: [
      { label: '一周', value: '0.1' },
      { label: '两周', value: '0.2' },
      { label: '三周', value: '0.3' },
      { label: '一个月', value: '1' },
      { label: '两个月', value: '2' },
    ],

    timeArrT: [
      { label: '0分钟', value: '0' },
      { label: '30分钟', value: '30' },
      { label: '60分钟', value: '60' },
      { label: '2小时', value: '120' },
      { label: '3小时', value: '180' },
      { label: '4小时', value: '240' },
      { label: '6小时', value: '360' },
      { label: '24小时', value: '1440' },
      { label: '48小时', value: '2880' },
      { label: '72小时', value: '4320' },

    ],

    screenName: '全部',
    activityName: '全部',

  };
  async getVenueFieldList(data) {
    const res = await getVenueFieldList(data, localStorage.getItem('venue_token'))
    this.setState({ spin: false })
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else if (res.data.code === 2000) {
      for (let i in res.data.data) {
        if (res.data.data[i].maxScheduledDate === 0.1) {
          res.data.data[i].date = '一周'
        } else if (res.data.data[i].maxScheduledDate === 0.2) {
          res.data.data[i].date = '二周'
        } else if (res.data.data[i].maxScheduledDate === 0.3) {
          res.data.data[i].date = '三周'
        } else if (res.data.data[i].maxScheduledDate === 1) {
          res.data.data[i].date = '一个月'
        } else if (res.data.data[i].maxScheduledDate === 2) {
          res.data.data[i].date = '两个月'
        }
      }
      this.setState({ getVenueFieldList: res.data.data, total: res.data.other })
    } else {
      this.setState({ getVenueFieldList: [] })
    }
    this.setState({ spinFlag: false })
    setTimeout(() => {
      this.setState({ clenTop: 0 })
    }, 500)
  }

  screenChange = v => {
    this.setState({ siteSportId: v[0], selectNum: 'l' })
    this.getVenueFieldList({ sportid: v[0], page: '' })

    let day = ''
    switch (v[0]) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球";
        break;
      case 4:
        day = "篮球";
        break;
      case 5:
        day = "足球";
        break;
      case 6:
        day = "排球";
        break;
      case 7:
        day = "网球";
        break;
      case 8:
        day = "高尔夫";
        break;
      default:
        day = "";
    }
    this.setState({ screenName: day })
  }

  activityChangeTwo = e => {
    this.setState({ activitySportId: e[0], selectNumTwo: 'l' })
    this.getVenueDiscountList({ sportid: e[0], page: '' })

    let day = ''
    switch (e[0]) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球";
        break;
      case 4:
        day = "篮球";
        break;
      case 5:
        day = "足球";
        break;
      case 6:
        day = "排球";
        break;
      case 7:
        day = "网球";
        break;
      case 8:
        day = "高尔夫";
        break;
      default:
        day = "";
    }
    this.setState({ activityName: day })


  }

  screenChangeTwo = e => {
    this.setState({ activitySportId: e, selectNum: 'l' })
    this.getVenueDiscountList({ sportid: e, page: '' })
  }

  async getVenueDiscountList(data) {
    const res = await getVenueDiscountList(data, localStorage.getItem('venue_token'))
    this.setState({ getVenueDiscountList: res.data.data, Youtotal: res.data.other })
  }




  async getSetUpFieldSportId(data) {
    const res = await getSetUpFieldSportId(data, localStorage.getItem('venue_token'))
    this.setState({ upSportid: res.data.data })
    
  }



  async addVenueDiscount(data) {
    const res = await addVenueDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      this.setState({ Youvisible: false })
      this.getVenueDiscountList({ sportid: this.state.activitySportId, page: '' })
    } else if (res.data.code !== 4001 && res.data.code !== 2000) {
      Toast.success(res.data.msg, 1);

    }
  }
  async getVenueSport(data) {
    const res = await getVenueSport(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrS = []
      for (let i in res.data.data) {
        let ko = {}
        ko.label = res.data.data[i].name
        ko.value = res.data.data[i].id
        arrS.push(ko)
      }
      this.setState({ sportList: arrS })
    }
  }

  async getFirstField(data) {
    const res = await getFirstField(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);

    } else if (res.data.code === 2000) {
      this.setState({
        addsporId: res.data.data.sportid, runName: res.data.data.sportname, dateChange: res.data.data.openday,
        startTime: res.data.data.starttime, endTime: res.data.data.endtime, price: res.data.data.costperhour, num: res.data.data.maxtablecount,
        weekChange: res.data.data.maxScheduledDate, timeChange: res.data.data.appointmenttime, comment: res.data.data.comment
      })
      this.setState({ DrawerVisible: true, siteEditor: 1 })
    }

    let day = ''
    switch (parseInt(res.data.data.openday)) {
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
      case 0:
        day = "周日";
        break;
      default:
        day = "";
    }
    this.setState({ opendayname: day })
  }


  async addVenueField(data) {
    const res = await addVenueField(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('操作成功', 1);
      this.setState({ DrawerVisible: false })
      this.getVenueFieldList({ sportid: this.state.siteSportId, page: this.state.sitePage })
    } else {
      Toast.fail(res.data.msg, 1);

    }
  }

  componentDidMount() {
    this.getVenueFieldList({ sportid: '', page: '' })
    this.getVenueDiscountList({ sportid: '', page: '' })
    this.getVenueSport()
    this.getSetUpFieldSportId()
  }
  site = () => {
    this.setState({ clickNum: 1, selectNumTwo: 'l', selectNum: 'l' })
  }
  preferential = () => {
    this.setState({ clickNum: 2 })
  }
  current = (page, pageSize) => {
    this.setState({ sitePage: page, flag: false, selectNum: 'l' })
    this.getVenueFieldList({ sportid: this.state.siteSportId, page: page })
  }

  currentTwo = (page, pageSize) => {
    this.setState({ perPage: page, flagTwo: false, selectNumTwo: 'l' })
    this.getVenueDiscountList({ sportid: this.state.sportid, page: page })
  }
  selectBottom = (e) => {
    if (e.currentTarget.dataset.index === this.state.selectNum) {
      this.setState({ selectNum: 'l' })
    } else if (e.currentTarget.dataset.index !== this.state.selectNum) {
      this.setState({ selectNum: e.currentTarget.dataset.index })
    }
  }
  selectBottomTwo = (e) => {
    if (e.currentTarget.dataset.index === this.state.selectNumTwo) {
      this.setState({ selectNumTwo: 'l' })
    } else if (e.currentTarget.dataset.index !== this.state.selectNumTwo) {
      this.setState({ selectNumTwo: e.currentTarget.dataset.index })
    }
  }

  addList = () => {
    this.setState({ DrawerVisible: true })
    this.setState({
      addsporId: [], runName: '请选择', dateChange: [],
      startTime: '00:00', endTime: '00:00', price: '', num: '',
      weekChange: '请选择', timeChange: '请选择', comment: ''
    })
  }

  addYouList = () => {
    this.setState({ Youvisible: true })
    this.setState({
      projectTwoId: '', projectTwoName: '请选择', startDateTwo: '选择开始日期', endDateTwo: '选择结束日期',
      startTimeTwo: '00:00', endTimeTwo: '00:00', priceTwo: '',
      numTwo: 0, timeChangeTwo: '请选择', commentTwo: ''
    })
  }


  drawerClose = () => {
    this.setState({ DrawerVisible: false, siteEditor: 0 })
  }

  drawerCloseTwo = () => {
    this.setState({ Youvisible: false })
  }
  handleChangeUser = (data) => {
    data = data || {}
    this.userData.defaultValue = data
    this.setState({ defaultValue: data })
  }

  closeUserPicker = () => {
    this.setState({ userPickerVisible: false })
  }

  cancelUserPicker = () => {
    this.userData.defaultValue = {};
    this.setState({
      userPickerVisible: false,
      defaultValue: {}
    });
  }
  project = e => {
    this.setState({ addsporId: e[0] })
    let day = ''
    switch (parseInt(e[0])) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球";
        break;
      case 4:
        day = "篮球";
        break;
      case 5:
        day = "足球";
        break;
      case 6:
        day = "排球";
        break;
      case 7:
        day = "网球";
        break;
      case 8:
        day = "高尔夫";
        break;
      default:
        day = "";
    }
    this.setState({ runName: day })
  }

  dateChange = e => {
    if (typeof (e) === 'object') {
      this.setState({ dateChange: e })
    } else {
      this.setState({ dateChange: parseInt(e) })
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
        case 0:
          day = "周日";
          break;
        default:
          day = "";
      }
      this.setState({ opendayname: day })
    }
  }
  startTime = (e) => {
    this.setState({ startTime: e[0] })
  }
  endTime = (e) => {
    this.setState({ endTime: e[0] })
  }
  price = e => {
    this.setState({ price: e.target.value })
  }
  num = e => {
    this.setState({ num: e.target.value })
  }
  weekChange = e => {
    this.setState({ weekChange: parseFloat(e[0]) })
  }
  timeChange = e => {
    this.setState({ timeChange: parseFloat(e[0]) })
  }
  comment = e => {
    this.setState({ comment: e.target.value })
  }
  submit = () => {
    let { addsporId, runName, dateChange, opendayname, startTime, endTime, price, num, weekChange, timeChange, comment, editorListId } = this.state
    if (runName === '') {
      Toast.fail('请选择运动项目', 1);
    } else if (startTime === '') {
      Toast.fail('请选择开始时间', 1);
    } else if (endTime === '') {
      Toast.fail('请选择结束时间', 1);
    } else if (price === '') {
      Toast.fail('请填写价格', 1);
    } else if (num === '') {
      Toast.fail('请填写场地数量', 1);
    } else if (weekChange === '请选择') {
      Toast.fail('请选择最长可预订时间', 1);
    } else if (timeChange === []) {
      Toast.fail('请选择提前预定时间', 1);
    } else {
      let data = {
        sportid: addsporId,
        sportname: runName,
        opendayname: opendayname,
        starttime: startTime,
        endtime: endTime,
        costperhour: price,
        maxtablecount: num,
        maxScheduledDate: weekChange,
        appointmenttime: timeChange,
        comment: comment,
        uuid: editorListId
      }
      if (typeof (dateChange) === 'number') {
        data.openday = dateChange
      } else {
        data.openday = dateChange.join(',')
      }
      this.addVenueField(data)
    }
  }
  editor = e => {
    this.setState({ editorListId: e.currentTarget.dataset.uuid })
    this.getFirstField({ uuid: e.currentTarget.dataset.uuid })

  }

  //删除某一条场地设置
  async delVenueField(data) {
    const res = await delVenueField(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);

      this.setState({ selectNum: 'l' })
      this.getVenueFieldList({ sportid: this.state.siteSportId, page: this.state.sitePage })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }
  mood = e => {
    this.setState({ siteDeletId: e.currentTarget.dataset.uuid })
  }
  siteDelet = () => {
    this.delVenueField({ uuid: this.state.siteDeletId })
  }


  //////////////////////  优惠活动获取添加
  projectTwo = e => {
    this.setState({ projectTwoId: e[0] })
    let day = ''
    switch (parseInt(e[0])) {
      case 1:
        day = "羽毛球";
        break;
      case 2:
        day = "乒乓球";
        break;
      case 3:
        day = "台球";
        break;
      case 4:
        day = "篮球";
        break;
      case 5:
        day = "足球";
        break;
      case 6:
        day = "排球";
        break;
      case 7:
        day = "网球";
        break;
      case 8:
        day = "高尔夫";
        break;
      default:
        day = "";
    }
    let { upSportid } = this.state
    for (let i in upSportid) {
      if (upSportid[i].sportid === parseInt(e[0])) {
        console.log(parseInt(upSportid[i].maxtablecount))
        this.setState({ numTwoMax: parseInt(upSportid[i].maxtablecount), numTwo: parseInt(upSportid[i].maxtablecount) })
      }
    }

    this.setState({ projectTwoName: day })
  }
  startDateTwo = (date) => {
    this.setState({ startDateTwo: date.toLocaleDateString().replace(/\//g, "-"), qiStart: date })
  }
  endDateTwo = (date) => {
    this.setState({ endDateTwo: date.toLocaleDateString().replace(/\//g, "-"), qiEnd: date })
  }
  startTimeTwo = (e) => {
    this.setState({ startTimeTwo: e[0] })
  }

  endTimeTwo = (e) => {
    this.setState({ endTimeTwo: e[0] })
  }
  priceTwo = e => {
    this.setState({ priceTwo: e.target.value })
  }
  numTwo = e => {
    this.setState({ numTwo: e })
  }
  timeChangeTwo = e => {
    this.setState({ timeChangeTwo: parseInt(e[0]) })
    let day = ''
    switch (parseInt(e)) {
      case 0:
        day = "0分钟";
        break;
      case 30:
        day = "30分钟";
        break;
      case 60:
        day = "60分钟";
        break;
      case 120:
        day = "120分钟";
        break;
      case 180:
        day = "180分钟";
        break;
      default:
        day = "";
    }
    this.setState({ timeChangeTwoNa: day })

  }
  commentTwo = e => {
    this.setState({ commentTwo: e.target.value })
  }
  submitTwo = () => {
    let { projectTwoId, projectTwoName, startDateTwo, endDateTwo, startTimeTwo, endTimeTwo, priceTwo, numTwo, timeChangeTwo, commentTwo, YouId } = this.state
    if (projectTwoId === '') {
      Toast.fail('请选择运动项目', 1);
    } else if (priceTwo === '') {
      Toast.fail('请填写价格', 1);
    } else if (numTwo === 0) {
      Toast.fail('请填写场地数量', 1);
    } else if (timeChangeTwo === []) {
      Toast.fail('请选择可提前预定时间', 1);
    } else {
      let data = {
        sportid: projectTwoId,
        sportname: projectTwoName,
        starttime: startTimeTwo,
        endtime: endTimeTwo,
        costperhour: priceTwo,
        maxtablecount: numTwo,
        appointmenttime: timeChangeTwo,
        fromdate: startDateTwo === undefined ? new Date().toLocaleDateString().replace(/\//g, "-") : startDateTwo,
        enddate: endDateTwo === undefined ? new Date().toLocaleDateString().replace(/\//g, "-") : endDateTwo,
        comment: commentTwo,
        uuid: YouId
      }
      this.addVenueDiscount(data)
    }
  }

  //删除某一条优惠活动
  async DelVenueDiscount(data) {
    const res = await DelVenueDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success(res.data.msg, 1);
      this.getVenueDiscountList({ sportid: this.state.activitySportId, page: this.state.perPage })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  per = e => {
    this.setState({ perDeletId: e.currentTarget.dataset.uuid })
  }

  perDelet = () => {
    this.DelVenueDiscount({ uuid: this.state.perDeletId })
  }

  editorTwo = (e) => {
    this.setState({ Youvisible: true })
    this.setState({ YouId: e.currentTarget.dataset.uuid })
    this.getFirstDiscount({ uuid: e.currentTarget.dataset.uuid })
    this.getSetUpFieldSportId()
    let { upSportid } = this.state
    for (let i in upSportid) {
      if (upSportid[i].sportid === this.state.projectTwoId) {
        this.setState({ numTwoMax: parseInt(upSportid[i].maxtablecount), numTwo: parseInt(upSportid[i].maxtablecount) })
      }
    }
  }


  async getFirstDiscount(data) {
    const res = await getFirstDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({
        projectTwoId: res.data.data.sportid, projectTwoName: res.data.data.sportname, startDateTwo: res.data.data.fromdate, endDateTwo: res.data.data.enddate,
        startTimeTwo: res.data.data.starttime, endTimeTwo: res.data.data.endtime, priceTwo: res.data.data.costperhour,
        numTwo: res.data.data.maxtablecount, timeChangeTwo: res.data.data.appointmenttime, commentTwo: res.data.data.comment
      })
    }
  }


  touClick = (e) => {
    this.setState({ clickY: e.targetTouches[0].clientY })
  }
  touMove = (e) => {
    if (this.state.clickY < e.targetTouches[0].clientY && this.state.clickY < 200) {
      this.setState({ moveY: e.targetTouches[0].clientY })
      if (e.targetTouches[0].clientY - this.state.clickY < 80) {
        this.setState({ spinFlag: true })
        this.setState({ clenTop: e.targetTouches[0].clientY - this.state.clickY })
      }
    }
  }

  touEnd = () => {
    if (this.state.moveY > this.state.clickY + 10) {
      this.getVenueFieldList({ sportid: this.state.siteSportId, page: this.state.sitePage })
      if (this.state.spinFlag === false) {
        this.setState({ clenTop: 0 })
      }
    }
  }



  touClickTwo = (e) => {
    this.setState({ clickY: e.targetTouches[0].clientY })
  }
  touMoveTwo = (e) => {
    if (this.state.clickY < e.targetTouches[0].clientY && this.state.clickY < 200) {
      this.setState({ moveY: e.targetTouches[0].clientY })
      if (e.targetTouches[0].clientY - this.state.clickY < 80) {
        this.setState({ spinFlag: true })
        this.setState({ clenTop: e.targetTouches[0].clientY - this.state.clickY })
      }
    }
  }
  touEndTwo = () => {
    if (this.state.moveY > this.state.clickY + 10) {
      this.getVenueDiscountList({ sportid: this.state.activitySportId, page: this.state.perPage })
      if (this.state.spinFlag === false) {
        this.setState({ clenTop: 0 })
      }
    }
  }



  render() {
    return (
      <div className="sitePh">
        <div className="siteheaderTitle">
          <div onClick={this.site} style={this.state.clickNum === 1 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>场地设置</div>
          <div onClick={this.preferential} style={this.state.clickNum === 2 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>优惠活动</div>
          {/* <div>筛选<img src={require('../../assets/shaixuan.png')} /></div> */}
        </div>
        <div style={{ height: '0.6rem', background: '#f5f5f5' }}></div>
        <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} ><Icon type="loading" className='loadingY' style={{ top: this.state.clenTop / 7 }} /></div>
        <div className={this.state.clickNum === 1 ? 'site' : 'none'} onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}>
          <Row style={{ color: '#9B9B9B', borderBottom: '0.06rem solid #e9e9e9' }}>
            <Col className="oneCol" xs={{ span: 7 }} lg={{ span: 6 }}>
              {/* <Select defaultValue="运动项目" dropdownStyle={{ textAlign: 'left', paddingLeft: '0' }} style={{ width: '100%', textAlign: 'left', background: 'transparent' }} onChange={this.screenChange}>
                <Option value='0'>全部</Option>
                {
                  this.state.sportList.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select> */}


              <Picker data={this.state.sportList} title="选择运动项目" onChange={this.screenChange} cols={1} className="forss">
                <div>{this.state.screenName} <Icon type='down' /></div>
              </Picker>


            </Col>
            <Col style={{ textAlign: 'left' }} xs={{ span: 7, offset: 4 }} lg={{ span: 6 }}>时间</Col>
            <Col xs={{ span: 6 }} lg={{ span: 6 }}>星期</Col>
          </Row>

          <div className="contentScorll">
            {
              this.state.getVenueFieldList.map((item, i) => (
                <div key={i} style={{ borderBottom: '0.06rem solid #e9e9e9', transition: '0.2s' }}>
                  <Row onClick={this.selectBottom} data-index={i}>
                    <Col className="oneCol" xs={{ span: 9 }} lg={{ span: 6 }}>{item.sportname}</Col>
                    <Col style={{ textAlign: 'left' }} xs={{ span: 7, offset: 2 }} lg={{ span: 6 }}>{item.starttime + '-' + item.endtime}</Col>
                    <Col xs={{ span: 6 }} lg={{ span: 6 }}>{item.opendayname}</Col>
                  </Row>

                  <div className={parseInt(this.state.selectNum) === i ? 'selectBottom' : 'none'}>
                    <Row className="detail">
                      <Col className="oneCol" xs={{ span: 9 }} lg={{ span: 6 }}>价格 ￥{item.costperhour}</Col>
                      <Col style={{ textAlign: 'left' }} xs={{ span: 7, offset: 2 }} lg={{ span: 6 }}>场地数量 {item.maxtablecount}</Col>
                      <Col xs={{ span: 6 }} lg={{ span: 6 }}><img className="upLoad" style={{ right: '7%' }} onClick={this.editor} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" /></Col>
                    </Row>

                    <Row className="detail">
                      <Col className="oneCol" xs={{ span: 9 }} lg={{ span: 6 }}>最长可预定 {item.date}</Col>
                      <Col xs={{ span: 7, offset: 2 }} style={{ textAlign: 'left' }} lg={{ span: 6 }}>最短预定 {item.appointmenttime / 60 + '小时'}</Col>
                      <Col xs={{ span: 6 }} lg={{ span: 6 }}>
                        <Popconfirm
                          title="你确定要删除吗?"
                          onConfirm={this.siteDelet}
                          onCancel={this.siteCancel}
                          okText="确定"
                          cancelText="取消"
                        >
                          <img className="upLoad" style={{ right: '1.5rem' }} onClick={this.mood} data-uuid={item.uid} src={require("../../assets/delet.png")} alt="删除" />
                        </Popconfirm></Col>
                    </Row>
                  </div>
                </div>
              ))
            }
            <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />
            <Pagination className="fenye" defaultCurrent={1} style={this.state.getVenueFieldList.length < 1 ? { display: 'none' } : {}} size="small" onChange={this.current} total={this.state.total} />
            <Result className={this.state.spin === false && this.state.getVenueFieldList.length === 0 ? '' : 'nono'} icon={<Icon type="gift" theme="twoTone" twoToneColor="#F5A623" style={{ fontSize: '2rem' }} />} title="没有场地设置" />
            <img className="addList" onClick={this.addList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
          </div>
          <Drawer
            title="添加/修改场地设置"
            placement="right"
            width='100%'
            onClose={this.drawerClose}
            visible={this.state.DrawerVisible}
            closable={true}
            bodyStyle={{ padding: 0 }}
          >
            <div className='drawSite'>
              <div className="sitePhlistSon">
                <span style={{ float: 'left' }}>运动项目</span>

                <Picker data={this.state.sportList} title="选择运动项目" onChange={this.project} cols={1} className="forss">
                  <div style={{ float: 'right', width: '50%', textAlign: 'left', paddingLeft: '0.75rem' }}>{this.state.runName} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
                </Picker>





              </div>

              <div className="sitePhlistSon">
                <span>节假日/工作日</span>
                <Select
                  mode={this.state.siteEditor === 1 ? '' : 'multiple'}
                  style={{ width: '50%', float: 'right' }}
                  placeholder="请选择"
                  onChange={this.dateChange}
                  value={this.state.siteEditor === 1 ? this.state.dateChange === 0 ? '周日' : [] && this.state.dateChange === 1 ? '周一' : [] && this.state.dateChange === 2 ? '周二' : [] && this.state.dateChange === 3 ? '周三' : [] && this.state.dateChange === 4 ? '周四' : [] && this.state.dateChange === 5 ? '周五' : [] && this.state.dateChange === 6 ? '周六' : [] : this.state.dateChange}
                >
                  <Option value='1'>周一</Option>
                  <Option value='2'>周二</Option>
                  <Option value='3'>周三</Option>
                  <Option value='4'>周四</Option>
                  <Option value='5'>周五</Option>
                  <Option value='6'>周六</Option>
                  <Option value='0'>周日</Option>
                </Select>
              </div>
              <div className="sitePhlistSon">
                <span style={{ float: 'left' }}>开始时间</span>
                <Picker data={this.state.time} title="选择开始时间" onChange={this.startTime} cols={1} className="forss">
                  <div style={{ float: 'right', width: '50%', textAlign: 'left', paddingLeft: '0.75rem' }}>{this.state.startTime} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
                </Picker>

              </div>


              <div className="sitePhlistSon">
                <span style={{ float: 'left' }}>结束时间</span>
                <Picker data={this.state.time} title="选择开始时间" onChange={this.endTime} cols={1} className="forss">
                  <div style={{ float: 'right', width: '50%', textAlign: 'left', paddingLeft: '0.75rem' }}>{this.state.endTime} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
                </Picker>
              </div>
              <div className="sitePhlistSon">
                <span>价格(元/时)</span>
                <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.price} onChange={this.price} placeholder="请输入" type="number" />
              </div>
              <div className="sitePhlistSon">
                <span>数量</span>
                <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.num} onChange={this.num} placeholder="请输入" type="number" />
              </div>

              <div className="sitePhlistSon">
                <span style={{ float: 'left' }}>最长可预定时间</span>
                <Picker data={this.state.moodArr} title="选择开始时间" onChange={this.weekChange} cols={1} className="forss">
                  <div style={{ float: 'right', width: '50%', textAlign: 'left', paddingLeft: '0.75rem' }}>{this.state.weekChange === 0.1 ? '一周' : '请选择' && this.state.weekChange === 0.2 ? '两周' : '请选择' && this.state.weekChange === 0.3 ? '三周' : '请选择' && this.state.weekChange === 1 ? '一个月' : '请选择' && this.state.weekChange === 2 ? '两个月' : '请选择'} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
                </Picker>

              </div>

              <div className="sitePhlistSon">
                <span style={{ float: 'left' }}>最短提前预定时间</span>
                <Picker data={this.state.timeArrT} title="选择开始时间" onChange={this.timeChange} cols={1} className="forss">
                  <div style={{ float: 'right', width: '50%', textAlign: 'left', paddingLeft: '0.75rem' }}>
                    {
                      this.state.timeChange === 0 ? '0分钟' : '请选择'
                        && this.state.timeChange === 30 ? '30分钟' : '请选择'
                          && this.state.timeChange === 60 ? '60分钟' : '请选择'
                            && this.state.timeChange === 120 ? '2小时' : '请选择'
                              && this.state.timeChange === 180 ? '3小时' : '请选择'
                                && this.state.timeChange === 240 ? '4小时' : '请选择'
                                  && this.state.timeChange === 300 ? '5小时' : '请选择'
                                    && this.state.timeChange === 360 ? '6小时' : '请选择'
                                      && this.state.timeChange === 1440 ? '24小时' : '请选择'
                                        && this.state.timeChange === 2880 ? '48小时' : '请选择'
                                          && this.state.timeChange === 4320 ? '72小时' : '请选择'
                    }
                    <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
                </Picker>

              </div>

              <div className="sitePhlistSon">
                <span>备注</span>
                <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none' }} value={this.state.comment} onChange={this.comment} placeholder="请输入" />
              </div>
              <div className="sitePhsubmit" onClick={this.submit}>提交</div>
              {/* <div className="sitePhclose" onClick={this.drawerClose}>取消</div> */}
            </div>
          </Drawer>
        </div>
        <div className={this.state.clickNum === 2 ? 'preferential' : 'none'} onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}>
          <Row style={{ color: '#9B9B9B', borderBottom: '0.06rem solid #e9e9e9' }}>
            <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6 }}>
              <Picker data={this.state.sportList} title="选择运动项目" onChange={this.activityChangeTwo} cols={1} className="forss">
                <div style={{ textAlign: 'left' }}>{this.state.activityName} <Icon type='down' /></div>
              </Picker>
            </Col>
            <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6 }} style={{ textAlign: 'left' }}>时间</Col>
            <Col xs={{ span: 6 }} lg={{ span: 6 }}>价格(元/时)</Col>
          </Row>
          <div style={this.state.getVenueDiscountList.length < 1 ? { display: 'none' } : {}}>
            {
              this.state.getVenueDiscountList.map((item, i) => (
                <div key={i} style={{ borderBottom: '0.06rem solid #e9e9e9' }}>
                  <Row onClick={this.selectBottomTwo} data-index={i}>
                    <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6 }} style={{ textAlign: 'left' }}>{item.sportname}</Col>
                    <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6 }} style={{ textAlign: 'left' }}>{item.starttime + '-' + item.endtime}</Col>
                    <Col xs={{ span: 6 }} lg={{ span: 6 }}>{item.costperhour}</Col>
                  </Row>
                  {/* && this.state.flagTwo === true */}
                  <div className={parseInt(this.state.selectNumTwo) === i ? 'selectBottom' : 'none'}>

                    <Row className='detail'>
                      <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6 }} style={{ textAlign: 'left' }}>场地数量 {item.maxtablecount}</Col>
                      <Col xs={{ span: 10, offset: 1 }} lg={{ span: 6 }} style={{ textAlign: 'left' }}>最短提前预定 {item.appointmenttime + '分钟'}</Col>
                      <Col xs={{ span: 6 }} lg={{ span: 6 }}><img className="upLoad" onClick={this.editorTwo} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" /></Col>
                    </Row>

                    <Row className='detail'>
                      <Col xs={{ span: 17, offset: 1 }} lg={{ span: 6 }} style={{ textAlign: 'left' }}>有效期 {item.fromdate} 至 {item.enddate}</Col>
                      <Col xs={{ span: 6 }} lg={{ span: 6 }}><Popconfirm
                        title="你确定要删除吗?"
                        onConfirm={this.perDelet}
                        onCancel={this.siteCancel}
                        okText="确定"
                        cancelText="取消"
                      >
                        <img className="upLoad" style={{ right: '13%' }} onClick={this.per} data-uuid={item.uid} src={require("../../assets/delet.png")} alt="删除" />
                      </Popconfirm></Col>
                    </Row>

                  </div>
                </div>
              ))
            }
          </div>
          <Pagination className="fenye" style={this.state.getVenueDiscountList.length < 1 ? { display: 'none' } : {}} defaultCurrent={1} size="small" onChange={this.currentTwo} total={this.state.Youtotal} />
          <Result className={this.state.getVenueDiscountList.length === 0 ? '' : 'nono'} icon={<Icon type="gift" theme="twoTone" twoToneColor="#F5A623" style={{ fontSize: '2rem' }} />} title="没有优惠活动" />
          <img className="addList" onClick={this.addYouList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
        </div>
        <Drawer
          title="添加/修改优惠活动"
          placement="right"
          closable={true}
          onClose={this.drawerCloseTwo}
          visible={this.state.Youvisible}
          width='100%'
        >
          <div className="SzSon">
            <span style={{ float: 'left' }}>运动项目</span>
            <Picker data={this.state.sportList} title="选择运动项目" onChange={this.projectTwo} cols={1} className="forss">
              <div style={{ float: 'right', width: '50%', textAlign: 'left', }}>{this.state.projectTwoName} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
            </Picker>

          </div>

          <div className="SzSon">
            <span style={{ float: 'left' }}>开始日期</span>

            <DatePicker
              mode="date"
              title="选择开始日期"
              extra="Optional"
              locale={zh_CN}
              value={this.state.qiStart}
              onChange={this.startDateTwo}
            >
              <div style={{ width: '50%', float: 'right' }}>{this.state.startDateTwo}<Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
            </DatePicker>

          </div>

          <div className="SzSon">
            <span style={{ float: 'left' }}>结束日期</span>

            <DatePicker
              mode="date"
              title="选择结束日期"
              extra="Optional"
              locale={zh_CN}
              value={this.state.qiStart}
              onChange={this.endDateTwo}
            >
              <div style={{ width: '50%', float: 'right' }}>{this.state.endDateTwo}<Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
            </DatePicker>
          </div>
          <div className="SzSon">
            <span style={{ float: 'left' }}>开始时间</span>
            <Picker data={this.state.time} title="选择开始时间" onChange={this.startTimeTwo} cols={1} className="forss">
              <div style={{ float: 'right', width: '50%', textAlign: 'left' }}>{this.state.startTimeTwo} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
            </Picker>
          </div>
          <div className="SzSon">
            <span style={{ float: 'left' }}>结束时间</span>
            <Picker data={this.state.time} title="选择开始时间" onChange={this.endTimeTwo} cols={1} className="forss">
              <div style={{ float: 'right', width: '50%', textAlign: 'left' }}>{this.state.endTimeTwo} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
            </Picker>
          </div>
          <div className="SzSon">
            <span>价格(元/时)</span>
            <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none', paddingLeft: '0' }} value={this.state.priceTwo} onChange={this.priceTwo} placeholder="请输入" type="number" />
          </div>
          <div className="SzSon">
            <span>数量</span>
            <InputNumber style={{ width: '50%', border: 'none', height: '1.9rem', float: 'right', boxShadow: 'none', paddingLeft: '0' }} min={1} max={this.state.numTwoMax} value={this.state.numTwo} onChange={this.numTwo} placeholder="请输入" />
          </div>
          <div className="SzSon">
            <span style={{ float: 'left' }}>最短提前预定时间</span>
            <Picker data={this.state.timeArrT} title="提前预定时间" onChange={this.timeChangeTwo} cols={1} className="forss">
              <div style={{ float: 'right', width: '50%', textAlign: 'left', }}>
                {
                  this.state.timeChangeTwo === 0 ? '0分钟' : '请选择'
                    && this.state.timeChangeTwo === 30 ? '30分钟' : '请选择'
                      && this.state.timeChangeTwo === 60 ? '60分钟' : '请选择'
                        && this.state.timeChangeTwo === 120 ? '2小时' : '请选择'
                          && this.state.timeChangeTwo === 180 ? '3小时' : '请选择'
                            && this.state.timeChangeTwo === 240 ? '4小时' : '请选择'
                              && this.state.timeChangeTwo === 300 ? '5小时' : '请选择'
                                && this.state.timeChangeTwo === 360 ? '6小时' : '请选择'
                                  && this.state.timeChangeTwo === 1440 ? '24小时' : '请选择'
                                    && this.state.timeChangeTwo === 2880 ? '48小时' : '请选择'
                                      && this.state.timeChangeTwo === 4320 ? '72小时' : '请选择'
                }
                <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
            </Picker>


          </div>
          <div className="SzSon">
            <span>备注</span>
            <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none', paddingLeft: '0' }} value={this.state.commentTwo} onChange={this.commentTwo} placeholder="请输入" />
          </div>
          <div className="sitePhsubmit" onClick={this.submitTwo}>提交</div>
          {/* <div className="sitePhclose" onClick={this.drawerCloseTwo}>取消</div> */}
        </Drawer>
      </div>
    )
  }
}


export default sitePh;