import React from 'react';
import './orderPh.css';

import { DatePicker, Toast, Card, Modal, InputItem, List, Picker, SearchBar, Radio, Calendar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, Spin, Table, Checkbox, Row, Col, Popover, message } from 'antd';
import { getReservationActivitieslist, VenueSendMessage, getVenueReservation, setSquareByOffLine, payOfflineOccupyOrder, formatPlayTimeAndVenueNum, payOccupyWindow, offlineOrderList, DelVenueOfflineOccupancy, cancelSingleOrder, getVenueSport, CalculateVenuePrice, getVipCardInfomation, AddVenueOfflineOccupancy, getVenueBookingInformation, VenueClickCancelPlace, BreakUpConsumptionDetails, ContinuationRecord, getVenueNumberTitleList, VenueRemarksLabel, VenueNumberSporttypeSave, DelVenueNumberTitle, getVenueNumberTitleSave, DeductTheTimesOfClosing } from '../../api';
const prompt = Modal.prompt;
const alert = Modal.alert;
const RadioItem = Radio.RadioItem;
const now = new Date();
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
/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/


class orderPh extends React.Component {

  state = {
    activityList: false,
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
    deducting: false,
    deductingdetails: [],
    isfinsh: 0,
    week: '',
    isloop: 2,
    duration: false,
    Record: [],
    district: [{ label: '会员卡支付', value: 1 }, { label: '其他支付(现金/微信/支付宝)', value: 2 }],
    theWay: [2],
    contacts: '',
    contactNumber: '',
    timeLenList: [{ label: '1小时', value: 1 }, { label: '2小时', value: 2 }, { label: '3小时', value: 3 }, { label: '4小时', value: 4 }, { label: '5小时', value: 5 }, { label: '6小时', value: 6 }],
    timeLen: [],
    selectVenueId: '',
    selectable: false,
    selectableList: [],
    TotalPrice: 0,
    repeat: [0],
    repeatList: [{ label: '不重复', value: 0 }, { label: '重复', value: 1 }],
    theNews: '',
    otherObjTime: [],
    History: false,
    cardDetails: false,
    vipDetails: [],
    vipDetailsTwo: '',
    indexI: 0,
    kw: '',
    show: false,
    venueT: [],
    consumpMoneyYou: [],
    orderIndex: 0,
    checkOutNow: false,
    checkOutNowObj: '',
    payment: [3],
    checkOutNowArr: [{ label: '现金', value: 3 }, { label: '微信', value: 4 }, { label: '支付宝', value: 5 }],

    pageHood: 1,
    lineList: [],
    sportidHood: '',
    payModeHood: '',
    icomeHood: '',
    seasons: [{ label: '羽毛球', value: 1 }, { label: '乒乓球', value: 2 }, { label: '台球中式黑八', value: 3 }, { label: '台球美式九球', value: 4 }, { label: '台球斯诺克', value: 5 }, { label: '篮球', value: 6 }, { label: '足球11人制', value: 7 }, { label: '足球8人制', value: 8 }, { label: '足球7人制', value: 9 }, { label: '足球6人制', value: 13 }, { label: '足球5人制', value: 10 }, { label: '排球', value: 11 }, { label: '网球', value: 12 }],
    seasonsTwo: [{ labe: '会员卡扣费', value: 1 }, { label: '现金支付', value: 3 }, { label: '微信支付', value: 4 }, { label: '支付宝支付', value: 5 }],
    venueTwo: [],
    otherTypeTwo: [],
    kohgigh:1,
    lppding:true

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

      if(this.state.liNum!=='3'&&this.state.liNum!=='4'&&this.state.liNum!=='5'){
        let arrty = []
        for (let i=1;i<res.data.data.length;i++) {
          if (res.data.data[i].a.slice(3, 5) === '00') {
            arrty.push(res.data.data[i])
          }
        }
        for (let i in arrty) {
          for (let j in arrty[i].c) {
            arrty[i].c[j].money_cg = arrty[i].c[j].money_cg * 2+'.00'
            arrty[i].c[j].money = Number(arrty[i].c[j].money) * 2
          }
        }
        res.data.data = arrty
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
      let kojh = []
      for (let i in res.data.data) {
        arrTime.push(res.data.data[i].a)
        for (let j in res.data.data[i].c) {
          if (res.data.data[i].c[j].type === 1) {
            kojh.push(res.data.data[i].a)
          }
        }
      }
      setTimeout(() => {
        if (document.querySelector('.ant-table-body') !== null) {
          document.querySelector('.ant-table-body').scrollTo(0, arrTime.indexOf(kojh[0]) * 49)
        }
      }, 50)

      
      for (let i in res.data.other.biaoqian) {
        res.data.other.biaoqian[i].dataIndex = res.data.other.biaoqian[i].venueid
        res.data.other.biaoqian[i].title = <Popover placement="topLeft" title='标签描述' content={res.data.other.biaoqian[i].com === '' ? '暂无标签描述' : res.data.other.biaoqian[i].com} trigger="click"><div style={{ fontSize: '0.75rem' }}>{res.data.other.biaoqian[i].venueid}<br />{res.data.other.biaoqian[i].title}</div></Popover>
        res.data.other.biaoqian[i].width = 60
      }
      let ploboj = {
        title: <div style={{ fontSize: '0.78rem' }}>场地号<br />标签</div>,
        fixed: 'left',
        width: 60,
        dataIndex: 'lppd',
      }
      res.data.other.biaoqian.unshift(ploboj)

      for (let i in res.data.other.incomplete) {
        for (let j in res.data.data) {
          if (res.data.other.incomplete[i].time.slice(3, 5) < 30) {
            if (res.data.data[j].a.slice(0, 2) === res.data.other.incomplete[i].time.slice(0, 2) && res.data.data[j].a.slice(3, 5) < res.data.other.incomplete[i].time.slice(3, 5)) {
              for (let k in res.data.data[j].c) {
                if (res.data.data[j].c[k].venueids === res.data.other.incomplete[i].venueid) {
                  res.data.data[j].c[k].time = res.data.other.incomplete[i].time
                  res.data.data[j].c[k].type = 2
                  res.data.data[j].c[k].uuidTwo = res.data.other.incomplete[i].uuid
                  res.data.data[j].c[k].whoTwo = res.data.other.incomplete[i].who
                }
              }
            }
          } else {
            if (res.data.data[j].a.slice(0, 2) === res.data.other.incomplete[i].time.slice(0, 2) && 30 < res.data.other.incomplete[i].time.slice(3, 5) && res.data.data[j].a.slice(3, 5) !== '00') {
              for (let k in res.data.data[j].c) {
                if (res.data.data[j].c[k].venueids === res.data.other.incomplete[i].venueid) {
                  res.data.data[j].c[k].time = res.data.other.incomplete[i].time
                  res.data.data[j].c[k].uuidTwo = res.data.other.incomplete[i].uuid
                  res.data.data[j].c[k].type = 2
                  res.data.data[j].c[k].whoTwo = res.data.other.incomplete[i].who
                }
              }
            }
          }
        }
      }



      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c, otherType: res.data.other.biaoqian, otherTypeTwo: res.data.other.incomplete, value: 'l', spinningTwo: false, loadingTwo: false })
      this.setState({
        resData: res.data.data
      })
      this.hoode(res.data.data)
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
      let kood = []
      let otherTypeTwo = this.state.otherTypeTwo
      if (otherTypeTwo.length === 0) {
        
        for (let j in resData[i].c) {
          if (resData[i].c[j].type === 4) {
            kood.push(resData[i].c[j])
            resData[i].k = kood.length
          }
          obj.key = i + 1
          let key = resData[i].c[j].venueids
          let value = <div><div
            data-type={resData[i].c[j].type}
            data-uuid={resData[i].c[j].uuid}
            data-venueids={resData[i].c[j].venueids}
            data-starttime={resData[i].a}
            data-endtime={resData[i].a}
            className="loopsdgds"
            data-index={this.state.kohgigh}
            onClick={this.lookDeta}
            style={resData[i].c[j].type === 1 ? { background: '#6FB2FF', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 4 ? { background: 'red', height: 45, lineHeight: 3 } : {}}><Checkbox className="chePe" idx={i} jdx={j} checked={resData[i].c[j].checked} onChange={this.checkbox} dtype={resData[i].c[j].type} time={resData[i].a} venueid={resData[i].c[j].venueids} uuid={resData[i].c[j].uuid} style={resData[i].c[j].type === 1 && this.state.cofirmZ === 1 ? {} : { display: 'none' } && resData[i].c[j].type === 4 && this.state.Cancels === 1 ? {} : { display: 'none' }} />{resData[i].c[j].type === 4 ? resData[i].c[j].who : resData[i].c[j].money_cg}</div>

          </div>
          obj[key] = value
          obj.lppd = <div style={{ color: '#F5A623', marginTop: '-2.2rem' }}>{resData[i].a}<br /><div className="sdgdfgdf" style={resData[i].k > 0 ? {} : { display: 'none' }}>{resData[i].k}</div><div style={resData[resData.length - 1].a === resData[i].a ? { position: 'absolute', left: '0.9rem', top: '2rem' } : { display: 'none' }}>
            {resData[resData.length - 1].a === '23:30' ? '24:00' : resData[resData.length - 1].a.slice(3, 5) === '00' ? resData[resData.length - 1].a.slice(0, 2) + ':30' : Number(resData[resData.length - 1].a.slice(0, 2)) + 1 + ':00'}
            </div></div>
        
        
        }
        jood.push(obj)

      } else {

        let obj = {}
        let kood = []
        for (let j in resData[i].c) {
          if (resData[i].c[j].type === 4) {
            kood.push(resData[i].c[j])
            resData[i].k = kood.length
          }
          obj.key = i + 1
          let key = resData[i].c[j].venueids
          let value = <div><div
            data-type={resData[i].c[j].type}
            data-uuid={resData[i].c[j].uuid}
            data-venueids={resData[i].c[j].venueids}
            data-starttime={resData[i].a}
            data-endtime={resData[i].a}
            className="loopsdgds"
            data-index='1'
            onClick={this.lookDeta}
            style={resData[i].c[j].type === 1 ? { background: '#6FB2FF', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 4 ? { background: 'red', height: 45, lineHeight: 3 } : {}}><Checkbox className="chePe" idx={i} jdx={j} checked={resData[i].c[j].checked} onChange={this.checkbox} dtype={resData[i].c[j].type} time={resData[i].a} venueid={resData[i].c[j].venueids} uuid={resData[i].c[j].uuid} style={resData[i].c[j].type === 1 && this.state.cofirmZ === 1 ? {} : { display: 'none' } && resData[i].c[j].type === 4 && this.state.Cancels === 1 ? {} : { display: 'none' }} />
          <div className="sdgfdrg"
              data-type='4'
              data-uuid={resData[i].c[j].uuidTwo}
              data-venueids={resData[i].c[j].venueids}
              data-starttime={resData[i].a}
              data-endtime={resData[i].a}
              onClick={this.lookDeta}
              style={resData[i].c[j].time !== undefined ? { height: '47px',color:'#fff', top: 1.5 * ((resData[i].c[j].time.slice(3, 5) > 30 ? resData[i].c[j].time.slice(3, 5) - 30 : resData[i].c[j].time.slice(3, 5))), zIndex: '9' } : { display: 'none' }}>{resData[i].c[j].whoTwo}</div>
            {resData[i].c[j].type === 4 ? resData[i].c[j].who : resData[i].c[j].money_cg}</div>
          </div>
          obj[key] = value
          obj.lppd = <div style={{ color: '#F5A623', marginTop: '-2.2rem' }}>{resData[i].a}<br /><div className="sdgdfgdf" style={resData[i].k > 0 ? {} : { display: 'none' }}>{resData[i].k}</div><div style={resData[i].a === '23:30' ? { position: 'absolute', top: '2rem', left: '0.9rem' } : { display: 'none' }}>24:00</div></div>
        }
        jood.push(obj)
      }



    }





    this.setState({
      lookBan: jood,
      lppding: false
    })




  }

