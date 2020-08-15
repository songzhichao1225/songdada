import React from 'react';
import './sitePh.css';
import { Card, Picker, List, Toast, InputItem, Modal, DatePicker, TextareaItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, Spin } from 'antd';
import { } from '@ant-design/icons';
import { getVenueNumberTitleList, getVenueSportidTitle, DelVenueTitle, getVenueTitleSave, getSiteSelectedVenueid, DelVenueNumberTitle, getSiteSettingHistoryList, DelSiteSetting, AddSiteSetting, getVenueNumberTitleSave, getVenueNumberTitleFirst, getSiteSettingList, getSiteSelectedTitle, getSiteSettingFirst, DelSiteSettingDiscount, SiteSettingDiscountSave } from '../../api';

const alert = Modal.alert;

let moneyKeyboardWrapProps;

function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}




class sitePh extends React.Component {

  state = {
    titleLise: [],
    page: 1,
    sportArr: [
      { label: '全部', value: 0 },
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    sportArrTwo: [
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    timeRtArr: [{ label: '00:00', value: '00:00' }, { label: '00:30', value: '00:30' }, { label: '01:00', value: '01:00' }, { label: '01:30', value: '01:30' }, { label: '02:00', value: '02:00' }, { label: '02:30', value: '02:30' }, { label: '03:00', value: '03:00' }, { label: '03:30', value: '03:30' }, { label: '04:00', value: '04:00' }, { label: '04:30', value: '04:30' }, { label: '05:00', value: '05:00' }, { label: '05:30', value: '05:30' }, { label: '06:00', value: '06:00' }, { label: '06:30', value: '06:30' }, { label: '07:00', value: '07:00' }, { label: '07:30', value: '07:30' }, { label: '08:00', value: '08:00' }, { label: '08:30', value: '08:30' }, { label: '09:00', value: '09:00' }, { label: '09:30', value: '09:30' }, { label: '10:00', value: '10:00' }, { label: '10:30', value: '10:30' }, { label: '11:00', value: '11:00' }, { label: '11:30', value: '11:30' }, { label: '12:00', value: '12:00' }, { label: '12:30', value: '12:30' }, { label: '13:00', value: '13:00' }, { label: '13:30', value: '13:30' }, { label: '14:00', value: '14:00' }, { label: '14:30', value: '14:30' }, { label: '15:00', value: '15:00' }, { label: '15:30', value: '15:30' }, { label: '16:00', value: '16:00' }, { label: '16:30', value: '16:30' }, { label: '17:00', value: '17:00' }, { label: '17:30', value: '17:30' }, { label: '18:00', value: '18:00' }, { label: '18:30', value: '18:30' }, { label: '19:00', value: '19:00' }, { label: '19:30', value: '19:30' }, { label: '20:00', value: '20:00' }, { label: '20:30', value: '20:30' }, { label: '21:00', value: '21:00' }, { label: '21:30', value: '21:30' }, { label: '22:00', value: '22:00' }, { label: '22:30', value: '22:30' }, { label: '23:00', value: '23:00' }, { label: '23:30', value: '23:30' }, { label: '24:00', value: '24:00' }],
    Longest: [{ label: '一周', value: 0.1 }, { label: '两周', value: 0.2 }, { label: '三周', value: 0.3 }, { label: '一个月', value: 1 }, { label: '两个月', value: 2 },],
    Shortest: [{ label: '0分钟', value: 0 }, { label: '30分钟', value: 30 }, { label: '60分钟', value: 60 }, { label: '120分钟', value: 120 }, { label: '180分钟', value: 180 }, { label: '240分钟', value: 240 }, { label: '360分钟', value: 360 }, { label: '1140分钟', value: 1140 }, { label: '2280分钟', value: 2280 }, { label: '4320分钟', value: 4320 },],
    LiturgyArr: [{ name: "周一", idx: 1, cheked: false }, { name: "周二", idx: 2, cheked: false }, { name: "周三", idx: 3, cheked: false }, { name: "周四", idx: 4, cheked: false }, { name: "周五", idx: 5, cheked: false }, { name: "周六", idx: 6, cheked: false, }, { name: "周日", idx: 7, cheked: false }],
    asyncValue: 0,
    index: '1',
    visibleXi: false,
    visibleTitle: false,
    pickerValue: '',
    titleList: [],
    joinTitleC: '',
    idxTitle: '',
    idxTitleTwo: '请选择/添加',
    Serial: false,
    numArr: [],
    chekedArr: [],
    upData: 0,
    firstUUid: '',
    siteList: [],
    otherTwo: 0,
    pageTwo: 1,
    asyncValueTwo: 0,
    asyncValueThree: 0,
    spin: true,
    Price: false,
    pickerValueTwo: '',
    pickerValueThree: [],
    titleArrFoter: [],
    titleArr: [],
    cheStr: '',
    titleArrFoterNum: 0,
    Liturgy: false,
    Liturgyche: '请选择',
    starttime: [],
    endtime: [],
    money: '',
    pickerValueFour: [],
    pickerValueFive: [],
    comment: '',
    tagId: '',
    LiturgycheNum: '',
    jiageUUid: '',
    specialOffer: false,
    specialOfferH: 0,
    offer: false,
    venueidSiscount: [],
    startDate: '',
    endDate: '',
    venDuo: false,
    venueidDuo: '',
    koArr: [],
    visibleTitleTwo: false,
    historList: [],
    pageThree: 1,
    detail: false,
    details: []
  }

  header = e => {
    this.setState({
      index: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index === '1') {
      this.getVenueNumberTitleList({ page: 1, sportid: this.state.asyncValue })
      this.setState({ asyncValue: this.state.asyncValueTwo, page: 1 })
    } else if (e.currentTarget.dataset.index === '2') {
      this.getSiteSettingList({ page: 1, sportid: this.state.asyncValue })
      this.setState({ asyncValueTwo: this.state.asyncValue, pageTwo: 1 })
    } else if (e.currentTarget.dataset.index === '3') {
      console.log(666)
      this.getSiteSettingHistoryList({ page: 1, sportid: this.state.asyncValue })
      this.setState({ asyncValueThree: this.state.asyncValue, pageThree: 1 })
    }
  }

  componentDidMount() {
    let now = new Date()
    let kpo = now.setMinutes(now.getMinutes() - now.getMinutes());
    let kpotWO = now.setMinutes(now.getMinutes() - now.getMinutes() + 30);

    this.getVenueNumberTitleList({ page: 1, sportid: '' })
    this.getSiteSettingList({ page: 1, sportid: '' })
    this.getSiteSettingHistoryList({ page: 1, sportid: '' })
    let numArr = []
    for (let i = 1; i <= 100; i++) {
      let obj = { num: i, cheked: false }
      numArr.push(obj)
    }
    this.setState({ numArr: numArr, starttime: new Date(kpo), endtime: new Date(kpotWO), startDate: new Date(kpo), endDate: new Date(kpotWO) })
   


  }

  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, localStorage.getItem('venue_token'))
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
      this.setState({ titleLise: res.data.data, other: res.data.other, spin: false })
    }
  }
  current = (page, pageSize) => {
    this.setState({
      page: page
    })
    this.getVenueNumberTitleList({ page: page, sportid: this.state.asyncValue })
  }
  currentTwo = (page, pageSize) => {
    this.setState({
      pageTwo: page
    })
    this.getSiteSettingList({ page: page, sportid: this.state.asyncValueTwo })
    
  }

