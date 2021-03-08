import React from 'react';
import './sitePh.css';
import { Card, Picker, List, Toast, InputItem, Modal, TextareaItem } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, Spin, Calendar } from 'antd';
import { } from '@ant-design/icons';
import { getVenueNumberTitleList, getVenueSportidTitle, getVenueSport, DelVenueTitle,getLabelRelatVenueNumber,VenueRelatSave,getVenueRelatList,VenueRelatRelieve, getVenueTitleSave, getSpecialDaysForVenue, getSiteSelectedVenueid, DelVenueNumberTitle, getSiteSettingHistoryList, DelSiteSetting, AddSiteSetting, getVenueNumberTitleSave, getVenueNumberTitleFirst, getSiteSettingList, getSiteSelectedTitle, getSiteSettingFirst, DelSiteSettingDiscount, SiteSettingDiscountSave } from '../../api';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const alert = Modal.alert;

let moneyKeyboardWrapProps;



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
      { label: '足球6人制', value: 13 },
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
      { label: '足球6人制', value: 13 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    sportArrTwoSo: [
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球（全场）', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球6人制', value: 13 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    sportArrTwoBe: [
      { label: '羽毛球', value: 1 },
      { label: '乒乓球', value: 2 },
      { label: '台球中式黑八', value: 3 },
      { label: '台球美式九球', value: 4 },
      { label: '台球斯诺克', value: 5 },
      { label: '篮球（半场）', value: 6 },
      { label: '足球11人制', value: 7 },
      { label: '足球8人制', value: 8 },
      { label: '足球7人制', value: 9 },
      { label: '足球6人制', value: 13 },
      { label: '足球5人制', value: 10 },
      { label: '排球', value: 11 },
      { label: '网球', value: 12 }
    ],
    selectDaArr: [{ label: '次', value: '次' }, { label: 'H', value: 'H' }, { label: '2H', value: '2H' }, { label: '3H', value: '3H' }, { label: '4H', value: '4H' }, { label: '5H', value: '5H' }, { label: '6H', value: '6H' }],
    ListSportTwo: [{ label: '半场', value: 1 }, { label: '散场', value: 2 }, { label: '全场', value: 5 }],
    ListSportThree: [{ label: '按时(收费)', value: 3 }, { label: '按次(收费)', value: 4 }],
    timeLimitList: [{ label: '不限', value: 1 }, { label: '整点', value: 2 }, { label: '单数整点', value: 3 }, { label: '双数整点', value: 4 }],
    timeLimitListTwo: [{ label: '一小时以上', value: 1 }, { label: '一小时整数倍', value: 2 }, { label: '二小时整数倍', value: 3 }],
    timeRtArr: [{ label: '00:00', value: '00:00' }, { label: '00:30', value: '00:30' }, { label: '01:00', value: '01:00' }, { label: '01:30', value: '01:30' }, { label: '02:00', value: '02:00' }, { label: '02:30', value: '02:30' }, { label: '03:00', value: '03:00' }, { label: '03:30', value: '03:30' }, { label: '04:00', value: '04:00' }, { label: '04:30', value: '04:30' }, { label: '05:00', value: '05:00' }, { label: '05:30', value: '05:30' }, { label: '06:00', value: '06:00' }, { label: '06:30', value: '06:30' }, { label: '07:00', value: '07:00' }, { label: '07:30', value: '07:30' }, { label: '08:00', value: '08:00' }, { label: '08:30', value: '08:30' }, { label: '09:00', value: '09:00' }, { label: '09:30', value: '09:30' }, { label: '10:00', value: '10:00' }, { label: '10:30', value: '10:30' }, { label: '11:00', value: '11:00' }, { label: '11:30', value: '11:30' }, { label: '12:00', value: '12:00' }, { label: '12:30', value: '12:30' }, { label: '13:00', value: '13:00' }, { label: '13:30', value: '13:30' }, { label: '14:00', value: '14:00' }, { label: '14:30', value: '14:30' }, { label: '15:00', value: '15:00' }, { label: '15:30', value: '15:30' }, { label: '16:00', value: '16:00' }, { label: '16:30', value: '16:30' }, { label: '17:00', value: '17:00' }, { label: '17:30', value: '17:30' }, { label: '18:00', value: '18:00' }, { label: '18:30', value: '18:30' }, { label: '19:00', value: '19:00' }, { label: '19:30', value: '19:30' }, { label: '20:00', value: '20:00' }, { label: '20:30', value: '20:30' }, { label: '21:00', value: '21:00' }, { label: '21:30', value: '21:30' }, { label: '22:00', value: '22:00' }, { label: '22:30', value: '22:30' }, { label: '23:00', value: '23:00' }, { label: '23:30', value: '23:30' }, { label: '24:00', value: '24:00' }],
    Longest: [{ label: '一周', value: 0.1 }, { label: '两周', value: 0.2 }, { label: '三周', value: 0.3 }, { label: '一个月', value: 1 }, { label: '两个月', value: 2 },],
    Shortest: [{ label: '不限', value: 0 }, { label: '30分钟', value: 30 }, { label: '60分钟', value: 60 }, { label: '2小时', value: 120 }, { label: '3小时', value: 180 }, { label: '4小时', value: 240 }, { label: '6小时', value: 360 }, { label: '24小时', value: 1440 }, { label: '2天', value: 2280 }, { label: '3天', value: 4320 }, { label: '4天', value: 5760 }, { label: '5天', value: 7200 }, { label: '6天', value: 8640 }, { label: '7天', value: 10080 }, { label: '8天', value: 11520 }, { label: '9天', value: 12960 }, { label: '10天', value: 14400 }, { label: '11天', value: 15840 }, { label: '12天', value: 17280 }, { label: '13天', value: 18720 }, { label: '14天', value: 20160 }, { label: '15天', value: 21600 },],
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
    idxTitleThree: '请选择/添加',
    Serial: false,
    numArr: [],
    chekedArr: [],
    chekedArrLen: 0,
    upData: 0,
    firstUUid: '',
    siteList: [],
    otherTwo: 0,
    pageTwo: 1,
    asyncValueTwo: 0,
    asyncValueThree: 0,
    asyncValueFour:0,
    spin: true,
    Price: false,
    pickerValueTwo: '',
    typeTwo: [0],
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
    appointmenttimeTwo: [],
    comment: '',
    tagId: '',
    tags_type: 0,
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
    details: [],
    dateArr: [],
    timeFalg: true,
    timeLimit: [1],
    timeLimitTwo: [1],
    selectDa: [''],
    withDayIndex: '1',
    withDayList: [],
    relatedness:false,
    relatednessRunid:'',
    connectedOne:[],
    connectedName: '',
    connectedOneLen: 0,
    relatednessRunidTwo: '',
    connectedTwo: false,
    connectedNameTwo: '',
    connectedOneTwo: '',
    connectedOneLenTwo: 0,
    arrNum:[],
    pageFour:1,
    relatList:[],
  }

  header = e => {
    this.setState({
      index: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index === '1') {
      this.getVenueNumberTitleList({ page: 1, sportid: this.state.asyncValue })
      this.setState({ asyncValue: this.state.asyncValueTwo, page: 1 })
    } else if (e.currentTarget.dataset.index === '2') {
      this.getSiteSettingList({ page: 1, sportid: this.state.asyncValue })
      this.setState({ asyncValueTwo: this.state.asyncValue, pageTwo: 1 })
    } else if (e.currentTarget.dataset.index === '3') {
      this.getSiteSettingHistoryList({ page: 1, sportid: this.state.asyncValue })
      this.setState({ asyncValueThree: this.state.asyncValue, pageThree: 1 })
    }else if(e.currentTarget.dataset.index === '4'){
      this.getVenueRelatList({page:this.state.pageFour,sportid:this.state.asyncValue})
      this.setState({ asyncValueFour: this.state.asyncValue, pageFour: 1 })
    }
    
  }



  async getVenueSport(data) {
    const res = await getVenueSport(data, localStorage.getItem('venue_token'))
    let sp = res.data.data
    let arr = []
    for (let i in sp) {
      let obj = { label: sp[i].name, value: sp[i].id }
      arr.push(obj)
    }
    this.setState({ sportArrTwo: arr })
  }

  componentDidMount() {
    let now = new Date()
    let kpo = now.setMinutes(now.getMinutes() - now.getMinutes());
    let kpotWO = now.setMinutes(now.getMinutes() - now.getMinutes() + 30);
    this.getVenueSport()
    this.getVenueNumberTitleList({ page: 1, sportid: '' })
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
        }else if (res.data.data[i].sportid === 13) {
          res.data.data[i].sportid = '足球6人制'
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

  currentFour = (page, pageSize) => {
    this.setState({
      pageFour: page
    })
    this.getVenueRelatList({ page: page, sportid: this.state.asyncValueFour })
  }
  visibleXi = () => {
    this.setState({ visibleXi: true, chekedArr: [], chekedArrLen: 0 })
  }
  onClose = () => {
    this.setState({ visibleXi: false, upData: 0, firstUUid: '', detail: false,relatedness:false })
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
    } else if (this.state.joinTitleC === '半场' || this.state.joinTitleC === '散场' || this.state.joinTitleC === '按次' || this.state.joinTitleC === '按时' || this.state.joinTitleC === '全场') {
      Toast.fail('该标签不可设置', 1);
    } else {
      this.getVenueTitleSave({ sportid: this.state.pickerValue[0], title: this.state.joinTitleC, uuid: '' })
    }
  }

  sonClik = e => {

    this.setState({ idxTitle: e.currentTarget.dataset.title })

  }
  btnComfir = () => {
    if (this.state.idxTitle === '') {
      Toast.fail('请选择标签', 1);
    } else {
      this.setState({ visibleTitle: false, idxTitleTwo: this.state.idxTitle, chekedArr: [], chekedArrLen: 0 })
    }
  }

  async getSiteSelectedVenueid(data) {
    const res = await getSiteSelectedVenueid(data, localStorage.getItem('venue_token'))
    if (this.state.Serial === true) {
      if (this.state.typeTwo[0] === 1||this.state.typeTwo[0] === 2 || this.state.pickerValue[0] === 2) {
        for (let j in res.data.data) {
          for (let i in this.state.numArr) {
            if (this.state.numArr.length === 48) {
              if (this.state.numArr[47].cheked === true) {
                this.state.numArr[i].cheked = 'no'
                this.state.numArr[47].cheked = true
              } else {
                if (this.state.numArr[i].num === res.data.data[j]) {
                  this.state.numArr[parseInt(this.state.numArr[i].id)].cheked = 'no'
                }
              }
            } else {
              if (this.state.numArr[i].num === res.data.data[j]) {
                this.state.numArr[parseInt(this.state.numArr[i].id)].cheked = 'no'
              }
            }
            for (let k in this.state.chekedArr) {
              if (this.state.chekedArr[k] === this.state.numArr[i].num) {
                this.state.numArr[parseInt(this.state.numArr[i].id)].cheked = true
              }
            }
          }
        }
        this.setState({ numArr: this.state.numArr })
      } else {
        for (let j in res.data.data) {
          for (let i in this.state.numArr) {
            if (this.state.numArr[i].num === Number(res.data.data[j])) {
              console.log()
              this.state.numArr[this.state.numArr[i].num - 1].cheked = 'no'
            }
          }
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
  }


  Serial = () => {
    if (this.state.idxTitleTwo === '' || this.state.idxTitleTwo === '请选择/添加') {
      Toast.fail('请选择细分标签', 1);
    } else if (this.state.pickerValue[0] === 6 && this.state.typeTwo[0] === 0) {
      Toast.fail('请选择场地类型', 1);
    } else {
      if (this.state.pickerValue[0] === 6 || this.state.pickerValue[0] === 2) {
        if (this.state.typeTwo[0] === 2) {
          this.setState({
            numArr: [
              { num: '1A', cheked: false, id: 0 },
              { num: '1B', cheked: false, id: 1 },
              { num: '2A', cheked: false, id: 2 },
              { num: '2B', cheked: false, id: 3 },
              { num: '3A', cheked: false, id: 4 },
              { num: '3B', cheked: false, id: 5 },
              { num: '4A', cheked: false, id: 6 },
              { num: '4B', cheked: false, id: 7 },
              { num: '5A', cheked: false, id: 8 },
              { num: '5B', cheked: false, id: 9 },
              { num: '6A', cheked: false, id: 10 },
              { num: '6B', cheked: false, id: 11 },
              { num: '7A', cheked: false, id: 12 },
              { num: '7B', cheked: false, id: 13 },
              { num: '8A', cheked: false, id: 14 },
              { num: '8B', cheked: false, id: 15 },
              { num: '9A', cheked: false, id: 16 },
              { num: '9B', cheked: false, id: 17 },
              { num: '10A', cheked: false, id: 18 },
              { num: '10B', cheked: false, id: 19 },
              { num: '11A', cheked: false, id: 20 },
              { num: '11B', cheked: false, id: 21 },
              { num: '12A', cheked: false, id: 22 },
              { num: '12B', cheked: false, id: 23 },
              { num: '13A', cheked: false, id: 24 },
              { num: '13B', cheked: false, id: 25 },
              { num: '14A', cheked: false, id: 26 },
              { num: '14B', cheked: false, id: 27 },
              { num: '15A', cheked: false, id: 28 },
              { num: '15B', cheked: false, id: 29 },
              { num: '16A', cheked: false, id: 30 },
              { num: '16B', cheked: false, id: 31 },
              { num: '17A', cheked: false, id: 32 },
              { num: '17B', cheked: false, id: 33 },
              { num: '18A', cheked: false, id: 34 },
              { num: '18B', cheked: false, id: 35 },
              { num: '19A', cheked: false, id: 36 },
              { num: '19B', cheked: false, id: 37 },
              { num: '20A', cheked: false, id: 38 },
              { num: '20B', cheked: false, id: 39 },
              { num: '21A', cheked: false, id: 40 },
              { num: '21B', cheked: false, id: 41 },
              { num: '22A', cheked: false, id: 42 },
              { num: '22B', cheked: false, id: 43 },
              { num: '23A', cheked: false, id: 44 },
              { num: '23B', cheked: false, id: 45 },
              { num: '24A', cheked: false, id: 46 },
              { num: '场地不固定', cheked: false, id: 47 }]
          })
        } else if (this.state.typeTwo[0] === 1) {
          this.setState({
            numArr: [
              { num: '1A', cheked: false, id: 0 },
              { num: '1B', cheked: false, id: 1 },
              { num: '2A', cheked: false, id: 2 },
              { num: '2B', cheked: false, id: 3 },
              { num: '3A', cheked: false, id: 4 },
              { num: '3B', cheked: false, id: 5 },
              { num: '4A', cheked: false, id: 6 },
              { num: '4B', cheked: false, id: 7 },
              { num: '5A', cheked: false, id: 8 },
              { num: '5B', cheked: false, id: 9 },
              { num: '6A', cheked: false, id: 10 },
              { num: '6B', cheked: false, id: 11 },
              { num: '7A', cheked: false, id: 12 },
              { num: '7B', cheked: false, id: 13 },
              { num: '8A', cheked: false, id: 14 },
              { num: '8B', cheked: false, id: 15 },
              { num: '9A', cheked: false, id: 16 },
              { num: '9B', cheked: false, id: 17 },
              { num: '10A', cheked: false, id: 18 },
              { num: '10B', cheked: false, id: 19 },
              { num: '11A', cheked: false, id: 20 },
              { num: '11B', cheked: false, id: 21 },
              { num: '12A', cheked: false, id: 22 },
              { num: '12B', cheked: false, id: 23 },
              { num: '13A', cheked: false, id: 24 },
              { num: '13B', cheked: false, id: 25 },
              { num: '14A', cheked: false, id: 26 },
              { num: '14B', cheked: false, id: 27 },
              { num: '15A', cheked: false, id: 28 },
              { num: '15B', cheked: false, id: 29 },
              { num: '16A', cheked: false, id: 30 },
              { num: '16B', cheked: false, id: 31 },
              { num: '17A', cheked: false, id: 32 },
              { num: '17B', cheked: false, id: 33 },
              { num: '18A', cheked: false, id: 34 },
              { num: '18B', cheked: false, id: 35 },
              { num: '19A', cheked: false, id: 36 },
              { num: '19B', cheked: false, id: 37 },
              { num: '20A', cheked: false, id: 38 },
              { num: '20B', cheked: false, id: 39 },
              { num: '21A', cheked: false, id: 40 },
              { num: '21B', cheked: false, id: 41 },
              { num: '22A', cheked: false, id: 42 },
              { num: '22B', cheked: false, id: 43 },
              { num: '23A', cheked: false, id: 44 },
              { num: '23B', cheked: false, id: 45 },
              { num: '24A', cheked: false, id: 46 },
            ]
          })
        } else if (this.state.typeTwo[0] === 3) {
          this.setState({
            numArr: [
              { num: '1', cheked: false, id: 0 },
              { num: '2', cheked: false, id: 1 },
              { num: '3', cheked: false, id: 2 },
              { num: '4', cheked: false, id: 3 },
              { num: '5', cheked: false, id: 4 },
              { num: '6', cheked: false, id: 5 },
              { num: '7', cheked: false, id: 6 },
              { num: '8', cheked: false, id: 7 },
              { num: '9', cheked: false, id: 8 },
              { num: '10', cheked: false, id: 9 },
              { num: '11', cheked: false, id: 10 },
              { num: '12', cheked: false, id: 11 },
              { num: '13', cheked: false, id: 12 },
              { num: '14', cheked: false, id: 13 },
              { num: '15', cheked: false, id: 14 },
              { num: '16', cheked: false, id: 15 },
              { num: '17', cheked: false, id: 16 },
              { num: '18', cheked: false, id: 17 },
              { num: '19', cheked: false, id: 18 },
              { num: '20', cheked: false, id: 19 },
              { num: '21', cheked: false, id: 20 },
              { num: '22', cheked: false, id: 21 },
              { num: '23', cheked: false, id: 22 },
              { num: '24', cheked: false, id: 23 },
              { num: '25', cheked: false, id: 24 },
              { num: '26', cheked: false, id: 25 },
              { num: '27', cheked: false, id: 26 },
              { num: '28', cheked: false, id: 27 },
              { num: '29', cheked: false, id: 28 },
              { num: '30', cheked: false, id: 29 },
              { num: '31', cheked: false, id: 30 },
              { num: '32', cheked: false, id: 31 },
              { num: '33', cheked: false, id: 32 },
              { num: '34', cheked: false, id: 33 },
              { num: '35', cheked: false, id: 34 },
              { num: '36', cheked: false, id: 35 },
              { num: '37', cheked: false, id: 36 },
              { num: '38', cheked: false, id: 37 },
              { num: '39', cheked: false, id: 38 },
              { num: '40', cheked: false, id: 39 },
              { num: '41', cheked: false, id: 40 },
              { num: '42', cheked: false, id: 41 },
              { num: '43', cheked: false, id: 42 },
              { num: '44', cheked: false, id: 43 },
              { num: '45', cheked: false, id: 44 },
              { num: '46', cheked: false, id: 45 },
              { num: '47', cheked: false, id: 46 },
            ]
          })
        } else if (this.state.typeTwo[0] === 4) {
          this.setState({
            numArr: [
              { num: '1', cheked: false, id: 0 },
              { num: '2', cheked: false, id: 1 },
              { num: '3', cheked: false, id: 2 },
              { num: '4', cheked: false, id: 3 },
              { num: '5', cheked: false, id: 4 },
              { num: '6', cheked: false, id: 5 },
              { num: '7', cheked: false, id: 6 },
              { num: '8', cheked: false, id: 7 },
              { num: '9', cheked: false, id: 8 },
              { num: '10', cheked: false, id: 9 },
              { num: '11', cheked: false, id: 10 },
              { num: '12', cheked: false, id: 11 },
              { num: '13', cheked: false, id: 12 },
              { num: '14', cheked: false, id: 13 },
              { num: '15', cheked: false, id: 14 },
              { num: '16', cheked: false, id: 15 },
              { num: '17', cheked: false, id: 16 },
              { num: '18', cheked: false, id: 17 },
              { num: '19', cheked: false, id: 18 },
              { num: '20', cheked: false, id: 19 },
              { num: '21', cheked: false, id: 20 },
              { num: '22', cheked: false, id: 21 },
              { num: '23', cheked: false, id: 22 },
              { num: '24', cheked: false, id: 23 },
              { num: '25', cheked: false, id: 24 },
              { num: '26', cheked: false, id: 25 },
              { num: '27', cheked: false, id: 26 },
              { num: '28', cheked: false, id: 27 },
              { num: '29', cheked: false, id: 28 },
              { num: '30', cheked: false, id: 29 },
              { num: '31', cheked: false, id: 30 },
              { num: '32', cheked: false, id: 31 },
              { num: '33', cheked: false, id: 32 },
              { num: '34', cheked: false, id: 33 },
              { num: '35', cheked: false, id: 34 },
              { num: '36', cheked: false, id: 35 },
              { num: '37', cheked: false, id: 36 },
              { num: '38', cheked: false, id: 37 },
              { num: '39', cheked: false, id: 38 },
              { num: '40', cheked: false, id: 39 },
              { num: '41', cheked: false, id: 40 },
              { num: '42', cheked: false, id: 41 },
              { num: '43', cheked: false, id: 42 },
              { num: '44', cheked: false, id: 43 },
              { num: '45', cheked: false, id: 44 },
              { num: '46', cheked: false, id: 45 },
              { num: '47', cheked: false, id: 46 },
              { num: '场地不固定', cheked: false, id: 47 }
            ]
          })
        }else{
          let numArr = []
          for (let i = 1; i <= 100; i++) {
            let obj = { num: i, cheked: false }
            numArr.push(obj)
          }
          this.setState({ numArr: numArr })
        }


        this.getSiteSelectedVenueid({ sportid: this.state.pickerValue[0] })
        this.setState({
          Serial: true
        })

      } else {

        this.setState({ Serial: true })
        let numArr = []
        for (let i = 1; i <= 100; i++) {
          let obj = { num: i, cheked: false }
          numArr.push(obj)
        }
        this.setState({ numArr: numArr })
        this.getSiteSelectedVenueid({ sportid: this.state.pickerValue[0] })
      }
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

    if (this.state.typeTwo[0] === 1||this.state.typeTwo[0] === 2 || this.state.pickerValue[0] === 2) {
      if (items[e.currentTarget.dataset.id].cheked === true) {
        items[e.currentTarget.dataset.id].cheked = false
      } else if (items[e.currentTarget.dataset.id].cheked === false) {
        items[e.currentTarget.dataset.id].cheked = true
      }
      if (e.currentTarget.dataset.num === '场地不固定') {

        if (items[47].cheked === true) {
          for (let i in items) {
            items[i].cheked = 'no'
            items[47].cheked = true
          }
        } else {
          for (let i in items) {
            items[i].cheked = false
          }
          this.getSiteSelectedVenueidTwo({ sportid: this.state.pickerValue[0] })
        }
      }
      this.setState({
        numArr: items
      })
    } else {
      if (items[parseInt(e.currentTarget.dataset.num) - 1].cheked !== 'no') {
        items[parseInt(e.currentTarget.dataset.num) - 1].cheked = !items[parseInt(e.currentTarget.dataset.num) - 1].cheked
        this.setState({ numArr: items })
      }
    }
  }

  async getSiteSelectedVenueidTwo(data) {
    const res = await getSiteSelectedVenueid(data, localStorage.getItem('venue_token'))
    if (this.state.pickerValue[0] === 6) {
      for (let j in res.data.data) {
        for (let i in this.state.numArr) {
          if (this.state.numArr[i].num === res.data.data[j]) {
            this.state.numArr[parseInt(this.state.numArr[i].id)].cheked = 'no'
          }
          for (let k in this.state.chekedArr) {
            if (this.state.chekedArr[k] === this.state.numArr[i].num) {
              this.state.numArr[parseInt(this.state.numArr[i].id)].cheked = false
            }
          }
        }
      }
      this.setState({ numArr: this.state.numArr })
    }
  }




  reverseC = () => {
    let items = this.state.numArr
    for (let i in items) {
      if (items[i].cheked === false && items[i].num !== '场地不固定') {
        items[i].cheked = true
        this.setState({ numArr: items })
      } else if (items[i].cheked === true && items[i].num !== '场地不固定') {
        items[i].cheked = false
        this.setState({ numArr: items })
      }
    }
    this.setState({ numArr: this.state.numArr })
  }

  allThem = () => {
    let items = this.state.numArr
    for (let i in items) {
      if (items[i].cheked === false && items[i].num !== '场地不固定') {
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
        this.setState({ Serial: false, chekedArr: chekedArr, chekedArrLen: chekedArr.length })
      
    }
  }


  async DelVenueNumberTitle(data) {
    const res = await DelVenueNumberTitle(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.titleLise.length === 1) {
        this.getVenueNumberTitleList({ page: this.state.page - 1, sportid: this.state.asyncValue })
        this.setState({ page: this.state.page - 1 })
      } else {
        this.getVenueNumberTitleList({ page: this.state.page, sportid: this.state.asyncValue })
        this.setState({ page: this.state.page })
      }
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
      this.setState({ visibleXi: false, firstUUid: '', upData: 0, page: this.state.page, typeTwo: [0], idxTitleTwo: '请选择/添加' })
      this.getVenueNumberTitleList({ page: this.state.page, sportid: this.state.asyncValue })
    } else {
      Toast.fail(res.data.msg, 1);
    }
  }

  xifenPush = () => {
    let { pickerValue, idxTitleTwo, chekedArr, chekedArrLen } = this.state
    if (pickerValue.length === 0) {
      Toast.fail('请选择场地类型', 1);
    } else if (idxTitleTwo === '' || idxTitleTwo === '请选择/添加') {
      Toast.fail('请选择细分标签', 1);
    } else if (chekedArr.length === 0) {
      Toast.fail('请选择场地编号', 1);
    } else if (this.state.pickerValue[0] === 6 && this.state.pickerValue[0] === 2 && this.state.typeTwo[0] === 0) {
      Toast.fail('请选择场地类型', 1);
    } else {
      let title = idxTitleTwo.indexOf('-') === -1 ? this.state.typeTwo[0] === 2 ? idxTitleTwo + '-散场' : this.state.typeTwo[0] === 1 ? idxTitleTwo + '-半场' : this.state.typeTwo[0] === 3 ? idxTitleTwo + '-按时' : this.state.typeTwo[0] === 4 ? idxTitleTwo + '-按次' : this.state.typeTwo[0] === 5 ? idxTitleTwo + '-全场' : idxTitleTwo : idxTitleTwo
      this.getVenueNumberTitleSave({ sportid: pickerValue[0], title: title, venueid: chekedArr.join(','), number: chekedArrLen, uuid: this.state.firstUUid, type: this.state.typeTwo[0] })
    }
  }

  async getVenueNumberTitleFirst(data) {
    const res = await getVenueNumberTitleFirst(data, localStorage.getItem('venue_token'))
    this.setState({
      pickerValue: [res.data.data[0].sportid], idxTitleTwo: res.data.data[0].title, chekedArr: res.data.data[0].venueid.split(','), chekedArrLen: res.data.data[0].venueid.split(',').length, koArr: res.data.data[0].venueid.split(','), firstUUid: res.data.data[0].uuid, typeTwo: [res.data.data[0].type]
    })
  }

  upData = e => {
    this.setState({ visibleXi: true, upData: 1 })
    this.getVenueNumberTitleFirst({ uuid: e.currentTarget.dataset.uuid })

  }



  async getSiteSettingList(data) {
    const res = await getSiteSettingList(data, localStorage.getItem('venue_token'))
    for (let i in res.data.data) {
      if (res.data.data[i].maxScheduledDate_cg === '0.1') {
        res.data.data[i].maxScheduledDateTwo = '1周'
      } else if (res.data.data[i].maxScheduledDate_cg === '0.2') {
        res.data.data[i].maxScheduledDateTwo = '2周'
      } else if (res.data.data[i].maxScheduledDate_cg === '0.3') {
        res.data.data[i].maxScheduledDateTwo = '3周'
      } else if (res.data.data[i].maxScheduledDate_cg === '1') {
        res.data.data[i].maxScheduledDateTwo = '1个月'
      } else if (res.data.data[i].maxScheduledDate_cg === '2') {
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
      if (res.data.data[i].maxScheduledDate_cg === '0.1') {
        res.data.data[i].maxScheduledDateTwo = '1周'
      } else if (res.data.data[i].maxScheduledDate_cg === '0.2') {
        res.data.data[i].maxScheduledDateTwo = '2周'
      } else if (res.data.data[i].maxScheduledDate_cg === '0.3') {
        res.data.data[i].maxScheduledDateTwo = '3周'
      } else if (res.data.data[i].maxScheduledDate_cg === '1') {
        res.data.data[i].maxScheduledDateTwo = '1个月'
      } else if (res.data.data[i].maxScheduledDate_cg === '2') {
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
    this.setState({ asyncValue: e[0], asyncValueTwo: e[0], pageTwo: 1 })
    this.getSiteSettingList({ page: 1, sportid: e[0] })
  }

  asyncValueThree = e => {
    this.setState({ asyncValue: e[0], asyncValueThree: e[0], pageThree: 1 })
    this.getSiteSettingHistoryList({ page: 1, sportid: e[0] })
  }
  asyncValueFour=e=>{
    this.setState({ asyncValue: e[0], asyncValueFour: e[0], pageFour: 1 })
    this.getVenueRelatList({ page: 1, sportid: e[0] })
  }


  async DelSiteSetting(data) {
    const res = await DelSiteSetting(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('删除成功', 1);
      if (this.state.siteList.length === 1) {
        this.setState({ pageTwo: this.state.pageTwo - 1 })
        this.getSiteSettingList({ page: this.state.pageTwo - 1, sportid: this.state.asyncValueTwo })
      } else {
        this.setState({ pageTwo: this.state.pageTwo })
        this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
      }

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
        this.setState({
          cheStr: this.state.titleArrFoter[i].venueid, titleArrFoterNum: this.state.titleArrFoter[i].number, tagId: this.state.titleArrFoter[i].uuid,
          tags_type: this.state.titleArrFoter[i].type,
        })
      }
    }

    if (this.state.titleArr[v].label.indexOf('散') !== -1) {
      this.setState({ timeFalg: 'no',pickerValueFive: -1, starttime: ['00:00'], endtime: ['24:00'], })
    } else if (this.state.titleArr[v].label.indexOf('按次') !== -1) {
      this.setState({ timeFalg: 'yes',pickerValueFive: -1, starttime: ['00:00'], endtime: ['24:00'], })
    } else if (this.state.titleArr[v].label.indexOf('散') !== -1 || this.state.titleArr[v].label.indexOf('按次') !== -1) {
      this.setState({ pickerValueFive: -1, starttime: ['00:00'], endtime: ['24:00'], timeFalg: false })
    } else {
      this.setState({ pickerValueFive: '', timeFalg: true })
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
      this.setState({ Price: false, jiageUUid: '', pickerValueThree: [], cheStr: '' })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
    } else {
      Toast.fail(res.data.msg, 2);
    }

  }
  comment = e => {
    this.setState({ comment: e })
  }

  jiageSub = () => {

    let { pickerValueTwo, pickerValueThree, timeLimit, timeLimitTwo, selectDa, Liturgyche, starttime, endtime, money, cheStr, titleArrFoterNum, pickerValueFour, pickerValueFive, tags_type, comment, tagId, titleArr, LiturgycheNum, jiageUUid } = this.state
    if (pickerValueTwo === '') {
      Toast.fail('请选择场地类型', 1);
    } else if (pickerValueThree.length === 0) {
      Toast.fail('请选择细分标签', 1);
    } else if (titleArr[pickerValueThree].label.indexOf('散场') === -1 && titleArr[pickerValueThree].label.indexOf('按次') === -1 && Liturgyche === '请选择') {
      Toast.fail('请选择星期', 1);
    } else if (starttime.length === undefined) {
      Toast.fail('请选择开始时间', 1);
    } else if (endtime.length === undefined) {
      Toast.fail('请选择结束时间', 1);
    } else if (money === '') {
      Toast.fail('请输入价格', 1); 
    } else if (pickerValueFour.length === 0) {
      Toast.fail('请选择最长提前预定时间', 1);
    } else if (pickerValueFive.length === 0) {
      Toast.fail('请选择最短提前预定时间', 1)

    } else {
      let obj = {
        uuid: jiageUUid,
        sportid: pickerValueTwo,
        sportname: pickerValueTwo === 1 ? '羽毛球' : pickerValueTwo === 2 ? '乒乓球' : pickerValueTwo === 3 ? '台球中式黑八' : pickerValueTwo === 4 ? '台球美式九球' : pickerValueTwo === 5 ? '台球斯诺克' : pickerValueTwo === 6 ? '篮球' : pickerValueTwo === 7 ? '足球11人制' : pickerValueTwo === 8 ? '足球8人制' : pickerValueTwo === 9 ? '足球7人制':pickerValueTwo === 13 ? '足球6人制' : pickerValueTwo === 10 ? '足球5人制' : pickerValueTwo === 11 ? '排球' : pickerValueTwo === 12 ? '网球' : '',
        tags: titleArr[pickerValueThree].label,
        openday: titleArr[pickerValueThree].label.indexOf('散场') !== -1 || titleArr[pickerValueThree].label.indexOf('按次') !== -1 ? '1,2,3,4,5,6,7' : LiturgycheNum,
        opendayname: Liturgyche,
        starttime: starttime[0],
        endtime: endtime[0],
        costperhour_cg: Number(money).toFixed(2),
        venueid: cheStr,
        sitenumber: titleArrFoterNum,
        maxScheduledDate_cg: pickerValueFour[0],
        appointmenttime_cg: pickerValueFive[0] === undefined ? 0 : pickerValueFive[0],
        comment: comment,
        tags_id: tagId,
        tags_type: tags_type,
        timelimit: timeLimit[0],
        durationlimit: timeLimitTwo[0],
        priceunit: selectDa[0]
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
              if (that.state.titleArr[i].label.indexOf('散') !== -1) {
                this.setState({ timeFalg: 'no', starttime: ['00:00'], endtime: ['24:00'], pickerValueFive: -1, })
              } else if (that.state.titleArr[i].label.indexOf('按次') !== -1) {
                this.setState({ timeFalg: 'yes', starttime: ['00:00'], endtime: ['24:00'], pickerValueFive: -1, })
              } else if (that.state.titleArr[i].label.indexOf('散') !== -1 || that.state.titleArr[i].label.indexOf('按次') !== -1) {
                this.setState({ pickerValueFive: -1, starttime: ['00:00'], endtime: ['24:00'], timeFalg: false })
              } else {
                this.setState({ pickerValueFive: [res.data.data[0].appointmenttime_cg], starttime: [res.data.data[0].starttime], endtime: [res.data.data[0].endtime], timeFalg: true })
              }
              that.setState({ pickerValueThree: [that.state.titleArr[i].value]})
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
          LiturgycheNum: res.data.data[0].openday, Liturgyche: p.join(','),
          money: res.data.data[0].costperhour_cg, pickerValueFour: [Number(res.data.data[0].maxScheduledDate_cg)],
          tagId: res.data.data[0].tags_id,
          tags_type: res.data.data[0].tags_type,
          comment: res.data.data[0].comment,
          timeLimit: [res.data.data[0].timelimit],
          timeLimitTwo: [res.data.data[0].durationlimit],
          selectDa: [res.data.data[0].priceunit]
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
        let g = res.data.data[0].venueid === null ? [] : res.data.data[0].venueid.split(',')
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
          kop: res.data.data[0].discount_costperhour_cg,
          SiscountUUid: res.data.data[0].uuid,
          specialOffer: true, sportSiscount: res.data.data[0].sportname, titleSiscount: res.data.data[0].tags, xingSiscount: p.join(','),
          moneySiscount: res.data.data[0].discount_costperhour_cg === null ? res.data.data[0].costperhour_cg : res.data.data[0].discount_costperhour_cg,
          startDate: res.data.data[0].discount_sdate === null ? this.state.startDate : new Date(res.data.data[0].discount_sdate + ' ' + res.data.data[0].discount_start),
          endDate: res.data.data[0].discount_edate === null ? this.state.endDate : new Date(res.data.data[0].discount_edate + ' ' + res.data.data[0].discount_end),
          starttimeSiscount: res.data.data[0].starttime, endtimeSiscount: res.data.data[0].endtime, venueidSiscount: kol, venueidSiscountTwo: res.data.data[0].venueid === null ? '请选择' : res.data.data[0].venueid,
          appointmenttimeTwo: [res.data.data[0].discount_appointment === null ? res.data.data[0].appointmenttime_cg : res.data.data[0].discount_appointment], withDayList: res.data.data[0].discount_date === null ? [] : res.data.data[0].discount_date.split(','),
        })
      }
    }
  }

  jiaUpdata = e => {
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
      this.setState({ specialOffer: false, specialOfferH: 0 })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }

  async SiteSettingDiscountSave(data) {
    const res = await SiteSettingDiscountSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ specialOffer: false, specialOfferH: 0 })
      this.getSiteSettingList({ page: this.state.pageTwo, sportid: this.state.asyncValueTwo })
      Toast.success('提交成功', 2);
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }

  pickerValueFiveTwo = e => {
    this.setState({ appointmenttimeTwo: e })
  }

  joinSiscount = () => {
    let { SiscountUUid, withDayList, appointmenttimeTwo, moneySiscount } = this.state

    let obj = {
      uuid: SiscountUUid,
      discount_date: withDayList.join(','),
      discount_costperhour_cg: moneySiscount,
      discount_appointment_cg: appointmenttimeTwo[0]
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

  onPanelChange = (date) => {
    console.log(date)
    let dateSelect = date.format('YYYY-MM-DD')
    let dateArr = []
    if (this.state.withDayList.indexOf(dateSelect) === -1) {
      dateArr.push(dateSelect)
      this.setState({ withDayList: [...this.state.withDayList, ...dateArr] })
    }
  }
  deletDate = () => {
    this.setState({ dateArr: this.state.dateArr.slice(0, this.state.dateArr.length - 1) })
  }

  timeLimit = (e) => {
    this.setState({ timeLimit: e })
  }
  timeLimitTwo = (e) => {
    this.setState({ timeLimitTwo: e })
  }
  selectDa = e => {
    this.setState({ selectDa: e })
  }

  async getSpecialDaysForVenue(data) {
    const res = await getSpecialDaysForVenue(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ withDayList: res.data.data })
    } else {
      Toast.fail(res.data.msg, 2);
    }
  }
  withDay = e => {
    this.getSpecialDaysForVenue({ type: e.currentTarget.dataset.date })
    this.setState({ withDayIndex: e.currentTarget.dataset.date })
  }

  colseWithDay=e=>{
    let p=this.state.withDayList
    p.splice(p.indexOf(e.currentTarget.dataset.date),1)
    this.setState({withDayList:p})
  }
  relatedness=()=>{
    this.setState({relatedness:true})
  }

  async getLabelRelatVenueNumber(data) {
    const res = await getLabelRelatVenueNumber(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let arrd = res.data.data
      let data = this.state.arrNum
      for (let j in arrd) {
        for (let i in data) {
          if (data[i].id.toString() === arrd[j]) {
            data[i].cheked = 'no'
          }
        }
      }

      this.setState({ arrNum: data })

    } else {
      Toast.fail(res.data.msg)
    }
  }


  connected = (e) => {
    if (this.state.relatednessRunid !== '') {
      let num = e.currentTarget.dataset.num
      let arrNum=[]
       if(this.state.relatednessRunid[0] === 2){
        arrNum=[
          { id: '1', cheked: false, num: 0 },
          { id: '2', cheked: false, num: 1 },
          { id: '3', cheked: false, num: 2 },
          { id: '4', cheked: false, num: 3 },
          { id: '5', cheked: false, num: 4 },
          { id: '6', cheked: false, num: 5 },
          { id: '7', cheked: false, num: 6 },
          { id: '8', cheked: false, num: 7 },
          { id: '9', cheked: false, num: 8 },
          { id: '10', cheked: false, num: 9 },
          { id: '11', cheked: false, num: 10 },
          { id: '12', cheked: false, num: 11 },
          { id: '13', cheked: false, num: 12 },
          { id: '14', cheked: false, num: 13 },
          { id: '15', cheked: false, num: 14 },
          { id: '16', cheked: false, num: 15 },
          { id: '17', cheked: false, num: 16 },
          { id: '18', cheked: false, num: 17 },
          { id: '19', cheked: false, num: 18 },
          { id: '20', cheked: false, num: 19 },
          { id: '21', cheked: false, num: 20 },
          { id: '22', cheked: false, num: 21 },
          { id: '23', cheked: false, num: 22 },
          { id: '24', cheked: false, num: 23 },
          { id: '25', cheked: false, num: 24 },
          { id: '26', cheked: false, num: 25 },
          { id: '27', cheked: false, num: 26 },
          { id: '28', cheked: false, num: 27 },
          { id: '29', cheked: false, num: 28 },
          { id: '30', cheked: false, num: 29 },
          { id: '31', cheked: false, num: 30 },
          { id: '32', cheked: false, num: 31 },
          { id: '33', cheked: false, num: 32 },
          { id: '34', cheked: false, num: 33 },
          { id: '35', cheked: false, num: 34 },
          { id: '36', cheked: false, num: 35 },
          { id: '37', cheked: false, num: 36 },
          { id: '38', cheked: false, num: 37 },
          { id: '39', cheked: false, num: 38 },
          { id: '40', cheked: false, num: 39 },
          { id: '41', cheked: false, num: 40 },
          { id: '42', cheked: false, num: 41 },
          { id: '43', cheked: false, num: 42 },
          { id: '44', cheked: false, num: 43 },
          { id: '45', cheked: false, num: 44 },
          { id: '46', cheked: false, num: 45 },
          { id: '47', cheked: false, num: 46 },]
      } else {
        for (let i = 1; i <= 100; i++) {
          let p = {
            id: i, cheked: false
          }
          arrNum.push(p)
        }
        
      }
      this.getLabelRelatVenueNumber({ sportid: this.state.relatednessRunid[0],type:2 })

      if (num !== '') {
        
          let numT = num.split(',')
          for (let i in numT) {
            arrNum[numT[i] - 1].cheked = true
          }
        
      }
      let ko = ''
      if (this.state.relatednessRunid[0] === 1) {
        ko = '羽毛球'
      } else if (this.state.relatednessRunid[0] === 2) {
        ko = '兵乓球'
      } else if (this.state.relatednessRunid[0] === 3) {
        ko = '台球中式黑八'
      } else if (this.state.relatednessRunid[0] === 4) {
        ko = '台球美式九球'
      } else if (this.state.relatednessRunid[0] === 5) {
        ko = '台球斯诺克'
      } else if (this.state.relatednessRunid[0] === 6) {
        ko = '篮球'
      } else if (this.state.relatednessRunid[0] === 7) {
        ko = '足球11人制'
      } else if (this.state.relatednessRunid[0] === 8) {
        ko = '足球8人制'
      } else if (this.state.relatednessRunid[0] === 9) {
        ko = '足球7人制'
      } else if (this.state.relatednessRunid[0]=== 10) {
        ko= '足球5人制'
      } else if (this.state.relatednessRunid[0] === 11) {
        ko = '排球'
      } else if (this.state.relatednessRunid[0] === 12) {
        ko = '网球'
      } else if (this.state.relatednessRunid[0]=== 13) {
        ko = '足球6人制'
      }

      this.setState({ connected: true, connectedName:ko,arrNum:arrNum })
    } else {
      Toast.fail('请选择场地类型')
    }

  }

  connectedCale = () => {
    this.setState({ connected: false})
  }

  connectedSelsed = e => {
    
      let data = this.state.arrNum
      if (data[e.currentTarget.dataset.id - 1].cheked === true) {
        data[e.currentTarget.dataset.id - 1].cheked = false
      } else if (data[e.currentTarget.dataset.id - 1].cheked === false) {
        data[e.currentTarget.dataset.id - 1].cheked = true
      }
      this.setState({ arrNum: data })
    
  }

  connectedBtn = () => {
    let data = this.state.arrNum
    let arr = []
    for (let i in data) {
      if (data[i].cheked === true) {
        arr.push(data[i].id)
      }
    }
    for (let i in data) {
      data[i].cheked = false
    }
    this.setState({ connectedOne: arr.join(','), connectedOneLen: arr.length, connected: false, arrNum: data })
  }
  connectedCaleTwo = () => {
    this.setState({ connectedTwo: false})
  }
  connectedTwo = (e) => {
    if (this.state.relatednessRunidTwo !== '') {
      let arrNum=[]
      if (this.state.relatednessRunidTwo[0] === 6) {
          arrNum=[
            { id: '1A', cheked: false, num: 0 },
            { id: '1B', cheked: false, num: 1 },
            { id: '2A', cheked: false, num: 2 },
            { id: '2B', cheked: false, num: 3 },
            { id: '3A', cheked: false, num: 4 },
            { id: '3B', cheked: false, num: 5 },
            { id: '4A', cheked: false, num: 6 },
            { id: '4B', cheked: false, num: 7 },
            { id: '5A', cheked: false, num: 8 },
            { id: '5B', cheked: false, num: 9 },
            { id: '6A', cheked: false, num: 10 },
            { id: '6B', cheked: false, num: 11 },
            { id: '7A', cheked: false, num: 12 },
            { id: '7B', cheked: false, num: 13 },
            { id: '8A', cheked: false, num: 14 },
            { id: '8B', cheked: false, num: 15 },
            { id: '9A', cheked: false, num: 16 },
            { id: '9B', cheked: false, num: 17 },
            { id: '10A', cheked: false, num: 18 },
            { id: '10B', cheked: false, num: 19 },
            { id: '11A', cheked: false, num: 20 },
            { id: '11B', cheked: false, num: 21 },
            { id: '12A', cheked: false, num: 22 },
            { id: '12B', cheked: false, num: 23 },
            { id: '13A', cheked: false, num: 24 },
            { id: '13B', cheked: false, num: 25 },
            { id: '14A', cheked: false, num: 26 },
            { id: '14B', cheked: false, num: 27 },
            { id: '15A', cheked: false, num: 28 },
            { id: '15B', cheked: false, num: 29 },
            { id: '16A', cheked: false, num: 30 },
            { id: '16B', cheked: false, num: 31 },
            { id: '17A', cheked: false, num: 32 },
            { id: '17B', cheked: false, num: 33 },
            { id: '18A', cheked: false, num: 34 },
            { id: '18B', cheked: false, num: 35 },
            { id: '19A', cheked: false, num: 36 },
            { id: '19B', cheked: false, num: 37 },
            { id: '20A', cheked: false, num: 38 },
            { id: '20B', cheked: false, num: 39 },
            { id: '21A', cheked: false, num: 40 },
            { id: '21B', cheked: false, num: 41 },
            { id: '22A', cheked: false, num: 42 },
            { id: '22B', cheked: false, num: 43 },
            { id: '23A', cheked: false, num: 44 },
            { id: '23B', cheked: false, num: 45 },
            { id: '24A', cheked: false, num: 46 }]
      }else if(this.state.relatednessRunidTwo[0] === 2){
        arrNum=[
          { id: '1', cheked: false, num: 0 },
          { id: '2', cheked: false, num: 1 },
          { id: '3', cheked: false, num: 2 },
          { id: '4', cheked: false, num: 3 },
          { id: '5', cheked: false, num: 4 },
          { id: '6', cheked: false, num: 5 },
          { id: '7', cheked: false, num: 6 },
          { id: '8', cheked: false, num: 7 },
          { id: '9', cheked: false, num: 8 },
          { id: '10', cheked: false, num: 9 },
          { id: '11', cheked: false, num: 10 },
          { id: '12', cheked: false, num: 11 },
          { id: '13', cheked: false, num: 12 },
          { id: '14', cheked: false, num: 13 },
          { id: '15', cheked: false, num: 14 },
          { id: '16', cheked: false, num: 15 },
          { id: '17', cheked: false, num: 16 },
          { id: '18', cheked: false, num: 17 },
          { id: '19', cheked: false, num: 18 },
          { id: '20', cheked: false, num: 19 },
          { id: '21', cheked: false, num: 20 },
          { id: '22', cheked: false, num: 21 },
          { id: '23', cheked: false, num: 22 },
          { id: '24', cheked: false, num: 23 },
          { id: '25', cheked: false, num: 24 },
          { id: '26', cheked: false, num: 25 },
          { id: '27', cheked: false, num: 26 },
          { id: '28', cheked: false, num: 27 },
          { id: '29', cheked: false, num: 28 },
          { id: '30', cheked: false, num: 29 },
          { id: '31', cheked: false, num: 30 },
          { id: '32', cheked: false, num: 31 },
          { id: '33', cheked: false, num: 32 },
          { id: '34', cheked: false, num: 33 },
          { id: '35', cheked: false, num: 34 },
          { id: '36', cheked: false, num: 35 },
          { id: '37', cheked: false, num: 36 },
          { id: '38', cheked: false, num: 37 },
          { id: '39', cheked: false, num: 38 },
          { id: '40', cheked: false, num: 39 },
          { id: '41', cheked: false, num: 40 },
          { id: '42', cheked: false, num: 41 },
          { id: '43', cheked: false, num: 42 },
          { id: '44', cheked: false, num: 43 },
          { id: '45', cheked: false, num: 44 },
          { id: '46', cheked: false, num: 45 },
          { id: '47', cheked: false, num: 46 },]
      } else {
        for (let i = 1; i <= 100; i++) {
          let p = {
            id: i, cheked: false
          }
          arrNum.push(p)
        }
      }




      this.getLabelRelatVenueNumber({ sportid: this.state.relatednessRunidTwo[0],type:1 })
      let num = e.currentTarget.dataset.num
      if (num !== '') {
        if (this.state.relatednessRunidTwo[0] === 6) {
          let numT = num.split(',')
          for (let i in numT) {
            for (let j in arrNum) {
              if (arrNum[j].id === numT[i]) {
                arrNum[j].cheked = true
              }
            }
          }
        } else {
          let numT = num.split(',')
          for (let i in numT) {
            arrNum[numT[i] - 1].cheked = true
          }
        }
      }
      let ko = ''
      if (this.state.relatednessRunidTwo[0] === 1) {
        ko = '羽毛球'
      } else if (this.state.relatednessRunidTwo[0] === 2) {
        ko = '兵乓球'
      } else if (this.state.relatednessRunidTwo[0] === 3) {
        ko = '台球中式黑八'
      } else if (this.state.relatednessRunidTwo[0] === 4) {
        ko = '台球美式九球'
      } else if (this.state.relatednessRunidTwo[0] === 5) {
        ko = '台球斯诺克'
      } else if (this.state.relatednessRunidTwo[0] === 6) {
        ko = '篮球'
      } else if (this.state.relatednessRunidTwo[0] === 7) {
        ko = '足球11人制'
      } else if (this.state.relatednessRunidTwo[0] === 8) {
        ko = '足球8人制'
      } else if (this.state.relatednessRunidTwo[0] === 9) {
        ko = '足球7人制'
      } else if (this.state.relatednessRunidTwo[0]=== 10) {
        ko= '足球5人制'
      } else if (this.state.relatednessRunidTwo[0] === 11) {
        ko = '排球'
      } else if (this.state.relatednessRunidTwo[0] === 12) {
        ko = '网球'
      } else if (this.state.relatednessRunidTwo[0]=== 13) {
        ko = '足球6人制'
      }
      this.setState({ connectedTwo: true, connectedNameTwo:ko,arrNum:arrNum })
    } else {
      Toast.fail('请选择母关联场地类型')
    }

  }

  connectedSelsedTwo = e => {
    if (this.state.relatednessRunidTwo[0] === 6) {
      let data = this.state.arrNum
      if (data[e.currentTarget.dataset.num].cheked === true) {
        data[e.currentTarget.dataset.num].cheked = false
      } else if (data[e.currentTarget.dataset.num].cheked === false) {
        data[e.currentTarget.dataset.num].cheked = true
      }
      this.setState({ arrNum: data })
    } else {
      let data = this.state.arrNum
      if (data[e.currentTarget.dataset.id - 1].cheked === true) {
        data[e.currentTarget.dataset.id - 1].cheked = false
      } else if (data[e.currentTarget.dataset.id - 1].cheked === false) {
        data[e.currentTarget.dataset.id - 1].cheked = true
      }
      this.setState({ arrNum: data })
    }



  }
  connectedBtnTwo = () => {
    let data = this.state.arrNum
    let arr = []
    for (let i in data) {
      if (data[i].cheked === true) {
        arr.push(data[i].id)
      }
    }
    for (let i in data) {
      data[i].cheked = false
    }
    this.setState({ connectedOneTwo: arr.join(','), connectedOneLenTwo: arr.length, connectedTwo: false, arrNum: data })
  }

  async VenueRelatSave(data) {
    const res = await VenueRelatSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.success('添加成功')
      this.setState({ relatedness: false,pageFour:1 })
      this.getVenueRelatList({ page: 1 })
    } else if (res.data.code === 4002) {
      Toast.fail('母关联者只能选择单个场地')
    } else {
      Toast.fail(res.data.msg)
    }
  }

  subSiteSubdivisionTwo = () => {

    if (this.state.relatednessRunid === '') {
      Toast.fail('请选择母关联场地类型')
    } else if (this.state.connectedOne === '') {
      Toast.fail('请选择母关联场地编号')
    } else if (this.state.relatednessRunidTwo === '') {
      Toast.fail('请选择子关联场地类型')
    } else if (this.state.connectedOneTwo === '') {
      Toast.fail('请选择子关联场地编号')
    } else {
      let data = {
        two_sportid: this.state.relatednessRunid[0],
        two_sportname: this.state.connectedName,
        two_venueid: this.state.connectedOne,
        one_sportid: this.state.relatednessRunidTwo[0],
        one_sportname: this.state.connectedNameTwo,
        one_venueid: this.state.connectedOneTwo,
      }
      this.VenueRelatSave(data)
    }

  }

  
  async getVenueRelatList(data) {
    const res = await getVenueRelatList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ relatList: res.data.data, otherFour: res.data.other.maxcount })
    } else {
      Toast.fail(res.data.msg)
    }
  }

  async VenueRelatRelieve(data) {
    const res = await VenueRelatRelieve(data, localStorage.getItem('venue_token'))
    if(res.data.code===2000){
        this.getVenueRelatList({page:this.state.pageFour})
    }
  }

  render() {
    return (
      <div className="sitePh">
        <div className="header">
          <div onTouchStart={this.header} data-index='1' style={this.state.index === '1' ? { color: '#D85D27' } : {}}>场地细分<div style={this.state.index === '1' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onTouchStart={this.header} data-index='2' style={this.state.index === '2' ? { color: '#D85D27' } : {}}>价格设置<div style={this.state.index === '2' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onTouchStart={this.header} data-index='4' style={this.state.index === '4' ? { color: '#D85D27' } : {}}>场地关联<div style={this.state.index === '4' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
          <div onTouchStart={this.header} data-index='3' style={this.state.index === '3' ? { color: '#D85D27' } : {}}>历史设置<div style={this.state.index === '3' ? { width: '10%', height: '2px', background: '#D85D27', margin: '-3px auto 0' } : { display: 'none' }}></div></div>
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
                      <div onClick={this.venDuo} data-venueid={item.starttime + '~' + item.endtime}>时间范围：{item.starttime}~{item.endtime}</div>
                      <div>价格：{item.tags.indexOf('散') === -1 && item.tags.indexOf('按次') === -1 ? item.costperhour_cg + '元/时' : item.costperhour_cg + '元/次'}</div>
                      <div>开始时间限制：{item.timelimit === 1 ? '不限' : item.timelimit === 2 ? '整点' : item.timelimit === 3 ? '单数整点' : item.timelimit === 4 ? '双数整点' : '不限'}</div>
                      <div>时长限制：{item.durationlimit === 1 ? '一小时以上' : item.durationlimit === 2 ? '一小时整数倍' : item.durationlimit === 3 ? '二小时整数倍' : '一小时以上'}</div>
                      <div onClick={this.venDuo} data-venueid={item.maxScheduledDate_cg === null ? '' : item.maxScheduledDateTwo}>最长提前预定时间：{item.maxScheduledDate_cg === null ? '' : item.maxScheduledDateTwo}</div>
                      <div onClick={this.venDuo} data-venueid={item.appointmenttime_cg === null ? '' : item.appointmenttime_cg > 2879 ? item.appointmenttime_cg / 60 / 24 + '天' : item.appointmenttime_cg / 60 + '小时'}>最短提前预定时间：{item.appointmenttime_cg === null ? '' : item.appointmenttime_cg > 2879 ? item.appointmenttime_cg / 60 / 24 + '天' : item.appointmenttime_cg / 60 + '小时'}</div>
                      <div onClick={item.comment === null ? '' : this.venDuo} data-venueid={item.comment === '' ? '无' : item.comment}>备注：{item.comment === '' ? '无' : item.comment}</div>
                    </div>
                  </Card.Body>
                  <Card.Footer content={<div><div style={item.tags.indexOf('散') !== -1 || item.tags.indexOf('按次') !== -1 ? {} : { display: "none" }}></div><div style={item.tags.indexOf('散') === -1 || item.tags.indexOf('按次') === -1 ? {} : { display: "none" }} className="lookYou" onClick={this.specialOffer} data-uuid={item.uuid}>{item.discount_date !== null ? '查看特定' : '添加特定'}</div></div>} extra={<div className="capzuo"><img style={{ marginRight: '10px' }} onClick={this.jiaUpdata} data-uuid={item.uuid} src={require('../../assets/upLoad.png')} alt="img" /><img onClick={() =>
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
                      <div onClick={this.venDuo} data-venueid={item.starttime + '~' + item.endtime}>时间范围：{item.starttime}~{item.endtime}</div>
                      <div>价格：{item.tags.indexOf('散') === -1 && item.tags.indexOf('按次') === -1 ? item.costperhour_cg + '元/时' : item.costperhour_cg + '元/次'}</div>
                      <div>开始时间限制：{item.timelimit === 1 ? '不限' : item.timelimit === 2 ? '整点' : item.timelimit === 3 ? '单数整点' : item.timelimit === 4 ? '双数整点' : '不限'}</div>
                      <div>时长限制：{item.durationlimit === 1 ? '一小时以上' : item.durationlimit === 2 ? '一小时整数倍' : item.durationlimit === 3 ? '二小时整数倍' : '一小时以上'}</div>
                      <div onClick={this.venDuo} data-venueid={item.maxScheduledDate_cg === null ? '' : item.maxScheduledDateTwo}>最长提前预定时间：{item.maxScheduledDate_cg === null ? '' : item.maxScheduledDateTwo}</div>
                      <div onClick={this.venDuo} data-venueid={item.appointmenttime_cg === null ? '' : item.appointmenttime_cg > 2879 ? item.appointmenttime_cg / 60 / 24 + '天' : item.appointmenttime_cg / 60 + '小时'}>最短提前预定时间：{item.appointmenttime_cg === null ? '' : item.appointmenttime_cg > 2879 ? item.appointmenttime_cg / 60 / 24 + '天' : item.appointmenttime_cg / 60 + '小时'}</div>
                      <div onClick={item.comment === null ? '' : this.venDuo} data-venueid={item.comment === '' ? '无' : item.comment}>备注：{item.comment === '' ? '无' : item.comment}</div>
                      <div>特定日期:{item.discount_date === '' ? '无' : <span style={{ color: '#D85D27', cursor: 'pointer' }} data-sd={item.discount_date} data-app={item.discount_appointment} data-cos={item.discount_costperhour_cg} onClick={this.detail}>查看</span>}</div>
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


        <div className="siting68" style={this.state.index === '4' ? {} : { display: 'none' }}>
        <div className="Subdivide">
            {
              this.state.relatList.map((item, i) => (
                <Card className="card" key={i}>
                  <Card.Header
                    title={<span className="titleLeft">母关联：{item.two_sportname==='篮球'?item.two_sportname+'（全场）':item.two_sportname}</span>}
                    extra={<span className="titleRight">子关联：{item.one_sportname==='篮球'?item.one_sportname+'（半场）':item.one_sportname}</span>}
                  />
                  <Card.Body>
                    <div className="bossname">
                      <div onClick={this.venDuo} data-venueid={item.two_venueid}>母关联场地编号：{item.two_venueid}</div>
                      <div onClick={this.venDuo} data-venueid={item.one_venueid}>子关联场地编号：{item.one_venueid}</div>
                    </div>
                  </Card.Body>
                  <Card.Footer content={<div><img onClick={() =>
                    alert('提示', '您确定要删除该条场地关联么？', [
                      { text: '取消', onPress: () => console.log('cancel') },
                      { text: '确定', onPress: () => this.VenueRelatRelieve({ relatid: item.uuid }) },
                    ])} style={{width:'1.5rem',height:'1.5rem',float:'right'}} src={require('../../assets/delet.png')} alt="img" /></div>} />
                 </Card>
              ))
            }
            <div style={this.state.relatList.length !== 0 ? { display: 'none' } : { width: '100%' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (6).png')} alt="666" /><span style={{ display: 'block', textAlign: 'center' }}>您还没有添加场地关联!</span></div>
            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageFour} total={this.state.otherFour} onChange={this.currentFour} />
          </div>
          <div className="footerSite">
            <Picker
              data={this.state.sportArr}
              cols={1}
              onOk={this.asyncValueFour}
            >
              <div><img src={require('../../assets/shai.png')} alt="img" />筛选：<span style={{color: '#000' }}>{this.state.sportArr[this.state.asyncValueFour].label}</span></div>
            </Picker>
            <div style={{ marginLeft: '4%' }} onClick={this.relatedness}>+添加场地关联</div>
          </div>
        </div>



        <Drawer
          title="添加场地关联"
          placement="bottom"
          height='100%'
          onClose={this.onClose}
          visible={this.state.relatedness}
        >
          <Picker
            data={this.state.sportArrTwoSo}
            value={this.state.relatednessRunid}
            disabled={this.state.upData === 1 ? true : false}
            onOk={v =>this.setState({ relatednessRunid:v, idxTitleTwo: '请选择/添加', connectedOne: []})}
            cols={1} className="forss">
            <List.Item arrow={this.state.upData === 1 ? 'empty' : 'horizontal'} style={{ borderBottom: '1px solid #E9E9E9' }}>母关联场地类型</List.Item>
          </Picker>
          <List.Item arrow="horizontal" onClick={this.connected} data-num={this.state.connectedOne} extra={this.state.connectedOne.length === 0 ? '请选择' : this.state.connectedOne} style={{ borderBottom: '1px solid #E9E9E9' }}>母关联场地编号</List.Item>
          <List.Item arrow="empty" extra={this.state.connectedOneLen} style={{ borderBottom: '1px solid #E9E9E9' }}>母关联场地数量</List.Item>
          <Picker
            data={this.state.sportArrTwoBe}
            value={this.state.relatednessRunidTwo}
            disabled={this.state.upData === 1 ? true : false}
            onOk={v => this.setState({ relatednessRunidTwo: v, idxTitleTwo: '请选择/添加', connectedOneTwo: [] })}
            cols={1} className="forss">
            <List.Item arrow={this.state.upData === 1 ? 'empty' : 'horizontal'} style={{ borderBottom: '1px solid #E9E9E9' }}>子关联场地类型</List.Item>
          </Picker>
          <List.Item arrow="horizontal" onClick={this.connectedTwo} data-num={this.state.connectedOneTwo} extra={this.state.connectedOneTwo.length === 0 ? '请选择' : this.state.connectedOneTwo} style={{ borderBottom: '1px solid #E9E9E9' }}>子关联场地编号</List.Item>
          <div className="btnSub" onTouchStart={this.subSiteSubdivisionTwo}>提交</div>

        </Drawer>



        <Drawer
          title="选择母关联场地编号"
          placement="bottom"
          height='90%'
          onClose={this.connectedCale}
          bodyStyle={{ padding: '8px' }}
          visible={this.state.connected}
        >
          <div className="sitePhSerial">
            {
              this.state.arrNum.map((item, i) => (
                <div key={i} className='serialSon' onClick={this.connectedSelsed} data-num={item.num} data-id={item.id} style={item.cheked === true ? { background: '#F5A623', color: '#fff' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', opacity: '0.2' } : {}}>{item.id}</div>
              ))
            }
          </div>
          <div className="sitePhFooter" onTouchStart={this.connectedBtn}>确定</div>
        </Drawer>

        <Drawer
          title="选择子关联场地编号"
          placement="bottom"
          height='90%'
          onClose={this.connectedCaleTwo}
          bodyStyle={{ padding: '8px' }}
          visible={this.state.connectedTwo}
        >
          <div className="sitePhSerial">
            {
              this.state.arrNum.map((item, i) => (
                <div key={i} className='serialSon' onClick={this.connectedSelsedTwo} data-num={item.num} data-id={item.id} style={item.cheked === true ? { background: '#F5A623', color: '#fff' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', opacity: '0.2' } : item.num === '场地不固定' ? { width: '5rem' } : {}}>{item.id}</div>
              ))
            }
          </div>
          <div className="sitePhFooter" onTouchStart={this.connectedBtnTwo}>确定</div>
        </Drawer>







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

          <Picker
            data={this.state.pickerValue[0] === 6 ? this.state.ListSportTwo : this.state.ListSportThree}
            value={this.state.typeTwo}
            disabled={this.state.upData === 1 ? true : false}
            onOk={v => this.setState({ typeTwo: v, chekedArr: [] })}
            cols={1} className="forss">
            <List.Item arrow={this.state.upData === 1 ? 'empty' : 'horizontal'} style={this.state.pickerValue[0] === 6 || this.state.pickerValue[0] === 2 ? { borderBottom: '1px solid #E9E9E9' } : { display: 'none' }}>收费类型</List.Item>
          </Picker>

          <List.Item arrow="horizontal" onClick={this.Serial} extra={this.state.chekedArr.length === 0 ? '请选择' : this.state.chekedArr.join(',')} style={{ borderBottom: '1px solid #E9E9E9' }}>场地编号</List.Item>
          <List.Item arrow="empty" extra={this.state.chekedArrLen} style={{ borderBottom: '1px solid #E9E9E9' }}>场地数量</List.Item>
          <div className="btnSub" onTouchStart={this.xifenPush}>提交</div>


          <span style={{ paddingTop: '1rem', color: '#F5A623', display: 'block' }} onClick={() =>
            alert('提示', '请对所选场地类型进行再细分，如场地类型选择的是羽毛球，贵场馆羽毛球场地是否有普通场、VIP场等之分? 如没有，则所有场地选择一个标签即可，如有，则分开设置标签及对应的“场地编号”。总之，同一时刻，不同价格的场地须细分并给出标签。', [
              { text: '确定', onPress: () => console.log('cancel') },
            ])}>什么是场地细分?</span>
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
            <div className="btnComfir" onTouchStart={this.btnComfir}>确定</div>

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
              <InputItem style={{ fontSize: '0.75rem' }} maxLength={4} placeholder-style={{ fontSize: '0.75rem' }} onChange={this.joinTitleC} placeholder="新增标签最多输入4个字符"></InputItem>
            </div>
            <div className="btnComfir" onTouchStart={this.joinTitleTwo}>确定</div>

          </div>
        </Drawer>






        <Drawer
          title="选择场地编号"
          placement="bottom"
          height='90%'
          onClose={this.SerialClose}
          bodyStyle={{ padding: '8px' }}
          visible={this.state.Serial}
        >
          <div className="sitePhSerialHeader"><span onClick={this.reverseC}>反选</span><span onClick={this.allThem}>全选</span></div>
          <div className="sitePhSerial">
            {
              this.state.numArr.map((item, i) => (
                <div key={i} className={this.state.typeTwo[0] === 2 || this.state.typeTwo[0] === 4 ? 'serialSon' : 'serialSonTwo'} onClick={this.numArrSon} data-num={item.num} data-id={item.id} style={item.cheked === true ? { background: '#F5A623', color: '#fff' } : {} && item.cheked === 'no' ? { color: '#fff', background: '#F5A623', opacity: '0.2' } : item.num === '场地不固定' ? { width: '5rem' } : {}}>{item.num}</div>
              ))
            }
          </div>
          <div className="sitePhFooter" onTouchStart={this.koNumArr}>确定</div>
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
          <List.Item arrow="horizontal" extra={this.state.Liturgyche} className="lpko" onClick={this.Liturgy} style={this.state.timeFalg === true ? { borderBottom: '1px solid #E9E9E9' } : { display: 'none' }} >星期</List.Item>


          <Picker
            data={this.state.timeRtArr}
            onOk={this.starttime}
            value={this.state.starttime}
            cols={1}
          >
            <List.Item arrow="horizontal" style={this.state.timeFalg === true ? { borderBottom: '1px solid #E9E9E9' } : { display: 'none' }}>开始时间</List.Item>
          </Picker>


          <Picker
            data={this.state.timeRtArr}
            onOk={this.endtime}
            value={this.state.endtime}
            cols={1}
          >
            <List.Item arrow="horizontal" style={this.state.timeFalg === true ? { borderBottom: '1px solid #E9E9E9' } : { display: 'none' }}>结束时间</List.Item>
          </Picker>

          <Picker
            data={this.state.timeLimitList}
            onOk={this.timeLimit}
            value={this.state.timeLimit}
            cols={1}
            disabled={this.state.timeFalg === true ? false : true}
          >
            <List.Item arrow={this.state.timeFalg === true ? 'horizontal' : 'empty'} style={{ borderBottom: '1px solid #E9E9E9' }}>开始时间限制</List.Item>
          </Picker>


          <Picker
            data={this.state.timeLimitListTwo}
            onOk={this.timeLimitTwo}
            value={this.state.timeLimitTwo}
            cols={1}
            disabled={this.state.timeFalg === true ? false : true}
          >
            <List.Item arrow={this.state.timeFalg === true ? 'horizontal' : 'empty'} style={{ borderBottom: '1px solid #E9E9E9' }}>时长限制</List.Item>
          </Picker>




          <List.Item arrow="empty" style={{ borderBottom: '1px solid #E9E9E9' }}>
            <InputItem
              type='money'
              placeholder="请输入"
              value={this.state.money}
              onChange={(v) => { this.setState({ money: v }) }}
              onBlur={(v) => { console.log('onBlur', v); }}
              style={{ padding: '0',left:'0.5rem' }}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            ><span style={{ fontSize: '0.88rem', border: 'none' }}>价格</span></InputItem>
           
            <Picker
              data={this.state.selectDaArr}
              onOk={this.selectDa}
              value={this.state.selectDa}
              cols={1}
            >
              <List.Item arrow='empty' style={this.state.timeFalg === 'no' ? { width: '40%', position: 'absolute', top: 0, right: '0%',textAlign:'center' } :this.state.timeFalg === 'yes'?{ width: '40%', position: 'absolute', top: 0, right: '0%',textAlign:'center' } :{ display: 'none' }}></List.Item>
            </Picker>
             <div style={this.state.timeFalg === 'no' ? {display:'none'} : this.state.timeFalg === 'yes' ? {display:'none'} : {width: '40%', position: 'absolute', top: 0, right: '0%',lineHeight:'44px',textAlign:'right'}}>(元/时)</div>
          </List.Item>

          <Picker
            data={this.state.Longest}
            value={this.state.pickerValueFour}
            onOk={this.pickerValueFour}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}  >最长提前预定时间</List.Item>
          </Picker>

          <Picker
            data={this.state.Shortest}
            value={this.state.pickerValueFive === -1 ? [0] : this.state.pickerValueFive}
            onOk={this.pickerValueFive}
            disabled={this.state.pickerValueFive === -1 ? true : false} 
            cols={1} className="forss">
            <List.Item arrow={this.state.pickerValueFive === -1 ? 'empty' : 'horizontal'} style={{ borderBottom: '1px solid #E9E9E9' }}>最短提前预定时间</List.Item>
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
          title={'添加/修改' + this.state.sportSiscount + '特定日期'}
          placement="bottom"
          height='100%'
          className="kopd"
          onClose={this.specialOfferClose}
          visible={this.state.specialOffer}
        >
          <List.Item extra={this.state.sportSiscount} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">场地类型</List.Item>
          <List.Item extra={this.state.titleSiscount} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty" >细分标签</List.Item>
          <List.Item extra={this.state.starttimeSiscount + '~' + this.state.endtimeSiscount} style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">时间范围</List.Item>
          <List.Item arrow="empty" extra={this.state.venueidSiscountTwo} style={{ borderBottom: '1px solid #E9E9E9' }} >场地号</List.Item>
          <Picker
            data={this.state.Shortest}
            value={this.state.appointmenttimeTwo}
            onOk={this.pickerValueFiveTwo}
            cols={1} className="forss">
            <List.Item arrow="horizontal" style={{ borderBottom: '1px solid #E9E9E9' }}>最短提前预定时间</List.Item>
          </Picker>

          <List.Item style={{ borderBottom: '1px solid #E9E9E9' }} arrow="empty">
            <InputItem
              type='money'
              placeholder={this.state.moneySiscount}
              onChange={(v) => { this.setState({ moneySiscount: v }) }}
              style={{ padding: '0' }}
              disabledKeys={['.']}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
            ><span style={{ fontSize: '0.75rem' }}>价格(元/时)</span></InputItem></List.Item>


          <div className="listSonSSS">
            <span className="left">日期</span>
            <div className="right">
              {
                this.state.withDayList.map((item, i) => (
                  <div className="rightSon" key={i}>{item}<span onClick={this.colseWithDay} data-date={item}>×</span></div>
                ))
              }
            </div>
          </div>

          <div className="footerBtnSel">
            <div onClick={this.withDay} data-date="1" style={this.state.withDayIndex === '1' ? { background: '#D85D27' } : {}}>当前年工作日</div>
            <div onClick={this.withDay} data-date="2" style={this.state.withDayIndex === '2' ? { background: '#D85D27' } : {}}>当前年周六、日</div>
            <div onClick={this.withDay} data-date="3" style={this.state.withDayIndex === '3' ? { background: '#D85D27' } : {}}>当前年法定节假日</div>
          </div>

        
          <div className="site-calendar-demo-card" style={{ border: '1px solid #e9e9e9', marginTop: 15 }}>
            <Calendar fullscreen={false} className="startTime" dateCellRender={this.dateCellRender} locale={locale} mode='month' onChange={this.onPanelChange} />
          </div> 




          <div className="Siscount"><div style={this.state.kop === null ? { display: 'none' } : {}} onClick={() =>
            alert('提示', '您确定要删除该条特定日期设置么？删除后用户将无法预订该时间段' + this.state.sportSiscount + '的特定日期场地', [
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
          <div className="sitePhFooter" onTouchStart={this.koNumArrSiscount}>确定</div>
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
          title="特定日期详情"

        >
          <div style={{ textAlign: 'left', height: '10rem', overflowY: 'auto' }}>
            <p>特定日期:{this.state.details.sd}</p>
            <p style={{ wordBreak: 'break-all' }}>最短提前预定时间:{this.state.details.app / 60}小时</p>
            <p>特定日期价格:{this.state.details.cos}(元/小时)</p>
          </div>

        </Modal>


      </div>



    )
  }
}


export default sitePh;