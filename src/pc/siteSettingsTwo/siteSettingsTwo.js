import React from 'react';
import './siteSettingsTwo.css';
import 'antd/dist/antd.css';
import { getSiteSettingList,getVenueIndex,gerVenueName, AddSiteSetting, DelSiteSetting, getVenueSportidTitle, VenueRelatSave, getVenueRelatList, VenueRelatRelieve, getLabelRelatVenueNumber, DelVenueTitle, getSpecialDaysForVenue, SiteSettingDiscountSave, getSiteSettingHistoryList, getVenueNumberTitleFirst, getSiteSettingFirst, getSiteSelectedTitle, DelVenueNumberTitle, getSiteSelectedVenueid, getVenueTitleSave, getVenueNumberTitleSave, getVenueNumberTitleList, DelSiteSettingDiscount } from '../../api';
import { Select, Row, Col, Modal, Input, message, Pagination, Popover, Spin, InputNumber } from 'antd';
import {  CloseCircleOutlined } from '@ant-design/icons';
import 'moment/locale/zh-cn';
const { Option } = Select;
const { TextArea } = Input;


class siteSettingsTwo extends React.Component {

  state = {
    visible: false,
    ListSport: [
      {id:1,name:'羽毛球'},
      {id:2,name:'兵乓球'},
      {id:3,name:'台球中式黑八'},
      {id:4,name:'台球美式九球'},
      {id:5,name:'台球斯诺克'},
      {id:6,name:'篮球'},
      {id:7,name:'足球11人制'},
      {id:8,name:'足球8人制'},
      {id:9,name:'足球7人制'},
      {id:13,name:'足球6人制'},
      {id:10,name:'足球5人制'},
      {id:11,name:'排球'},
      {id:12,name:'网球'},
    ],
    list: [],
    runId: '',//场地类型id
    runIdTwo: '',//场地类型id设置价格
    runName: '',//场地类型名称
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
    headerData: '2',
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
    tags_type: '',
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
    titleDel: '',
    timer: [{ name: '00:00' }, { name: '00:30' }, { name: '01:00' }, { name: '01:30' }, { name: '02:00' }, { name: '02:30' }, { name: '03:00' }, { name: '03:30' }, { name: '04:00' }, { name: '04:30' }, { name: '05:00' }, { name: '05:30' }, { name: '06:00' }, { name: '06:30' }, { name: '07:00' }, { name: '07:30' }, { name: '08:00' }, { name: '08:30' }, { name: '09:00' }, { name: '09:30' }, { name: '10:00' }, { name: '10:30' }, { name: '11:00' }, { name: '11:30' }, { name: '12:00' }, { name: '12:30' }, { name: '13:00' }, { name: '13:30' }, { name: '14:00' }, { name: '14:30' }, { name: '15:00' }, { name: '15:30' }, { name: '16:00' }, { name: '16:30' }, { name: '17:00' }, { name: '17:30' }, { name: '18:00' }, { name: '18:30' }, { name: '19:00' }, { name: '19:30' }, { name: '20:00' }, { name: '20:30' }, { name: '21:00' }, { name: '21:30' }, { name: '22:00' }, { name: '22:30' }, { name: '23:00' }, { name: '23:30' }, { name: '24:00' }],
    open: false,
    historyArr: [],
    pageThree: 1,
    pageFour: 1,
    detail: false,
    deData: [],
    dateArr: [],
    appointmenttimeTwo: '',
    ListSportTwoLO: [{ name: '半场', id: 1 }, { name: '散场', id: 2 }, { name: '全场', id: 5 }],
    ListSportThreeLO: [{ name: '按时(收费)', id: 3 }, { name: '按次(收费)', id: 4 }],
    typeTwo: 0,
    you: [],
    timeFalg: true,
    timeLimit: 1,
    timeLimitTwo: 1,
    selectDA: '',
    indexBtnSon: '0',
    workingDayList: [],
    relatedness: false,
    relatednessRunid: '',
    connected: false,
    connectedName: '',
    connectedOne: '',
    connectedOneLen: 0,
    relatednessRunidTwo: '',
    connectedTwo: false,
    connectedNameTwo: '',
    connectedOneTwo: '',
    connectedOneLenTwo: 0,
    relatList: [],
    otherFour: 1,
    relatUuid: '',
    sportArrTwoSo: [
      { name: '羽毛球', id: 1 },
      { name: '乒乓球', id: 2 },
      { name: '台球中式黑八', id: 3 },
      { name: '台球美式九球', id: 4 },
      { name: '台球斯诺克', id: 5 },
      { name: '篮球（全场）', id: 6 },
      { name: '足球11人制', id: 7 },
      { name: '足球8人制', id: 8 },
      { name: '足球7人制', id: 9 },
      { name: '足球6人制', id: 13 },
      { name: '足球5人制', id: 10 },
      { name: '排球', id: 11 },
      { name: '网球', id: 12 }
    ],
    sportArrTwoBe: [
      { name: '羽毛球', id: 1 },
      { name: '乒乓球', id: 2 },
      { name: '台球中式黑八', id: 3 },
      { name: '台球美式九球', id: 4 },
      { name: '台球斯诺克', id: 5 },
      { name: '篮球（半场）', id: 6 },
      { name: '足球11人制', id: 7 },
      { name: '足球8人制', id: 8 },
      { name: '足球7人制', id: 9 },
      { name: '足球6人制', id: 13 },
      { name: '足球5人制', id: 10 },
      { name: '排球', id: 11 },
      { name: '网球', id: 12 }
    ],
    moneyThree:0,
    appointmenttimeYThree:0,
    maxScheduledDateThree:0,
    
  };

 