  hosdfsa = () => {
    let ho = document.querySelectorAll('.loopsdgds')
    for (let i in ho) {
      if (ho[i].dataset !== undefined && ho[i].dataset.type === '1') {
        ho[i].style.backgroundColor = "#56A5FF"
        ho[i].setAttribute('data-index','1')
      }
    }

  }

  lookDeta = e => {
    if (e.currentTarget.dataset.type === "3") {
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '', paied: 0 })
      this.setState({ informVisible: true })
    } else if (e.currentTarget.dataset.type === '4') {
      this.setState({ informaid: e.currentTarget.dataset.uuid })
      this.getVenueBookingInformation({ informaid: e.currentTarget.dataset.uuid, type: 1, cur: this.state.qiDate })
    } else if (e.currentTarget.dataset.type === "1") {
      if (e.currentTarget.dataset.index === '1') {
        e.currentTarget.style.backgroundColor = "#4064E1"
        e.currentTarget.dataset.index = 2
        this.setState({ venueT: [...this.state.venueT, this.state.qiDate + ' ' + e.currentTarget.dataset.starttime + '|' + e.currentTarget.dataset.venueids] })

      } else {
        let venueT = this.state.venueT
        venueT.splice(venueT.indexOf(this.state.qiDate + ' ' + e.currentTarget.dataset.starttime + '|' + e.currentTarget.dataset.venueids), 1)
        this.setState({ venueT: venueT })
        e.currentTarget.style.backgroundColor = "#6FB2FF"
        e.currentTarget.dataset.index = 1
      }
    }
  }

  async getVenueBookingInformation(data) {
    const res = await getVenueBookingInformation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (res.data.data.comment.length > 20) {
        res.data.data.comment = res.data.data.comment.slice(0, 20)
      }

      this.setState({ otherObj: res.data.data, otherObjTime: res.data.data.time, menu: 1, History: true,otherObjOrder:res.data.data.orderID  })
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
      this.setState({ liNum: res.data.data[0].id })
      this.getVenueNumberTitleList({ sportid: res.data.data[0].id })

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
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

    this.setState({ qiDate: new Date().format('yyyy-MM-dd'), nowDate: new Date().toLocaleDateString().replace(/\//g, "-"), week: week[new Date().getDay()], weekText: week[new Date().getDay()] })

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
      duration: false
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
    this.setState({ liNum: e.currentTarget.dataset.id, liIndex: e.currentTarget.dataset.index, venueT: [],lppding:true })
    this.getVenueNumberTitleList({ sportid: e.target.dataset.id })
  }

  informOnClose = () => {
    this.hosdfsa()
    this.setState({ informVisible: false, info: false, venueT: [] })
  }
  informOnCloseTwo = () => {
    this.setState({ selectable: false })
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
      this.hosdfsa()
      this.setState({ info: false, lotime: [], arrTimeuid: [], isloop: 2, venueT: [] })
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

  CheckboxOnChange = (e) => {
    if (e.target.checked === true) {
      this.setState({ isloop: 1 })
    } else {
      this.setState({ isloop: 2 })
    }
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
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({ week: week[new Date(date).getDay()] })

    this.getVenueNumberTitleList({ sportid: this.state.liNum, date: date })
  }

  totitle = e => {
    if (e.currentTarget.dataset.type === '1') {
      Toast.info('请为各场地选择对应的场地类型，如1号场地为11人制足球场地；2号场地为5人制足球场地等', 5);
    } else {
      Toast.info('请为各场地填写标签，如普通、VIP、赛台、独立包间、楼上、楼下、人造草皮、真草皮等标签，也可不填写', 5);
    }
  }

  async formatPlayTimeAndVenueNum(data) {
    const res = await formatPlayTimeAndVenueNum(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ venueTwo: res.data.data })
    }
  }



  cofirmZ = () => {
    let ko = new Date(this.state.qiDate)
    ko.setHours(ko.getHours() + 1 > 24 ? ko.getHours() : ko.getHours() + 1)
    ko.setMinutes(0)
    if (this.state.venueT.length !== 0) {
      this.setState({ repeat: [0] })
      this.formatPlayTimeAndVenueNum({sportid:this.state.liNum,  sid: localStorage.getItem('siteUid'), str: this.state.venueT.join(',') })
      this.CalculateVenuePrice({ sportid: this.state.liNum, venueT: this.state.venueT.join(',') })
    }
    this.setState({ info: true, date: ko, startTime: ko.format("yyyy-MM-dd hh:mm") })
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

    const lp = alert('提示', <div><div style={{ fontSize: '0.75rem' }}>将所选线下占用场地时间段释放到线上?</div><div><Checkbox style={{ marginTop: '1rem', fontSize: '0.75rem' }} onChange={this.CheckboxOnChange}>将所选场地时间段在每{this.state.week}都释放</Checkbox></div></div>, [
      { text: '取消', onPress: () => console.log() },
      {
        text: '确定',
        onPress: () =>
          new Promise((resolve) => {
            if (venueidids.length !== 0) {
              this.VenueClickCancelPlace({ date: this.state.qiDate.format("yyyy-MM-dd"), sportid: liNum, type: 2, time: dtime.join(','), venueid: venueidids.join(','), uuid: duuid.join(','), other: '', isloop: this.state.isloop })
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
    this.hosdfsa()
    this.setState({ info: false, venueT: [] })
  }
  headTop = e => {
    this.setState({ headTop: e.currentTarget.dataset.index, page: 1, sportIdVal: '', statusIdVal: '', start: '', end: '', paied: '2', onSearchInput: '' })
    setTimeout(() => {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end, paied: this.state.paied, reserve: this.state.headTop })
    }, 500)
  }
  onSearchInput = e => {
    this.setState({ onSearchInput: e.target.value })
  }

  onSearch = e => {
    this.setState({ page: 1 })
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
      this.setState({ deductingdetails: res.data.data.details, isfinsh: res.data.data.isfinsh })
    }
  }



  deducting = e => {
    this.setState({ deducting: true })
    this.BreakUpConsumptionDetails({ publicuuid: e.currentTarget.dataset.uuid })
  }

  deductingTwo = () => {
    this.setState({ deducting: false })
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

  theWay = e => {
    this.setState({ theWay: e })
  }
  contacts = e => {
    this.setState({ contacts: e })
  }
  contactNumber = e => {
    this.setState({ contactNumber: e })
  }
  startTime = e => {
    this.setState({ date: e, startTime: e.format("yyyy-MM-dd hh:mm"), selectVenueId: '', TotalPrice: 0 })
  }
  timeLen = e => {
    this.setState({ timeLen: e, selectVenueId: '', TotalPrice: 0 })
  }

  async setSquareByOffLine(data) {
    const res = await setSquareByOffLine(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (this.state.liNum === '6') {
        let arr = []
        let arrTwo = []
        for (let i in res.data.data) {
          if (res.data.data[i].venueid.indexOf('A') !== -1 || res.data.data[i].venueid.indexOf('B') !== -1) {
            arr.push(res.data.data[i])
          } else {
            arrTwo.push(res.data.data[i])
          }
        }
        let atho = [{ venueid: '半场' }]
        this.setState({ selectable: true, selectableList: [...arrTwo, ...atho, ...arr] })

      } else {
        this.setState({ selectable: true, selectableList: res.data.data })
      }
    } else {
      Toast.fail(res.data.msg)
    }
  }

  selectVenue = () => {
    if (this.state.startTime === '') {
      Toast.fail('请选择开始时间')
    } else if (this.state.timeLen === '') {
      Toast.fail('请选择预约时长')
    } else {
      let obj = {
        siteUUID: localStorage.getItem('siteUid'),
        sportid: this.state.liNum,
        startTime: this.state.startTime,
        playTime: this.state.timeLen[0]
      }
      this.setSquareByOffLine(obj)
    }
  }

  selectClick = e => {
    let koo = this.state.selectableList
    if (koo[e.currentTarget.dataset.ifused].ifUsed === 1) {
      koo[e.currentTarget.dataset.ifused].ifUsed = 2
    } else if (koo[e.currentTarget.dataset.ifused].ifUsed === 2) {
      koo[e.currentTarget.dataset.ifused].ifUsed = 1
    }
    this.setState({ selectableList: koo })
  }
  submitkojhi = () => {
    let selectableList = this.state.selectableList
    let venueidid = ''
    for (let i in selectableList) {
      if (selectableList[i].ifUsed === 2) {
        venueidid += ',' + selectableList[i].venueid
      }
    }
    this.CalculateVenuePrice({ starttime: this.state.startTime, playtime: this.state.timeLen[0], sportid: this.state.liNum, venueid: venueidid.slice(1, venueidid.length) })
    this.setState({ selectable: false, selectVenueId: venueidid.slice(1, venueidid.length) })
  }

  async CalculateVenuePrice(data) {
    const res = await CalculateVenuePrice(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ TotalPrice: res.data.data.TotalPrice, consumpMoneyYou: res.data.other })
    }
  }
  repeat = e => {
    this.setState({ repeat: e })
  }
  theNews = e => {
    this.setState({ theNews: e })
  }

  async AddVenueOfflineOccupancy(data) {
    const res = await AddVenueOfflineOccupancy(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.hosdfsa()
      this.setState({ info: false, venueT: [] })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.qiDate, venueT: [] })
    } else {
      Toast.fail(res.data.msg)
    }
  }
  placeSubmit = () => {
    let { liNum, theWay, contacts, consumpMoneyYou, vipDetailsTwo, venueT, selectVenueId, contactNumber, startTime, timeLen, repeat, theNews } = this.state

    let obj = {
      sportid: liNum,
      mode: theWay[0],
      memberuuid: theWay[0] === 1 ? vipDetailsTwo.memberID : '',
      cardholderName: theWay[0] === 1 ? vipDetailsTwo.kzName : '',
      contacts: theWay[0] === 1 ? vipDetailsTwo.userName : contacts,
      contactNumber: theWay[0] === 1 ? vipDetailsTwo.tel : contactNumber,
      cardNumber: theWay[0] === 1 ? vipDetailsTwo.cardNum : '',
      balance: theWay[0] === 1 ? vipDetailsTwo.balance : '',
      venueid: selectVenueId,
      starttime: startTime,
      playtime: timeLen[0],
      isloop: repeat[0],
      consumpMoney: venueT.length === 0 ? consumpMoneyYou.join(',') : '',
      comment: theNews,
      venueT: venueT.length !== 0 ? consumpMoneyYou.join(',') : '',
    }
    this.AddVenueOfflineOccupancy(obj)
  }

  historyClose = () => {
    this.setState({ History: false })
  }

  async DelVenueOfflineOccupancy(data) {
    const res = await DelVenueOfflineOccupancy(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.qiDate })
      this.setState({ History: false })
      Toast.success('取消成功')
    } else {
      Toast.fail(res.data.msg)
    }
  }

  calesdeedsfr = () => {
    if (this.state.otherObj.isloop === 1) {
      let mo = this.state.qiDate
      alert('提示', '您确定取消订单吗?', [
        { text: '取消本次订单', onPress: () => this.DelVenueOfflineOccupancy({ offid: this.state.informaid, isloop: 1, cur: mo }) },
        { text: '取消所有循环订单', onPress: () => this.DelVenueOfflineOccupancy({ offid: this.state.informaid, isloop: 2, cur: mo }) },
        { text: '关闭', onPress: () => console.log('cancel') },
      ])
    } else {
      alert('提示', '您确定取消本次订单吗?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => this.DelVenueOfflineOccupancy({ offid: this.state.informaid, isloop: 3, cur: this.state.qiDate }) },
      ])
    }

  }
  dayBefore = () => {
    let myDate = new Date(this.state.qiDate)
    myDate.setDate(myDate.getDate() - 1)
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({lppding:true, qiDate: myDate.format('yyyy-MM-dd'), week: week[new Date(myDate).getDay()], date: myDate, venueT: [] })
    this.getVenueReservation({ sportid: this.state.liNum, date: myDate.format('yyyy-MM-dd') })
  }
  nextDay = () => {
    let myDate = new Date(this.state.qiDate)
    myDate.setDate(myDate.getDate() + 1)
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({lppding:true,  qiDate: myDate.format('yyyy-MM-dd'), week: week[new Date(myDate).getDay()], date: myDate, venueT: [] })
    this.getVenueReservation({ sportid: this.state.liNum, date: myDate.format('yyyy-MM-dd') })
  }
  cardDetails = () => {
    this.setState({ cardDetails: true })
  }
  cardDetailsClose = () => {
    this.setState({ cardDetails: false, checkOutNow: false })
  }

  subsdfgj = () => {
    if (this.state.vipDetails.length === 0) {
      message.warning('请选择会员卡')
    } else {
      this.setState({ vipDetailsTwo: this.state.vipDetails[this.state.indexI], cardDetails: false })
    }
  }


  async getVipCardInfomation(data) {
    const res = await getVipCardInfomation(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ vipDetails: res.data.data })
    } else {
      Toast.fail(res.data.msg)
    }
  }

  asdfsdfdsrfgd = e => {
    this.setState({ kw: e })
  }
  search = () => {
    if (this.state.kw === '') {
      Toast.fail('请输入关键字')
    } else {
      this.getVipCardInfomation({ kw: this.state.kw, sID: localStorage.getItem('siteUid') })

    }
  }
  sfdgdf = () => {

    this.setState({ date: new Date(), startTime: new Date().format("yyyy-MM-dd hh:mm") })
  }

  asdfsdf = e => {
    let i = Number(e.currentTarget.dataset.index)
    this.setState({ indexI: i })
  }

  youMessages = () => {
    alert('会员详情',
      <div>
        <div style={this.state.vipDetailsTwo === '' ? { display: 'none' } : { textAlign: 'left' }}>
          <div><span style={{ float: 'left', width: '5rem' }}>卡主名称：</span><span>{this.state.vipDetailsTwo.kzName}</span></div>
          <div><span style={{ float: 'left', width: '5rem' }}>联系人：</span><span>{this.state.vipDetailsTwo.userName}</span></div>
          <div><span style={{ float: 'left', width: '5rem' }}>手机号：</span><span>{this.state.vipDetailsTwo.tel}</span></div>
          <div><span style={{ float: 'left', width: '5rem' }}>会员卡号：</span><span>{this.state.vipDetailsTwo.cardNum}</span></div>
        </div>
        <div style={this.state.vipDetailsTwo === '' ? { textAlign: 'center' } : { display: 'none' }}>请检索添加会员信息</div>
      </div>, [
      { text: '关闭' },

    ])
  }

  Calendar = () => {
    this.setState({ show: true })
  }

  onConfirm = (e) => {
    let myDate = new Date(e.format('yyyy-MM-dd'))
    myDate.setDate(myDate.getDate())
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({lppding:true, week: week[new Date(myDate).getDay()], date: e.format('yyyy-MM-dd'), show: false, qiDate: e.format('yyyy-MM-dd'), venueT: [] })
    this.getVenueReservation({ sportid: this.state.liNum, date: e.format('yyyy-MM-dd') })

  }
  onCancel = () => {
    this.setState({ show: false })
  }
  async cancelSingleOrder(data) {
    const res = await cancelSingleOrder(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if(this.state.otherObj.isloop===1){
        this.getVenueBookingInformation({ informaid: this.state.sid, type: 1, cur: this.state.qiDate })
      }else if(this.state.otherObj.isloop!==1){

        if(Number(this.state.orderIndex)===0){
          this.getVenueBookingInformation({ informaid: this.state.otherObjTime[Number(this.state.orderIndex) + 1].orderID, type: 1, cur: this.state.qiDate })
          this.setState({informaid:this.state.otherObjTime[Number(this.state.orderIndex) + 1].orderID})
        }else{
          this.getVenueBookingInformation({ informaid: this.state.otherObjOrder, type: 1, cur: this.state.qiDate })
          this.setState({informaid:this.state.otherObjOrder})
        }
      }
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.qiDate })
      Toast.info(res.data.msg)
    } else {
      Toast.fail(res.data.msg)
    }
  }

  singly = e => {
    let sid = e.currentTarget.dataset.orderid
    let cur = e.currentTarget.dataset.date
    this.setState({ orderIndex: e.currentTarget.dataset.index,sid:sid })
    alert('提示', '您确定取消该场地订单吗?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.cancelSingleOrder({ sid: sid, cur: cur }) },
    ])
  }

  async payOccupyWindow(data) {
    const res = await payOccupyWindow(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ checkOutNow: true, checkOutNowObj: res.data.data, amount: res.data.data.pay, payment: res.data.data.modeName === 2 ? [3] : [1], payTime: res.data.data.payTime })
    } else {
      message.error(res.data.msg)
    }
  }

  checkOutNow = e => {
    this.payOccupyWindow({ orderId: e.currentTarget.dataset.orderid, cur: this.state.qiDate })
  }

  payment = e => {
    this.setState({ payment: e })
  }
  amount = e => {
    this.setState({ amount: e })
  }

  async payOfflineOccupyOrder(data) {
    const res = await payOfflineOccupyOrder(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.info(res.data.msg)
      this.setState({ checkOutNow: false, History: false })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.qiDate })
    } else {
      Toast.fail(res.data.msg)
    }
  }

  checkPlease = () => {
    let { checkOutNowObj, amount, payment, payTime } = this.state
    this.payOfflineOccupyOrder({ orderId: checkOutNowObj.orderID, pay: amount, payMode: payment[0], masterID: checkOutNowObj.masterID, payTime: payTime })

  }

  async offlineOrderList(data) {
    const res = await offlineOrderList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ lineList: res.data.data, otherhood: res.data.other.count, icomeHood: res.data.other.income })
    } else if (res.data.code === 2001) {
      Toast.fail(res.data.msg)
      this.setState({ lineList: [] })
    } else {
      Toast.fail(res.data.msg)
    }
  }

  activityListTwo = () => {
    this.setState({ activityList: 'yes' })
    this.offlineOrderList({ sportid: '', payMode: '', page: this.state.pageHood })
  }

  currenthood = (page, pageSize) => {
    this.setState({ pageHood: page })
    this.offlineOrderList({ sportid: this.state.sportidHood, payMode: this.state.payModeHood, page: page })
  }

  spoetType = e => {
    this.setState({ sportidHood: e[0] })
    this.offlineOrderList({ sportid: e[0], payMode: this.state.payModeHood, page: 1 })
  }
  paymentType = e => {
    this.setState({ payModeHood: e[0] })
    this.offlineOrderList({ sportid: this.state.sportidHood, payMode: e[0], page: 1 })
  }

  sdgdsfg = e => {
    let date = e.currentTarget.dataset.date
    let playTime = e.currentTarget.dataset.playtime
    let stime = e.currentTarget.dataset.stime
    let venueid = e.currentTarget.dataset.venueid
    let ko = date + ' ' + stime
    let venueT = this.state.venueT
    for (let i = 0; i < parseFloat(playTime) * 2; i++) {
      let j = new Date(ko).setMinutes(new Date(ko).getMinutes() + i * 30)
      venueT.splice(venueT.indexOf(new Date(j).format("yyyy-MM-dd hh:mm") + '|' + venueid), 1)
    }
    this.setState({ venueT: venueT })

    this.CalculateVenuePrice({ sportid: this.state.liNum, venueT: venueT.join(',') })
    let venueTwo = this.state.venueTwo
    venueTwo.splice(e.currentTarget.dataset.index, 1)
    this.setState({ venueTwo: venueTwo })

  }

  render() {
    return (
      <div className="orderPh">
        <div className="headerNav">
          <div onTouchStart={this.bookingKanban} style={this.state.activityList === false ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>场地占用情况</div>
          <div onTouchStart={this.activityList} style={this.state.activityList === true ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>预约活动列表</div>
          <div onTouchStart={this.activityListTwo} style={this.state.activityList === 'yes' ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>线下预订订单</div>

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
                          <span style={{ float: 'left' }}>支付状态:{item.SiteMoneyStatus}</span>
                          <span style={item.reserve !== 1 ? { display: 'none' } : { marginLeft: '5%', float: 'left' }}>续时:<span style={{ color: '#4A90E2' }} onClick={this.duration} data-uuid={item.uuid}>查看记录</span></span>
                          <span style={item.reserve === 1 ? { display: 'none' } : { display: 'block', width: '90px', float: 'left', marginLeft: '6%' }}>应到人数:{item.Shouldarrive}人</span>
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
                          <div style={{ width: '25%', marginLeft: '0.5rem', float: 'left' }}>
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
                                <div key={i}>{itemTwo.frequency}<button style={itemTwo.frequency === 0 || item.PublicStatus === '已完成' ? { display: 'none' } : { marginLeft: "0.5rem" }} onClick={this.confirm} data-uuid={itemTwo.uuid}>－</button></div>
                              ))
                            }
                          </div>

                          <div style={{ color: '#4A90E2', marginTop: '25px' }} data-uuid={item.uuid} onClick={this.deducting}>扣除<br />记录</div>
                        </div>
                        <div>
                          <span className="footerOne" style={this.state.headTop === '0' ? {} : { display: 'none' }}>时长:{item.breakup.length === 0 ? item.PlayTime + '小时' : '无'}</span>
                          <span style={item.reserve === 1 ? { display: 'none' } : { display: 'block', width: '90px', float: 'left' }}>报名人数:{item.TrueTo}人</span>
                          <span style={item.reserve === 1 ? { display: 'none' } : { marginLeft: '5%', float: 'left' }}>续时:<span style={{ color: '#4A90E2' }} onClick={this.duration} data-uuid={item.uuid}>查看记录</span></span>
                          <i onClick={this.showModal} data-venueid={item.venueid} data-uid={item.uuid} className={item.breakup.length === 0 ? item.PublicStatus === '匹配中' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'sendingTwo' : 'circumstanceT' : 'circumstanceT'} >
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
          style={{ width: '90%', minHeight: '10rem' }}
        >
          <div style={this.state.isfinsh === 0 ? { display: 'none' } : { fontSize: '14px', fontWeight: 'bold', color: '#333' }}>所有散场次数已消费完</div>
          {
            this.state.deductingdetails.map((item, i) => (
              <div key={i} style={{ fontSize: '12px', clear: 'both', lineHeight: '25px' }}><span style={{ float: 'left', width: '60%', textAlign: 'left' }}>{item.comment}</span><span style={{ float: 'right' }}>{item.time}</span></div>
            ))
          }
        </Modal>



        <div className={this.state.activityList === false ? 'bookingKanban' : 'hidden'}>
          <div style={{ position: 'relative', background: '#F5A623', height: '40px' }}>
            <span className="topDay" onClick={this.dayBefore}>前一天</span>
            <div className="dateT" onClick={this.Calendar} style={{ fontSize: '14px', textAlign: 'center', color: "#fff", paddingTop: '0.5rem', lineHeight: '25px', width: '8rem', margin: '0 auto', borderBottom: '1px solid #fff' }}>{this.state.qiDate}  {this.state.week}</div>
            <span className="botDay" onClick={this.nextDay}>后一天</span>
          </div>
          <div className="modTitle">
            <span className="blue"></span><span>空闲</span><span className="white"></span><span>不可选</span><span className="yellow"></span><span>线上占用</span><span className="red"></span><span>线下占用</span>
            <span className="btnSi" onClick={this.cofirmZ}><span>预订场地</span></span>
          </div>

          <Calendar
            visible={this.state.show}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            defaultDate={now}
            type='one'
            infiniteOpt={true}
            defaultValue={[new Date(this.state.qiDate)]}
            maxDate={new Date(+now + 31536000000)}
            style={{ zIndex: '1000' }}
          />

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
          <Spin spinning={this.state.lppding}>
          <Table loading={this.state.loadingTwo} style={this.state.otherType.length === 0 ? { display: 'none' } : { maxWidth: this.state.otherType.length * 80 }} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 25, minWidth: 5, y: '90%' }} />,
          </Spin>
            <div style={this.state.activityList === false && this.state.otherType.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (2).png')} alt="555" /><span style={{ textAlign: 'center', display: "block" }}>{this.state.textNuma}!</span></div>
        </div>



        <div style={this.state.activityList === 'yes' ? { height: '93%' } : { display: 'none' }}>
          <div className="aszvrtds">
            {
              this.state.lineList.map((item, i) => (
                <Card key={i}>
                  <Card.Header
                    style={{ padding: '0 0.5rem' }}
                    title={item.sportID === 1 ? '羽毛球' : item.sportID === 2 ? '乒乓球' : item.sportID === 3 ? '台球中式黑八' : item.sportID === 4 ? '台球美式九球' : item.sportID === 5 ? '台球斯诺克' : item.sportID === 6 ? '篮球' : item.sportID === 7 ? '足球11人制' : item.sportID === 8 ? '足球8人制' : item.sportID === 9 ? '足球7人制' : item.sportID === 10 ? '足球5人制' : item.sportID === 11 ? '排球' : item.sportID === 12 ? '网球' : item.sportID === 13 ? '足球6人制' : ''}
                    extra={<span style={{ fontSize: '0.88rem', color: 'rgb(216, 93, 39)' }}>{item.mode}</span>}
                  />
                  <Card.Body>
                    <div className="asdfsdfdfg">
                      <div>开始时间:{item.starttime}</div>
                      <div>时长:{item.playtime}</div>
                    </div>
                    <div className="asdfsdfdfg">
                      <div>预计消费:{item.price}</div>
                      <div>实际消费:{item.iftPrice}</div>
                    </div>
                    <div className="asdfsdfdfg">
                      <div>实际活动时间:{item.iftTime}</div>
                      <div>订单状态:{item.ifPay}</div>
                    </div>
                    <div className="asdfsdfdfg"><div>订单时间:{item.ctime}</div></div>
                  </Card.Body>
                  <Card.Footer/>
                </Card>
              ))
            }

            <Pagination style={{ marginBottom: '15px' }} size="small" hideOnSinglePage={true} showSizeChanger={false} className='fenye' current={this.state.pageHood} total={this.state.otherhood} onChange={this.currenthood} />

            <div style={this.state.lineList.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (5).png')} alt="444" /><span style={{ display: 'block', textAlign: 'center' }}>没有线下订单!</span></div>
          </div>
          <div style={this.state.icomeHood === '' ? { display: 'none' } : { paddingLeft: '1rem' }}>
            共计收款:{this.state.icomeHood}
          </div>
          <div className="dfge4sdgf">
            <Picker
              data={this.state.seasons}
              title="选择运动项目"
              cols={1}
              value={this.state.sportidHood}
              onOk={this.spoetType}
            ><div>运动项目:<span style={{ color: 'rgb(216, 93, 39)' }}>
              {this.state.sportidHood === 1 ? '羽毛球' : this.state.sportidHood === 2 ? '乒乓球' : this.state.sportidHood === 3 ? '台球中式黑八' : this.state.sportidHood === 4 ? '台球美式九球' : this.state.sportidHood === 5 ? '台球斯诺克' : this.state.sportidHood === 6 ? '篮球' : this.state.sportidHood === 7 ? '足球11人制' : this.state.sportidHood === 8 ? '足球8人制' : this.state.sportidHood === 9 ? '足球7人制' : this.state.sportidHood === 10 ? '足球5人制' : this.state.sportidHood === 11 ? '排球' : this.state.sportidHood === 12 ? '网球' : this.state.sportidHood === 13 ? '足球6人制' : '全部'}

            </span></div>
            </Picker>

            <Picker
              data={this.state.seasonsTwo}
              title="选择支付方式"
              cols={1}
              value={this.state.payModeHood}
              onOk={this.paymentType}
            >
              <div>支付方式:<span style={{ color: 'rgb(216, 93, 39)' }}>
                {this.state.payModeHood === 1 ? '会员卡扣费' : this.state.payModeHood === 3 ? '现金支付' : this.state.payModeHood === 4 ? '微信支付' : this.state.payModeHood === 5 ? '支付宝支付' : '全部'}
              </span></div>
            </Picker>

          </div>

        </div>




        <Drawer
          title="续时记录"
          placement="bottom"
          height='70%'
          onClose={this.onClose}
          className="momo"
          visible={this.state.duration}
        >
          <div style={this.state.Record.length !== 0 ? {} : { display: 'none' }}>
            <Row>
              <Col span={8}>开始时间</Col>
              <Col span={5}>时长</Col>
              <Col span={7}>操作时间</Col>
              <Col span={4}>价格</Col>
            </Row>
            {
              this.state.Record.map((item, i) => (
                <Row key={i} style={{ fontSize: '0.75rem' }}>
                  <Col span={8}>{item.datetime}</Col>
                  <Col span={5}>{item.playtime}</Col>
                  <Col span={7}>{item.time}</Col>
                  <Col span={4}>￥{item.mone}</Col>
                </Row>
              ))
            }
          </div>
          <div style={this.state.Record.length === 0 ? { textAlign: 'center' } : { display: 'none' }}>暂无续时~</div>


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












        <Drawer
          title="预订场馆信息"
          placement="right"
          width='100%'
          className="sdfgkdg"
          onClose={this.informOnClose}
          visible={this.state.info}
        >
          <div className="listKoj">
            <Picker data={this.state.district} cols={1} value={this.state.theWay} onChange={this.theWay} className="forss">
              <List.Item arrow="horizontal">支付方式</List.Item>
            </Picker>
          </div>


          <div className="listKoj" style={this.state.theWay[0] === 1 ? {} : { display: 'none' }}>
            <List.Item arrow="horizontal" extra={this.state.vipDetailsTwo === '' ? '添加/修改会员信息' : '卡主名称：' + this.state.vipDetailsTwo.kzName} onClick={this.cardDetails}>检索会员信息</List.Item>
          </div>
          <div className="listKoj" style={this.state.theWay[0] === 1 ? {} : { display: 'none' }}>
            <List.Item arrow="horizontal" extra={this.state.vipDetailsTwo === '' ? '无' : '查看详情'} onClick={this.youMessages}>会员信息</List.Item>
          </div>


          <div className="listKoj" style={this.state.theWay[0] === 2 ? {} : { display: 'none' }}>
            <InputItem
              placeholder="请填写(选填)"
              className="rightInput"
              onBlur={this.contacts}
            ><div className="leftTxt">联系人</div></InputItem>
          </div>

          <div className="listKoj" style={this.state.theWay[0] === 2 ? {} : { display: 'none' }}>
            <InputItem
              placeholder="请填写(选填)"
              className="rightInput"
              type='number'
              maxLength={11}
              onBlur={this.contactNumber}
            ><div className="leftTxt">手机号</div></InputItem>
          </div>


          <div className="sdgfdfgf" style={this.state.venueT.length === 0 ? {} : { display: 'none' }}>

            <div className="listKoj">
              <DatePicker
                minuteStep={this.state.liNum==='3'||this.state.liNum==='4'||this.state.liNum==='5'?30:60}
                value={this.state.date}
                onOk={this.startTime}
              >
                <List.Item arrow="horizontal">开始时间</List.Item>
              </DatePicker>
              <span className="fghghf" onClick={this.sfdgdf}>此刻</span>
            </div>

            <div className="listKoj">
              <Picker data={this.state.timeLenList} cols={1} value={this.state.timeLen} onChange={this.timeLen} className="forss">
                <List.Item arrow="horizontal">预约时长</List.Item>
              </Picker>
            </div>

            <div className="listKoj" onClick={this.selectVenue}>
              <InputItem
                placeholder="点击选择场地号"
                className="rightInput"
                disabled={true}
                value={this.state.selectVenueId}
              ><div className="leftTxt">场地号</div></InputItem>
              <img className="sdgfdfgdgjugfyh" src={require('../../assets/right.png')} alt="icon" />
            </div>
          </div>

          <div style={this.state.venueT.length !== 0 ? { overflow: 'hidden', borderBottom: '0.06rem solid #f5f5f5' } : { display: 'none' }}>
            <span style={{ float: 'left', paddingLeft: '15px', paddingTop: '0.6rem' }}>已选择场地</span>
            <div style={{ float: 'right', paddingRight: '1.5rem', paddingTop: '0.6rem', paddingBottom: '0.6rem' }}>
              {
                this.state.venueTwo.map((item, i) => (
                  <div key={i}>{item.date} {item.stime}-{item.etime} | {item.venueid.slice(0, 1)}号场地 <span className="sdgdrfgsd" onClick={this.sdgdsfg} data-index={i} data-venueid={item.venueid.slice(0, 1)} data-playtime={item.playtime} data-stime={item.stime} data-date={item.date}>取消</span></div>
                ))
              }
            </div>

          </div>




          <div className="listKoj">
            <InputItem
              placeholder="请填写"
              className="rightInput"
              value={'￥' + this.state.TotalPrice}
            ><div className="leftTxt">预计消费</div></InputItem>
          </div>

          <div className="listKoj">
            <Picker data={this.state.repeatList} cols={1} value={this.state.repeat} onChange={this.repeat} className="forss">
              <List.Item arrow='horizontal'>每周重复</List.Item>
            </Picker>
          </div>

          <div className="listKoj">
            <InputItem
              placeholder="请填写"
              className="rightInput"
              onBlur={this.theNews}
            ><div className="leftTxt">其它</div></InputItem>
          </div>


          <div className="sdfgdfhf" onClick={this.placeSubmit}>提交</div>



        </Drawer>


        <Drawer
          title="可选择场地编号"
          placement="bottom"
          height='60%'
          className="sdmjfkdsj"
          onClose={this.informOnCloseTwo}
          visible={this.state.selectable}
        >

          <div style={{ overflow: 'hidden' }}>
            <div className="lohkhjgj" style={{ width: '520px', color: '#000', textAlign: 'left', background: '#fff', clear: 'both' }}>全场</div>

            {
              this.state.selectableList.map((item, i) => (
                <div className="lohkhjgj" key={i} data-ifused={i} onClick={this.selectClick} style={item.venueid === '半场' ? { width: '520px', color: '#000', textAlign: 'left', background: '#fff', clear: 'both' } : item.ifUsed === 2 && item.venueid === '场地不固定' ? { width: '80px', background: 'red' } : item.ifUsed === 2 ? { background: 'red' } : item.ifUsed === 0 ? { background: '#ccc' } : item.venueid === '场地不固定' ? { width: '80px' } : {}}>{item.venueid}</div>
              ))
            }
          </div>
          <div className="dfgk" onClick={this.submitkojhi}>确认</div>

        </Drawer>



        <Drawer
          title='预订信息'
          placement="bottom"
          height='80%'
          className="kojk"
          onClose={this.historyClose}
          visible={this.state.History}

        >


          <div style={{ overflowY: 'auto' }}>
            <div className="plaTop">
              <p style={{ marginBottom: '0.5rem' }}>预订人信息</p>
              <div><span>支付方式:</span><span>{this.state.otherObj.mode}</span></div>
              <div style={this.state.otherObj.cardholderName === '' ? { display: 'none' } : {}}><span>卡主名称:</span><span>{this.state.otherObj.cardholderName}</span></div>
              <div><span>联系人:</span><span>{this.state.otherObj.contacts === '' ? '无' : this.state.otherObj.contacts}</span></div>
              <div><span>手机号:</span><span><span style={this.state.otherObj.contactNumber === '' ? {} : { display: 'none' }}>无</span><a style={this.state.otherObj.contactNumber !== '' ? {} : { display: 'none' }} href={'tel:' + this.state.otherObj.contactNumber}>{this.state.otherObj.contactNumber}</a></span></div>
              <div style={this.state.otherObj.cardNumber === '' ? { display: 'none' } : {}}><span>会员卡号:</span><span>{this.state.otherObj.cardNumber}</span></div>
              <div style={this.state.otherObj.balance === '' ? { display: 'none' } : {}}><span>余额:</span><span>{this.state.otherObj.balance}</span></div>
              <div><span>其他:</span><span className="asdgfdsfg">{this.state.otherObj.comment === '' ? '无' : this.state.otherObj.comment + '...'}</span></div>
            </div>

            <div className="plaTop plaTopTwo">
              <p style={{ marginBottom: '0.5rem' }}>场地信息</p>
              <div style={{ fontWeight: 'bold', fontSize: '0.88rem' }}><span style={{ width: '80px' }}>预订时间:</span><span>{this.state.otherObj.bookingTime}</span></div>
              <div style={{ fontWeight: 'bold', fontSize: '0.88rem' }}><span style={{ width: '80px' }}>预订项目:</span><span>
                {this.state.otherObj.sportid === 1 ? '羽毛球' :
                  this.state.otherObj.sportid === 2 ? '兵乓球' :
                    this.state.otherObj.sportid === 3 ? '台球中式黑八' :
                      this.state.otherObj.sportid === 4 ? '台球美式九球' :
                        this.state.otherObj.sportid === 5 ? '台球斯诺克' :
                          this.state.otherObj.sportid === 6 ? '篮球' :
                            this.state.otherObj.sportid === 7 ? '足球11人制' :
                              this.state.otherObj.sportid === 8 ? '足球8人制' :
                                this.state.otherObj.sportid === 9 ? '足球7人制' :
                                  this.state.otherObj.sportid === 13 ? '足球6人制' :
                                    this.state.otherObj.sportid === 10 ? '足球5人制' :
                                      this.state.otherObj.sportid === 11 ? '排球' :
                                        this.state.otherObj.sportid === 12 ? '网球' :
                                          this.state.otherObj.sportid === 14 ? '足球9人制' : ''
                }
              </span></div>
              {
                this.state.otherObjTime.map((item, i) => (
                  <div key={i}><span style={{ width: '140px' }}>{item.date}  {item.option}</span><span>{item.venueid}</span>
                    <span className="sdfdsfg" data-orderid={item.orderID} data-date={item.fullDate} data-index={i} onClick={this.singly} style={item.showCancel === 0 ? { display: 'none' } : { float: 'right' }}>取消订单</span>
                  </div>
                ))
              }
              <div style={{ color: "#D0021B", float: 'left' }}>预计消费：￥{this.state.otherObj.consumpMoney}</div>
              <div style={{ color: "#D0021B", float: 'right' }}>已消费：￥{this.state.otherObj.pay}</div>
            </div>
            <div className="footer"><span style={{ color: '#F5A623', fontSize: '0.88rem' }}>订单状态：{this.state.otherObj.status}</span>

              <div className="calce" style={this.state.otherObj.status === '未开始' ? {} : { display: 'none' }} onClick={this.calesdeedsfr}>取消订单</div>
              <div className="calce" onClick={this.checkOutNow} data-orderid={this.state.otherObj.orderID} style={this.state.otherObj.ifPay===0&&this.state.otherObj.status !== '未开始' && this.state.otherObj.status !== '已结算' && this.state.otherObj.status !== '已完成' && this.state.otherObj.status !== '已取消' ? {} : { display: 'none' }}>立即结账</div>
            </div>
          </div>

        </Drawer>

        <Drawer
          title="立即结账"
          placement="bottom"
          height='70%'
          onClose={this.cardDetailsClose}
          visible={this.state.checkOutNow}
        >


          <div className="listKoj" style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
            <List.Item arrow="empty" extra="会员卡扣费">支付方式</List.Item>
          </div>

          <div className="listKoj" style={this.state.checkOutNowObj.modeName === 2 ? {} : { display: 'none' }}>
            <Picker data={this.state.checkOutNowArr} cols={1} value={this.state.payment} onChange={this.payment} className="forss">
              <List.Item arrow="horizontal">支付方式</List.Item>
            </Picker>
          </div>

          <div className="listKoj" style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
            <List.Item arrow="empty" extra={this.state.checkOutNowObj.cardHolder}>卡主名称</List.Item>
          </div>
          <div className="listKoj">
            <List.Item arrow="empty" extra={this.state.checkOutNowObj.contactor === '' ? '未填写' : this.state.checkOutNowObj.contactor}>联系人</List.Item>
          </div>
          <div className="listKoj">
            <List.Item arrow="empty" extra={this.state.checkOutNowObj.tel === '' ? '未填写' : this.state.checkOutNowObj.tel}>手机号</List.Item>
          </div>
          <div className="listKoj" style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
            <List.Item arrow="empty" extra={this.state.checkOutNowObj.cardNum}>会员卡卡号</List.Item>
          </div>
          <div className="listKoj" style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
            <List.Item arrow="empty" extra={this.state.checkOutNowObj.enough === 1 ? this.state.checkOutNowObj.balance : this.state.checkOutNowObj.balance + '   (余额不足本次消费)'}>余额</List.Item>
          </div>
          <div className="listKoj">
            <List.Item arrow="empty" extra={this.state.checkOutNowObj.time}>消费时长</List.Item>
          </div>
          <div className="listKoj">
            <InputItem
              placeholder="请填写"
              className="rightInput"
              value={this.state.amount}
              onBlur={this.amount}
            ><div className="leftTxt">消费金额</div></InputItem>
          </div>
          <span style={this.state.checkOutNowObj.zhekou !== 10 ? { paddingLeft: '15px', color: '#F5A623' } : { display: 'none' }}>已打{this.state.checkOutNowObj.zhekou}折</span>

          <div onClick={this.checkPlease} className="adfdsrghdf">确定</div>

        </Drawer>







        <Drawer
          title="检索会员卡信息"
          placement="bottom"
          height='80%'
          className="dfgd"
          onClose={this.cardDetailsClose}
          visible={this.state.cardDetails}
        >
          <SearchBar placeholder="请输入卡主名称/手机号/会员卡检索" onSubmit={this.search} onChange={this.asdfsdfdsrfgd} style={{ width: '80%', float: 'left', fontSize: '0.88rem' }} /><span className="sgdfgdfg" onClick={this.search}>搜索</span>

          <div style={{ overflowY: 'auto', clear: 'both',paddingBottom:'5rem' }}>
            {
              this.state.vipDetails.map((item, i) => (
                <RadioItem key={i} checked={i === this.state.indexI} onClick={this.asdfsdf} data-index={i} >
                  <div style={{ width: '25rem' }} >
                    <div className="lokjjkdgh" style={{ marginTop: "1rem" }}><span>卡主名称：</span><span>{item.kzName}</span></div>
                    <div className="lokjjkdgh"><span>联系人：</span><span>{item.userName}</span></div>
                    <div className="lokjjkdgh"><span>手机号：</span><span>{item.tel}</span></div>
                    <div className="lokjjkdgh"><span>会员卡号：</span><span>{item.cardNum}</span><span style={item.expire === 1 ? { color: 'red' } : { display: 'none' }}>（已过期）</span></div>
                  </div>
                </RadioItem>
              ))
            }
          </div>
          <div style={this.state.vipDetails.length !== 0 ? { display: 'none' } : { textAlign: 'center', marginTop: '2rem', clear: 'both' }}>请搜索会员信息</div>

          <div className="sdfsdgdrg" onClick={this.subsdfgj}>确认</div>
        </Drawer>


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