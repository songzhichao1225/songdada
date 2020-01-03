import React from 'react';
import './sitePh.css';
import ReactDOM from 'react-dom';
import { Toast, Picker, DatePicker, Card, PullToRefresh, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Input, Pagination, Drawer, Select, Result, Icon, Popconfirm, Spin, InputNumber } from 'antd';
import { getVenueFieldList, getVenueSport, addVenueField, getFirstField, getVenueDiscountList, addVenueDiscount, getVenueSpecialSave, getVenueSpecialDel, delVenueField, DelVenueDiscount, getFirstDiscount, getSetUpFieldSportId, getVenueSpecialList } from '../../api';



function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}



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
    startDateTwo: '',
    qiStart: '',
    endDateTwo: '',
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
    activityThreeSportId: 0,
    spin: true,
    sportListTwo: [{ label: '全部', value: 0 }],
    clenTop: 0,  //下拉加载参数
    clickY: 0,
    moveY: 0,
    spinFlag: false,
    upSportid: [],
    numTwoMax: 0,
    dateChangeTwo: [],
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
    getVenueSpecialList: [],
    selectNumThree: null,
    idDel: '',
    addTelist: false,
    siteEditorTwo: 0,
    projectThreeId: [],
    projectThreeName: '请选择',
    numTwoMaxThree: 0,
    minNum: 1,
    maxNum: 1,
    numberThree: 1,
    startTimeThree: '00:00',
    endTimeThree: '00:00',
    priceThree: 0,
    numberMax: 0,


    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
    refreshingTwo: false,
    refreshingThree: false,
    perPageThree: 1,

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
    this.setState({ spinFlag: false, refreshing: false })
    setTimeout(() => {
      this.setState({ clenTop: 0 })
    }, 500)
  }

  screenChange = v => {
    this.setState({ siteSportId: v[0], selectNum: 'l' })
    this.getVenueFieldList({ sportid: v[0], page: '' })

    let day = ''
    switch (v[0]) {
      case 0:
        day = "全部";
        break;
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


  activityChangeThree = e => {
    this.setState({ activityThreeSportId: e[0], selectNumThree: 'l' })
    this.getVenueSpecialList({ sportid: e[0], page: '' })

    let day = ''
    switch (e[0]) {
      case 0:
        day = "全部";
        break;
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
    this.setState({ getVenueDiscountList: res.data.data, Youtotal: res.data.other, refreshingTwo: false })
  }



  async getVenueSpecialList(data) {
    const res = await getVenueSpecialList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.siteEditorTwo === 0) {
        if (res.data.data.length > 0) {
          this.setState({ getVenueSpecialList: res.data.data, other: res.data.other, loading: false, hidden: true, refreshingThree: false })
        } else {
          this.setState({ getVenueSpecialList: res.data.data, other: res.data.other, loading: false, hidden: false, refreshingThree: false })
        }

      } else {
        let day = ''
        switch (res.data.data[0].sportname) {
          case '羽毛球':
            day = 1;
            break;
          case '乒乓球':
            day = 2;
            break;
          case "台球":
            day = 3;
            break;
          case "篮球":
            day = 4;
            break;
          case "足球":
            day = 5;
            break;
          case "排球":
            day = 6;
            break;
          case "网球":
            day = 7;
            break;
          case "高尔夫":
            day = 8;
            break;
          default:
            day = "";
        }

        let { upSportid } = this.state
        for (let i in upSportid) {
          if (upSportid[i].sportid === day) {

            this.setState({ maxNum: upSportid[i].maxtablecount, numberMax: upSportid[i].maxtablecount })
          }
        }
        this.setState({
          dateChangeTwo: res.data.data[0].openday, projectThreeId: res.data.data[0].sportid, projectThreeName: res.data.data[0].sportname, uuid: res.data.data[0].uuid,
          startTimeThree: res.data.data[0].starttime.slice(0, 5), endTimeThree: res.data.data[0].endtime.slice(0, 5),
          priceThree: res.data.data[0].money, minNum: res.data.data[0].venueid.split(',')[0], maxNum: res.data.data[0].venueid.split(',')[res.data.data[0].venueid.split(',').length - 1]
        })

      }
    } else {
      if (this.state.siteEditorTwo === 0) {
        this.setState({ getVenueSpecialList: res.data.data, loading: false, hidden: false, refreshingThree: false })
      }
    }
  }

  async getSetUpFieldSportId(data) {
    const res = await getSetUpFieldSportId(data, localStorage.getItem('venue_token'))
    this.setState({ upSportid: res.data.data })

  }

  async getVenueSpecialDel(data) {
    const res = await getVenueSpecialDel(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.fail(res.data.msg, 1);
      this.getVenueSpecialList({ sportid: this.state.activityThreeSportId, page: this.state.perPageThree })
    }

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
      let arrS = [{ label: '全部', value: 0 }]
      for (let i in res.data.data) {
        let ko = {}
        ko.label = res.data.data[i].name
        ko.value = res.data.data[i].id
        arrS.push(ko)
        this.state.sportListTwo.push(ko)
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
    this.getVenueSpecialList({ sportid: '' })

    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);
  }
  site = () => {
    this.setState({ clickNum: 1, selectNumTwo: 'l', selectNum: 'l' })
  }
  preferential = () => {
    this.setState({ clickNum: 2, selectNumTwo: 'l', selectNumThree: 'l' })
  }
  preferentialTwo = () => {
    this.setState({ clickNum: 3, selectNumTwo: 'l', selectNumThree: 'l' })
  }
  current = (page, pageSize) => {
    this.setState({ sitePage: page, flag: false, selectNum: 'l' })
    this.getVenueFieldList({ sportid: this.state.siteSportId, page: page })
  }

  currentTwo = (page, pageSize) => {
    this.setState({ perPage: page, flagTwo: false, selectNumTwo: 'l' })
    this.getVenueDiscountList({ sportid: this.state.sportid, page: page })
  }
  currentThree = (page, pageSize) => {
    this.setState({ perPageThree: page, })
    this.getVenueSpecialList({ sportid: this.state.activityThreeSportId, page: page })
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



  selectBottomThree = (e) => {
    if (e.currentTarget.dataset.index === this.state.selectNumThree) {
      this.setState({ selectNumThree: 'l' })
    } else if (e.currentTarget.dataset.index !== this.state.selectNumThree) {
      this.setState({ selectNumThree: e.currentTarget.dataset.index })
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
      projectTwoId: '', projectTwoName: '请选择', startDateTwo: '', endDateTwo: '',
      startTimeTwo: '00:00', endTimeTwo: '00:00', priceTwo: '',
      numTwo: 0, timeChangeTwo: '请选择', commentTwo: ''
    })
  }


  drawerClose = () => {
    this.setState({ DrawerVisible: false, siteEditor: 0 })
  }

  drawerCloseTwo = () => {
    this.setState({ Youvisible: false, addTelist: false })
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
    this.setState({ startDateTwo: date, qiStart: date })
  }
  endDateTwo = (date) => {
    this.setState({ endDateTwo: date, qiEnd: date })
  }
  startTimeTwo = (e) => {
    this.setState({ startTimeTwo: e[0] })
  }


  endTimeTwo = (e) => {
    this.setState({ endTimeTwo: e[0] })
  }

  startTimeThree = e => {
    this.setState({ startTimeThree: e[0] })
  }
  endTimeThree = e => {
    this.setState({ endTimeThree: e[0] })
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
        projectTwoId: res.data.data.sportid, projectTwoName: res.data.data.sportname, startDateTwo:new Date(res.data.data.fromdate), endDateTwo: new Date(res.data.data.enddate),
        startTimeTwo: res.data.data.starttime, endTimeTwo: res.data.data.endtime, priceTwo: res.data.data.costperhour,
        numTwo: res.data.data.maxtablecount, timeChangeTwo: res.data.data.appointmenttime, commentTwo: res.data.data.comment
      })
    }
  }









  sprciaDel = e => {
    this.setState({ idDel: e.currentTarget.dataset.uuid })
  }
  speciaDelTwo = () => {
    this.getVenueSpecialDel({ uuid: this.state.idDel })
  }


  addTelist = () => {
    if (this.state.siteEditorTwo === 1) {
      this.setState({ projectThreeId: [], projectThreeName: '请选择', dateChangeTwo: [], minNum: 1, maxNum: 1, startTimeThree: '00:00', endTimeThree: '00:00', priceThree: 0 })
    }
    this.setState({ addTelist: true })
  }



  dateChangeTwo = e => {
    if (typeof (e) === 'object') {
      this.setState({ dateChangeTwo: e })
    } else {
      this.setState({ dateChangeTwo: parseInt(e) })
    }
  }

  editorThree = (e) => {
    this.setState({ siteEditorTwo: 1, addTelist: true })
    this.getVenueSpecialList({ uuid: e.currentTarget.dataset.uuid })
  }




  projectThree = e => {
    this.setState({ projectThreeId: e[0] })
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
        this.setState({ numTwoMaxThree: parseInt(upSportid[i].maxtablecount), numberMax: parseInt(upSportid[i].maxtablecount) })
      }
    }

    this.setState({ projectThreeName: day })
  }

  minNum = e => {
    if (this.state.projectThreeId.length !== 0) {
      this.setState({ minNum: e })
    } else {

    }
  }
  maxNum = e => {
    if (this.state.projectThreeId.length !== 0) {
      this.setState({ maxNum: e })
    } else {
      Toast.fail('选择运动项目', 2);
    }
  }
  priceThree = e => {
    this.setState({ priceThree: e.target.value })
  }

  async getVenueSpecialSave(data) {
    const res = await getVenueSpecialSave(data, localStorage.getItem('venue_token'))
    if (res.data.code !== 2000) {
      Toast.fail(res.data.msg, 2);
    } else if (res.data.code === 4001) {
      this.props.history.push('/')
      Toast.fail('登录超时请重新登录', 2);
    } else if (res.data.code === 2000) {
      this.setState({
        visible: false,
      });
      Toast.success('添加成功', 2);
      this.setState({ projectThreeId: [], dateChangeTwo: [], minNum: 1, maxNum: 1, startTimeThree: '00:00', endTimeThree: '00:00', priceThree: 0, addTelist: false })
      this.getVenueSpecialList({ sportid: '', page: '' })
    }
  }
  submitThree = () => {
    let { projectThreeId, dateChangeTwo, minNum, maxNum, startTimeThree, endTimeThree, priceThree } = this.state
    let numGo = []
    for (var i = 0; i <= maxNum - minNum; i++) {
      numGo.push(parseInt(minNum) + parseInt(i))
    }
    let data = {
      sportid: projectThreeId,
      venueid: numGo.join(','),
      starttime: startTimeThree,
      endtime: endTimeThree,
      money: priceThree,
      uuid: this.state.uuid
    }
    if (typeof (dateChangeTwo) === 'number') {
      data.openday = dateChangeTwo
    } else {
      data.openday = dateChangeTwo.join(',')
    }
    this.getVenueSpecialSave(data)
  }

  refResh = () => {
    this.setState({ refreshing: true });

    setTimeout(() => {
      this.getVenueFieldList({ sportid: this.state.siteSportId, page: this.state.sitePage })
    }, 1000);
  }

  refReshTwo = () => {
    this.setState({ refreshingTwo: true });
    setTimeout(() => {
      this.getVenueDiscountList({ sportid: this.state.activitySportId, page: this.state.perPage })
    }, 1000);
  }

  refReshThree = () => {
    this.setState({ refreshingThree: true });
    setTimeout(() => {
      this.getVenueSpecialList({ sportid: this.state.activityThreeSportId, page: this.state.perPageThree })
    }, 1000);
  }

  render() {
    return (
      <div className="sitePh">
        <div className="siteheaderTitle">
          <div onClick={this.site} style={this.state.clickNum === 1 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>一般场地</div>
          <div onClick={this.preferentialTwo} style={this.state.clickNum === 3 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>特殊场地</div>
          <div onClick={this.preferential} style={this.state.clickNum === 2 ? { color: '#D85D27', borderBottom: '0.12rem solid #D85D27' } : {}}>优惠活动</div>
          <div className={this.state.clickNum === 1 ? '' : 'none'} style={{ padding: '0.2rem', marginTop: '0.5rem', float: 'right', marginRight: '0.3rem', color: '#9b9b9b', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Picker data={this.state.sportListTwo} title="选择运动项目" onChange={this.screenChange} cols={1} className="forss">
              <div>{this.state.screenName} <Icon type='down' /></div>
            </Picker>
          </div>

          <div className={this.state.clickNum === 2 ? '' : 'none'} style={{ padding: '0.2rem', marginTop: '0.5rem', float: 'right', marginRight: '0.3rem', color: '#9b9b9b', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Picker data={this.state.sportList} title="选择运动项目" onChange={this.activityChangeTwo} cols={1} className="forss">
              <div style={{ textAlign: 'left' }}>{this.state.activityName} <Icon type='down' /></div>
            </Picker>
          </div>

          <div className={this.state.clickNum === 3 ? '' : 'none'} style={{ padding: '0.2rem', marginTop: '0.5rem', float: 'right', marginRight: '0.3rem', color: '#9b9b9b', border: '1px solid #ddd', borderRadius: '4px' }}>
            <Picker data={this.state.sportList} title="选择运动项目" onChange={this.activityChangeThree} cols={1} className="forss">
              <div style={{ textAlign: 'left' }}>{this.state.activityName} <Icon type='down' /></div>
            </Picker>
          </div>


        </div>
        <div className='headSelect' style={this.state.spinFlag === true ? { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' } : { display: 'none' }} ><Icon type="loading" className='loadingY' style={{ top: this.state.clenTop / 7 }} /></div>
        <div className={this.state.clickNum === 1 ? 'site' : 'none'}>
          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.state.refreshing}
            onRefresh={this.refResh}
          >
            <div className="contentScorll">
              {
                this.state.getVenueFieldList.map((item, i) => (
                  <Card key={i}>
                    <Card.Header
                      title={<div style={{ fontSize: '14px' }}><span style={{ display: 'block', width: '50px', float: 'left' }}>{item.sportname}</span><span style={{ paddingLeft: '4rem' }}>{item.starttime + '-' + item.endtime}</span></div>}
                      extra={
                        <div>
                          <i style={item.openday === 1 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344163250" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7540" width="30" height="30"><path d="M333.694769 520.369231c-4.923077 0-8.450462-0.902154-10.584615-2.707693-2.132923-1.805538-3.2-5.086769-3.2-9.846153 0-4.267077 1.067077-7.302154 3.2-9.107693 2.134154-1.805538 5.661538-2.707692 10.584615-2.707692h35.692308v-6.646154c0-5.251692 1.888-9.107692 5.661538-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753846 1.476923-1.230769 0.984615-1.846154 3.117538-1.846154 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861538 42.215385-0.573538 12.390154-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661539 27.446154a139.769846 139.769846 0 0 1-9.230769 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984616 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492308-0.984615-3.363692-0.163692-8 2.461539-13.907692 3.446154-7.056 6.276923-14.113231 8.492308-21.169231 2.215385-7.056 3.980308-14.974769 5.292307-23.753846 1.313231-8.779077 2.215385-18.790154 2.707693-30.030769 0.492308-11.240615 0.738462-24.492308 0.738461-39.753846v-62.523077c0-5.579077 0.411077-10.092308 1.230769-13.538462 0.820923-3.446154 2.257231-6.153846 4.307693-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938461 3.364923-0.656 7.672615-0.984615 12.923077-0.984616h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107693 3.364923 0.738462 6.072615 2.092308 8.123077 4.061538 2.051692 1.969231 3.488 4.676923 4.307692 8.123077 0.820923 3.446154 1.230769 7.959385 1.230769 13.538462v171.076923c0 4.594462-0.532923 8.820923-1.6 12.676923-1.065846 3.856-2.912 7.097846-5.538461 9.723077-2.625231 2.625231-6.030769 4.636308-10.215385 6.030769-4.184615 1.394462-9.394462 1.928615-15.630769 1.6-7.056-0.328615-13.127385-0.902154-18.215385-1.723077-5.086769-0.820923-9.271385-1.805538-12.553846-2.953846-5.250462-1.805538-8.286769-4.307692-9.107692-7.507692-0.819692-3.2-0.327385-7.015385 1.476923-11.446154 1.641846-3.938462 3.938462-6.276923 6.892307-7.015385 2.953846-0.738462 7.057231-0.451692 12.307693 0.861539 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.574769 5.457231 0.697846 7.015384 0.36923 1.559385-0.328615 2.544-1.230769 2.953847-2.707692 0.411077-1.476923 0.615385-3.528615 0.615384-6.153846v-155.076923c0-4.267077-0.450462-7.056-1.353846-8.369231-0.902154-1.313231-3.240615-1.969231-7.015385-1.969231h-57.846153c3.611077 2.132923 5.415385 5.990154 5.415384 11.569231v6.646154h37.169231c2.461538 0 4.553846 0.082462 6.276923 0.246154 1.723077 0.163692 3.118769 0.656 4.184615 1.476923 1.067077 0.820923 1.846154 2.009846 2.338462 3.569231 0.492308 1.559385 0.738462 3.815385 0.738461 6.76923 0 4.923077-0.984615 8.205538-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584615 2.461539h-37.169231v15.261538h42.830769c4.759385 0 8.288 0.944 10.584616 2.830769 2.297846 1.886769 3.446154 5.128615 3.446154 9.723077 0 3.938462-1.065846 7.015385-3.2 9.23077-2.132923 2.215385-5.661538 3.323077-10.584616 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584615-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.23077s0.984615-7.015385 2.953846-9.230769c1.969231-2.215385 5.497846-3.323077 10.584615-3.323077h42.092308v-15.261538h-35.692308z m116.184616 98.707692c0 5.744-0.327385 10.338462-0.984616 13.784615-0.656 3.446154-1.927385 6.071385-3.815384 7.876924-1.886769 1.805538-4.594462 2.994462-8.123077 3.56923-3.527385 0.574769-8.246154 0.861538-14.153846 0.861539h-77.046154c-5.579077 0-10.132923-0.286769-13.661539-0.861539-3.527385-0.574769-6.317538-1.805538-8.369231-3.692307-2.050462-1.886769-3.446154-4.513231-4.184615-7.876923-0.738462-3.363692-1.107692-7.917538-1.107692-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107692-13.046154 0.738462-3.446154 2.092308-6.153846 4.061539-8.123077 1.969231-1.969231 4.718769-3.363692 8.246153-4.184615 3.528615-0.820923 8.164923-1.230769 13.907693-1.230769h76.553846c5.907692 0 10.667077 0.409846 14.276923 1.230769 3.611077 0.820923 6.4 2.215385 8.369231 4.184615 1.969231 1.969231 3.282462 4.676923 3.938461 8.123077 0.657231 3.446154 0.984615 7.794462 0.984616 13.046154V619.076923z m-29.538462-15.261538c0-3.446154-0.369231-5.620923-1.107692-6.523077-0.738462-0.902154-2.584615-1.353846-5.538462-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046153 1.230769-0.738462 0.820923-1.107692 3.036308-1.107693 6.646154v10.338461c0 2.132923 0.328615 3.486769 0.984616 4.061539 0.657231 0.574769 2.380308 0.861538 5.16923 0.861538h59.569231c3.118769 0 5.005538-0.286769 5.661539-0.861538 0.657231-0.574769 0.984615-1.928615 0.984615-4.061539v-10.338461z m343.934769-44.307693c0 4.759385-1.107692 8.451692-3.323077 11.076923-2.215385 2.625231-5.949538 3.938462-11.2 3.938462h-209.723077c-5.580308 0-9.353846-1.313231-11.323076-3.938462-1.969231-2.625231-2.953846-6.317538-2.953847-11.076923 0-4.430769 0.984615-8.123077 2.953847-11.076923 1.969231-2.953846 5.742769-4.430769 11.323076-4.430769h209.723077c5.250462 0 8.984615 1.476923 11.2 4.430769 2.215385 2.953846 3.323077 6.646154 3.323077 11.076923z" p-id="7541" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="7542" fill="#515151"></path></svg>
                          </i>
                          <i style={item.openday === 2 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344280516" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8039" width="30" height="30"><path d="M333.694769 520.369231c-4.923077 0-8.450462-0.902154-10.584615-2.707693-2.132923-1.805538-3.2-5.086769-3.2-9.846153 0-4.267077 1.067077-7.302154 3.2-9.107693 2.134154-1.805538 5.661538-2.707692 10.584615-2.707692h35.692308v-6.646154c0-5.251692 1.888-9.107692 5.661538-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753846 1.476923-1.230769 0.984615-1.846154 3.117538-1.846154 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861538 42.215385-0.573538 12.390154-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661539 27.446154a139.769846 139.769846 0 0 1-9.230769 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984616 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492308-0.984615-3.363692-0.163692-8 2.461539-13.907692 3.446154-7.056 6.276923-14.113231 8.492308-21.169231 2.215385-7.056 3.980308-14.974769 5.292307-23.753846 1.313231-8.779077 2.215385-18.790154 2.707693-30.030769 0.492308-11.240615 0.738462-24.492308 0.738461-39.753846v-62.523077c0-5.579077 0.411077-10.092308 1.230769-13.538462 0.820923-3.446154 2.257231-6.153846 4.307693-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938461 3.364923-0.656 7.672615-0.984615 12.923077-0.984616h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107693 3.364923 0.738462 6.072615 2.092308 8.123077 4.061538 2.051692 1.969231 3.488 4.676923 4.307692 8.123077 0.820923 3.446154 1.230769 7.959385 1.230769 13.538462v171.076923c0 4.594462-0.532923 8.820923-1.6 12.676923-1.065846 3.856-2.912 7.097846-5.538461 9.723077-2.625231 2.625231-6.030769 4.636308-10.215385 6.030769-4.184615 1.394462-9.394462 1.928615-15.630769 1.6-7.056-0.328615-13.127385-0.902154-18.215385-1.723077-5.086769-0.820923-9.271385-1.805538-12.553846-2.953846-5.250462-1.805538-8.286769-4.307692-9.107692-7.507692-0.819692-3.2-0.327385-7.015385 1.476923-11.446154 1.641846-3.938462 3.938462-6.276923 6.892307-7.015385 2.953846-0.738462 7.057231-0.451692 12.307693 0.861539 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.574769 5.457231 0.697846 7.015384 0.36923 1.559385-0.328615 2.544-1.230769 2.953847-2.707692 0.411077-1.476923 0.615385-3.528615 0.615384-6.153846v-155.076923c0-4.267077-0.450462-7.056-1.353846-8.369231-0.902154-1.313231-3.240615-1.969231-7.015385-1.969231h-57.846153c3.611077 2.132923 5.415385 5.990154 5.415384 11.569231v6.646154h37.169231c2.461538 0 4.553846 0.082462 6.276923 0.246154 1.723077 0.163692 3.118769 0.656 4.184615 1.476923 1.067077 0.820923 1.846154 2.009846 2.338462 3.569231 0.492308 1.559385 0.738462 3.815385 0.738461 6.76923 0 4.923077-0.984615 8.205538-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584615 2.461539h-37.169231v15.261538h42.830769c4.759385 0 8.288 0.944 10.584616 2.830769 2.297846 1.886769 3.446154 5.128615 3.446154 9.723077 0 3.938462-1.065846 7.015385-3.2 9.23077-2.132923 2.215385-5.661538 3.323077-10.584616 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584615-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.23077s0.984615-7.015385 2.953846-9.230769c1.969231-2.215385 5.497846-3.323077 10.584615-3.323077h42.092308v-15.261538h-35.692308z m116.184616 98.707692c0 5.744-0.327385 10.338462-0.984616 13.784615-0.656 3.446154-1.927385 6.071385-3.815384 7.876924-1.886769 1.805538-4.594462 2.994462-8.123077 3.56923-3.527385 0.574769-8.246154 0.861538-14.153846 0.861539h-77.046154c-5.579077 0-10.132923-0.286769-13.661539-0.861539-3.527385-0.574769-6.317538-1.805538-8.369231-3.692307-2.050462-1.886769-3.446154-4.513231-4.184615-7.876923-0.738462-3.363692-1.107692-7.917538-1.107692-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107692-13.046154 0.738462-3.446154 2.092308-6.153846 4.061539-8.123077 1.969231-1.969231 4.718769-3.363692 8.246153-4.184615 3.528615-0.820923 8.164923-1.230769 13.907693-1.230769h76.553846c5.907692 0 10.667077 0.409846 14.276923 1.230769 3.611077 0.820923 6.4 2.215385 8.369231 4.184615 1.969231 1.969231 3.282462 4.676923 3.938461 8.123077 0.657231 3.446154 0.984615 7.794462 0.984616 13.046154V619.076923z m-29.538462-15.261538c0-3.446154-0.369231-5.620923-1.107692-6.523077-0.738462-0.902154-2.584615-1.353846-5.538462-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046153 1.230769-0.738462 0.820923-1.107692 3.036308-1.107693 6.646154v10.338461c0 2.132923 0.328615 3.486769 0.984616 4.061539 0.657231 0.574769 2.380308 0.861538 5.16923 0.861538h59.569231c3.118769 0 5.005538-0.286769 5.661539-0.861538 0.657231-0.574769 0.984615-1.928615 0.984615-4.061539v-10.338461z m328.180923-120.615385c0 9.846154-4.923077 14.769231-14.769231 14.769231h-175.507692c-9.846154 0-14.769231-5.005538-14.769231-15.015385 0-5.086769 1.148308-8.861538 3.446154-11.323077 2.296615-2.461538 6.071385-3.692308 11.323077-3.692307h175.507692c5.250462 0 9.025231 1.353846 11.323077 4.061538 2.296615 2.707692 3.446154 6.440615 3.446154 11.2z m15.261539 170.338462c0 4.759385-1.149538 8.451692-3.446154 11.076923-2.297846 2.625231-6.072615 3.938462-11.323077 3.938461h-207.015385c-5.251692 0-8.984615-1.313231-11.2-3.938461-2.215385-2.625231-3.323077-6.317538-3.323077-11.076923 0-4.430769 1.107692-8.123077 3.323077-11.076924 2.215385-2.953846 5.948308-4.430769 11.2-4.430769h207.015385c5.250462 0 9.025231 1.476923 11.323077 4.430769 2.296615 2.953846 3.446154 6.646154 3.446154 11.076924z" p-id="8040" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="8041" fill="#515151"></path></svg>
                          </i>
                          <i style={item.openday === 3 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344340859" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8335" width="30" height="30"><path d="M333.694769 520.369231c-4.923077 0-8.450462-0.902154-10.584615-2.707693-2.132923-1.805538-3.2-5.086769-3.2-9.846153 0-4.267077 1.067077-7.302154 3.2-9.107693 2.134154-1.805538 5.661538-2.707692 10.584615-2.707692h35.692308v-6.646154c0-5.251692 1.888-9.107692 5.661538-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753846 1.476923-1.230769 0.984615-1.846154 3.117538-1.846154 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861538 42.215385-0.573538 12.390154-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661539 27.446154a139.769846 139.769846 0 0 1-9.230769 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984616 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492308-0.984615-3.363692-0.163692-8 2.461539-13.907692 3.446154-7.056 6.276923-14.113231 8.492308-21.169231 2.215385-7.056 3.980308-14.974769 5.292307-23.753846 1.313231-8.779077 2.215385-18.790154 2.707693-30.030769 0.492308-11.240615 0.738462-24.492308 0.738461-39.753846v-62.523077c0-5.579077 0.411077-10.092308 1.230769-13.538462 0.820923-3.446154 2.257231-6.153846 4.307693-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938461 3.364923-0.656 7.672615-0.984615 12.923077-0.984616h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107693 3.364923 0.738462 6.072615 2.092308 8.123077 4.061538 2.051692 1.969231 3.488 4.676923 4.307692 8.123077 0.820923 3.446154 1.230769 7.959385 1.230769 13.538462v171.076923c0 4.594462-0.532923 8.820923-1.6 12.676923-1.065846 3.856-2.912 7.097846-5.538461 9.723077-2.625231 2.625231-6.030769 4.636308-10.215385 6.030769-4.184615 1.394462-9.394462 1.928615-15.630769 1.6-7.056-0.328615-13.127385-0.902154-18.215385-1.723077-5.086769-0.820923-9.271385-1.805538-12.553846-2.953846-5.250462-1.805538-8.286769-4.307692-9.107692-7.507692-0.819692-3.2-0.327385-7.015385 1.476923-11.446154 1.641846-3.938462 3.938462-6.276923 6.892307-7.015385 2.953846-0.738462 7.057231-0.451692 12.307693 0.861539 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.574769 5.457231 0.697846 7.015384 0.36923 1.559385-0.328615 2.544-1.230769 2.953847-2.707692 0.411077-1.476923 0.615385-3.528615 0.615384-6.153846v-155.076923c0-4.267077-0.450462-7.056-1.353846-8.369231-0.902154-1.313231-3.240615-1.969231-7.015385-1.969231h-57.846153c3.611077 2.132923 5.415385 5.990154 5.415384 11.569231v6.646154h37.169231c2.461538 0 4.553846 0.082462 6.276923 0.246154 1.723077 0.163692 3.118769 0.656 4.184615 1.476923 1.067077 0.820923 1.846154 2.009846 2.338462 3.569231 0.492308 1.559385 0.738462 3.815385 0.738461 6.76923 0 4.923077-0.984615 8.205538-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584615 2.461539h-37.169231v15.261538h42.830769c4.759385 0 8.288 0.944 10.584616 2.830769 2.297846 1.886769 3.446154 5.128615 3.446154 9.723077 0 3.938462-1.065846 7.015385-3.2 9.23077-2.132923 2.215385-5.661538 3.323077-10.584616 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584615-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.23077s0.984615-7.015385 2.953846-9.230769c1.969231-2.215385 5.497846-3.323077 10.584615-3.323077h42.092308v-15.261538h-35.692308z m116.184616 98.707692c0 5.744-0.327385 10.338462-0.984616 13.784615-0.656 3.446154-1.927385 6.071385-3.815384 7.876924-1.886769 1.805538-4.594462 2.994462-8.123077 3.56923-3.527385 0.574769-8.246154 0.861538-14.153846 0.861539h-77.046154c-5.579077 0-10.132923-0.286769-13.661539-0.861539-3.527385-0.574769-6.317538-1.805538-8.369231-3.692307-2.050462-1.886769-3.446154-4.513231-4.184615-7.876923-0.738462-3.363692-1.107692-7.917538-1.107692-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107692-13.046154 0.738462-3.446154 2.092308-6.153846 4.061539-8.123077 1.969231-1.969231 4.718769-3.363692 8.246153-4.184615 3.528615-0.820923 8.164923-1.230769 13.907693-1.230769h76.553846c5.907692 0 10.667077 0.409846 14.276923 1.230769 3.611077 0.820923 6.4 2.215385 8.369231 4.184615 1.969231 1.969231 3.282462 4.676923 3.938461 8.123077 0.657231 3.446154 0.984615 7.794462 0.984616 13.046154V619.076923z m-29.538462-15.261538c0-3.446154-0.369231-5.620923-1.107692-6.523077-0.738462-0.902154-2.584615-1.353846-5.538462-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046153 1.230769-0.738462 0.820923-1.107692 3.036308-1.107693 6.646154v10.338461c0 2.132923 0.328615 3.486769 0.984616 4.061539 0.657231 0.574769 2.380308 0.861538 5.16923 0.861538h59.569231c3.118769 0 5.005538-0.286769 5.661539-0.861538 0.657231-0.574769 0.984615-1.928615 0.984615-4.061539v-10.338461zM749.998769 478.769231c0 4.759385-0.984615 8.409846-2.953846 10.953846-1.969231 2.544-5.907692 3.815385-11.815385 3.815385h-179.938461c-5.907692 0-9.846154-1.271385-11.815385-3.815385-1.969231-2.544-2.953846-6.113231-2.953846-10.707692 0-6.071385 0.984615-10.092308 2.953846-12.061539 1.969231-1.969231 5.907692-2.953846 11.815385-2.953846h179.938461c5.907692 0 9.846154 1.271385 11.815385 3.815385 1.969231 2.544 2.953846 6.194462 2.953846 10.953846z m-6.646154 84.184615c0 4.759385-0.984615 8.409846-2.953846 10.953846-1.969231 2.544-5.907692 3.815385-11.815384 3.815385h-164.184616c-5.907692 0-9.846154-1.353846-11.815384-4.061539-1.969231-2.707692-2.953846-6.276923-2.953847-10.707692 0-4.759385 0.984615-8.409846 2.953847-10.953846 1.969231-2.544 5.907692-3.815385 11.815384-3.815385h164.184616c5.907692 0 9.846154 1.271385 11.815384 3.815385 1.969231 2.544 2.953846 6.194462 2.953846 10.953846z m19.938462 91.323077c0 4.759385-0.984615 8.409846-2.953846 10.953846-1.969231 2.544-5.907692 3.815385-11.815385 3.815385h-206.523077c-5.907692 0-9.846154-1.353846-11.815384-4.061539-1.969231-2.707692-2.953846-6.276923-2.953847-10.707692 0-4.759385 0.984615-8.409846 2.953847-10.953846 1.969231-2.544 5.907692-3.815385 11.815384-3.815385h206.523077c5.907692 0 9.846154 1.271385 11.815385 3.815385 1.969231 2.544 2.953846 6.194462 2.953846 10.953846z" p-id="8336" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="8337" fill="#515151"></path></svg>
                          </i>
                          <i style={item.openday === 4 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344383299" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8581" width="30" height="30"><path d="M342.310154 520.369231c-4.923077 0-8.450462-0.902154-10.584616-2.707693-2.132923-1.805538-3.2-5.086769-3.2-9.846153 0-4.267077 1.067077-7.302154 3.2-9.107693 2.134154-1.805538 5.661538-2.707692 10.584616-2.707692h35.692308v-6.646154c0-5.251692 1.888-9.107692 5.661538-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753846 1.476923-1.230769 0.984615-1.846154 3.117538-1.846154 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861539 42.215385-0.573538 12.390154-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661538 27.446154a139.769846 139.769846 0 0 1-9.23077 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984615 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492308-0.984615-3.363692-0.163692-8 2.461539-13.907692 3.446154-7.056 6.276923-14.113231 8.492307-21.169231 2.215385-7.056 3.980308-14.974769 5.292308-23.753846 1.313231-8.779077 2.215385-18.790154 2.707692-30.030769 0.492308-11.240615 0.738462-24.492308 0.738462-39.753846v-62.523077c0-5.579077 0.411077-10.092308 1.230769-13.538462 0.820923-3.446154 2.257231-6.153846 4.307692-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938461 3.364923-0.656 7.672615-0.984615 12.923077-0.984616h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107693 3.364923 0.738462 6.072615 2.092308 8.123077 4.061538 2.051692 1.969231 3.488 4.676923 4.307693 8.123077 0.820923 3.446154 1.230769 7.959385 1.230769 13.538462v171.076923c0 4.594462-0.532923 8.820923-1.6 12.676923-1.065846 3.856-2.912 7.097846-5.538462 9.723077-2.625231 2.625231-6.030769 4.636308-10.215384 6.030769-4.184615 1.394462-9.394462 1.928615-15.63077 1.6-7.056-0.328615-13.127385-0.902154-18.215384-1.723077-5.086769-0.820923-9.271385-1.805538-12.553846-2.953846-5.250462-1.805538-8.286769-4.307692-9.107693-7.507692-0.819692-3.2-0.327385-7.015385 1.476923-11.446154 1.641846-3.938462 3.938462-6.276923 6.892308-7.015385 2.953846-0.738462 7.057231-0.451692 12.307692 0.861539 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.574769 5.457231 0.697846 7.015385 0.36923 1.559385-0.328615 2.544-1.230769 2.953846-2.707692 0.411077-1.476923 0.615385-3.528615 0.615385-6.153846v-155.076923c0-4.267077-0.450462-7.056-1.353846-8.369231-0.902154-1.313231-3.240615-1.969231-7.015385-1.969231h-57.846154c3.611077 2.132923 5.415385 5.990154 5.415385 11.569231v6.646154h37.169231c2.461538 0 4.553846 0.082462 6.276923 0.246154 1.723077 0.163692 3.118769 0.656 4.184615 1.476923 1.067077 0.820923 1.846154 2.009846 2.338462 3.569231 0.492308 1.559385 0.738462 3.815385 0.738461 6.76923 0 4.923077-0.984615 8.205538-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584615 2.461539h-37.169231v15.261538h42.830769c4.759385 0 8.288 0.944 10.584615 2.830769 2.297846 1.886769 3.446154 5.128615 3.446154 9.723077 0 3.938462-1.065846 7.015385-3.2 9.23077-2.132923 2.215385-5.661538 3.323077-10.584615 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584616-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.23077s0.984615-7.015385 2.953846-9.230769c1.969231-2.215385 5.497846-3.323077 10.584616-3.323077h42.092308v-15.261538h-35.692308z m116.184615 98.707692c0 5.744-0.327385 10.338462-0.984615 13.784615-0.656 3.446154-1.927385 6.071385-3.815385 7.876924-1.886769 1.805538-4.594462 2.994462-8.123077 3.56923-3.527385 0.574769-8.246154 0.861538-14.153846 0.861539h-77.046154c-5.579077 0-10.132923-0.286769-13.661538-0.861539-3.527385-0.574769-6.317538-1.805538-8.369231-3.692307-2.050462-1.886769-3.446154-4.513231-4.184615-7.876923-0.738462-3.363692-1.107692-7.917538-1.107693-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107693-13.046154 0.738462-3.446154 2.092308-6.153846 4.061538-8.123077 1.969231-1.969231 4.718769-3.363692 8.246154-4.184615 3.528615-0.820923 8.164923-1.230769 13.907692-1.230769h76.553846c5.907692 0 10.667077 0.409846 14.276924 1.230769 3.611077 0.820923 6.4 2.215385 8.36923 4.184615 1.969231 1.969231 3.282462 4.676923 3.938462 8.123077 0.657231 3.446154 0.984615 7.794462 0.984615 13.046154V619.076923z m-29.538461-15.261538c0-3.446154-0.369231-5.620923-1.107693-6.523077-0.738462-0.902154-2.584615-1.353846-5.538461-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046154 1.230769-0.738462 0.820923-1.107692 3.036308-1.107692 6.646154v10.338461c0 2.132923 0.328615 3.486769 0.984615 4.061539 0.657231 0.574769 2.380308 0.861538 5.169231 0.861538h59.569231c3.118769 0 5.005538-0.286769 5.661538-0.861538 0.657231-0.574769 0.984615-1.928615 0.984616-4.061539v-10.338461z m325.719384 38.892307c0 9.353846-1.805538 16.082462-5.415384 20.184616-3.611077 4.102154-10.174769 6.153846-19.692308 6.153846h-149.169231c-9.682462 0-16.369231-1.969231-20.061538-5.907692-3.692308-3.938462-5.538462-10.748308-5.538462-20.43077V482.215385c0-9.353846 1.927385-16.040615 5.784616-20.061539 3.856-4.020923 10.461538-6.030769 19.815384-6.030769h149.169231c9.517538 0 16.081231 2.009846 19.692308 6.030769 3.609846 4.020923 5.415385 10.707692 5.415384 20.061539v160.492307z m-29.538461-30.523077h-21.169231c-7.384615 0-13.620923-0.861538-18.707692-2.584615-5.088-1.723077-9.149538-4.513231-12.184616-8.369231-3.036308-3.856-5.211077-8.861538-6.523077-15.015384-1.313231-6.153846-1.969231-13.661538-1.96923-22.523077v-79.261539h-23.876923v59.076923c0 17.723077-3.159385 32-9.476924 42.83077-6.318769 10.830769-16.451692 18.790154-30.4 23.876923-7.057231 2.625231-12.553846 2.625231-16.492307 0v19.692307c0 4.759385 0.615385 7.753846 1.846154 8.984616s4.061538 1.846154 8.492307 1.846154h119.63077c4.430769 0 7.342769-0.574769 8.738461-1.723077 1.394462-1.148308 2.092308-3.938462 2.092308-8.369231v-18.461539z m-31.753846-127.753846v78.769231c0 8.205538 0.942769 13.702154 2.830769 16.492308 1.886769 2.790154 5.373538 4.184615 10.461538 4.184615h18.461539v-89.846154c0-3.774769-0.820923-6.317538-2.461539-7.630769-1.641846-1.313231-4.430769-1.969231-8.36923-1.969231h-20.923077z m-109.046154 101.661539c1.640615-1.476923 4.512-2.953846 8.615384-4.43077 7.384615-2.790154 12.430769-7.302154 15.138462-13.538461 2.707692-6.236308 4.061538-14.523077 4.061538-24.861539v-58.830769h-17.476923c-4.103385 0-6.851692 0.656-8.246154 1.969231-1.395692 1.313231-2.092308 3.609846-2.092307 6.892308v92.8z" p-id="8582" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="8583" fill="#515151"></path></svg>
                          </i>
                          <i style={item.openday === 5 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344410847" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8816" width="30" height="30"><path d="M332.464 520.369231c-4.923077 0-8.450462-0.902154-10.584615-2.707693-2.132923-1.805538-3.2-5.086769-3.2-9.846153 0-4.267077 1.067077-7.302154 3.2-9.107693 2.134154-1.805538 5.661538-2.707692 10.584615-2.707692h35.692308v-6.646154c0-5.251692 1.888-9.107692 5.661538-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753846 1.476923-1.230769 0.984615-1.846154 3.117538-1.846154 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861539 42.215385-0.573538 12.390154-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661538 27.446154a139.769846 139.769846 0 0 1-9.230769 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984616 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492308-0.984615-3.363692-0.163692-8 2.461539-13.907692 3.446154-7.056 6.276923-14.113231 8.492307-21.169231 2.215385-7.056 3.980308-14.974769 5.292308-23.753846 1.313231-8.779077 2.215385-18.790154 2.707692-30.030769 0.492308-11.240615 0.738462-24.492308 0.738462-39.753846v-62.523077c0-5.579077 0.411077-10.092308 1.230769-13.538462 0.820923-3.446154 2.257231-6.153846 4.307692-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938461 3.364923-0.656 7.672615-0.984615 12.923077-0.984616h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107693 3.364923 0.738462 6.072615 2.092308 8.123077 4.061538 2.051692 1.969231 3.488 4.676923 4.307693 8.123077 0.820923 3.446154 1.230769 7.959385 1.230769 13.538462v171.076923c0 4.594462-0.532923 8.820923-1.6 12.676923-1.065846 3.856-2.912 7.097846-5.538462 9.723077-2.625231 2.625231-6.030769 4.636308-10.215384 6.030769-4.184615 1.394462-9.394462 1.928615-15.630769 1.6-7.056-0.328615-13.127385-0.902154-18.215385-1.723077-5.086769-0.820923-9.271385-1.805538-12.553846-2.953846-5.250462-1.805538-8.286769-4.307692-9.107693-7.507692-0.819692-3.2-0.327385-7.015385 1.476924-11.446154 1.641846-3.938462 3.938462-6.276923 6.892307-7.015385 2.953846-0.738462 7.057231-0.451692 12.307693 0.861539 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.574769 5.457231 0.697846 7.015384 0.36923 1.559385-0.328615 2.544-1.230769 2.953846-2.707692 0.411077-1.476923 0.615385-3.528615 0.615385-6.153846v-155.076923c0-4.267077-0.450462-7.056-1.353846-8.369231-0.902154-1.313231-3.240615-1.969231-7.015385-1.969231h-57.846154c3.611077 2.132923 5.415385 5.990154 5.415385 11.569231v6.646154h37.169231c2.461538 0 4.553846 0.082462 6.276923 0.246154 1.723077 0.163692 3.118769 0.656 4.184615 1.476923 1.067077 0.820923 1.846154 2.009846 2.338462 3.569231 0.492308 1.559385 0.738462 3.815385 0.738461 6.76923 0 4.923077-0.984615 8.205538-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584615 2.461539h-37.169231v15.261538h42.830769c4.759385 0 8.288 0.944 10.584616 2.830769 2.297846 1.886769 3.446154 5.128615 3.446153 9.723077 0 3.938462-1.065846 7.015385-3.2 9.23077-2.132923 2.215385-5.661538 3.323077-10.584615 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584616-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.23077s0.984615-7.015385 2.953847-9.230769c1.969231-2.215385 5.497846-3.323077 10.584615-3.323077h42.092308v-15.261538h-35.692308z m116.184615 98.707692c0 5.744-0.327385 10.338462-0.984615 13.784615-0.656 3.446154-1.927385 6.071385-3.815385 7.876924-1.886769 1.805538-4.594462 2.994462-8.123077 3.56923-3.527385 0.574769-8.246154 0.861538-14.153846 0.861539h-77.046154c-5.579077 0-10.132923-0.286769-13.661538-0.861539-3.527385-0.574769-6.317538-1.805538-8.369231-3.692307-2.050462-1.886769-3.446154-4.513231-4.184615-7.876923-0.738462-3.363692-1.107692-7.917538-1.107692-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107692-13.046154 0.738462-3.446154 2.092308-6.153846 4.061538-8.123077 1.969231-1.969231 4.718769-3.363692 8.246154-4.184615 3.528615-0.820923 8.164923-1.230769 13.907692-1.230769h76.553847c5.907692 0 10.667077 0.409846 14.276923 1.230769 3.611077 0.820923 6.4 2.215385 8.36923 4.184615 1.969231 1.969231 3.282462 4.676923 3.938462 8.123077 0.657231 3.446154 0.984615 7.794462 0.984615 13.046154V619.076923z m-29.538461-15.261538c0-3.446154-0.369231-5.620923-1.107692-6.523077-0.738462-0.902154-2.584615-1.353846-5.538462-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046154 1.230769-0.738462 0.820923-1.107692 3.036308-1.107692 6.646154v10.338461c0 2.132923 0.328615 3.486769 0.984615 4.061539 0.657231 0.574769 2.380308 0.861538 5.169231 0.861538h59.569231c3.118769 0 5.005538-0.286769 5.661538-0.861538 0.657231-0.574769 0.984615-1.928615 0.984616-4.061539v-10.338461z m130.027077-115.692308c-5.744 0-9.476923-0.984615-11.2-2.953846-1.723077-1.969231-2.584615-5.744-2.584616-11.323077 0-4.923077 0.861538-8.574769 2.584616-10.953846 1.723077-2.379077 5.456-3.569231 11.2-3.569231h189.538461c5.250462 0 8.861538 1.190154 10.83077 3.569231 1.969231 2.379077 2.953846 6.030769 2.953846 10.953846 0 5.579077-0.984615 9.353846-2.953846 11.323077-1.969231 1.969231-5.580308 2.953846-10.83077 2.953846h-90.830769l-6.646154 42.338461h56.369231c5.907692 0 10.871385 0.492308 14.892308 1.476924 4.019692 0.984615 7.219692 2.667077 9.6 5.046153 2.379077 2.379077 4.061538 5.620923 5.046154 9.723077 0.984615 4.102154 1.476923 9.190154 1.476923 15.261539V640h21.661538c5.250462 0 8.861538 1.230769 10.830769 3.692308 1.969231 2.461538 2.953846 6.236308 2.953846 11.323077 0 5.907692-0.984615 9.763692-2.953846 11.56923-1.969231 1.805538-5.580308 2.707692-10.830769 2.707693h-211.938461c-5.251692 0-8.861538-0.902154-10.83077-2.707693-1.969231-1.805538-2.953846-5.661538-2.953846-11.56923 0-5.086769 0.984615-8.861538 2.953846-11.323077 1.969231-2.461538 5.579077-3.692308 10.83077-3.692308h55.384615l12.553846-79.753846h-48.738461c-5.251692 0-8.861538-1.271385-10.83077-3.815385-1.969231-2.544-2.953846-6.113231-2.953846-10.707692 0-4.267077 0.984615-7.876923 2.953846-10.830769 1.969231-2.953846 5.579077-4.430769 10.83077-4.43077h53.415384l6.646154-42.338461h-68.430769z m87.384615 72.123077l-12.553846 79.753846h74.338462v-73.846154c0-2.790154-0.328615-4.471385-0.984616-5.046154-0.657231-0.574769-2.380308-0.861538-5.169231-0.861538h-55.630769z" p-id="8817" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="8818" fill="#515151"></path></svg>
                          </i>
                          <i style={item.openday === 6 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344446025" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9047" width="30" height="30"><path d="M336.156308 527.609846c-4.923077 0-8.450462-0.903385-10.584616-2.707692-2.132923-1.805538-3.2-5.088-3.2-9.846154 0-4.267077 1.067077-7.303385 3.2-9.107692 2.134154-1.805538 5.661538-2.707692 10.584616-2.707693h35.692307v-6.646153c0-5.251692 1.888-9.107692 5.661539-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753847 1.476923-1.230769 0.984615-1.846154 3.117538-1.846153 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861539 42.215384-0.573538 12.388923-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661538 27.446154a139.769846 139.769846 0 0 1-9.23077 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984615 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492307-0.984615-3.364923-0.163692-8 2.461538-13.907693 3.446154-7.057231 6.276923-14.113231 8.492308-21.16923 2.215385-7.057231 3.980308-14.974769 5.292308-23.753846 1.313231-8.780308 2.215385-18.790154 2.707692-30.03077 0.492308-11.241846 0.738462-24.492308 0.738462-39.753846v-62.523077c0-5.580308 0.411077-10.092308 1.230769-13.538461 0.820923-3.446154 2.257231-6.153846 4.307692-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938462 3.364923-0.657231 7.672615-0.984615 12.923077-0.984615h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107692 3.364923 0.738462 6.072615 2.092308 8.123077 4.061539 2.051692 1.969231 3.488 4.676923 4.307692 8.123077 0.820923 3.446154 1.230769 7.958154 1.23077 13.538461v171.076923c0 4.594462-0.532923 8.819692-1.6 12.676923-1.065846 3.856-2.912 7.096615-5.538462 9.723077-2.625231 2.625231-6.030769 4.635077-10.215385 6.030769-4.184615 1.394462-9.394462 1.927385-15.630769 1.6-7.056-0.328615-13.127385-0.903385-18.215384-1.723077-5.086769-0.820923-9.271385-1.805538-12.553847-2.953846-5.250462-1.805538-8.286769-4.307692-9.107692-7.507692-0.819692-3.2-0.327385-7.015385 1.476923-11.446154 1.641846-3.938462 3.938462-6.276923 6.892308-7.015384 2.953846-0.738462 7.057231-0.451692 12.307692 0.861538 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.573538 5.457231 0.696615 7.015385 0.369231 1.559385-0.328615 2.544-1.230769 2.953846-2.707692 0.411077-1.476923 0.615385-3.528615 0.615385-6.153847v-155.076923c0-4.267077-0.450462-7.057231-1.353847-8.36923-0.902154-1.313231-3.240615-1.969231-7.015384-1.969231h-57.846154c3.611077 2.132923 5.415385 5.988923 5.415385 11.569231v6.646153h37.16923c2.461538 0 4.553846 0.081231 6.276923 0.246154 1.723077 0.163692 3.118769 0.656 4.184616 1.476923 1.067077 0.819692 1.846154 2.009846 2.338461 3.569231 0.492308 1.558154 0.738462 3.815385 0.738462 6.769231 0 4.923077-0.984615 8.204308-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584616 2.461538h-37.16923v15.261539h42.830769c4.759385 0 8.288 0.942769 10.584615 2.830769 2.297846 1.886769 3.446154 5.127385 3.446154 9.723077 0 3.938462-1.065846 7.015385-3.2 9.230769-2.132923 2.215385-5.661538 3.323077-10.584615 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584616-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.230769s0.984615-7.015385 2.953846-9.230769c1.969231-2.215385 5.497846-3.323077 10.584616-3.323077h42.092307v-15.261539h-35.692307z m116.184615 98.707692c0 5.742769-0.327385 10.338462-0.984615 13.784616-0.656 3.446154-1.927385 6.071385-3.815385 7.876923-1.886769 1.804308-4.594462 2.994462-8.123077 3.569231-3.527385 0.573538-8.246154 0.861538-14.153846 0.861538h-77.046154c-5.579077 0-10.132923-0.288-13.661538-0.861538-3.527385-0.574769-6.317538-1.805538-8.369231-3.692308-2.050462-1.888-3.446154-4.513231-4.184615-7.876923-0.738462-3.364923-1.107692-7.918769-1.107693-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107693-13.046153 0.738462-3.446154 2.092308-6.153846 4.061538-8.123077 1.969231-1.969231 4.718769-3.364923 8.246154-4.184616 3.528615-0.820923 8.164923-1.230769 13.907692-1.230769h76.553846c5.907692 0 10.667077 0.409846 14.276923 1.230769 3.611077 0.819692 6.4 2.215385 8.369231 4.184616 1.969231 1.969231 3.282462 4.676923 3.938462 8.123077 0.657231 3.446154 0.984615 7.794462 0.984615 13.046153v22.4z m-29.538461-15.261538c0-3.446154-0.369231-5.620923-1.107693-6.523077-0.738462-0.903385-2.584615-1.353846-5.538461-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046154 1.230769-0.738462 0.819692-1.107692 3.035077-1.107692 6.646154v10.338462c0 2.132923 0.328615 3.486769 0.984615 4.061538 0.657231 0.573538 2.380308 0.861538 5.169231 0.861538h59.569231c3.118769 0 5.005538-0.288 5.661538-0.861538 0.657231-0.574769 0.984615-1.928615 0.984616-4.061538v-10.338462z m336.796307-85.907692c0 3.773538-1.190154 7.138462-3.569231 10.092307-2.380308 2.953846-6.030769 4.430769-10.953846 4.43077h-195.446154c-5.251692 0-8.944-1.476923-11.076923-4.43077-2.134154-2.953846-3.2-6.318769-3.2-10.092307 0-4.267077 1.065846-7.713231 3.2-10.338462 2.132923-2.626462 5.825231-3.938462 11.076923-3.938461h96.984616c-2.790154-1.313231-5.580308-5.088-8.369231-11.323077a99.585231 99.585231 0 0 0-6.153846-12.184616c-2.297846-3.857231-5.088-8.246154-8.369231-13.16923-2.790154-4.267077-3.446154-8.574769-1.969231-12.923077 1.476923-4.349538 4.430769-7.590154 8.861539-9.723077 3.938462-1.313231 7.465846-1.436308 10.584615-0.369231 3.117538 1.065846 6.563692 4.307692 10.338462 9.723077 2.296615 3.446154 4.635077 7.384615 7.015384 11.815384 2.379077 4.430769 4.553846 8.861538 6.523077 13.292308 3.281231 7.876923 4.142769 13.619692 2.584616 17.230769-1.559385 3.609846-4.882462 6.153846-9.969231 7.63077h87.384615c4.923077 0 8.573538 1.312 10.953846 3.938461 2.379077 2.625231 3.569231 6.071385 3.569231 10.338462z m-6.646154 131.446154c2.296615 4.265846 3.281231 8.246154 2.953847 11.938461-0.328615 3.692308-2.872615 7.015385-7.63077 9.969231-3.774769 2.296615-7.630769 2.871385-11.56923 1.723077-3.938462-1.149538-7.138462-4.349538-9.6-9.6a3966.119385 3966.119385 0 0 0-13.661539-27.076923 1148.551385 1148.551385 0 0 0-13.046154-24.861539 1054.013538 1054.013538 0 0 0-13.169231-23.630769c-4.430769-7.713231-9.107692-15.507692-14.030769-23.384615-1.969231-3.282462-3.036308-6.646154-3.2-10.092308-0.164923-3.446154 1.558154-6.974769 5.169231-10.584615 3.609846-2.790154 7.630769-3.897846 12.061538-3.323077 4.430769 0.573538 8.040615 3.240615 10.83077 8 4.758154 8.040615 9.353846 16 13.784615 23.876923 4.430769 7.876923 8.861538 15.917538 13.292308 24.123077 4.430769 8.204308 8.942769 16.656 13.538461 25.353846a1990.289231 1990.289231 0 0 1 14.276923 27.569231z m-132.676923-83.938462c-4.103385 10.665846-8.082462 20.430769-11.938461 29.292308-3.857231 8.861538-7.836308 17.230769-11.938462 25.107692-4.103385 7.876923-8.492308 15.342769-13.169231 22.4-4.676923 7.056-9.805538 14.112-15.384615 21.169231-4.759385 5.907692-9.313231 9.188923-13.661538 9.846154-4.349538 0.656-8.082462-0.492308-11.2-3.446154-3.282462-3.118769-4.841846-6.688-4.676923-10.707693 0.163692-4.020923 2.379077-8.657231 6.646153-13.907692 4.923077-5.907692 9.517538-12.061538 13.784616-18.461538 4.265846-6.4 8.369231-13.211077 12.307692-20.43077 3.938462-7.220923 7.671385-14.974769 11.2-23.261538 3.527385-8.288 7.015385-17.353846 10.461539-27.2 1.969231-5.415385 4.553846-9.353846 7.753846-11.815385 3.2-2.461538 6.932923-3.118769 11.2-1.96923 5.086769 1.148308 8.409846 3.773538 9.96923 7.876923 1.558154 4.102154 1.107692 9.271385-1.353846 15.507692z" p-id="9048" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="9049" fill="#515151"></path></svg>
                          </i>
                          <i style={item.openday === 0 ? { display: 'block', paddingTop: '0.3rem' } : { display: 'none' }}>
                            <svg t="1577344480198" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9360" width="30" height="30"><path d="M347.233231 520.369231c-4.923077 0-8.450462-0.902154-10.584616-2.707693-2.132923-1.805538-3.2-5.086769-3.2-9.846153 0-4.267077 1.067077-7.302154 3.2-9.107693 2.134154-1.805538 5.661538-2.707692 10.584616-2.707692h35.692307v-6.646154c0-5.251692 1.888-9.107692 5.661539-11.569231h-55.630769c-3.938462 0-6.523077 0.492308-7.753846 1.476923-1.230769 0.984615-1.846154 3.117538-1.846154 6.4v52.923077c0 15.753846-0.286769 29.825231-0.861539 42.215385-0.573538 12.390154-1.558154 23.630769-2.953846 33.723077-1.394462 10.092308-3.281231 19.240615-5.661538 27.446154a139.769846 139.769846 0 0 1-9.23077 23.630769c-2.625231 5.907692-5.619692 9.723077-8.984615 11.446154-3.363692 1.723077-7.425231 1.6-12.184615-0.369231-4.758154-2.297846-7.630769-5.128615-8.615385-8.492308-0.984615-3.363692-0.163692-8 2.461538-13.907692 3.446154-7.056 6.276923-14.113231 8.492308-21.169231 2.215385-7.056 3.980308-14.974769 5.292308-23.753846 1.313231-8.779077 2.215385-18.790154 2.707692-30.030769 0.492308-11.240615 0.738462-24.492308 0.738462-39.753846v-62.523077c0-5.579077 0.411077-10.092308 1.230769-13.538462 0.820923-3.446154 2.257231-6.153846 4.307692-8.123077 2.051692-1.969231 4.759385-3.282462 8.123077-3.938461 3.364923-0.656 7.672615-0.984615 12.923077-0.984616h155.076923c5.088 0 9.313231 0.369231 12.676923 1.107693 3.364923 0.738462 6.072615 2.092308 8.123077 4.061538 2.051692 1.969231 3.488 4.676923 4.307692 8.123077 0.820923 3.446154 1.230769 7.959385 1.23077 13.538462v171.076923c0 4.594462-0.532923 8.820923-1.6 12.676923-1.065846 3.856-2.912 7.097846-5.538462 9.723077-2.625231 2.625231-6.030769 4.636308-10.215384 6.030769-4.184615 1.394462-9.394462 1.928615-15.63077 1.6-7.056-0.328615-13.127385-0.902154-18.215384-1.723077-5.086769-0.820923-9.271385-1.805538-12.553846-2.953846-5.250462-1.805538-8.286769-4.307692-9.107693-7.507692-0.819692-3.2-0.327385-7.015385 1.476923-11.446154 1.641846-3.938462 3.938462-6.276923 6.892308-7.015385 2.953846-0.738462 7.057231-0.451692 12.307692 0.861539 5.415385 1.476923 9.682462 2.502154 12.8 3.076923 3.118769 0.574769 5.457231 0.697846 7.015385 0.36923 1.559385-0.328615 2.544-1.230769 2.953846-2.707692 0.411077-1.476923 0.615385-3.528615 0.615385-6.153846v-155.076923c0-4.267077-0.450462-7.056-1.353846-8.369231-0.902154-1.313231-3.240615-1.969231-7.015385-1.969231h-57.846154c3.611077 2.132923 5.415385 5.990154 5.415385 11.569231v6.646154h37.16923c2.461538 0 4.553846 0.082462 6.276924 0.246154 1.723077 0.163692 3.118769 0.656 4.184615 1.476923 1.067077 0.820923 1.846154 2.009846 2.338461 3.569231 0.492308 1.559385 0.738462 3.815385 0.738462 6.76923 0 4.923077-0.984615 8.205538-2.953846 9.846154-1.969231 1.640615-5.496615 2.461538-10.584616 2.461539h-37.16923v15.261538h42.830769c4.759385 0 8.288 0.944 10.584615 2.830769 2.297846 1.886769 3.446154 5.128615 3.446154 9.723077 0 3.938462-1.065846 7.015385-3.2 9.23077-2.132923 2.215385-5.661538 3.323077-10.584615 3.323077h-114.953846c-4.923077 0-8.450462-1.107692-10.584616-3.323077-2.132923-2.215385-3.2-5.292308-3.2-9.23077s0.984615-7.015385 2.953846-9.230769c1.969231-2.215385 5.497846-3.323077 10.584616-3.323077h42.092307v-15.261538h-35.692307z m116.184615 98.707692c0 5.744-0.327385 10.338462-0.984615 13.784615-0.656 3.446154-1.927385 6.071385-3.815385 7.876924-1.886769 1.805538-4.594462 2.994462-8.123077 3.56923-3.527385 0.574769-8.246154 0.861538-14.153846 0.861539h-77.046154c-5.579077 0-10.132923-0.286769-13.661538-0.861539-3.527385-0.574769-6.317538-1.805538-8.369231-3.692307-2.050462-1.886769-3.446154-4.513231-4.184615-7.876923-0.738462-3.363692-1.107692-7.917538-1.107693-13.661539v-22.4c0-5.251692 0.369231-9.6 1.107693-13.046154 0.738462-3.446154 2.092308-6.153846 4.061538-8.123077 1.969231-1.969231 4.718769-3.363692 8.246154-4.184615 3.528615-0.820923 8.164923-1.230769 13.907692-1.230769h76.553846c5.907692 0 10.667077 0.409846 14.276923 1.230769 3.611077 0.820923 6.4 2.215385 8.369231 4.184615 1.969231 1.969231 3.282462 4.676923 3.938462 8.123077 0.657231 3.446154 0.984615 7.794462 0.984615 13.046154V619.076923z m-29.538461-15.261538c0-3.446154-0.369231-5.620923-1.107693-6.523077-0.738462-0.902154-2.584615-1.353846-5.538461-1.353846h-59.569231c-2.625231 0-4.307692 0.409846-5.046154 1.230769-0.738462 0.820923-1.107692 3.036308-1.107692 6.646154v10.338461c0 2.132923 0.328615 3.486769 0.984615 4.061539 0.657231 0.574769 2.380308 0.861538 5.169231 0.861538h59.569231c3.118769 0 5.005538-0.286769 5.661538-0.861538 0.657231-0.574769 0.984615-1.928615 0.984616-4.061539v-10.338461zM748.521846 642.461538c0 8.861538-2.790154 15.794462-8.369231 20.8-5.580308 5.005538-12.636308 7.507692-21.16923 7.507693h-121.353847c-8.534154 0-15.549538-2.502154-21.046153-7.507693-5.497846-5.005538-8.246154-11.938462-8.246154-20.8V487.384615c0-8.861538 2.748308-15.753846 8.246154-20.676923 5.496615-4.923077 12.512-7.384615 21.046153-7.384615h121.353847c10.009846 0 17.435077 2.461538 22.276923 7.384615 4.840615 4.923077 7.261538 11.815385 7.261538 20.676923v155.076923z m-29.538461-144.246153c0-3.609846-0.451692-5.948308-1.353847-7.015385-0.903385-1.067077-2.749538-1.6-5.538461-1.6h-108.061539c-3.282462 0-5.169231 0.656-5.661538 1.969231-0.492308 1.313231-0.738462 2.871385-0.738462 4.676923V546.461538h121.353847v-48.246153z m0 78.523077h-121.353847v54.892307c0 3.774769 0.286769 6.194462 0.861539 7.261539 0.573538 1.067077 2.502154 1.6 5.784615 1.6h107.815385c3.773538 0 5.865846-1.067077 6.276923-3.2 0.409846-2.132923 0.615385-4.513231 0.615385-7.138462v-53.415384z" p-id="9361" fill="#515151"></path><path d="M905.846154 78.769231h-78.769231V0h-78.769231v78.769231H275.692308V0h-78.769231v78.769231H118.153846C74.704 78.897231 39.512615 114.088615 39.384615 157.538462v787.692307c0.128 43.449846 35.319385 78.641231 78.769231 78.769231h787.692308c43.449846-0.128 78.641231-35.319385 78.769231-78.769231V157.538462c-0.128-43.449846-35.319385-78.641231-78.769231-78.769231z m0 866.461538H118.153846V236.307692h787.692308v708.923077z" p-id="9362" fill="#515151"></path></svg>
                          </i>
                        </div>
                      }
                    />
                    <Card.Body style={{ fontSize: '12px' }}>
                      <div style={{ width: '100%', height: '30px' }}><span style={{ display: 'block', width: '105px', float: 'left' }}>价格:￥{item.costperhour}</span><span style={{ marginLeft: '5%' }}>场地数量:{item.maxtablecount}</span>
                        {/* <img onClick={this.editor} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" /> */}
                        <i onClick={this.editor} data-uuid={item.uid} style={{ float: 'right', marginTop: '-18px' }}>
                          <svg t="1577774933696" className="icon" viewBox="0 0 1704 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3147" width="40" height="40"><path d="M851.565737 43.919581c259.400024 0 467.76849 208.368466 467.76849 467.76849 0 259.400024-208.368466 467.76849-467.76849 467.76849-259.524796 0-467.76849-208.368466-467.768491-467.76849 0-125.769709 51.15633-243.678811 137.623005-330.270257C607.762154 91.083222 725.796028 43.919581 851.565737 43.919581z m0-43.295723c-283.106616 0-511.064213 227.957597-511.064214 511.064213 0 283.106616 227.957597 511.064213 511.064214 511.064214 283.106616 0 511.064213-227.957597 511.064213-511.064214 0-282.981845-228.082369-511.064213-511.064213-511.064213zM949.885707 299.451688l106.180578 106.180577-283.106616 279.113927-106.180578-106.180577L949.885707 299.451688m129.637627 82.473985L973.342756 275.745096l51.15633-51.15633c15.721214-19.713903 43.295723-19.713903 62.884855-3.992689l43.295723 43.295723c19.713903 15.721214 19.713903 47.163641 3.992689 62.884854 0 0 0 3.867918-3.992689 3.867918-15.721214 19.838674-31.442427 31.69197-51.15633 51.281101 3.992689 0 3.992689 0 0 0zM568.45912 775.080785L631.343975 606.015353l102.187888 102.187888-165.072743 66.877544z m0 0" fill="#D85D27" p-id="3148"></path><path d="M756.115511 757.363227h374.31461v28.697453H756.115511z" fill="#D85D27" p-id="3149"></path></svg>
                        </i>



                      </div>
                      <div style={{ width: '100%', height: '30px' }}><span style={{ display: 'block', width: '105px', float: 'left' }}>最长可预订:{item.date}</span><span style={{ marginLeft: '5%' }}>最短预定:{item.appointmenttime / 60 + '小时'}</span>
                        <Popconfirm
                          title="你确定要删除吗?"
                          onConfirm={this.siteDelet}
                          onCancel={this.siteCancel}
                          okText="确定"
                          cancelText="取消"
                        >

                          {/* <img className="upLoad" style={{ float: 'right' }} onClick={this.mood} data-uuid={item.uid} src={require("../../assets/delet.png")} alt="删除" /> */}
                          <i style={{ float: 'right', marginTop: '-5px', marginRight: '7px' }} onClick={this.mood} data-uuid={item.uid}>
                            <svg t="1577775737475" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19805" width="24" height="24"><path d="M512.000213 1023.998293a508.712759 508.712759 0 0 1-362.067975-149.930104A508.627426 508.627426 0 0 1 0.002133 512.000213a508.670092 508.670092 0 0 1 149.972771-362.025309A508.712759 508.712759 0 0 1 512.000213 0.002133a508.627426 508.627426 0 0 1 362.02531 149.930105A508.670092 508.670092 0 0 1 1023.998293 512.000213a508.670092 508.670092 0 0 1-149.97277 362.025309A508.627426 508.627426 0 0 1 512.000213 1023.998293z m0-981.329653A469.886238 469.886238 0 0 0 42.66864 512.000213a469.886238 469.886238 0 0 0 469.331573 469.331574 469.843571 469.843571 0 0 0 469.331574-469.331574A469.843571 469.843571 0 0 0 512.000213 42.66864z" fill="#D85D27" p-id="19806"></path><path d="M748.073995 314.838286h-90.922326v-32.554545A25.599904 25.599904 0 0 0 630.997101 256.001173H391.808664a25.599904 25.599904 0 0 0-26.154568 26.282568v31.27455H274.689103A21.333253 21.333253 0 0 0 256.001173 333.568882a19.199928 19.199928 0 0 0 18.68793 18.773263h474.622221a19.199928 19.199928 0 0 0 18.687929-18.773263 21.333253 21.333253 0 0 0-19.925258-18.773262zM675.839599 392.448662H346.923499a14.421279 14.421279 0 0 0-12.45862 4.991981 16.12794 16.12794 0 0 0-4.991981 12.501286v302.932198a55.466459 55.466459 0 0 0 54.826461 55.08246h255.231043a55.466459 55.466459 0 0 0 54.826461-55.08246v-302.932198a18.133265 18.133265 0 0 0-18.68793-17.535934z m-211.796539 291.710906a18.68793 18.68793 0 1 1-37.37586 0v-197.801925a18.68793 18.68793 0 1 1 37.37586 0z m132.052838 0a18.68793 18.68793 0 1 1-37.37586 0v-197.801925a18.68793 18.68793 0 1 1 37.37586 0z" fill="#D85D27" p-id="19807"></path></svg>
                          </i>


                        </Popconfirm>
                      </div>
                    </Card.Body>
                    <Card.Footer />
                  </Card>
                ))
              }
              <Spin spinning={this.state.spin} style={{ width: '100%', marginTop: '45%' }} />
              <Pagination className="fenye" defaultCurrent={1} style={this.state.getVenueFieldList.length < 1 ? { display: 'none' } : {}} size="small" onChange={this.current} total={this.state.total} />
              <Result className={this.state.spin === false && this.state.getVenueFieldList.length === 0 ? '' : 'nono'} icon={<Icon type="gift" theme="twoTone" twoToneColor="#F5A623" style={{ fontSize: '2rem' }} />} title="没有场地设置" />

            </div>

          </PullToRefresh>

          <img className="addList" onClick={this.addList} src={require("../../assets/comeOn@2x.png")} alt="添加" />
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






        <div className={this.state.clickNum === 2 ? 'preferential' : 'none'} >
          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}

            refreshing={this.state.refreshingTwo}
            onRefresh={this.refReshTwo}
          >

            <div className='preferential' style={this.state.getVenueDiscountList.length < 1 ? { display: 'none' } : {}}>
              {
                this.state.getVenueDiscountList.map((item, i) => (

                  <Card key={i}>
                    <Card.Header
                      title={<div style={{ fontSize: '14px', padding: '8px 0' }}><span style={{ display: 'block', width: '50px', float: 'left' }}>{item.sportname}</span><span style={{ paddingLeft: '4rem' }}>{item.starttime + '-' + item.endtime}</span></div>}
                      extra={<div style={{ fontSize: '12px' }}><span style={{ fontSize: '16px', color: '#000' }}>{item.costperhour}</span>/时</div>}
                    />
                    <Card.Body>
                      <div style={{ fontSize: '12px' }}>
                        <div style={{ height: '30px' }}><span>场地数量:{item.maxtablecount}</span><span style={{ paddingLeft: '1rem' }}>最短提前预定:{item.appointmenttime + '分钟'}</span>
                          {/* <img style={{ float: 'right', marginTop: '-5px' }} onClick={this.editorTwo} data-uuid={item.uid} src={require("../../assets/upLoad.png")} alt="修改" /> */}
                          <i style={{ float: 'right', marginTop: '-15px' }} onClick={this.editorTwo} data-uuid={item.uid}>
                            <svg t="1577774933696" className="icon" viewBox="0 0 1704 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3147" width="40" height="40"><path d="M851.565737 43.919581c259.400024 0 467.76849 208.368466 467.76849 467.76849 0 259.400024-208.368466 467.76849-467.76849 467.76849-259.524796 0-467.76849-208.368466-467.768491-467.76849 0-125.769709 51.15633-243.678811 137.623005-330.270257C607.762154 91.083222 725.796028 43.919581 851.565737 43.919581z m0-43.295723c-283.106616 0-511.064213 227.957597-511.064214 511.064213 0 283.106616 227.957597 511.064213 511.064214 511.064214 283.106616 0 511.064213-227.957597 511.064213-511.064214 0-282.981845-228.082369-511.064213-511.064213-511.064213zM949.885707 299.451688l106.180578 106.180577-283.106616 279.113927-106.180578-106.180577L949.885707 299.451688m129.637627 82.473985L973.342756 275.745096l51.15633-51.15633c15.721214-19.713903 43.295723-19.713903 62.884855-3.992689l43.295723 43.295723c19.713903 15.721214 19.713903 47.163641 3.992689 62.884854 0 0 0 3.867918-3.992689 3.867918-15.721214 19.838674-31.442427 31.69197-51.15633 51.281101 3.992689 0 3.992689 0 0 0zM568.45912 775.080785L631.343975 606.015353l102.187888 102.187888-165.072743 66.877544z m0 0" fill="#D85D27" p-id="3148"></path><path d="M756.115511 757.363227h374.31461v28.697453H756.115511z" fill="#D85D27" p-id="3149"></path></svg>
                          </i>


                        </div>
                        <div style={{ height: '30px' }}><span>有效期:{item.fromdate} 至 {item.enddate}</span>
                          <Popconfirm
                            title="你确定要删除吗?"
                            onConfirm={this.perDelet}
                            onCancel={this.siteCancel}
                            okText="确定"
                            cancelText="取消"
                          >
                            {/* <img style={{ float: 'right' }} onClick={this.per} data-uuid={item.uid} src={require("../../assets/delet.png")} alt="删除" /> */}
                            <i style={{ float: 'right', marginTop: '-5px', marginRight: '7px' }} onClick={this.per} data-uuid={item.uid}>
                              <svg t="1577775737475" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19805" width="24" height="24"><path d="M512.000213 1023.998293a508.712759 508.712759 0 0 1-362.067975-149.930104A508.627426 508.627426 0 0 1 0.002133 512.000213a508.670092 508.670092 0 0 1 149.972771-362.025309A508.712759 508.712759 0 0 1 512.000213 0.002133a508.627426 508.627426 0 0 1 362.02531 149.930105A508.670092 508.670092 0 0 1 1023.998293 512.000213a508.670092 508.670092 0 0 1-149.97277 362.025309A508.627426 508.627426 0 0 1 512.000213 1023.998293z m0-981.329653A469.886238 469.886238 0 0 0 42.66864 512.000213a469.886238 469.886238 0 0 0 469.331573 469.331574 469.843571 469.843571 0 0 0 469.331574-469.331574A469.843571 469.843571 0 0 0 512.000213 42.66864z" fill="#D85D27" p-id="19806"></path><path d="M748.073995 314.838286h-90.922326v-32.554545A25.599904 25.599904 0 0 0 630.997101 256.001173H391.808664a25.599904 25.599904 0 0 0-26.154568 26.282568v31.27455H274.689103A21.333253 21.333253 0 0 0 256.001173 333.568882a19.199928 19.199928 0 0 0 18.68793 18.773263h474.622221a19.199928 19.199928 0 0 0 18.687929-18.773263 21.333253 21.333253 0 0 0-19.925258-18.773262zM675.839599 392.448662H346.923499a14.421279 14.421279 0 0 0-12.45862 4.991981 16.12794 16.12794 0 0 0-4.991981 12.501286v302.932198a55.466459 55.466459 0 0 0 54.826461 55.08246h255.231043a55.466459 55.466459 0 0 0 54.826461-55.08246v-302.932198a18.133265 18.133265 0 0 0-18.68793-17.535934z m-211.796539 291.710906a18.68793 18.68793 0 1 1-37.37586 0v-197.801925a18.68793 18.68793 0 1 1 37.37586 0z m132.052838 0a18.68793 18.68793 0 1 1-37.37586 0v-197.801925a18.68793 18.68793 0 1 1 37.37586 0z" fill="#D85D27" p-id="19807"></path></svg>
                            </i>
                          </Popconfirm>

                        </div>
                      </div>
                    </Card.Body>
                  </Card>

                ))
              }


              <Pagination className="fenye" style={this.state.getVenueDiscountList.length < 1 ? { display: 'none' } : {}} defaultCurrent={1} size="small" onChange={this.currentThree} total={this.state.Youtotal} />

            </div>
            <Result style={this.state.getVenueDiscountList.length === 0 ? {} : { display: 'none' }} icon={<Icon type="gift" theme="twoTone" twoToneColor="#F5A623" style={{ fontSize: '2rem' }} />} title="没有优惠活动" />


          </PullToRefresh>

          <img className="addList" onClick={this.addYouList} src={require("../../assets/comeOn@2x.png")} alt="添加" />








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
             
              <DatePicker
                mode="date"
                title="选择开始日期"
                value={this.state.startDateTwo}
                onChange={startDateTwo => this.setState({ startDateTwo })}
              >
                <List.Item arrow="empty">开始日期</List.Item>
              </DatePicker>



            </div>

            <div className="SzSon">
              {/* <DatePicker
                mode="date"
                title="选择结束日期"
                extra="Optional"
                locale={zh_CN}
                value={this.state.qiStart}
                onChange={this.endDateTwo}
              >
                <div style={{ width: '50%', float: 'right' }}>{this.state.endDateTwo}<Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
              </DatePicker> */}

              <DatePicker
                mode="date"
                title="选择开始日期"
                value={this.state.endDateTwo}
                onChange={endDateTwo => this.setState({ endDateTwo })}
              >
                <List.Item arrow="empty">结束日期</List.Item>
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



        <div className={this.state.clickNum === 3 ? 'preferential' : 'none'} >

          <PullToRefresh
            damping={60}
            ref={el => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.state.refreshingThree}
            onRefresh={this.refReshThree}
          >
            <div className="preferential" style={this.state.getVenueSpecialList.length < 1 ? { display: 'none' } : {}}>

              {
                this.state.getVenueSpecialList.map((item, i) => (
                  <Card key={i}>
                    <Card.Header
                      title={<div style={{ fontSize: '14px', padding: '8px 0' }}><span style={{ display: 'block', width: '50px', float: 'left' }}>{item.sportname}</span><span style={{ paddingLeft: '4rem' }}>{item.starttime.slice(0, 5) + '-' + item.endtime.slice(0, 5)}</span></div>}
                      extra={<div style={{ fontSize: '12px' }}><span style={{ fontSize: '16px', color: '#000' }}>{item.money}</span>/时</div>}
                    />
                    <Card.Body>
                      <div style={{ fontSize: '12px' }}>
                        <div style={{ height: '30px' }}><span>场地号:{item.venueid.length >= 2 ? item.venueid.split(',')[0] + '~' + item.venueid.split(',')[item.venueid.split(',').length - 1] : item.venueid}</span>
                          {/* <img style={{ float: 'right', marginTop: '-5px' }} onClick={this.editorThree} data-uuid={item.uuid} src={require("../../assets/upLoad.png")} alt="修改" /> */}
                          <i style={{ float: 'right', marginTop: '-15px' }} onClick={this.editorThree} data-uuid={item.uuid}>
                            <svg t="1577774933696" className="icon" viewBox="0 0 1704 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3147" width="40" height="40"><path d="M851.565737 43.919581c259.400024 0 467.76849 208.368466 467.76849 467.76849 0 259.400024-208.368466 467.76849-467.76849 467.76849-259.524796 0-467.76849-208.368466-467.768491-467.76849 0-125.769709 51.15633-243.678811 137.623005-330.270257C607.762154 91.083222 725.796028 43.919581 851.565737 43.919581z m0-43.295723c-283.106616 0-511.064213 227.957597-511.064214 511.064213 0 283.106616 227.957597 511.064213 511.064214 511.064214 283.106616 0 511.064213-227.957597 511.064213-511.064214 0-282.981845-228.082369-511.064213-511.064213-511.064213zM949.885707 299.451688l106.180578 106.180577-283.106616 279.113927-106.180578-106.180577L949.885707 299.451688m129.637627 82.473985L973.342756 275.745096l51.15633-51.15633c15.721214-19.713903 43.295723-19.713903 62.884855-3.992689l43.295723 43.295723c19.713903 15.721214 19.713903 47.163641 3.992689 62.884854 0 0 0 3.867918-3.992689 3.867918-15.721214 19.838674-31.442427 31.69197-51.15633 51.281101 3.992689 0 3.992689 0 0 0zM568.45912 775.080785L631.343975 606.015353l102.187888 102.187888-165.072743 66.877544z m0 0" fill="#D85D27" p-id="3148"></path><path d="M756.115511 757.363227h374.31461v28.697453H756.115511z" fill="#D85D27" p-id="3149"></path></svg>
                          </i>

                        </div>
                        <div style={{ height: '30px' }}><span>工作日/休息日:{item.openday === 0 ? ['周日'] : '' || item.openday === 1 ? ['周一'] : '' || item.openday === 2 ? ['周二'] : '' || item.openday === 3 ? ['周三'] : '' || item.openday === 4 ? ['周四'] : '' || item.openday === 5 ? ['周五'] : '' || item.openday === 6 ? ['周六'] : ''}</span>
                          <Popconfirm
                            title="你确定要删除吗?"
                            onConfirm={this.speciaDelTwo}
                            onCancel={this.siteCancel}
                            okText="确定"
                            cancelText="取消"
                          >
                            {/* <img style={{ float: 'right' }} onClick={this.sprciaDel} data-uuid={item.uuid} src={require("../../assets/delet.png")} alt="删除" /> */}

                            <i style={{ float: 'right', marginTop: '-5px', marginRight: '7px' }} onClick={this.sprciaDel} data-uuid={item.uuid} >
                              <svg t="1577775737475" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19805" width="24" height="24"><path d="M512.000213 1023.998293a508.712759 508.712759 0 0 1-362.067975-149.930104A508.627426 508.627426 0 0 1 0.002133 512.000213a508.670092 508.670092 0 0 1 149.972771-362.025309A508.712759 508.712759 0 0 1 512.000213 0.002133a508.627426 508.627426 0 0 1 362.02531 149.930105A508.670092 508.670092 0 0 1 1023.998293 512.000213a508.670092 508.670092 0 0 1-149.97277 362.025309A508.627426 508.627426 0 0 1 512.000213 1023.998293z m0-981.329653A469.886238 469.886238 0 0 0 42.66864 512.000213a469.886238 469.886238 0 0 0 469.331573 469.331574 469.843571 469.843571 0 0 0 469.331574-469.331574A469.843571 469.843571 0 0 0 512.000213 42.66864z" fill="#D85D27" p-id="19806"></path><path d="M748.073995 314.838286h-90.922326v-32.554545A25.599904 25.599904 0 0 0 630.997101 256.001173H391.808664a25.599904 25.599904 0 0 0-26.154568 26.282568v31.27455H274.689103A21.333253 21.333253 0 0 0 256.001173 333.568882a19.199928 19.199928 0 0 0 18.68793 18.773263h474.622221a19.199928 19.199928 0 0 0 18.687929-18.773263 21.333253 21.333253 0 0 0-19.925258-18.773262zM675.839599 392.448662H346.923499a14.421279 14.421279 0 0 0-12.45862 4.991981 16.12794 16.12794 0 0 0-4.991981 12.501286v302.932198a55.466459 55.466459 0 0 0 54.826461 55.08246h255.231043a55.466459 55.466459 0 0 0 54.826461-55.08246v-302.932198a18.133265 18.133265 0 0 0-18.68793-17.535934z m-211.796539 291.710906a18.68793 18.68793 0 1 1-37.37586 0v-197.801925a18.68793 18.68793 0 1 1 37.37586 0z m132.052838 0a18.68793 18.68793 0 1 1-37.37586 0v-197.801925a18.68793 18.68793 0 1 1 37.37586 0z" fill="#D85D27" p-id="19807"></path></svg>
                            </i>
                          </Popconfirm>

                        </div>
                      </div>
                    </Card.Body>
                  </Card>


                ))
              }

              <Pagination className="fenye" style={this.state.getVenueSpecialList.length < 1 ? { display: 'none' } : {}} defaultCurrent={1} size="small" onChange={this.currentTwo} total={this.state.getVenueSpecialList.length} />

            </div>
            <Result className={this.state.getVenueSpecialList.length === 0 ? '' : 'nono'} icon={<Icon type="gift" theme="twoTone" twoToneColor="#F5A623" style={{ fontSize: '2rem' }} />} title="没有设置特殊场地" />


          </PullToRefresh>

          <img className="addList" onClick={this.addTelist} src={require("../../assets/comeOn@2x.png")} alt="添加" />








          <Drawer
            title="添加/修改特殊场地"
            placement="right"
            closable={true}
            onClose={this.drawerCloseTwo}
            visible={this.state.addTelist}
            width='100%'
          >
            <div className="SzSon">
              <span style={{ float: 'left' }}>运动项目</span>
              <Picker data={this.state.sportList} title="选择运动项目" onChange={this.projectThree} cols={1} className="forss">
                <div style={{ float: 'right', width: '50%', textAlign: 'left', }}>{this.state.projectThreeName} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
              </Picker>
            </div>


            <div className="SzSon">
              <span style={{ float: 'left' }}>节假日/工作日</span>
              <Select
                mode={this.state.siteEditorTwo === 1 ? '' : 'multiple'}
                style={{ width: '50%', float: 'right' }}
                placeholder="请选择"
                onChange={this.dateChangeTwo}
                value={this.state.siteEditorTwo === 1 ? this.state.dateChangeTwo === 0 ? '周日' : [] && this.state.dateChangeTwo === 1 ? '周一' : [] && this.state.dateChangeTwo === 2 ? '周二' : [] && this.state.dateChangeTwo === 3 ? '周三' : [] && this.state.dateChangeTwo === 4 ? '周四' : [] && this.state.dateChangeTwo === 5 ? '周五' : [] && this.state.dateChangeTwo === 6 ? '周六' : [] : this.state.dateChangeTwo}
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

            <div className="SzSon">
              <span style={{ float: 'left' }}>场地号</span>
              <div style={{ float: 'right', width: '50%' }}>
                <InputNumber style={{ width: '45%', textAlign: 'center' }} value={this.state.minNum} defaultValue={1} min={1} max={this.state.numberMax} placeholder="请输入" onChange={this.minNum} />~
            <InputNumber style={{ width: '45%', textAlign: 'center' }} value={this.state.maxNum} defaultValue={1} min={1} max={this.state.numberMax} placeholder="请输入" onChange={this.maxNum} />
              </div>
            </div>

            <div className="SzSon">
              <span style={{ float: 'left' }}>开始时间</span>
              <Picker data={this.state.time} title="选择开始时间" onChange={this.startTimeThree} cols={1} className="forss">
                <div style={{ float: 'right', width: '50%', textAlign: 'left' }}>{this.state.startTimeThree} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
              </Picker>
            </div>

            <div className="SzSon">
              <span style={{ float: 'left' }}>结束时间</span>
              <Picker data={this.state.time} title="选择开始时间" onChange={this.endTimeThree} cols={1} className="forss">
                <div style={{ float: 'right', width: '50%', textAlign: 'left' }}>{this.state.endTimeThree} <Icon type='down' style={{ float: 'right', marginRight: '0.75rem' }} /></div>
              </Picker>
            </div>


            <div className="SzSon">
              <span style={{ float: 'left' }}>价格(元/时)</span>
              <Input style={{ width: '50%', border: 'none', height: '2rem', float: 'right', boxShadow: 'none', paddingLeft: '0' }} value={this.state.priceThree} onChange={this.priceThree} placeholder="请输入" type="number" />
            </div>

            <div className="sitePhsubmit" onClick={this.submitThree}>提交</div>

          </Drawer>
        </div>

      </div>
    )
  }
}


export default sitePh;