  async getSiteSettingList(data) {
    const res = await getSiteSettingList(data, '')
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

      this.setState({ list: res.data.data, other: res.data.other, loading: false, hidden: true, lppding: false })
    } else if (res.data.code === 4001) {
      message.error('登录超时！')
    } else {
      this.setState({ list: res.data.data, loading: false, hidden: false, lppding: false })
    }
  }




  async getVenueIndex(data) {
    const res = await getVenueIndex(data,'')
    if (res.data.code === 2000) {
      
      this.setState({
        isevaluate: res.data.data.dataisevaluate,
        getVenueMonth_money: res.data.data.month_money, getVenueToday_money: res.data.data.today_money, getVenueMonth_count: res.data.data.month_count,
        month_member_money: res.data.data.month_member_money, today_member_money: res.data.data.today_member_money,
        getVenueToday_count: res.data.data.today_count, getVenueScore: res.data.data.score
      })
      sessionStorage.setItem('score', res.data.data.score)
    }
  }

  async gerVenueName(data) {
    const res = await gerVenueName(data, '')
    if (res.data.code === 4001) {
      message.error('登录超时!')
    } else {
      this.setState({ gerVenueNameName: res.data.data.name, gerVenueNameRate: res.data.data.rate, ishaverecharge: res.data.data.ishaverecharge })
      sessionStorage.setItem('mess', res.data.data.mess)
      sessionStorage.setItem('siteuid', res.data.data.siteuid)
      sessionStorage.setItem('ishaverecharge', res.data.data.ishaverecharge)
      sessionStorage.setItem('siteName',res.data.data.name)
     
    }
  }
  componentDidMount() {

     let url=this.props.location.search
    sessionStorage.setItem('token',url.split('&')[1].slice(15,url.split('&')[1].length))
     this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page,at:url.split('&')[1].slice(15,url.split('&')[1].length),sid:url.split('&')[0].slice(10,url.split('&')[0].length) })
     this.setState({siteId:url.split('&')[0].slice(10,url.split('&')[0].length),token:url.split('&')[1].slice(15,url.split('&')[1].length)})
     this.getVenueIndex({at:url.split('&')[1].slice(15,url.split('&')[1].length),sid:url.split('&')[0].slice(10,url.split('&')[0].length)})
     this.gerVenueName({at:url.split('&')[1].slice(15,url.split('&')[1].length),sid:url.split('&')[0].slice(10,url.split('&')[0].length)})
  }

  nameChang = e => {
    this.setState({
      nameChang: e
    })
    if (this.state.headerData === '1') {
      this.setState({ pageOne: 1 })
      this.getVenueNumberTitleList({ sportid: e, page: 1 })
    } else if (this.state.headerData === '2') {
      this.setState({ page: 1 })
      this.getSiteSettingList({ sportid: e, page: 1,at:this.state.token,sid:this.state.siteId })
    } else if (this.state.headerData === '3') {
      this.setState({ pageThree: 1 })
      this.getSiteSettingHistoryList({ sportid: e, page: 1 })
    } else if (this.state.headerData === '4') {
      this.setState({ pageFour: 1 })
      this.getVenueRelatList({ sportid: e, page: 1 })
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
    })
  }








  

  money = e => {
    this.setState({ costperhour: e })
  }
  moneyTwo = e => {
    this.setState({ costperhourTwo: e.target.value })
  }
  moneySix=e=>{
    this.setState({costperhourSix:e.target.value})
  }
  handleChangeFour = e => {
    this.setState({ maxScheduledDate_cg: e })
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
    if (this.state.maxScheduledDate === '') {
      message.warning('请选择最长提前预订时间')
    } else if (this.state.maxScheduledDate === '0.1' && parseInt(e) > 10080) {
      message.warning('最短提前预订时间超出最长提前预订时间范围')
    } else if (this.state.maxScheduledDate === '0.2' && parseInt(e) > 20160) {
      message.warning('最短提前预订时间超出最长提前预订时间范围')
    } else {
      this.setState({ appointmenttime: parseInt(e) })
    }

  }
  textArea = e => {
    this.setState({ comment: e.target.value })
  }




  async AddSiteSetting(data) {
    const res = await AddSiteSetting(data,'')
    if (res.data.code === 2000) {
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page,at:this.state.token,sid:this.state.siteId })
      this.setState({
        visible: false, update: 0, Disid: '',
      })
    } else if (res.data.code === 4001) {
      message.error('登录超时!')
    } else {
      message.error(res.data.msg)
    }
  }

  submit = (e) => {
    let { appointmenttimeYThree,maxScheduledDateThree,moneyThree,runIdTwo, runNameTwo, tagsTwo, openday, selectDA, starttime, timeLimit, timeLimitTwo, endtime, costperhour, chekedTwo, chekedTwoLen, maxScheduledDate, appointmenttime, comment, tagsTwoId, tags_type } = this.state
    if (runIdTwo === '') {
      message.warning('请选择场地类型')
    } else if (tagsTwo === '') {
      message.warning('请选择细分标签类型')
    } else if (tagsTwo.indexOf('散场') === -1 && tagsTwo.indexOf('按次') === -1 && openday.length === 0) {
      message.warning('请选择星期')
    } else if (starttime === '') {
      message.warning('请选择时间范围（开始时间）')
    } else if (endtime === '') {
      message.warning('请选择时间范围（结束时间）')
    } else if (costperhour === '' || costperhour === null) {
      message.warning('请填写价格')
    } else if (maxScheduledDate === '') {
      message.warning('请选择最长可预订日期')
    } else if (appointmenttime === '') {
      message.warning('请选择最短提前预订时间')
    } else {
      let obj = {
        at:this.state.token,
        sid:this.state.siteId,
        uuid: e.currentTarget.dataset.uuid,
        sportid: runIdTwo,
        sportname: runNameTwo,
        tags: tagsTwo,
        openday: tagsTwo.indexOf('散场') !== -1 || tagsTwo.indexOf('按次') !== -1 ? '1,2,3,4,5,6,7' : typeof (openday) === 'string' ? openday : openday.join(','),
        opendayname: '',
        starttime: starttime,
        endtime: endtime,
        costperhour_cg: Number(costperhour).toFixed(2),
        venueid: chekedTwo,
        sitenumber: chekedTwoLen,
        maxScheduledDate_cg: maxScheduledDate,
        appointmenttime_cg: appointmenttime === -1 ? 0 : appointmenttime,
        comment: comment,
        tags_id: tagsTwoId,
        tags_type: tags_type,
        timelimit: timeLimit,
        durationlimit: timeLimitTwo,
        priceunit: selectDA,
        costperhour:moneyThree,
        maxScheduledDate:maxScheduledDateThree,
        appointmenttime:appointmenttimeYThree
      }
      this.AddSiteSetting(obj)
    }
  }


  


  update = e => {
    this.setState({
      visible: true,
      update: 1
    });

    this.getSiteSettingFirst({ uuid: e.currentTarget.dataset.uid,at:this.state.token,sid:this.state.siteId, })
  }



  async getSiteSettingFirst(data) {
    const res = await getSiteSettingFirst(data,'')
    if (res.data.code === 2000) {
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
      if (res.data.data[0].tags.indexOf('散') !== -1) {
        this.setState({ timeFalg: 'no', starttime: '00:00', endtime: '24:00', })
      } else if (res.data.data[0].tags.indexOf('按次') !== -1) {
        this.setState({ timeFalg: 'yes', starttime: '00:00', endtime: '24:00', })
      } else if (res.data.data[0].tags.indexOf('散') !== -1 || res.data.data[0].tags.indexOf('按次') !== -1) {
        this.setState({ appointmenttime: res.data.data[0].appointmenttime, starttime: '00:00', endtime: '24:00', timeFalg: false })
      } else {
        this.setState({ appointmenttime: res.data.data[0].appointmenttime, starttime: res.data.data[0].starttime, endtime: res.data.data[0].endtime, timeFalg: true })
      }
      this.setState({
        runId: res.data.data[0].sportid, tags: res.data.data[0].tags,
        discount_sdate: res.data.data[0].discount_sdate, discount_edate: res.data.data[0].discount_edate, discount_start: res.data.data[0].discount_start,
        discount_end: res.data.data[0].discount_end, costperhourTwo: res.data.data[0].discount_costperhour_cg === null ? res.data.data[0].costperhour.slice(0, res.data.data[0].costperhour.indexOf('.')) : res.data.data[0].discount_costperhour_cg.slice(0, res.data.data[0].discount_costperhour_cg.indexOf('.')),
        runIdTwo: res.data.data[0].sportid, tagsTwo: res.data.data[0].tags, opendayname: attop, openday: res.data.data[0].openday.split(','), starttime: res.data.data[0].starttime,
        costperhour: res.data.data[0].costperhour_cg.slice(0, res.data.data[0].costperhour_cg.indexOf('.')), chekedTwo: res.data.data[0].venueid, chekedFour: res.data.data[0].venueid, chekedThree: res.data.data[0].venueid !== null ? res.data.data[0].venueid : res.data.data[0].venueid, chekedTwoLen: res.data.data[0].sitenumber, appointmenttime: res.data.data[0].appointmenttime_cg,
        tagsTwoId: res.data.data[0].tags_id, tags_type: res.data.data[0].tags_type, comment: res.data.data[0].comment, maxScheduledDate: res.data.data[0].maxScheduledDate_cg, runNameTwo: res.data.data[0].sportname, Disid: res.data.data[0].uuid, appointmenttimeTwo: res.data.data[0].discount_appointment_cg === null ? 0 : res.data.data[0].discount_appointment_cg, workingDayList: res.data.data[0].discount_date === null ? [] : res.data.data[0].discount_date.split(','),
        timeLimit: res.data.data[0].timelimit, timeLimitTwo: res.data.data[0].durationlimit, selectDA: res.data.data[0].priceunit,
        moneyThree:res.data.data[0].costperhour,
        maxScheduledDateThree: res.data.data[0].maxScheduledDate,
        appointmenttimeYThree:res.data.data[0].appointmenttime,
        costperhourSix: res.data.data[0].discount_costperhour===null?0:res.data.data[0].discount_costperhour.slice(0, res.data.data[0].discount_costperhour.indexOf('.')),
        appointmenttimeSix: res.data.data[0].discount_appointment === null ? 0 : res.data.data[0].discount_appointment,
        
      })
      if (this.state.runIdTwo !== '') {
        this.getVenueSportidTitle({ sportid: this.state.runIdTwo })
        this.getSiteSelectedTitle({ sportid: this.state.runIdTwo })
      }
    } else if (res.data.code === 4001) {
      message.error('登录超时!')
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
    this.getSiteSettingList({ sportid: this.state.nameChang, page: page,at:this.state.token,sid:this.state.siteId })
  }
  recordListOther = (page, pageSize) => {
    this.setState({ pageOne: page })
    this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: page })
  }


  async getSiteSettingHistoryList(data) {
    const res = await getSiteSettingHistoryList(data, sessionStorage.getItem('venue_token'))

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

    this.setState({ historyArr: res.data.data, otherThree: res.data.other })
  }

  pageThree = (page, pageSize) => {
    this.setState({ pageThree: page })
    this.getSiteSettingHistoryList({ sportid: this.state.nameChang, page: page })
  }

  pageFour = (page, pageSize) => {
    this.setState({ pageFour: page })
    this.getVenueRelatList({ sportid: this.state.nameChang, page: page })
  }



  headerCli = e => {
    if (e.currentTarget.dataset.id === '2') {
      this.getSiteSettingList({ sportid: this.state.nameChang, page: 1,at:this.state.token,sid:this.state.siteId })
      this.setState({ page: 1 })
    } else if (e.currentTarget.dataset.id === '1') {
      this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: 1 })
      this.setState({ pageOne: 1 })
    } else if (e.currentTarget.dataset.id === '3') {
      this.setState({ pageThree: 1 })
      this.getSiteSettingHistoryList({ sportid: this.state.nameChang, page: 1 })
    } else if (e.currentTarget.dataset.id === '4') {
      this.setState({ pageFour: 1 })
      this.getVenueRelatList({ sportid: this.state.nameChang, page: 1 })
    }
    this.setState({
      headerData: e.currentTarget.dataset.id,
    })
    sessionStorage.setItem('headerData', e.currentTarget.dataset.id)
  }
  handlejoinXi = () => {
    this.setState({
      joinXi: false,
      typeDetel: 0,
      lppd: 0,
      relatedness: false,

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
    } else if (res.data.code === 4002) {
      message.warning('请选择场地类型')
    } else {
      message.warning(res.data.msg)
    }
  }


  addItem = () => {
    const { name } = this.state;
    if (name === '') {
      message.warning('请输入标签')
    } else if (name.replace(/\s*/g, "") === '普通') {
      message.warning('该标签已存在')
    } else if (name.replace(/\s*/g, "").toUpperCase() === 'VIP') {
      message.warning('该标签已存在')
    } else if (name === '半场' || name === '散场' || name === '按次' || name === '按时') {
      message.warning('该标签不可设置')
    } else {
      this.getVenueTitleSave({ sportid: this.state.runId, title: name })
    }
  }


  title = e => {
    this.setState({
      tags: e
    })
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
    let { arrNum, runId } = this.state
    if (this.state.typeTwo === 1 || this.state.typeTwo === 2 || runId === 2) {
      if (arrNum[e.currentTarget.dataset.num].cheked === true) {
        arrNum[e.currentTarget.dataset.num].cheked = false
      } else if (arrNum[e.currentTarget.dataset.num].cheked === false) {
        arrNum[e.currentTarget.dataset.num].cheked = true
      }
      if (e.currentTarget.dataset.id === '场地不固定') {
        if (arrNum[47].cheked === true) {
          for (let i in arrNum) {
            arrNum[i].cheked = 'no'
            arrNum[47].cheked = true
          }
        } else {
          for (let i in this.state.arrNum) {
            arrNum[i].cheked = false
          }
          this.getSiteSelectedVenueidTwo({ sportid: this.state.runId })
        }
      }


      this.setState({
        arrNum: arrNum
      })
    } else {
      if (arrNum[e.currentTarget.dataset.id - 1].cheked === true) {
        arrNum[e.currentTarget.dataset.id - 1].cheked = false
      } else if (arrNum[e.currentTarget.dataset.id - 1].cheked === false) {
        arrNum[e.currentTarget.dataset.id - 1].cheked = true
      }
      this.setState({
        arrNum: arrNum
      })
    }
  }

  async getSiteSelectedVenueidTwo(data) {

    const res = await getSiteSelectedVenueid(data, sessionStorage.getItem('venue_token'))
    console.log(585)
    if (this.state.runId === 6) {
      for (let j in res.data.data) {
        for (let i in this.state.arrNum) {
          if (this.state.arrNum[i].id === res.data.data[j]) {
            this.state.arrNum[parseInt(this.state.arrNum[i].num)].cheked = 'no'
          }
          for (let k in this.state.arrChekedTwope) {
            if (this.state.arrChekedTwope[k] === this.state.arrNum[i].id) {
              this.state.arrNum[parseInt(this.state.arrNum[i].num)].cheked = false
            }
          }
        }
      }
      this.setState({ arrNum: this.state.arrNum })
    }



  }







  allOfThem = () => {
    let { arrNum } = this.state
    for (let i in arrNum) {
      if (arrNum[i].cheked !== 'no' && arrNum[i].id !== '场地不固定') {
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
      if (arrNum[i].cheked === true && arrNum[i].id !== '场地不固定') {
        arrNum[i].cheked = false
      } else if (arrNum[i].cheked === false && arrNum[i].id !== '场地不固定') {
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
      this.setState({ joinXi: false, arrCheked: [], arrChekedTwope: [], lppd: 0, typeTwo: 0, arrChekedLen: 0 })
      this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: this.state.pageOne })
    } else if (res.data.code === 4002) {
      message.warning('请选择场地类型')
    } else {
      message.warning(res.data.msg)
    }
  }

  subSiteSubdivision = (e) => {
    let { runId, tags, arrCheked, typeTwo } = this.state
    let obj = {
      sportid: runId,
      title: tags.indexOf('-') === -1 ? typeTwo === 2 ? tags + '-散场' : typeTwo === 1 ? tags + '-半场' : typeTwo === 3 ? tags + '-按时' : typeTwo === 4 ? tags + '-按次' : typeTwo === 5 ? tags + '-全场' : tags : tags,
      venueid: typeof (arrCheked) === 'string' ? arrCheked : arrCheked.join(),
      number: this.state.arrChekedLen,
      uuid: e.currentTarget.dataset.id,
      type: typeTwo
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
        } else if (res.data.data[i].sportid === 13) {
          res.data.data[i].sportid = '足球6人制'
        }
      }
      this.setState({ joinXiList: res.data.data, otherseris: res.data.other })
    }
  }


  showModal = () => {
    this.setState({
      joinXi: true,
      runId: '', joinB: false, tags: '', arrCheked: [], arrChekedTwope: [], venNumid: '', typeDetel: 1
    });
  };

  async getVenueNumberTitleFirst(data) {
    const res = await getVenueNumberTitleFirst(data, sessionStorage.getItem('venue_token'))
    this.getVenueSportidTitle({ sportid: res.data.data[0].sportid })
    if (res.data.data[0].title.indexOf('全场') !== -1) {
      this.setState({
        runId: res.data.data[0].sportid, joinB: false, tags: res.data.data[0].title, arrChekedLen: res.data.data[0].venueid.split(',').length / 2, arrCheked: res.data.data[0].venueid.split(','), arrChekedTwope: res.data.data[0].venueid.split(','), venNumid: res.data.data[0].uuid, typeTwo: res.data.data[0].type
      })
    } else {
      this.setState({
        runId: res.data.data[0].sportid, joinB: false, tags: res.data.data[0].title, arrChekedLen: res.data.data[0].venueid.split(',').length, arrCheked: res.data.data[0].venueid.split(','), arrChekedTwope: res.data.data[0].venueid.split(','), venNumid: res.data.data[0].uuid, typeTwo: res.data.data[0].type
      })
    }


  }

  async getSiteSelectedVenueid(data) {
    let { arrNum, runId } = this.state
    const res = await getSiteSelectedVenueid(data, sessionStorage.getItem('venue_token'))
    if (this.state.typeTwo===1||this.state.typeTwo===2 || runId === 2) {
      for (let j in res.data.data) {
        for (let i in this.state.arrNum) {
          if (this.state.arrNum.length === 48) {
            if (this.state.arrNum[47].cheked === true) {
              this.state.arrNum[i].cheked = 'no'
              this.state.arrNum[47].cheked = true
            } else {
              if (this.state.arrNum[i].id === res.data.data[j]) {
                this.state.arrNum[parseInt(this.state.arrNum[i].num)].cheked = 'no'
              }
            }
          } else {
            if (this.state.arrNum[i].id === res.data.data[j]) {
              this.state.arrNum[parseInt(this.state.arrNum[i].num)].cheked = 'no'
            }
          }
          for (let k in this.state.arrChekedTwope) {
            if (this.state.arrChekedTwope[k] === this.state.arrNum[i].id) {
              this.state.arrNum[parseInt(this.state.arrNum[i].num)].cheked = true
            }
          }
        }
      }
      this.setState({ arrNum: this.state.arrNum })
    } else {
      for (let i in res.data.data) {
        if(res.data.data[i].indexOf('A')===-1&&res.data.data[i].indexOf('B')===-1){
          this.state.arrNum[parseInt(res.data.data[i]) - 1].cheked = 'no'
        }
        
      }
      this.setState({ arrNum: this.state.arrNum })
    }

    if (this.state.lppd === 1 && runId !== 6 && runId !== 2) {
      if (this.state.arrCheked.length > 0) {
        for (let k in this.state.arrChekedTwope) {
          this.state.arrNum[parseInt(this.state.arrChekedTwope[k]) - 1].cheked = false
        }
        for (let j in this.state.arrCheked) {
          this.state.arrNum[parseInt(this.state.arrCheked[j]) - 1].cheked = true
        }
      } else if (res.data.data.length === 0 && this.state.arrCheked === 0) {
        for (let i in arrNum) {
          this.state.arrNum[i].cheked = false
        }
      }
    } else if (this.state.lppd !== 1 && runId !== 6 && runId !== 2) {
      if (this.state.arrCheked.length > 0) {
        for (let j in this.state.arrCheked) {
          this.state.arrNum[parseInt(this.state.arrCheked[j]) - 1].cheked = true
        }
      } else if (res.data.data.length === 0 && this.state.arrCheked === 0) {
        for (let i in arrNum) {
          this.state.arrNum[i].cheked = false
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
      message.success('删除成功')
      if (this.state.otherseris % 10 === 1) {
        this.setState({ pageOne: Number(this.state.pageOne) - 1 })
        this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: Number(this.state.pageOne) - 1 })
      } else {
        this.setState({ pageOne: this.state.pageOne })
        this.getVenueNumberTitleList({ sportid: this.state.nameChang, page: this.state.pageOne })
      }

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
      runIdTwo: '',
      tags: '',

    })
  }
  async getSiteSelectedTitle(data) {
    const res = await getSiteSelectedTitle(data, sessionStorage.getItem('venue_token'))
    if (res.data.data.length === 0 && this.state.headerData === '2' && this.state.runIdTwo !== '') {
      this.setState({
        nosubdivisions: true,
        runId: data.sportid
      })

      if (data.sportid === 6) {
        this.setState({
          ListSportTwoLO: [{ name: '半场', id: 1 }, { name: '散场', id: 2 }, { name: '全场', id: 5 }]
        })
      } else if (data.sportid === 2) {
        this.setState({
          ListSportTwoLO: [{ name: '按时(收费)', id: 3 }, { name: '按次(收费)', id: 4 }]
        })
      }



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
    if (e.indexOf('散') !== -1) {
      this.setState({ timeFalg: 'no', starttime: '00:00', endtime: '24:00', appointmenttime: -1, })
    } else if (e.indexOf('按次') !== -1) {
      this.setState({ timeFalg: 'yes', starttime: '00:00', endtime: '24:00', appointmenttime: -1, })
    } else if (e.indexOf('散') !== -1 || e.indexOf('按次') !== -1) {
      this.setState({ appointmenttime: -1, starttime: '00:00', endtime: '24:00', timeFalg: false })
    } else {
      this.setState({ appointmenttime: '', starttime: '', endtime: '', timeFalg: true })
    }

    if (this.state.arrTitle.indexOf(e) === -1) {
      this.setState({
        nosubdivisions: true
      })
    } else {
      this.setState({
        tagsTwo: e,
        tags_type: this.state.selecdTil[this.state.arrTitle.indexOf(e)].type,
        tagsTwoId: this.state.selecdTil[this.state.arrTitle.indexOf(e)].uuid,
        chekedTwo: this.state.selecdTil[this.state.arrTitle.indexOf(e)].venueid,
        chekedTwoLen: this.state.selecdTil[this.state.arrTitle.indexOf(e)].number
      })
    }
  }

  async DelSiteSetting(data) {
    const res = await DelSiteSetting(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('删除成功')
      if (this.state.other % 10 === 1) {
        this.setState({ page: Number(this.state.page) - 1 })
        this.getSiteSettingList({ sportid: this.state.nameChang, page: Number(this.state.page) - 1,at:this.state.token,sid:this.state.siteId })
      } else {
        this.setState({ page: Number(this.state.page) })
        this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page,at:this.state.token,sid:this.state.siteId })
      }

    } else {
      message.error(res.data.msg)
    }
  }



  confirmMoney = () => {
    this.DelSiteSetting({ uuid: this.state.moneyId })
  }

  preferential = (e) => {
    this.getSiteSettingFirst({ uuid: e.currentTarget.dataset.uid,at:this.state.token,sid:this.state.siteId, })
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
      tagsTwoId: '', comment: '', maxScheduledDate: '', maxScheduledDateName: [], runNameTwo: '', Disid: '', runId: '', tags: '', update: 0, tags_type: '',
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
    const res = await SiteSettingDiscountSave(data, '')
    if (res.data.code === 2000) {
      this.setState({
        Preferential: false
      })
      this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page,at:this.state.token,sid:this.state.siteId })
    } else {
      message.error(res.data.msg)
    }
  }

  PreferentialComfir = (e) => {
    let { costperhourSix,appointmenttimeSix,siteListId, workingDayList, costperhourTwo, appointmenttimeTwo } = this.state
    let obj = {
      uuid: siteListId,
      discount_date: workingDayList.join(','),
      discount_costperhour_cg: costperhourTwo,
      discount_appointment_cg: appointmenttimeTwo,
      discount_costperhour:costperhourSix,
      discount_appointment:appointmenttimeSix,
      at:this.state.token,
      sid:this.state.siteId
    }
    this.SiteSettingDiscountSave(obj)
  }
  tooltip = () => {
    this.setState({
      tooltip: true
    })
  }

  async DelSiteSettingDiscount(data) {
    const res = await DelSiteSettingDiscount(data, sessionStorage.getItem('venue_token'))

    if (res.data.code === 2000) {
      if (this.state.list % 10 === 1) {
        this.setState({ page: Number(this.state.page) - 1 })
        this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page,at:this.state.token,sid:this.state.siteId })
      } else {
        this.setState({ page: this.state.page })
        this.getSiteSettingList({ sportid: this.state.nameChang, page: this.state.page,at:this.state.token,sid:this.state.siteId })
      }
      this.setState({
        Preferential: false
      })
      message.success(res.data.msg)
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
      message.success('删除成功')
      if (this.state.titleDel === this.state.tags) {
        this.setState({ tags: '' })
      }
      this.getVenueSportidTitle({ sportid: this.state.runId })
    } else {
      message.error(res.data.msg)
    }
  }
  deletSelect = (e) => {
    if (e.currentTarget.dataset.id !== '1') {
      this.setState({ titleDel: e.currentTarget.dataset.title })
      this.DelVenueTitle({ uuid: e.currentTarget.dataset.id })
    }

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
  openSelect = (open) => {
    this.setState({ open: open })
  }
  allChed = () => {
    let items = this.state.arrNumTwo
    for (let i in items) {
      items[i].cheked = true
    }
    this.setState({ arrNumTwo: items })
  }
  allChedTwo = () => {
    let items = this.state.arrNumTwo
    for (let i in items) {
      items[i].cheked = !items[i].cheked
    }
    this.setState({ arrNumTwo: items })
  }
  details = (e) => {
    this.setState({ detail: true, deData: e.currentTarget.dataset })

  }
  onClose = () => {
    this.setState({ detail: false })
  }



  onPanelChange = (date) => {
    let dateSelect = date.format('YYYY-MM-DD')
    let dateArr = []
    if (this.state.workingDayList.indexOf(dateSelect) === -1) {
      dateArr.push(dateSelect)
      this.setState({ workingDayList: [...this.state.workingDayList, ...dateArr] })
    }
  }
  deletDate = () => {
    this.setState({ dateArr: this.state.dateArr.slice(0, this.state.dateArr.length - 1) })
  }
  handleChangeFiveTwo = e => {
    this.setState({ appointmenttimeTwo: parseInt(e) })
  }
  handleChangeFiveTwoSix=e=>{
    this.setState({ appointmenttimeSix: parseInt(e) })
  }
  handleChangeType = e => {
    this.setState({ typeTwo: e, arrCheked: [] })
  }

  timeLimit = e => {
    this.setState({ timeLimit: Number(e) })
  }

  timeLimitTwo = e => {
    this.setState({ timeLimitTwo: Number(e) })
  }

  selectDA = e => {
    this.setState({ selectDA: e })
  }


  async getSpecialDaysForVenue(data) {
    const res = await getSpecialDaysForVenue(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      message.error('登录超时！')
    }
    this.setState({ workingDayList: res.data.data })
  }


  workingDay = e => {
    let index = e.currentTarget.dataset.index
    this.getSpecialDaysForVenue({ type: index })
    this.setState({ indexBtnSon: index })
  }
  small = e => {
    let p = this.state.workingDayList
    p.splice(p.indexOf(e.currentTarget.dataset.date), 1)
    this.setState({ workingDayList: p })
  }





  async getVenueRelatList(data) {
    const res = await getVenueRelatList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ relatList: res.data.data, otherFour: res.data.other.maxcount })
    } else {
      message.warning(res.data.msg)
    }
  }







  relatedness = () => {
    this.setState({ relatedness: true })
  }


  async getLabelRelatVenueNumber(data) {
    const res = await getLabelRelatVenueNumber(data, sessionStorage.getItem('venue_token'))
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
      message.warning(res.data.msg)
    }
  }

  handleChangeThree = e => {
    this.setState({ relatednessRunid: [e], connectedName: '', connectedOne: '', connectedOneLen: 0 })
  }

  connectedCale = () => {
    this.setState({ connected: false })
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

  handleChangeGFour = e => {

    this.setState({ relatednessRunidTwo: [e], connectedNameTwo: '', connectedOneTwo: '' })

  }


  connectedCaleTwo = () => {
    this.setState({ connectedTwo: false })
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
    const res = await VenueRelatSave(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success('添加成功')
      this.setState({ relatedness: false,pageFour:1 })
      this.getVenueRelatList({ page: 1 })
    } else if (res.data.code === 4002) {
      message.warning('母关联者只能选择单个场地')
    } else {
      message.warning(res.data.msg)
    }
  }

  subSiteSubdivisionTwo = () => {

    if (this.state.relatednessRunid === '') {
      message.warning('请选择母关联场地类型')
    } else if (this.state.connectedOne === '') {
      message.warning('请选择母关联场地编号')
    } else if (this.state.relatednessRunidTwo === '') {
      message.warning('请选择子关联场地类型')
    } else if (this.state.connectedOneTwo === '') {
      message.warning('请选择子关联场地编号')
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
  relat = (e) => {
    this.setState({ relatUuid: e.currentTarget.dataset.uuid })
  }


  async VenueRelatRelieve(data) {
    const res = await VenueRelatRelieve(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueRelatList({ page: this.state.pageFour-1 })
      this.setState({pageFour:this.state.pageFour-1})
    }
  }


  relatfirm = () => {
    this.VenueRelatRelieve({ relatid: this.state.relatUuid })
  }

  moneyThree=e=>{
    this.setState({moneyThree:e})
  }

  maxScheduledDateThree=e=>{
    this.setState({maxScheduledDateThree:e})
  }
  appointmenttimeYThree=e=>{
    console.log(e)
    this.setState({appointmenttimeYThree:Number(e)})
  }


  render() {
    return (
      <Spin spinning={this.state.lppding} style={{ height: '100%' }}>
        <div className="siteStting">
          <div className="header">
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
                <Option value="13">足球6人制</Option>
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
                <Col xs={{ span: 1 }}>场地数量</Col>
                <Col xs={{ span: 2 }}>星期</Col>
                <Col xs={{ span: 2 }}>时间范围</Col>
                <Col xs={{ span: 1 }}>价格</Col>
                <Popover content={(<span>最长提前预订时间</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 1 }}>最长提前预订时间</Col>
                </Popover>
                <Popover content={(<span>最短提前预订时间</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 1 }}>最短提前预订时间</Col>
                </Popover>
                <Popover content={(<span>开始时间限制</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 2 }}>开始时间限制</Col>
                </Popover>
                <Popover content={(<span>时长限制</span>)} title='详情' trigger="click">
                  <Col xs={{ span: 2 }}>时长限制</Col>
                </Popover>
                <Col xs={{ span: 2 }}>备注</Col>
                <Col xs={{ span: 2 }}>特定日期</Col>
                <Col xs={{ span: 2, }}>操作</Col>
              </Row>
              <div className="dataList">
                {
                  this.state.list.map((item, i) => (
                    <Row key={i} className="rowList">
                      <Col xs={{ span: 2 }}>{item.sportname}</Col>
                      <Col xs={{ span: 2 }}>{item.tags}</Col>
                      <Popover content={(<div style={{ maxWidth: '200px', wordBreak: 'break-all' }}>{item.venueid}</div>)} title='详情' trigger="click">
                        <Col xs={{ span: 2 }} style={{ cursor: 'pointer' }}>{item.venueid}</Col>
                      </Popover>
                      <Col xs={{ span: 1 }}>{item.sitenumber}</Col>
                      <Popover content={(<span>{item.opendaynameTwo.slice(1, item.opendaynameTwo.length)}</span>)} title='详情' trigger="click">
                        <Col style={{ cursor: 'pointer' }} xs={{ span: 2 }}>{item.opendaynameTwo.slice(1, item.opendaynameTwo.length)}</Col>
                      </Popover>
                      <Col xs={{ span: 2 }} style={{ lineHeight: '24px' }}>{item.starttime}<br />{item.endtime}</Col>
                      <Popover content={(<span>{item.tags.indexOf('散') === -1 && item.tags.indexOf('按次') === -1 ? item.costperhour + '(元/时)' : item.costperhour+ '(元/次)'}</span>)} title='详情' trigger="click">
                        <Col xs={{ span: 1 }} style={{ cursor: 'pointer' }}>{item.tags.indexOf('散') === -1 && item.tags.indexOf('按次') === -1 ? item.costperhour + '(元/时)' : item.costperhour + '(元/次)'}</Col>
                      </Popover>
                      <Col xs={{ span: 1 }}>{item.maxScheduledDate === null ? '' : item.maxScheduledDateTwo}</Col>
                      <Col xs={{ span: 1 }}>{item.appointmenttime === null ? '' : item.appointmenttime > 2879 ? item.appointmenttime / 60 / 24 + '天' : item.appointmenttime / 60 + '小时'}</Col>
                      <Col xs={{ span: 2 }}>{item.timelimit === 1 ? '不限' : item.timelimit === 2 ? '整点' : item.timelimit === 3 ? '单数整点' : item.timelimit === 4 ? '双数整点' : '不限'}</Col>
                      <Col xs={{ span: 2 }}>{item.tags.indexOf('散') !== -1 || item.tags.indexOf('按次') !== -1 ? '不限' : item.durationlimit === 1 ? '1小时以上' : item.durationlimit === 2 ? '1小时整数倍' : item.durationlimit === 3 ? '2小时整数倍' : '不限'}</Col>
                      <Popover content={(<span>{item.comment === '' ? '无' : item.comment}</span>)} title='详情' trigger="click">
                        <Col xs={{ span: 2 }} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{item.comment === '' ? '无' : item.comment}</Col>
                      </Popover>
                      <Col xs={{ span: 2 }} ><span style={item.tags.indexOf('散') !== -1 || item.tags.indexOf('按次') !== -1 ? {} : { display: 'none' }}>不可设置</span><span style={item.tags.indexOf('散') !== -1 || item.tags.indexOf('按次') !== -1 ? { display: 'none' } : { cursor: 'pointer', padding: '3px 6px', color: 'blue' }} data-uid={item.uuid} data-type={item.discount_date} onClick={item.discount_date === null?this.kok:this.preferential}>{item.discount_date === null ? '无' : '查看'}</span></Col>
                      <Col xs={{ span: 2 }}>
                        <img onClick={this.update} style={{ cursor: 'pointer' }} data-uid={item.uuid} src={require("../../assets/icon_pc_updata.png")} alt="修改" />&nbsp;&nbsp;&nbsp;
                      
                      </Col>
                    </Row>
                  ))
                }
              </div>
            </div>

            <div style={this.state.list.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '84px', height: '84px', display: 'block', margin: '64px auto 0' }} src={require('../../assets/xifen (6).png')} alt='icon' /><span style={{ display: 'block', textAlign: 'center' }}>您还没有设置场地价格!</span></div>
            <Pagination style={{ marginBottom: '15px' }} hideOnSinglePage={true} showSizeChanger={false} className={this.state.hidden === true ? 'fenye' : 'hidden'} current={this.state.page} total={this.state.other} onChange={this.current} />
          </div>

  



        







        


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
              <Select placeholder="请选择" onInputKeyDown={this.ko} disabled={ true} showArrow={this.state.update === 1 ? false : true} value={this.state.runId === '' ? [] : this.state.runId} className="selectModel" style={{ width: 269, height: 32 }} onChange={this.handleChangeOneTwo}>
                {
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>细分标签</span>
              <Select placeholder="请选择" disabled={true } showArrow={this.state.update === 1 ? false : true} value={this.state.tagsTwo === '' ? [] : this.state.tagsTwo} className="selectModel" style={{ width: 269, height: 32 }} onChange={this.handleChangeTags}>
                {
                  this.state.selecdTil.map((item, i) => (
                    <Option key={i} value={item.title}>{item.title}</Option>
                  ))
                }
              </Select>
            </div>
            <div className="modelList" style={{ height: '32px' }}>
              <span>场地编号</span>
              <Input className="startTime" style={{ paddingLeft: '10px', height: 32, width: 269, cursor: 'pointer' }} value={this.state.chekedTwo === '' ? [] : this.state.chekedTwo} disabled={true} placeholder="点击进行添加" onChange={this.money} />
            </div>
            <div className="modelList">
              <span>场地数量</span>
              <div className="startTime" disabled={true} style={{ marginRight: 168 }}>{this.state.chekedTwoLen}</div>
            </div>

            <div className="modelList" style={this.state.tagsTwo.indexOf('散场') !== -1 || this.state.tagsTwo.indexOf('按次') !== -1 ? { display: 'none' } : { height: 'auto' }}>
              <span>星期</span>
              <Select placeholder="请选择" mode='multiple' className="selectModel" disabled={true}
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


            <div className="modelList" style={this.state.timeFalg === true ? { height: '32px' } : { display: 'none' }}>
              <span>时间范围</span>
              <Select style={{ width: 128, height: 'auto', marginLeft: 88, float: 'left' }} disabled={true} value={this.state.starttime === '' ? undefined : this.state.starttime} onChange={this.starttime} placeholder="开始时间">
                {this.state.timer.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))}
              </Select>
            ~
            <Select style={{ width: 130, height: 'auto' }} disabled={true} value={this.state.endtime === '' ? undefined : this.state.endtime} onChange={this.endtime} placeholder="结束时间">
                {this.state.timer.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))}
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>开始时间限制</span>
              <Select style={{ width: 269, height: 'auto', marginLeft: 60, float: 'left' }} disabled={true} value={this.state.timeLimit === 1 ? '不限' : this.state.timeLimit === 2 ? '整点' : this.state.timeLimit === 3 ? '单数整点' : this.state.timeLimit === 4 ? '双数整点' : '不限'} onChange={this.timeLimit} placeholder="开始时间限制">
                <Option value='1'>不限</Option>
                <Option value='2'>整点</Option>
                <Option value='3'>单数整点</Option>
                <Option value='4'>双数整点</Option>
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>时长限制</span>
              <Select style={{ width: 269, height: 'auto', marginLeft: 88, float: 'left' }} disabled={true} value={this.state.timeFalg === false ? '不限' : this.state.timeLimitTwo === 1 ? '一小时以上' : this.state.timeLimitTwo === 2 ? '一小时整数倍' : this.state.timeLimitTwo === 3 ? '二小时整数倍' : '一小时以上'} onChange={this.timeLimitTwo} placeholder="时长限制">
                <Option value='1'>一小时以上</Option>
                <Option value='2'>一小时整数倍</Option>
                <Option value='3'>二小时整数倍</Option>
              </Select>
            </div>



            <div className="modelList" style={{ height: '32px' }}>
              <span>公开价格</span><span>{this.state.timeFalg === 'no' ? '' : this.state.timeFalg === 'yes' ? '' : '(元/时)'}</span>
              <InputNumber className="startTime" disabled={true} value={this.state.costperhour} defaultValue={1} min={1} style={this.state.timeFalg === 'no' ? { height: 32, width: 269, marginLeft: '88px', paddingLeft: '11px', marginRight: 0, float: 'left' } : this.state.timeFalg === 'yes' ? { height: 32, width: 269, marginLeft: '88px', paddingLeft: '11px', marginRight: 0, float: 'left' } : { height: 32, width: 269, paddingLeft: '11px' }} placeholder="请输入" onChange={this.money} />
              <Select placeholder="请选择" onChange={this.selectDA} disabled={true} value={this.state.selectDA} style={this.state.timeFalg === 'no' ? { float: 'right', marginRight: '50px', width: '80px', height: '32px' } : this.state.timeFalg === 'yes' ? { float: 'right', marginRight: '50px', width: '80px', height: '32px' } : { display: 'none' }}>
                <Option value="/次">/次</Option>
                <Option value="/H">/H</Option>
                <Option value="/2H">/2H</Option>
                <Option value="/3H">/3H</Option>
                <Option value="/4H">/4H</Option>
                <Option value="/5H">/5H</Option>
                <Option value="/6H">/6H</Option>
              </Select>
            </div>
            <div className="modelList" style={{ height: 32 }}>
              <span>最长提前预订时间</span>
              <Select placeholder="请选择" className="selectModel" disabled={true} value={this.state.maxScheduledDateName} style={{ width: 269, height: 32 }} onChange={this.handleChangeFour}>
                <Option value="0.1">一周</Option>
                <Option value="0.2">两周</Option>
                <Option value="0.3">三周</Option>
                <Option value="1">一个月</Option>
                <Option value="2">两个月</Option>
              </Select>
            </div>
            <div className="modelList" style={{ height: 32 }}>
              <span>最短提前预订时间</span>
              <Select placeholder="请选择" disabled={true} className="selectModel"
                defaultActiveFirstOption={false}
                value={
                  this.state.appointmenttime === -1 ? '不限' : []
                    && this.state.appointmenttime === 0 ? '不限' : []
                      && this.state.appointmenttime === 30 ? '30分钟' : []
                        && this.state.appointmenttime === 60 ? '60分钟' : []
                          && this.state.appointmenttime === 120 ? '2小时' : []
                            && this.state.appointmenttime === 180 ? '3小时' : []
                              && this.state.appointmenttime === 240 ? '4小时' : []
                                && this.state.appointmenttime === 300 ? '5小时' : []
                                  && this.state.appointmenttime === 360 ? '6小时' : []
                                    && this.state.appointmenttime === 1440 ? '24小时' : []
                                      && this.state.appointmenttime === 2880 ? '2天' : []
                                        && this.state.appointmenttime === 4320 ? '3天' : []
                                          && this.state.appointmenttime === 5760 ? '4天' : []
                                            && this.state.appointmenttime === 7200 ? '5天' : []
                                              && this.state.appointmenttime === 8640 ? '6天' : []
                                                && this.state.appointmenttime === 10080 ? '7天' : []
                                                  && this.state.appointmenttime === 11520 ? '8天' : []
                                                    && this.state.appointmenttime === 12960 ? '9天' : []
                                                      && this.state.appointmenttime === 14400 ? '10天' : []
                                                        && this.state.appointmenttime === 15840 ? '11天' : []
                                                          && this.state.appointmenttime === 17280 ? '12天' : []
                                                            && this.state.appointmenttime === 18720 ? '13天' : []
                                                              && this.state.appointmenttime === 20160 ? '14天' : []
                                                                && this.state.appointmenttime === 21600 ? '15天' : []
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
                <Option value="1440">24小时</Option>
                <Option value="2880">2天</Option>
                <Option value="4320">3天</Option>
                <Option value="5760">4天</Option>
                <Option value="7200">5天</Option>
                <Option value="8640">6天</Option>
                <Option value="10080">7天</Option>
                <Option value="11520">8天</Option>
                <Option value="12960">9天</Option>
                <Option value="14400">10天</Option>
                <Option value="15840">11天</Option>
                <Option value="17280">12天</Option>
                <Option value="18720">13天</Option>
                <Option value="20160">14天</Option>
                <Option value="21600">15天</Option>
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>内部价格</span><span>{this.state.timeFalg === 'no' ? '' : this.state.timeFalg === 'yes' ? '' : '(元/时)'}</span>
              <InputNumber className="startTime"  value={this.state.moneyThree} defaultValue={1} min={1} style={this.state.timeFalg === 'no' ? { height: 32, width: 269, marginLeft: '88px', paddingLeft: '11px', marginRight: 0, float: 'left' } : this.state.timeFalg === 'yes' ? { height: 32, width: 269, marginLeft: '88px', paddingLeft: '11px', marginRight: 0, float: 'left' } : { height: 32, width: 269, paddingLeft: '11px' }} placeholder="请输入" onChange={this.moneyThree} />
            </div>

            <div className="modelList" style={{ height: 32 }}>
              <span>内部最长提前预订时间</span>
              <Select placeholder="请选择" className="selectModel"  value={this.state.maxScheduledDateThree} style={{ width: 269, height: 32 }} onChange={this.maxScheduledDateThree}>
                <Option value="0.1">一周</Option>
                <Option value="0.2">两周</Option>
                <Option value="0.3">三周</Option>
                <Option value="1">一个月</Option>
                <Option value="2">两个月</Option>
              </Select>
            </div>


            <div className="modelList" style={{ height: 32 }}>
              <span>内部最短提前预订时间</span>
              <Select placeholder="请选择"  className="selectModel"
                defaultActiveFirstOption={false}
                value={
                  this.state.appointmenttimeYThree === -1 ? '不限' : []
                    && this.state.appointmenttimeYThree === 0 ? '不限' : []
                      && this.state.appointmenttimeYThree === 30 ? '30分钟' : []
                        && this.state.appointmenttimeYThree === 60 ? '60分钟' : []
                          && this.state.appointmenttimeYThree === 120 ? '2小时' : []
                            && this.state.appointmenttimeYThree === 180 ? '3小时' : []
                              && this.state.appointmenttimeYThree === 240 ? '4小时' : []
                                && this.state.appointmenttimeYThree === 300 ? '5小时' : []
                                  && this.state.appointmenttimeYThree === 360 ? '6小时' : []
                                    && this.state.appointmenttimeYThree === 1440 ? '24小时' : []
                                      && this.state.appointmenttimeYThree === 2880 ? '2天' : []
                                        && this.state.appointmenttimeYThree === 4320 ? '3天' : []
                                          && this.state.appointmenttimeYThree === 5760 ? '4天' : []
                                            && this.state.appointmenttimeYThree === 7200 ? '5天' : []
                                              && this.state.appointmenttimeYThree === 8640 ? '6天' : []
                                                && this.state.appointmenttimeYThree === 10080 ? '7天' : []
                                                  && this.state.appointmenttimeYThree === 11520 ? '8天' : []
                                                    && this.state.appointmenttimeYThree === 12960 ? '9天' : []
                                                      && this.state.appointmenttimeYThree === 14400 ? '10天' : []
                                                        && this.state.appointmenttimeYThree === 15840 ? '11天' : []
                                                          && this.state.appointmenttimeYThree === 17280 ? '12天' : []
                                                            && this.state.appointmenttimeYThree === 18720 ? '13天' : []
                                                              && this.state.appointmenttimeYThree === 20160 ? '14天' : []
                                                                && this.state.appointmenttimeYThree === 21600 ? '15天' : []
                }
                style={{ width: 269, height: 32 }}
                onChange={this.appointmenttimeYThree}
              >
                <Option value="0">0分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="120">2小时</Option>
                <Option value="180">3小时</Option>
                <Option value="240">4小时</Option>
                <Option value="300">5小时</Option>
                <Option value="360">6小时</Option>
                <Option value="1440">24小时</Option>
                <Option value="2880">2天</Option>
                <Option value="4320">3天</Option>
                <Option value="5760">4天</Option>
                <Option value="7200">5天</Option>
                <Option value="8640">6天</Option>
                <Option value="10080">7天</Option>
                <Option value="11520">8天</Option>
                <Option value="12960">9天</Option>
                <Option value="14400">10天</Option>
                <Option value="15840">11天</Option>
                <Option value="17280">12天</Option>
                <Option value="18720">13天</Option>
                <Option value="20160">14天</Option>
                <Option value="21600">15天</Option>
              </Select>
            </div>




            <div className="modelListT">
              <span>备注</span>
              <TextArea className="textArea" rows={4} placeholder='请输入' maxLength={50} style={{ marginRight: 151, width: 269 }} value={this.state.comment} onChange={this.textArea} />
            </div>

            <div className="submit" data-uuid={this.state.Disid !== '' ? this.state.Disid : ''} onClick={this.submit}>提交</div>
          </Modal>







        

          <Modal
            title="添加/修改特定日期价格设置"
            visible={this.state.Preferential}
            onOk={this.handleOk}
            onCancel={this.PreferentialCan}
            width={630}
            className='model'
            closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px' }} />}
          >
            <div className="modelList" style={{ height: '32px' }}>
              <span>场地类型</span>
              <Select placeholder="请选择" disabled={true} showArrow={false} value={this.state.runIdTwo === '' ? [] : this.state.runIdTwo} className="selectModel" style={{ width: 330, height: 32, marginRight: 50, cursor: 'pointer' }} onChange={this.handleChangeOneTwo}>
                {
                  this.state.ListSport.map((item, i) => (
                    <Option key={i} value={item.id}>{item.name}</Option>
                  ))
                }
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>场地标签</span>
              <Select placeholder="请选择" disabled={true} showArrow={false} value={this.state.tagsTwo === '' ? [] : this.state.tagsTwo} className="selectModel" style={{ width: 330, height: 32, marginRight: 50 }} onChange={this.handleChangeTags}>
                {
                  this.state.joinTil.map((item, i) => (
                    <Option key={i} value={item.title}>{item.title}</Option>
                  ))
                }
              </Select>
            </div>



            <div className="modelList" style={{ height: '32px' }}>
              <span>时间范围</span>
              <Select style={{ width: 159, height: 'auto', marginLeft:127, float: 'left' }} disabled={true} value={this.state.starttime === '' ? undefined : this.state.starttime} onChange={this.starttime} placeholder="开始时间">
                {this.state.timer.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))}
              </Select>
            ~
            <Select style={{ width: 159, height: 'auto' }} disabled={true} value={this.state.endtime === '' ? undefined : this.state.endtime} onChange={this.endtime} placeholder="结束时间">
                {this.state.timer.map((item, i) => (
                  <Option key={i} value={item.name}>{item.name}</Option>
                ))}
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>场地号</span>
              <Input className="startTime" style={{ paddingLeft: '10px', height: 32, width: 330, cursor: 'pointer', marginRight: 50 }} disabled={true} value={this.state.chekedThree === '' ? [] : this.state.chekedThree} placeholder="点击进行添加" />
            </div>

            <div className="modelList" style={{ height: 32 }}>
              <span>场馆方最短提前预订时间</span>
              <Select placeholder="请选择" className="selectModel"
                defaultActiveFirstOption={false}
                disabled={true}
                value={
                  this.state.appointmenttimeTwo === -1 ? '不限' : []
                    && this.state.appointmenttimeTwo === 0 ? '不限' : []
                      && this.state.appointmenttimeTwo === 30 ? '30分钟' : []
                        && this.state.appointmenttimeTwo === 60 ? '60分钟' : []
                          && this.state.appointmenttimeTwo === 120 ? '2小时' : []
                            && this.state.appointmenttimeTwo === 180 ? '3小时' : []
                              && this.state.appointmenttimeTwo === 240 ? '4小时' : []
                                && this.state.appointmenttimeTwo === 300 ? '5小时' : []
                                  && this.state.appointmenttimeTwo === 360 ? '6小时' : []
                                    && this.state.appointmenttimeTwo === 1440 ? '24小时' : []
                                      && this.state.appointmenttimeTwo === 2880 ? '2天' : []
                                        && this.state.appointmenttimeTwo === 4320 ? '3天' : []
                                          && this.state.appointmenttimeTwo === 5760 ? '4天' : []
                                            && this.state.appointmenttimeTwo === 7200 ? '5天' : []
                                              && this.state.appointmenttimeTwo === 8640 ? '6天' : []
                                                && this.state.appointmenttimeTwo === 10080 ? '7天' : []
                                                  && this.state.appointmenttimeTwo === 11520 ? '8天' : []
                                                    && this.state.appointmenttimeTwo === 12960 ? '9天' : []
                                                      && this.state.appointmenttimeTwo === 14400 ? '10天' : []
                                                        && this.state.appointmenttimeTwo === 15840 ? '11天' : []
                                                          && this.state.appointmenttimeTwo === 17280 ? '12天' : []
                                                            && this.state.appointmenttimeTwo === 18720 ? '13天' : []
                                                              && this.state.appointmenttimeTwo === 20160 ? '14天' : []
                                                                && this.state.appointmenttimeTwo === 21600 ? '15天' : []
                }
                style={{ width: 330, height: 32, float: 'right', marginRight: '50px' }}
                onChange={this.handleChangeFiveTwo}
              >
                 <Option value="0">0分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="120">2小时</Option>
                <Option value="180">3小时</Option>
                <Option value="240">4小时</Option>
                <Option value="300">5小时</Option>
                <Option value="360">6小时</Option>
                <Option value="1440">24小时</Option>
                <Option value="2880">2天</Option>
                <Option value="4320">3天</Option>
                <Option value="5760">4天</Option>
                <Option value="7200">5天</Option>
                <Option value="8640">6天</Option>
                <Option value="10080">7天</Option>
                <Option value="11520">8天</Option>
                <Option value="12960">9天</Option>
                <Option value="14400">10天</Option>
                <Option value="15840">11天</Option>
                <Option value="17280">12天</Option>
                <Option value="18720">13天</Option>
                <Option value="20160">14天</Option>
                <Option value="21600">15天</Option>
              </Select>
            </div>

            <div className="modelList" style={{ height: '32px' }}>
              <span>场馆方价格</span><span style={{ marginLeft: 0 }}>(元/小时)</span>
              <Input type="number" className="startTime" disabled={true} value={String(this.state.costperhourTwo).replace('.', '')} min={0} style={{ paddingLeft: '10px', height: 32, width: 330, marginRight: 50 }} placeholder="请输入" onChange={this.moneyTwo} />
            </div>

            <div className="modelList" style={{ height: 32 }}>
              <span>最短提前预订时间</span>
              <Select placeholder="请选择" className="selectModel"
                defaultActiveFirstOption={false}
                value={
                  this.state.appointmenttimeSix === -1 ? '不限' : []
                    && this.state.appointmenttimeSix === 0 ? '不限' : []
                      && this.state.appointmenttimeSix === 30 ? '30分钟' : []
                        && this.state.appointmenttimeSix === 60 ? '60分钟' : []
                          && this.state.appointmenttimeSix === 120 ? '2小时' : []
                            && this.state.appointmenttimeSix === 180 ? '3小时' : []
                              && this.state.appointmenttimeSix === 240 ? '4小时' : []
                                && this.state.appointmenttimeSix === 300 ? '5小时' : []
                                  && this.state.appointmenttimeSix === 360 ? '6小时' : []
                                    && this.state.appointmenttimeSix === 1440 ? '24小时' : []
                                      && this.state.appointmenttimeSix === 2880 ? '2天' : []
                                        && this.state.appointmenttimeSix === 4320 ? '3天' : []
                                          && this.state.appointmenttimeSix === 5760 ? '4天' : []
                                            && this.state.appointmenttimeSix === 7200 ? '5天' : []
                                              && this.state.appointmenttimeSix === 8640 ? '6天' : []
                                                && this.state.appointmenttimeSix === 10080 ? '7天' : []
                                                  && this.state.appointmenttimeSix === 11520 ? '8天' : []
                                                    && this.state.appointmenttimeSix === 12960 ? '9天' : []
                                                      && this.state.appointmenttimeSix === 14400 ? '10天' : []
                                                        && this.state.appointmenttimeSix === 15840 ? '11天' : []
                                                          && this.state.appointmenttimeSix === 17280 ? '12天' : []
                                                            && this.state.appointmenttimeSix === 18720 ? '13天' : []
                                                              && this.state.appointmenttimeSix === 20160 ? '14天' : []
                                                                && this.state.appointmenttimeSix === 21600 ? '15天' : []
                }
                style={{ width: 330, height: 32, float: 'right', marginRight: '50px' }}
                onChange={this.handleChangeFiveTwoSix}
              >
                 <Option value="0">0分钟</Option>
                <Option value="30">30分钟</Option>
                <Option value="60">60分钟</Option>
                <Option value="120">2小时</Option>
                <Option value="180">3小时</Option>
                <Option value="240">4小时</Option>
                <Option value="300">5小时</Option>
                <Option value="360">6小时</Option>
                <Option value="1440">24小时</Option>
                <Option value="2880">2天</Option>
                <Option value="4320">3天</Option>
                <Option value="5760">4天</Option>
                <Option value="7200">5天</Option>
                <Option value="8640">6天</Option>
                <Option value="10080">7天</Option>
                <Option value="11520">8天</Option>
                <Option value="12960">9天</Option>
                <Option value="14400">10天</Option>
                <Option value="15840">11天</Option>
                <Option value="17280">12天</Option>
                <Option value="18720">13天</Option>
                <Option value="20160">14天</Option>
                <Option value="21600">15天</Option>
              </Select>
            </div>

            

            <div className="modelList" style={{ height: '32px' }}>
              <span>价格</span><span style={{ marginLeft: 0 }}>(元/小时)</span>
              <Input type="number" className="startTime"  value={String(this.state.costperhourSix).replace('.', '')} min={0} style={{ paddingLeft: '10px', height: 32, width: 330, marginRight: 50 }} placeholder="请输入" onChange={this.moneySix} />
            </div>



            <div className="footerSerial">
              <div className="seriaComfir" onClick={this.PreferentialComfir} data-type="1">{this.state.typeList === undefined ? '提交' : '提交修改'}</div>
              
            </div>
          </Modal>






        </div ></Spin>
    )
  }
}

export default siteSettingsTwo;