  currentThree = (page, pageSize) => {
    this.setState({
      pageThree: page
    })
    this.getSiteSettingHistoryList({ page: page, sportid: this.state.asyncValueThree })
  }
  visibleXi = () => {
    this.setState({ visibleXi: true, chekedArr: [] })
  }
  onClose = () => {
    this.setState({ visibleXi: false, upData: 0, firstUUid: '', detail: false })
  }

  onCloseTitle = () => {
    this.setState({ visibleTitle: false })
  }



  async getVenueSportidTitle(data) {
    const res = await getVenueSportidTitle(data, localStorage.getItem('venue_token'))

    this.setState({
      titleList: [{ title: '普通' }, { title: 'VIP' }, ...res.data.data]
    })


  }

  visibleTitle = () => {
    if (this.state.pickerValue === '') {
      Toast.fail('请选择场地类型', 1);
    } else {
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
      this.setState({ visibleTitle: true })
    }
  }




  async DelVenueTitle(data) {
    const res = await DelVenueTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
      Toast.success(res.data.msg, 1);
    } else {
      Toast.fail(res.data.msg, 1);
    }

  }
  delVenueTitle = e => {

    if (e && e.stopPropagation) {
      e.stopPropagation()
    } else {
      window.event.cancelBubble = true
    }
    if (this.state.idxTitleTwo === e.currentTarget.dataset.title) {

      console.log(e.currentTarget.dataset.title)
      this.setState({ idxTitle: '', idxTitleTwo: '请选择/添加' })
    }
    this.DelVenueTitle({ uuid: e.currentTarget.dataset.uuid })

  }


  async getVenueTitleSave(data) {
    const res = await getVenueTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('添加成功', 1);
      this.setState({ visibleTitleTwo: false })
      this.getVenueSportidTitle({ sportid: this.state.pickerValue[0] })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  joinTitleC = e => {
    this.setState({ joinTitleC: e })
  }
  joinTitle = () => {
    this.setState({ visibleTitleTwo: true })
  }

  joinTitleTwo = () => {
    if (this.state.joinTitleC === '') {
      Toast.fail('请输入新增标签', 1);
    } else if (this.state.joinTitleC.replace(/\s*/g, "") === '普通') {
      Toast.fail('该标签已存在', 1);
    } else if (this.state.joinTitleC.replace(/\s*/g, "").toUpperCase() === 'VIP') {
      Toast.fail('该标签已存在', 1);
    } else {
      this.getVenueTitleSave({ sportid: this.state.pickerValue[0], title: this.state.joinTitleC, uuid: '' })
    }
  }

  sonClik = e => {

    this.setState({ idxTitle: e.currentTarget.dataset.title })

  }
  btnComfir = () => {
    console.log(this.state.idxTitle)
    if (this.state.idxTitle === '') {
      Toast.fail('请选择标签', 1);
    } else {
      this.setState({ visibleTitle: false, idxTitleTwo: this.state.idxTitle, chekedArr: [] })
    }
  }

  async getSiteSelectedVenueid(data) {
    const res = await getSiteSelectedVenueid(data, localStorage.getItem('venue_token'))
    if (this.state.Serial === true) {
      for (let i in res.data.data) {
        this.state.numArr[parseInt(res.data.data[i] - 1)].cheked = 'no'
      }
      if (this.state.chekedArr.length !== 0) {
        for (let j in this.state.koArr) {
          this.state.numArr[this.state.koArr[j] - 1].cheked = false
        }
      }
      if (this.state.chekedArr.length !== 0) {
        for (let j in this.state.chekedArr) {
          this.state.numArr[this.state.chekedArr[j] - 1].cheked = true
        }
      }

      this.setState({ numArr: this.state.numArr })
    }
  }


  Serial = () => {
    if (this.state.idxTitleTwo === '' || this.state.idxTitleTwo === '请选择/添加') {
      Toast.fail('请选择细分标签', 1);
    } else {
      this.setState({ Serial: true })
      let items = this.state.numArr
      for (let i in items) {
        items[i].cheked = false
      }
      this.setState({ numArr: items })
      this.getSiteSelectedVenueid({ sportid: this.state.pickerValue[0] })
    }
  }


  SerialClose = () => {
    let items = this.state.numArr
    for (let j in items) {
      if (items[j].cheked === true) {
        items[j].cheked = false;
        this.setState({
          numArr: items
        });
      }
    }
    this.setState({ Serial: false })
  }



  numArrSon = e => {
    let items = this.state.numArr
    if (items[parseInt(e.currentTarget.dataset.num) - 1].cheked !== 'no') {
      items[parseInt(e.currentTarget.dataset.num) - 1].cheked = !items[parseInt(e.currentTarget.dataset.num) - 1].cheked
      this.setState({ numArr: items })
    }

  }
  reverseC = () => {
    let items = this.state.numArr
    for (let i in items) {
      if (items[i].cheked === false) {
        items[i].cheked = true
        this.setState({ numArr: items })
      } else if (items[i].cheked === true) {
        items[i].cheked = false
        this.setState({ numArr: items })
      }
    }
    this.setState({ numArr: this.state.numArr })
  }

  allThem = () => {
    let items = this.state.numArr
    for (let i in items) {
      if (items[i].cheked === false) {
        items[i].cheked = true
        this.setState({ numArr: items })
      }
    }
    this.setState({ numArr: this.state.numArr })
  }

  koNumArr = () => {
    let chekedArr = []
    for (let i in this.state.numArr) {
      if (this.state.numArr[i].cheked === true) {
        chekedArr.push(this.state.numArr[i].num)
      }
    }
    if (chekedArr.length === 0) {
      Toast.fail('请选择场地编号', 1)
    } else {
      let items = this.state.numArr
      for (let i in items) {
        if (items[i].cheked === true) {
          items[i].cheked = false
          this.setState({
            numArr: items
          })
        }
      }
      this.setState({ Serial: false, chekedArr: chekedArr })
    }
  }


  async DelVenueNumberTitle(data) {
    const res = await DelVenueNumberTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueNumberTitleList({ page: this.state.page, sportid: this.state.asyncValue })
      this.setState({ page: this.state.page })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  asyncValue = e => {
    this.setState({ asyncValue: e[0], page: 1 })
    this.getVenueNumberTitleList({ page: 1, sportid: e[0] })
  }

  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ visibleXi: false, firstUUid: '', upData: 0, page: this.state.page })
      this.getVenueNumberTitleList({ page: this.state.page, sportid: this.state.asyncValue })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  xifenPush = () => {
    let { pickerValue, idxTitleTwo, chekedArr } = this.state
    if (pickerValue.length === 0) {
      Toast.fail('请选择场地类型', 1);
    } else if (idxTitleTwo === '' || idxTitleTwo === '请选择/添加') {
      Toast.fail('请选择细分标签', 1);
    } else if (chekedArr.length === 0) {
      Toast.fail('请选择场地编号', 1);
    } else {
      this.getVenueNumberTitleSave({ sportid: pickerValue[0], title: idxTitleTwo, venueid: chekedArr.join(','), number: chekedArr.length, uuid: this.state.firstUUid })
    }
  }

  async getVenueNumberTitleFirst(data) {
    const res = await getVenueNumberTitleFirst(data, localStorage.getItem('venue_token'))
    this.setState({
      pickerValue: [res.data.data[0].sportid], idxTitleTwo: res.data.data[0].title, chekedArr: res.data.data[0].venueid.split(','), koArr: res.data.data[0].venueid.split(','), firstUUid: res.data.data[0].uuid
    })
  }

  upData = e => {
    this.setState({ visibleXi: true, upData: 1 })
    this.getVenueNumberTitleFirst({ uuid: e.currentTarget.dataset.uuid })

  }



  async getSiteSettingList(data) {
    const res = await getSiteSettingList(data, localStorage.getItem('venue_token'))
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
      res.data.data[i].opendaynameTwo = ''
      if (res.data.data[i].openday.split(',').indexOf('1') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周一'
      } if (res.data.data[i].openday.split(',').indexOf('2') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周二'
      } if (res.data.data[i].openday.split(',').indexOf('3') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周三'
      } if (res.data.data[i].openday.split(',').indexOf('4') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周四'
      } if (res.data.data[i].openday.split(',').indexOf('5') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周五'
      } if (res.data.data[i].openday.split(',').indexOf('6') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周六'
      } if (res.data.data[i].openday.split(',').indexOf('7') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周日'
      }
    }
    this.setState({
      siteList: res.data.data,
      otherTwo: res.data.other
    })
  }



  async getSiteSettingHistoryList(data) {
    const res = await getSiteSettingHistoryList(data, localStorage.getItem('venue_token'))
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
      res.data.data[i].opendaynameTwo = ''
      if (res.data.data[i].openday.split(',').indexOf('1') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周一'
      } if (res.data.data[i].openday.split(',').indexOf('2') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周二'
      } if (res.data.data[i].openday.split(',').indexOf('3') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周三'
      } if (res.data.data[i].openday.split(',').indexOf('4') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周四'
      } if (res.data.data[i].openday.split(',').indexOf('5') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周五'
      } if (res.data.data[i].openday.split(',').indexOf('6') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周六'
      } if (res.data.data[i].openday.split(',').indexOf('7') !== -1) {
        res.data.data[i].opendaynameTwo = res.data.data[i].opendaynameTwo + ',周日'
      }
    }
    this.setState({
      historList: res.data.data,
      otherThree: res.data.other
    })
  }

  asyncValueTwo = e => {
    this.setState({ asyncValue: e[0], asyncValueTwo: e[0],pageTwo:1 })
    this.getSiteSettingList({ page: 1, sportid: e[0] })
  }
  asyncValueThree = e => {
    this.setState({ asyncValue: e[0], asyncValueThree: e[0],pageThree:1 })
    this.getSiteSettingHistoryList({ page: 1, sportid: e[0] })
  }


  async DelSiteSetting(data) {
    const res = await DelSiteSetting(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('删除成功', 1);
      this.setState({ pageTwo: this.state.pageTwo })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  Price = () => {
    this.setState({ Price: true })
  }
  onClosePrice = () => {
    this.setState({ Price: false, jiageUUid: '' })
  }


  async getSiteSelectedTitle(data) {
    const res = await getSiteSelectedTitle(data, localStorage.getItem('venue_token'))
    if (res.data.data.length !== 0) {
      this.setState({ titleArrFoter: res.data.data })
      let titleArr = []
      for (let i in res.data.data) {
        let obj = { label: res.data.data[i].title, value: Number(i) }
        titleArr.push(obj)
      }
      this.setState({ titleArr: titleArr })
    } else {
      alert('提示', <div style={{ textAlign: 'center', fontSize: '0.88rem' }}>您还没对{this.state.sportArrTwo[data.sportid - 1].label}场地进行场地细分，无法选择细分标签，请先去进行场地细分，谢谢！</div>, [
        { text: '确定，去场地细分', onPress: () => this.setState({ Price: false, index: '1', visibleXi: true, pickerValue: [data.sportid] }) },
      ])
    }
  }
  pickerValueTwo = e => {
    this.setState({
      pickerValueTwo: e[0]
    })
    this.setState({ pickerValueThree: [], cheStr: '', titleArrFoterNum: 0 })
    this.getSiteSelectedTitle({ sportid: e[0] })
  }

  pickerValueThree = v => {
    for (let i in this.state.titleArrFoter) {
      if (this.state.titleArrFoter[i].title === this.state.titleArr[v].label) {
        this.setState({ cheStr: this.state.titleArrFoter[i].venueid, titleArrFoterNum: this.state.titleArrFoter[i].number, tagId: this.state.titleArrFoter[i].uuid })
      }
    }
    this.setState({ pickerValueThree: v })

  }

  Liturgy = () => {
    this.setState({ Liturgy: true })
  }

  LiturgyClose = () => {
    this.setState({ Liturgy: false })
  }

  LiturgySon = e => {
    let items = this.state.LiturgyArr
    items[e.currentTarget.dataset.index].cheked = !items[e.currentTarget.dataset.index].cheked
    this.setState({ LiturgyArr: items })
  }
  LiturgyArrChe = () => {
    let Liturgyche = []
    let LiturgycheNum = []
    for (let i in this.state.LiturgyArr) {
      if (this.state.LiturgyArr[i].cheked === true) {
        Liturgyche.push(this.state.LiturgyArr[i].name)
        LiturgycheNum.push(this.state.LiturgyArr[i].idx)
      }
    }
    if (Liturgyche.length === 0) {
      Toast.fail('请选择星期', 1);
    } else {
      console.log(LiturgycheNum)
      this.setState({ Liturgyche: Liturgyche.join(','), LiturgycheNum: LiturgycheNum.join(','), Liturgy: false })
    }
  }

  pickerValueFour = e => {
    this.setState({ pickerValueFour: e })
  }
  pickerValueFive = e => {
    this.setState({ pickerValueFive: e })
  }


  async AddSiteSetting(data) {
    const res = await AddSiteSetting(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ Price: false, jiageUUid: '' })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
    } else {
      Toast.fail(res.data.msg, 2);
    }

  }
  comment = e => {
    this.setState({ comment: e })
  }

  jiageSub = () => {

    let { pickerValueTwo, pickerValueThree, Liturgyche, starttime, endtime, money, cheStr, titleArrFoterNum, pickerValueFour, pickerValueFive, comment, tagId, titleArr, sportArrTwo, LiturgycheNum, jiageUUid } = this.state
    console.log(Liturgyche)
    if (pickerValueTwo === '') {
      Toast.fail('请选择场地类型', 1);
    } else if (pickerValueThree.length === 0) {
      Toast.fail('请选择细分标签', 1);
    } else if (Liturgyche === '请选择') {
      Toast.fail('请选择星期', 1);
    } else if (starttime.length === undefined) {
      Toast.fail('请选择开始时间', 1);
    } else if (endtime.length === undefined) {
      Toast.fail('请选择结束时间', 1);
    } else if (money === '') {
      Toast.fail('请输入价格', 1);
    } else if (pickerValueFour.length === 0) {
      Toast.fail('请选择最长提前预定时间', 1);
    }else if (pickerValueFive.length === 0) {
      Toast.fail('请选择最短提前预定时间', 1)

    } else {
      let obj = {
        uuid: jiageUUid,
        sportid: pickerValueTwo,
        sportname: sportArrTwo[pickerValueTwo - 1].label,
        tags: titleArr[pickerValueThree].label,
        openday: LiturgycheNum,
        opendayname: Liturgyche,
        starttime: starttime[0],
        endtime: endtime[0],
        costperhour: money,
        venueid: cheStr,
        sitenumber: titleArrFoterNum,
        maxScheduledDate: pickerValueFour[0],
        appointmenttime: pickerValueFive[0],
        comment: comment,
        tags_id: tagId
      }
      this.AddSiteSetting(obj)

    }

  }



  async getSiteSettingFirst(data) {
    const res = await getSiteSettingFirst(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.specialOfferH !== 1) {
        this.getSiteSelectedTitle({ sportid: res.data.data[0].sportid })
        let that = this

        setTimeout(() => {
          for (let i in that.state.titleArr) {

            if (that.state.titleArr[i].label === res.data.data[0].tags) {
              that.setState({ pickerValueThree: [that.state.titleArr[i].value] })
            }
          }
        }, 1000)
       

        let open = res.data.data[0].openday.split(',')
        let p = []
        for (let i in open) {
          if (open[i].indexOf("1") !== -1) {
            p.push("周一")
            this.state.LiturgyArr[0].cheked = true
          } else if (open[i].indexOf("2") !== -1) {
            p.push("周二")
            this.state.LiturgyArr[1].cheked = true
          } else if (open[i].indexOf("3") !== -1) {
            p.push("周三")
            this.state.LiturgyArr[2].cheked = true
          } else if (open[i].indexOf("4") !== -1) {
            p.push("周四")
            this.state.LiturgyArr[3].cheked = true
          } else if (open[i].indexOf("5") !== -1) {
            p.push("周五")
            this.state.LiturgyArr[4].cheked = true
          } else if (open[i].indexOf("6") !== -1) {
            p.push("周六")
            this.state.LiturgyArr[5].cheked = true
          } else if (open[i].indexOf("7") !== -1) {
            p.push("周日")
            this.state.LiturgyArr[6].cheked = true
          }
        }


        this.setState({
          Price: true, pickerValueTwo: res.data.data[0].sportid,
          cheStr: res.data.data[0].venueid, titleArrFoterNum: res.data.data[0].sitenumber,
          LiturgycheNum: res.data.data[0].openday, Liturgyche: p.join(','), starttime: [res.data.data[0].starttime], endtime: [res.data.data[0].endtime],
          money: res.data.data[0].costperhour, pickerValueFour: [Number(res.data.data[0].maxScheduledDate)], pickerValueFive: [res.data.data[0].appointmenttime],
          tagId: res.data.data[0].tags_id,
          comment: res.data.data[0].comment
        })

      } else {
        let open = res.data.data[0].openday.split(',')
        let p = []
        for (let i in open) {
          if (open[i].indexOf("1") !== -1) {
            p.push("周一")
            this.state.LiturgyArr[0].cheked = true
          } else if (open[i].indexOf("2") !== -1) {
            p.push("周二")
            this.state.LiturgyArr[1].cheked = true
          } else if (open[i].indexOf("3") !== -1) {
            p.push("周三")
            this.state.LiturgyArr[2].cheked = true
          } else if (open[i].indexOf("4") !== -1) {
            p.push("周四")
            this.state.LiturgyArr[3].cheked = true
          } else if (open[i].indexOf("5") !== -1) {
            p.push("周五")
            this.state.LiturgyArr[4].cheked = true
          } else if (open[i].indexOf("6") !== -1) {
            p.push("周六")
            this.state.LiturgyArr[5].cheked = true
          } else if (open[i].indexOf("7") !== -1) {
            p.push("周日")
            this.state.LiturgyArr[6].cheked = true
          }
        }
        let h = res.data.data[0].venueid.split(',')
        let g = res.data.data[0].discount_venueid === null ? [] : res.data.data[0].discount_venueid.split(',')
        let kol = []
        for (let i in h) {
          let obj = { num: h[i], cheked: false }
          kol.push(obj)
        }
        if (kol.length !== 0) {
          for (let i in g) {
              kol[h.indexOf(g[i])].cheked = true
          }
        }

        this.setState({
          kop: res.data.data[0].discount_costperhour,
          SiscountUUid: res.data.data[0].uuid,
          specialOffer: true, sportSiscount: res.data.data[0].sportname, titleSiscount: res.data.data[0].tags, xingSiscount: p.join(','),
          moneySiscount: res.data.data[0].discount_costperhour === null ? res.data.data[0].costperhour : res.data.data[0].discount_costperhour,
          startDate: res.data.data[0].discount_sdate === null ? this.state.startDate : new Date(res.data.data[0].discount_sdate + ' ' + res.data.data[0].discount_start),
          endDate: res.data.data[0].discount_edate === null ? this.state.endDate : new Date(res.data.data[0].discount_edate + ' ' + res.data.data[0].discount_end),
          starttimeSiscount: res.data.data[0].starttime, endtimeSiscount: res.data.data[0].endtime, venueidSiscount: kol, venueidSiscountTwo: res.data.data[0].discount_venueid === null ? '请选择' : res.data.data[0].discount_venueid
        })
      }
    }

  }

  jiaUpdata = e => {
    console.log(this.state.specialOfferH)
    this.setState({ jiageUUid: e.currentTarget.dataset.uuid })
    this.getSiteSettingFirst({ uuid: e.currentTarget.dataset.uuid })
  }

  specialOfferClose = () => {
    this.setState({ specialOffer: false, specialOfferH: 0 })
  }
  specialOffer = e => {
    this.getSiteSettingFirst({ uuid: e.currentTarget.dataset.uuid })
    this.setState({ specialOfferH: 1 })
  }

  offerClose = () => {
    this.setState({ offer: false })
  }
  offer = () => {
    this.setState({ offer: true })
  }

  allThemTwo = () => {

    let items = this.state.venueidSiscount
    for (let i in items) {
      items[i].cheked = true
    }
    this.setState({
      venueidSiscount: items
    })
  }
  reverseCTwo = () => {
    let items = this.state.venueidSiscount
    for (let i in items) {
      items[i].cheked = !items[i].cheked
    }
    this.setState({
      venueidSiscount: items
    })
  }


  numArrSiscount = e => {
    let items = this.state.venueidSiscount
    for (let i in items) {
      if (items[i].num === e.currentTarget.dataset.num) {
        items[i].cheked = !items[i].cheked
      }
    }
    this.setState({
      venueidSiscount: items
    })
  }
  koNumArrSiscount = () => {
    let arrTo = []
    for (let i in this.state.venueidSiscount) {
      if (this.state.venueidSiscount[i].cheked === true) {
        arrTo.push(this.state.venueidSiscount[i].num)
      }
    }
    this.setState({ venueidSiscountTwo: arrTo.join(','), offer: false })
  }


  async DelSiteSettingDiscount(data) {
    const res = await DelSiteSettingDiscount(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ specialOffer: false,specialOfferH:0 })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }

  async SiteSettingDiscountSave(data) {
    const res = await SiteSettingDiscountSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ specialOffer: false,specialOfferH:0 })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
      Toast.success('提交成功', 2);
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }

  joinSiscount = () => {
    let { SiscountUUid, startDate, endDate, venueidSiscountTwo, moneySiscount } = this.state
    let obj = {
      uuid: SiscountUUid,
      discount_start: dateFormat("HH:MM", startDate),
      discount_end: dateFormat("HH:MM", endDate),
      discount_venueid: venueidSiscountTwo,
      discount_costperhour: moneySiscount,
      discount_sdate: dateFormat("YYYY-mm-dd", startDate),
      discount_edate: dateFormat("YYYY-mm-dd", endDate)
    }
    this.SiteSettingDiscountSave(obj)

  }

  venDuo = e => {
    this.setState({ venDuo: true, venueidDuo: e.currentTarget.dataset.venueid })
  }
  venDuoTwo = () => {
    this.setState({
      venDuo: false
    })
  }
  starttime = e => {
    console.log(e[0])
    this.setState({ starttime: e })
  }
  endtime = e => {
    this.setState({ endtime: e })
  }

  onCloseTitleTwo = () => {
    this.setState({ visibleTitleTwo: false })
  }
  detail = e => {
    this.setState({ detail: true, details: e.currentTarget.dataset })
  }
  render() {
    return (
      <div className="sitePh">
        <div className="header">
          <div onClick={this.header} data-index='1' style={this.state.index === '1' ? { color: '#D85D27' } : {}}>场地细分<div style={this.state.index === '1' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onClick={this.header} data-index='2' style={this.state.index === '2' ? { color: '#D85D27' } : {}}>价格设置<div style={this.state.index === '2' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onClick={this.header} data-index='3' style={this.state.index === '3' ? { color: '#D85D27' } : {}}>历史设置<div style={this.state.index === '3' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
        </div>
        <div className="wsMa4" style={this.state.index === '1' ? {} : { display: 'none' }}>
          <div className="Subdivide">
            {
              this.state.titleLise.map((item, i) => (
                <Card key={i} className="card">
                  <Card.Header
                    title={<span className="titleLeft">{item.sportid}</span>}
                    extra={<span className="titleRight">细分标签：{item.title}</span>}
                  />
                  <Card.Body>
                    <div className="idxNum" onClick={this.venDuo} data-venueid={item.venueid}>场地编号：{item.venueid}</div>
                  </Card.Body>
                  <Card.Footer content={<span className="number">场地数量：{item.number}</span>} extra={<div className="capzuo"><img style={{ marginRight: '10px' }} onClick={this.upData} data-uuid={item.uuid} src={require('../../assets/upLoad.png')} alt="img" /><img onClick={() =>
                    alert('提示', '您确定要删除该条场地细分么？删除后用户将无法预订该时间段' + item.sportid + '的' + item.title + '场地。', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '确定', onPress: () => this.DelVenueNumberTitle({ uuid: item.uuid }) },
                    ])} data-uuid={item.uuid} data-title={item.title} src={require('../../assets/delet.png')} alt="img" /></div>} />
                </Card>
              ))
            }
            <div className="request" style={this.state.titleLise.length === 0 && this.state.spin === false ? {} : { display: 'none' }}><img src={require('../../assets/xifen (1).png')} alt="img" /><div>您还没有设置场地细分!</div></div>
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.page} total={this.state.other} onChange={this.current} />
            <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={this.asyncValue}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{ color: '#000' }}>{this.state.sportArr[this.state.asyncValue].label}</span></div>
            </Picker>
            <div style={{ marginLeft: '4%' }} onClick={this.visibleXi}>+添加场地细分</div>
          </div>
        </div>

        <div className="siting68" style={this.state.index === '2' ? {} : { display: 'none' }}>
          <div className="Subdivide">
            {
              this.state.siteList.map((item, i) => (
                <Card className="card" key={i}>
                  <Card.Header
                    title={<span className="titleLeft">{item.sportname}</span>}
                    extra={<span className="titleRight">细分标签：{item.tags}</span>}
                  />
                  <Card.Body>
                    <div className="bossname">
                      <div onClick={this.venDuo} data-venueid={item.venueid}>场地编号：{item.venueid}</div>
                      <div>场地数量：{item.sitenumber}</div>
                      <div onClick={this.venDuo} data-venueid={item.opendaynameTwo.slice(1, item.opendaynameTwo.length)}>星期：{item.opendaynameTwo.slice(1, item.opendaynameTwo.length)}</div>
                      <div>时间范围：{item.starttime}~{item.endtime}</div>
                      <div>价格：{item.costperhour}元/时</div>
                      <div>最长提前预定时间：{item.maxScheduledDate === null ? '' : item.maxScheduledDateTwo}</div>
                      <div onClick={this.venDuo} data-venueid={item.appointmenttime / 60 + '小时'}>最短提前预定时间：{item.appointmenttime === null ? '' : item.appointmenttime / 60 + '小时'}</div>
                      <div onClick={item.comment === null ? '' : this.venDuo} data-venueid={item.comment === '' ? '无' : item.comment}>备注：{item.comment === '' ? '无' : item.comment}</div>
                    </div>
                  </Card.Body>
                  <Card.Footer content={<div className="lookYou" onClick={this.specialOffer} data-uuid={item.uuid}>{item.discount_venueid !== null ? '查看优惠' : '添加优惠'}</div>} extra={<div className="capzuo"><img style={{ marginRight: '10px' }} onClick={this.jiaUpdata} data-uuid={item.uuid} src={require('../../assets/upLoad.png')} alt="img" /><img onClick={() =>
                    alert('提示', '您确定要删除该条价格设置么？删除后用户将无法预订该时间段' + item.sportname + '的' + item.tags + '场地。', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '确定', onPress: () => this.DelSiteSetting({ uuid: item.uuid }) },
                    ])} src={require('../../assets/delet.png')} alt="img" /></div>} />
                </Card>
              ))
            }
            <div style={this.state.siteList.length !== 0 ? { display: 'none' } : { width: '100%' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (6).png')} alt="666" /><span style={{ display: 'block', textAlign: 'center' }}>您还没有添加价格设置!</span></div>
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageTwo} total={this.state.otherTwo} onChange={this.currentTwo} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={this.asyncValueTwo}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{ color: '#000' }}>{this.state.sportArr[this.state.asyncValueTwo].label}</span></div>
            </Picker>
            <div style={{ marginLeft: '4%' }} onClick={this.Price}>+添加价格设置</div>
          </div>
        </div>

        <div className="siting69" style={this.state.index === '3' ? {} : { display: 'none' }}>
          <div className="Subdivide">
            {
              this.state.historList.map((item, i) => (
                <Card className="card" key={i}>
                  <Card.Header
                    title={<span className="titleLeft">{item.sportname}</span>}
                    extra={<span className="titleRight">细分标签：{item.tags}</span>}
                  />
                  <Card.Body>
                    <div className="bossname">
                      <div onClick={this.venDuo} data-venueid={item.venueid}>场地编号：{item.venueid}</div>
                      <div>场地数量：{item.sitenumber}</div>
                      <div onClick={this.venDuo} data-venueid={item.opendaynameTwo.slice(1, item.opendaynameTwo.length)}>星期：{item.opendaynameTwo.slice(1, item.opendaynameTwo.length)}</div>
                      <div>时间范围：{item.starttime}~{item.endtime}</div>
                      <div>价格：{item.costperhour}元/时</div>
                      <div>最长提前预定时间：{item.maxScheduledDate === null ? '' : item.maxScheduledDateTwo}</div>
                      <div onClick={this.venDuo} data-venueid={item.appointmenttime / 60 + '小时'}>最短提前预定时间：{item.appointmenttime === null ? '' : item.appointmenttime / 60 + '小时'}</div>
                      <div onClick={item.comment === null ? '' : this.venDuo} data-venueid={item.comment === '' ? '无' : item.comment}>备注：{item.comment === '' ? '无' : item.comment}</div>
                      <div>打折优惠:{item.discount_edate === '' ? '无' : <span style={{ color: '#D85D27', cursor: 'pointer' }} data-sd={item.discount_sdate} data-ed={item.discount_edate} data-st={item.discount_start} data-et={item.discount_end} data-ve={item.discount_venueid} data-cos={item.discount_costperhour} onClick={this.detail}>查看</span>}</div>
                      <div>操作:{item.operation === 1 ? '添加' : item.operation === 2 ? '修改' : item.operation === 3 ? '删除' : '无'}</div>
                      <div style={{ width: '100%' }}>操作时间:{item.intime}</div>
                    </div>
                  </Card.Body>

                </Card>
              ))
            }
            <div style={this.state.historList.length !== 0 ? { display: 'none' } : { width: '100%' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (6).png')} alt="666" /><span style={{ display: 'block', textAlign: 'center' }}>您还没有历史设置!</span></div>
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageThree} total={this.state.otherThree} onChange={this.currentThree} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={this.asyncValueThree}
              style={{ width: '100%' }}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{ color: '#000' }}>{this.state.sportArr[this.state.asyncValueThree].label}</span></div>
            </Picker>

          </div>

        </div>



        <Drawer
          title="添加/修改场地细分"
          placement="bottom"
          height='100%'
          onClose={this.onClose}
          visible={this.state.visibleXi}
        >
          <Picker
            data={this.state.sportArrTwo}
            value={this.state.pickerValue}
            disabled={this.state.upData === 1 ? true : false}
            onOk={v => this.setState({ pickerValue: v, idxTitleTwo: '请选择/添加', chekedArr: [] })}
            cols={1} className="forss">
            <List.Item arrow={this.state.upData === 1 ? 'empty' : 'horizontal'} style={{ borderBottom: '1px solid #E9E9E9' }}>场地类型</List.Item>
          </Picker>
          <List.Item arrow={this.state.upData === 1 ? 'empty' : 'horizontal'} onClick={this.state.upData === 1 ? '' : this.visibleTitle} extra={this.state.idxTitleTwo} style={{ borderBottom: '1px solid #E9E9E9' }}>细分标签</List.Item>
          <List.Item arrow="horizontal" onClick={this.Serial} extra={this.state.chekedArr.length === 0 ? '请选择' : this.state.chekedArr.join(',')} style={{ borderBottom: '1px solid #E9E9E9' }}>场地编号</List.Item>
          <List.Item arrow="empty" extra={this.state.chekedArr.length} style={{ borderBottom: '1px solid #E9E9E9' }}>场地数量</List.Item>
          <div className="btnSub" onClick={this.xifenPush}>提交</div>
        </Drawer>


        <Drawer
          title="选择/添加细分标签"
          placement="bottom"
          height='60%'
          onClose={this.onCloseTitle}
          visible={this.state.visibleTitle}
        >
          <div className="sitePhtitle">
            <div className="titleHead">
              {
                this.state.titleList.map((item, i) => (
                  <div key={i} className="son" style={this.state.idxTitle === item.title ? { background: '#D85D27', color: '#fff' } : {}} data-title={item.title} data-uuid={item.uuid} onClick={this.sonClik}><div onClick={this.delVenueTitle} data-uuid={item.uuid} data-title={item.title} style={item.uuid !== undefined && this.state.idxTitle !== item.title ? {} : { display: 'none' }}>x</div>{item.title}</div>
                ))
              }
            </div>
            <div className="titleHead">
              <span onClick={this.joinTitle}>+新增自定义标签</span>
            </div>
            {/* <div className="btnDetle" style={this.state.titleDetle === true ? { background: '#e9e9e9', color: '#000' } : { background: '#D85D27' }} onClick={this.titleDetle}>{this.state.titleDetle === true ? '取消' : '删除'}</div><span style={{ lineHeight: '1.75rem', fontSize: '0.6rem', color: '#ccc', display: 'block', float: 'left', marginTop: '0.5rem', marginLeft: '0.3rem' }}>(长按某一个标签选择删除)</span> */}
            <div className="btnComfir" onClick={this.btnComfir}>确定</div>

          </div>
        </Drawer>


        <Drawer
          title="自定义细分标签"
          placement="bottom"
          height='100%'
          onClose={this.onCloseTitleTwo}
          visible={this.state.visibleTitleTwo}
        >
          <div className="sitePhtitle">

            <div className="titleHead">
              <InputItem style={{ fontSize: '0.75rem' }} maxLength={5} placeholder-style={{ fontSize: '0.75rem' }} onChange={this.joinTitleC} placeholder="新增标签最多输入5个字符"></InputItem>
            </div>
            <div className="btnComfir" onClick={this.joinTitleTwo}>确定</div>

          </div>
        </Drawer>






        <Drawer
          title="选择场地编号"
          placement="bottom"
          height='70%'
          onClose={this.SerialClose}
          bodyStyle={{ padding: '8px' }}
          visible={this.state.Serial}
        >
          <div className="sitePhSerialHeader"><span onClick={this.reverseC}>反选</span><span onClick={this.allThem}>全选</span></div>
          <div className="sitePhSerial">

            {
              this.state.numArr.map((item, i) => (
                <div key={i} onClick={this.numArrSon} data-num={item.num} style={item.cheked === true ? { background: '#F5A623', color: '#fff' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', opacity: '0.2' } : {}}>{item.num}</div>
              ))
            }
          </div>
          <div className="sitePhFooter" onClick={this.koNumArr}>确定</div>
        </Drawer>





        <Drawer
          title="添加/修改价格设置"
          placement="bottom"
          height='100%'
          onClose={this.onClosePrice}
          visible={this.state.Price}
        >
          <Picker
            data={this.state.sportArrTwo}
            value={[this.state.pickerValueTwo]}
            onOk={this.pickerValueTwo}
            disabled={this.state.jiageUUid !== '' ? true : false}
            cols={1} className="forss">
            <List.Item arrow={this.state.jiageUUid !== '' ? 'empty' : 'horizontal'} style={{ borderBottom: '1px solid #E9E9E9' }}>场地类型</List.Item>
          </Picker>
          <Picker
            data={this.state.titleArr}
            value={this.state.pickerValueThree}
            onOk={this.pickerValueThree}
            disabled={this.state.jiageUUid !== '' ? true : false}
            cols={1} className="forss">
            <List.Item arrow={this.state.jiageUUid !== '' ? 'empty' : 'horizontal'} style={{ borderBottom: '1px solid #E9E9E9' }}>细分标签</List.Item>
          </Picker>

          <List.Item arrow={this.state.jiageUUid !== '' ? 'empty' : 'horizontal'} extra={<span className="bianhao">{this.state.cheStr === '' ? '无' : this.state.cheStr}</span>} style={{ borderBottom: '1px solid #E9E9E9' }}>场地编号</List.Item>
          <List.Item arrow="empty" extra={this.state.titleArrFoterNum} style={{ borderBottom: '1px solid #E9E9E9' }} >场地数量</List.Item>
          <List.Item arrow="horizontal" extra={this.state.Liturgyche} className="lpko" onClick={this.Liturgy} style={{ borderBottom: '1px solid #E9E9E9' }} >星期</List.Item>


          <Picker
            data={this.state.timeRtArr}
            onOk={this.starttime}
            value={this.state.starttime}
            cols={1}
          >
            <List.Item arrow="horizontal">开始时间</List.Item>
          </Picker>


          <Picker
            data={this.state.timeRtArr}
            onOk={this.endtime}
            value={this.state.endtime}
            cols={1}
          >
            <List.Item arrow="horizontal">结束时间</List.Item>
          </Picker>


          <List.Item arrow="empty">
            <InputItem
              type='money'
              placeholder="请输入"
              value={this.state.money}
              onChange={(v) => { this.setState({ money: v }) }}
              onBlur={(v) => { console.log('onBlur', v); }}
              style={{ padding: '0' }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>价格(元/时)</span></InputItem></List.Item>

          <Picker
            data={this.state.Longest}
            value={this.state.pickerValueFour}
            onOk={this.pickerValueFour}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>最长提前预定时间</List.Item>
          </Picker>

          <Picker
            data={this.state.Shortest}
            value={this.state.pickerValueFive}
            onOk={this.pickerValueFive}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>最短提前预定时间</List.Item>
          </Picker>

          <TextareaItem
            title="备注"
            placeholder="请输入"
            maxLength={50}
            value={this.state.comment}
            data-seed="logId"
            ref={el => this.autoFocusInst = el}
            autoHeight
            onChange={this.comment}
          />


          <div className="btnSub" onClick={this.jiageSub}>提交</div>
        </Drawer>



        <Drawer
          title="选择星期"
          placement="bottom"
          height='40%'
          onClose={this.LiturgyClose}
          visible={this.state.Liturgy}
        >
          {
            this.state.LiturgyArr.map((item, i) => (
              <div className="LitName" onClick={this.LiturgySon} data-index={i} style={item.cheked === true ? { color: '#fff', background: '#D85D27' } : {}} key={i}>{item.name}</div>
            ))
          }
          <div className="LitBtn" onClick={this.LiturgyArrChe}>确定</div>


        </Drawer>


        <Drawer
          title={'添加/修改' + this.state.sportSiscount + '优惠设置'}
          placement="bottom"
          height='100%'
          className="kopd"
          onClose={this.specialOfferClose}
          visible={this.state.specialOffer}
        >
          <List.Item extra={this.state.sportSiscount} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">场地类型</List.Item>
          <List.Item extra={this.state.titleSiscount} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty" >细分标签</List.Item>
          <List.Item extra={this.state.xingSiscount} className="lopk" style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">星期</List.Item>
          <List.Item extra={this.state.starttimeSiscount + '~' + this.state.endtimeSiscount} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">时间范围</List.Item>
          <List.Item arrow="horizontal" extra={this.state.venueidSiscountTwo} onClick={this.offer} style={{ borderBottom: '1px solid #E9E9E9' }} >参加优惠的场地</List.Item>
          <DatePicker
            mode="datetime"
            extra="请选择"
            minuteStep={30}
            format="YYYY-MM-DD HH:mm"
            value={this.state.startDate}
            onChange={startDate => this.setState({ startDate })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>优惠期限(开始)</List.Item>
          </DatePicker>

          <DatePicker
            mode="datetime"
            extra="请选择"
            minuteStep={30}
            format="YYYY-MM-DD HH:mm"
            value={this.state.endDate}
            onChange={endDate => this.setState({ endDate })}
          >
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>优惠期限(结束)</List.Item>
          </DatePicker>

          <List.Item style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">
            <InputItem
              type='money'
              placeholder={this.state.moneySiscount}
              onChange={(v) => { this.setState({ moneySiscount: v }) }}
              onBlur={(v) => { console.log('onBlur', v); }}
              style={{ padding: '0' }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            ><span style={{ fontSize: '0.75rem' }}>价格(元/时)</span></InputItem></List.Item>

          <div className="Siscount"><div style={this.state.kop === null ? { display: 'none' } : {}} onClick={() =>
            alert('提示', '您确定要删除该条优惠设置么？删除后用户将无法预订该时间段' + this.state.sportSiscount + '的优惠场地', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => this.DelSiteSettingDiscount({ uuid: this.state.SiscountUUid }) },
            ])} className="leftSiscount">删除</div><div className="leftSiscount" onClick={this.joinSiscount} style={this.state.kop === null ? { width: '100%', borderRadius: '2.5rem' } : { marginLeft: '1%' }}>提交</div></div>

        </Drawer>


        <Drawer
          title="选择优惠场地编号"
          placement="bottom"
          height='70%'
          onClose={this.offerClose}
          visible={this.state.offer}
        >
          <div className="sitePhSerialHeader"><span onClick={this.reverseCTwo}>反选</span><span onClick={this.allThemTwo}>全选</span></div>
          <div className="sitePhSerial">

            {
              this.state.venueidSiscount.map((item, i) => (
                <div key={i} onClick={this.numArrSiscount} data-num={item.num} style={item.cheked === true ? { background: '#F5A623', color: '#fff' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', opacity: '0.2' } : {}}>{item.num}</div>
              ))
            }
          </div>
          <div className="sitePhFooter" onClick={this.koNumArrSiscount}>确定</div>
        </Drawer>


        <Modal
          visible={this.state.venDuo}
          transparent
          maskClosable={true}
          onClose={this.venDuoTwo}
          title="详情"
        >
          <div style={{ width: '100%', height: '50px', wordBreak: 'break-all ' }}>
            {this.state.venueidDuo}
          </div>
        </Modal>

        <Modal
          visible={this.state.detail}
          transparent
          onClose={this.onClose}
          title="折扣优惠详情"

        >
          <div style={{ textAlign: 'left' }}>
            <p>开始日期:{this.state.details.sd}</p>
            <p>结束日期:{this.state.details.ed}</p>
            <p>开始时间:{this.state.details.st}</p>
            <p>结束时间:{this.state.details.et}</p>
            <p style={{ wordBreak: 'break-all' }}>场&nbsp;&nbsp;地&nbsp;&nbsp;号:{this.state.details.ve}</p>
            <p>优惠价格:￥{this.state.details.cos}</p>
          </div>

        </Modal>


      </div>



    )
  }
}


export default sitePh;