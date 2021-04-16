import React from 'react';
import './preferentialTwo.css';
import 'antd/dist/antd.css';
import { Input, Spin, message, DatePicker, Modal, Drawer, Table, Popconfirm, Select, Popover, Tooltip } from 'antd';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getVenueReservation, getVenueSport, VenueNumberSporttypeSave, getVenueNumberTitleList, DelVenueOfflineOccupancy, formatPlayTimeAndVenueNum, payOccupyWindow, payOfflineOccupyOrder, CalculateVenuePrice, cancelSingleOrder, AddVenueOfflineOccupancy, getDateAndDayOfWeek, getReservationActivitieslist, setSquareByOffLine, VenueNewsHistoricalRecord, getVenueBookingInformation, getVipCardInfomation } from '../../api';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Option } = Select;
const { Search } = Input;


const antIcon = <SyncOutlined style={{ fontSize: 24, color: 'black' }} spin />

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    [i]: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}



class appointmentList extends React.Component {

  state = {
    number: '2',
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
    otherObjTime: [],
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
    lookBan: [],
    cofirmZ: 0,
    venueidids: [],
    dtype: '',
    dtime: [],
    Cancels: 0,
    duuid: [],
    loadingTwo: true,
    calesRed: 0,
    arrTimeuid: [],
    lppding: true,
    textNuma: '您还没有进行场地设置,请前往设置！',
    paied: '2',
    week: '',
    isloop: 2,
    isModalVisible: false,
    weekList: [],
    theWay: '2',//支付方式
    searching: '',//检索会员卡
    startTime: '',//开始时间
    timeLen: '',//预约时长
    repeat: '0',//是否重复
    theNews: '',//其他
    vipDetails: [],//会员卡详情
    vipDetailsTwo: '',
    selectable: false,
    selectableList: [],
    selectVenueId: '',
    contacts: '',
    contactNumber: '',
    otherObj: [],
    informaid: '',
    TotalPrice: 0,
    hours: '',
    Minutes: '00',
    InfoVip: false,
    venueT: [],
    tagShowT: '',
    consumpMoneyYou: '',
    orderIndex: 0,
    checkOutNow: false,
    checkOutNowObj: '',
    payment: 3,
    payTime: 0,
    venueTwo: [],
    otherTypeTwo: []
  };

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.setState({ activityNav: res.data.data, liNum: res.data.data[0].id })
      this.getVenueNumberTitleList({ sportid: res.data.data[0].id })

    }
  }



  async VenueNumberSporttypeSave(data) {
    await VenueNumberSporttypeSave(data, sessionStorage.getItem('venue_token'))
  }


  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
    }
  }

  async getDateAndDayOfWeek(data) {
    const res = await getDateAndDayOfWeek(data, sessionStorage.getItem('venue_token'))
    this.setState({ weekList: res.data.data })

  }


  componentDidMount() {
    this.getDateAndDayOfWeek()
    this.getVenueSport()
    if (this.props.location.query !== undefined) {
      this.setState({
        number: this.props.location.query.number.toString()
      })
      this.setState({ dianIndex: this.props.location.query.dataIndex, liNum: this.props.location.query.id.toString(), spinningTwo: true })
      this.getVenueNumberTitleList({ sportid: this.props.location.query.id })
    }
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let lo = new Date().toLocaleDateString().split('/')[1]
    let loTwo = new Date().toLocaleDateString().split('/')[2]
    if (lo.length === 1 && loTwo.length > 1) {
      lo = new Date().toLocaleDateString().split('/')[0] + '-0' + new Date().toLocaleDateString().split('/')[1] + '-' + new Date().toLocaleDateString().split('/')[2]
    } else if (lo.length === 1 && loTwo.length === 1) {
      lo = new Date().toLocaleDateString().split('/')[0] + '-0' + new Date().toLocaleDateString().split('/')[1] + '-0' + new Date().toLocaleDateString().split('/')[2]
    } else if (lo.length > 1 && loTwo.length === 1) {
      lo = new Date().toLocaleDateString().split('/')[0] + '-' + new Date().toLocaleDateString().split('/')[1] + '-0' + new Date().toLocaleDateString().split('/')[2]
    }
    this.setState({ dateString: lo, hours: new Date().getHours() + 1, startTime: lo + ' ' + Number(new Date().getHours() + 1) + ':' + this.state.Minutes, week: week[new Date().getDay()] })
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


      let arrTime = []
      for (let i in res.data.data) {
        arrTime.push(res.data.data[i].a)
      }

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
        res.data.other.biaoqian[i].title = <Popover placement="topLeft" title='标签描述' content={res.data.other.biaoqian[i].com === '' ? '暂无标签描述' : res.data.other.biaoqian[i].com} trigger="click"><div data-tagsid={res.data.other.biaoqian[i].tagsid} onClick={this.tagShow}>{res.data.other.biaoqian[i].venueid}<br />{res.data.other.biaoqian[i].title}</div></Popover>
        res.data.other.biaoqian[i].width = 80
      }
      let ploboj = {
        title: <div>场地号<br />标签</div>,
        fixed: 'left',
        width: 80,
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
      sessionStorage.setItem('kood', 1)

      this.setState({
        resData: res.data.data
      })
      this.hoode(res.data.data)
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

  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ informList: res.data.data.data })
    }
  }

  lookDeta = e => {
    if (e.currentTarget.dataset.type === "3") {
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '', paied: this.state.paied })
      this.setState({ informVisible: true })
    } else if (e.currentTarget.dataset.type === '4' && this.state.Cancels === 0) {
      this.setState({ informaid: e.currentTarget.dataset.uuid })
      this.getVenueBookingInformation({ informaid: e.currentTarget.dataset.uuid, type: 1, cur: this.state.dateString })
    } else if (e.currentTarget.dataset.type === "1") {
      if (e.currentTarget.dataset.index === '1') {
        e.currentTarget.style.backgroundColor = "#4064E1"
        e.currentTarget.dataset.index = 2
        this.setState({ venueT: [...this.state.venueT, this.state.dateString + ' ' + e.currentTarget.dataset.starttime + '|' + e.currentTarget.dataset.venueids] })
      } else {
        let venueT = this.state.venueT
        venueT.splice(venueT.indexOf(this.state.dateString + ' ' + e.currentTarget.dataset.starttime + '|' + e.currentTarget.dataset.venueids), 1)
        this.setState({ venueT: venueT })
        e.currentTarget.style.backgroundColor = "#6FB2FF"
        e.currentTarget.dataset.index = 1
      }
    }
  }
  informOnClose = () => {
    this.setState({ informVisible: false })
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
          let value = <div>
            <Tooltip title="您好，选择完场地后，请点击“预订场地”来提交" mouseEnterDelay={2}>
              <div
                data-type={resData[i].c[j].type}
                data-uuid={resData[i].c[j].uuid}
                data-venueids={resData[i].c[j].venueids}
                data-starttime={resData[i].a}
                data-endtime={resData[i].a}
                data-index='1'
                className="loopsdgds"
                onClick={this.lookDeta}
                style={resData[i].c[j].type === 1 ? { background: '#6FB2FF', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 4 ? { background: 'red', height: 45, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 3 } : {}}
              >{resData[i].c[j].type === 4 ? resData[i].c[j].who : resData[i].c[j].money_cg}</div>
            </Tooltip>
          </div>
          obj[key] = value
          obj.lppd = <div style={{ color: '#F5A623', marginTop: '-30px' }}>{resData[i].a}<br /><div className="sdgdfgdf" style={resData[i].k > 0 ? {} : { display: 'none' }}>{resData[i].k}</div><div style={resData[i].a === '23:30' ? { position: 'absolute', left: '33%', top: '30px' } : { display: 'none' }}>24:00</div></div>

        }

      } else {



        for (let j in resData[i].c) {
          if (resData[i].c[j].type === 4) {
            kood.push(resData[i].c[j])
            resData[i].k = kood.length
          }

          obj.key = i + 1
          let key = resData[i].c[j].venueids
          let value = <div>
            <Tooltip title="您好，选择完场地后，请点击“预订场地”来提交" mouseEnterDelay={2}>
              <div
                data-type={resData[i].c[j].type}
                data-uuid={resData[i].c[j].uuid}
                data-venueids={resData[i].c[j].venueids}
                data-starttime={resData[i].a}
                data-endtime={resData[i].a}
                data-index='1'
                className="loopsdgds"
                onClick={this.lookDeta}
                style={resData[i].c[j].type === 1 ? { background: '#6FB2FF', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 2 ? { background: '#E9E9E9', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 4 ? { background: 'red', height: 45, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 3 } : {}}
              >
                <div className="sdgfdrg"
                  data-type='4'
                  data-uuid={resData[i].c[j].uuidTwo}
                  data-venueids={resData[i].c[j].venueids}
                  data-starttime={resData[i].a}
                  data-endtime={resData[i].a}
                  onClick={this.lookDeta}
                  style={resData[i].c[j].time !== undefined ? { height: '50px', top: 1.5 * ((resData[i].c[j].time.slice(3, 5) > 30 ? resData[i].c[j].time.slice(3, 5) - 30 : resData[i].c[j].time.slice(3, 5))), zIndex: '9' } : { display: 'none' }}>{resData[i].c[j].whoTwo}</div>
                {resData[i].c[j].type === 4 ? resData[i].c[j].who : resData[i].c[j].money_cg}</div>
            </Tooltip>
          </div>
          obj[key] = value
          obj.lppd = <div style={{ color: '#F5A623', marginTop: '-30px' }}>{resData[i].a}<br /><div className="sdgdfgdf" style={resData[i].k > 0 ? {} : { display: 'none' }}>{resData[i].k}</div><div style={resData[i].a === '23:30' ? { position: 'absolute', left: '33%', top: '30px' } : { display: 'none' }}>24:00</div></div>


        }
      }


      jood.push(obj)
    }


    this.setState({
      lookBan: jood,
      lppding: false
    })


  }



  clickLi = (e) => {
    this.getVenueNumberTitleList({ sportid: e.target.dataset.num })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num, spinningTwo: true, venueT: [] })
  }


  async formatPlayTimeAndVenueNum(data) {
    const res = await formatPlayTimeAndVenueNum(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ venueTwo: res.data.data })
    }
  }

  cofirmZ = () => {
    if (this.state.venueT.length !== 0) {
      this.setState({ repeat: '0' })
      this.formatPlayTimeAndVenueNum({ sid: sessionStorage.getItem('siteuid'), str: this.state.venueT.join(',') })
      this.CalculateVenuePrice({ sportid: this.state.liNum, venueT: this.state.venueT.join(',') })
    }

    this.setState({
      info: true
    })

  }

  hosdfsa = () => {
    let ho = document.querySelectorAll('.loopsdgds')
    for (let i in ho) {
      if (ho[i].dataset !== undefined && ho[i].dataset.type === '1') {
        ho[i].style.backgroundColor = "#56A5FF"
      }
    }

  }

  dateChange = (data, datatring) => {
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({ dateString: datatring, hours: Number(new Date().getHours() + 1), startTime: datatring + ' ' + Number(new Date().getHours() + 1) + ':' + this.state.Minutes, week: week[new Date(datatring).getDay()], venueT: [] })
    this.getDateAndDayOfWeek({ date: datatring })
    this.getVenueReservation({ sportid: this.state.liNum, date: datatring })
  }

  dateStingTwo = (e) => {
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({ dateString: e.currentTarget.dataset.date, hours: Number(new Date().getHours() + 1), startTime: e.currentTarget.dataset.date + ' ' + Number(new Date().getHours() + 1) + ':' + this.state.Minutes, week: week[new Date(e.currentTarget.dataset.date).getDay()], venueT: [] })
    this.getVenueReservation({ sportid: this.state.liNum, date: e.currentTarget.dataset.date })
  }



  checkbox = e => {
    if (this.state.resData[e.target.idx].c[e.target.jdx].checked === false) {
      let item = this.state.resData
      item[e.target.idx].c[e.target.jdx].checked = true
      this.hoode(item)
    } else {
      let item = this.state.resData
      item[e.target.idx].c[e.target.jdx].checked = false
      this.hoode(item)
    }
    let timUid = e.target.uuid + '#' + e.target.time + '#' + e.target.venueid
    if (this.state.arrTimeuid.indexOf(timUid) !== -1) {
      this.state.arrTimeuid.splice(this.state.arrTimeuid.indexOf(timUid), 1)
    } else {
      this.setState({ arrTimeuid: [...this.state.arrTimeuid, timUid] })
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


  CheckboxOnChange = (e) => {
    if (e.target.checked === true) {
      this.setState({ isloop: 1 })
    } else {
      this.setState({ isloop: 2 })
    }
  }



  async AddVenueOfflineOccupancy(data) {
    const res = await AddVenueOfflineOccupancy(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.hosdfsa()
      this.setState({ info: false, selectVenueId: '', venueT: [] })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
    } else {
      message.warning(res.data.msg)
    }
  }

  placeSubmit = () => {
    let { liNum, theWay, contacts, consumpMoneyYou, venueT, vipDetailsTwo, selectVenueId, contactNumber, startTime, timeLen, repeat, theNews } = this.state
    if (venueT === '' && timeLen === '') {
      message.warning('请选择时长')
    } else if (venueT === '' && selectVenueId === '') {
      message.warning('请选择场地号')
    } else {
      let obj = {
        sportid: liNum,
        mode: theWay,
        memberuuid: theWay === '1' ? vipDetailsTwo.memberID : '',
        cardholderName: theWay === '1' ? vipDetailsTwo.kzName : '',
        contacts: theWay === '1' ? vipDetailsTwo.userName : contacts,
        contactNumber: theWay === '1' ? vipDetailsTwo.tel : contactNumber,
        cardNumber: theWay === '1' ? vipDetailsTwo.cardNum : '',
        balance: theWay === '1' ? vipDetailsTwo.balance : '',
        venueid: selectVenueId,
        starttime: startTime,
        playtime: timeLen,
        isloop: repeat,
        consumpMoney: venueT.length === 0 ? consumpMoneyYou.join(',') : '',
        comment: theNews,
        venueT: venueT.length !== 0 ? consumpMoneyYou.join(',') : '',
      }
      this.AddVenueOfflineOccupancy(obj)


    }




  }
  contacts = e => {
    this.setState({ contacts: e.target.value })
  }
  contactNumber = e => {
    this.setState({ contactNumber: e.target.value })
  }
  Cancels = () => {
    this.setState({
      Cancels: 1
    })
    setTimeout(() => {
      this.hoode(this.state.resData)
    }, 50)
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

  async getVenueBookingInformation(data) {
    const res = await getVenueBookingInformation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ otherObj: res.data.data, otherObjTime: res.data.data.time, menu: 1, History: true })
    }
  }
  handleCancelInFo = () => {
    this.hosdfsa()
    this.setState({
      info: false,
      selectVenueId: '',
      selectable: false,
      venueT: []
    })
  }
  handleCancel = () => {
    this.setState({ selectable: false, checkOutNow: false })
  }


  getDay = (day) => {
    var today = new Date(this.state.dateString);
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  }

  doHandleMonth = (month) => {

    var m = month;

    if (month.toString().length === 1) {

      m = "0" + month;

    }

    return m;

  }

  riLeft = () => {
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({ dateString: this.getDay(-7), hours: Number(new Date().getHours() + 1), startTime: this.getDay(-7) + ' ' + Number(new Date().getHours() + 1) + ':' + this.state.Minutes, week: week[new Date(this.getDay(-7)).getDay()], venueT: [] })
    this.getDateAndDayOfWeek({ date: this.getDay(-7) })
    this.getVenueReservation({ sportid: this.state.liNum, date: this.getDay(-7) })
  }

  riRight = () => {
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({ dateString: this.getDay(7), hours: Number(new Date().getHours() + 1), startTime: this.getDay(7) + ' ' + Number(new Date().getHours() + 1) + ':' + this.state.Minutes, week: week[new Date(this.getDay(7)).getDay()], venueT: [] })
    this.getDateAndDayOfWeek({ date: this.getDay(7) })
    this.getVenueReservation({ sportid: this.state.liNum, date: this.getDay(7) })
  }

  theWay = e => {
    this.setState({ theWay: e })
  }

  async getVipCardInfomation(data) {
    const res = await getVipCardInfomation(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ vipDetails: res.data.data, InfoVip: true })
    } else {
      this.setState({ vipDetailsTwo: '' })
      message.warning(res.data.msg)
    }
  }



  searching = e => {
    this.setState({ searching: e })
    if (e === '') {
      message.warning('请输入关键字')
    } else {
      this.getVipCardInfomation({ kw: e, sID: sessionStorage.getItem('siteuid') })
    }
  }
  startTime = (e) => {
    let lo = new Date(e).toLocaleDateString().split('/')[1]
    let loTwo = new Date(e).toLocaleDateString().split('/')[2]
    if (lo.length === 1 && loTwo.length > 1) {
      lo = new Date(e).toLocaleDateString().split('/')[0] + '-0' + new Date(e).toLocaleDateString().split('/')[1] + '-' + new Date(e).toLocaleDateString().split('/')[2]
    } else if (lo.length === 1 && loTwo.length === 1) {
      lo = new Date(e).toLocaleDateString().split('/')[0] + '-0' + new Date(e).toLocaleDateString().split('/')[1] + '-0' + new Date(e).toLocaleDateString().split('/')[2]
    } else if (lo.length > 1 && loTwo.length === 1) {
      lo = new Date(e).toLocaleDateString().split('/')[0] + '-' + new Date(e).toLocaleDateString().split('/')[1] + '-0' + new Date(e).toLocaleDateString().split('/')[2]
    }
    let hours = new Date(e).getHours()
    let Minutes = new Date(e).getMinutes() < 10 ? '0' + new Date(e).getMinutes() : new Date(e).getMinutes()
    this.setState({ startTime: new Date(e).format("yyyy-MM-dd hh:mm"), dateString: lo, hours: hours, Minutes: Minutes, selectVenueId: '', TotalPrice: 0, isfull: 1 })
  }
  timeLen = e => {
    this.setState({ timeLen: e, selectVenueId: '', TotalPrice: 0 })
  }
  repeat = e => {
    this.setState({ repeat: e })
  }
  theNews = e => {
    this.setState({ theNews: e.target.value })
  }


  async setSquareByOffLine(data) {
    const res = await setSquareByOffLine(data, sessionStorage.getItem('venue_token'))
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
      message.warning(res.data.msg)
    }
  }


  selectVenue = () => {
    if (this.state.startTime === '') {
      message.warning('请选择开始时间')
    } else if (this.state.timeLen === '') {
      message.warning('请选择预约时长')
    } else {
      let obj = {
        siteUUID: sessionStorage.getItem('siteuid'),
        sportid: this.state.liNum,
        startTime: this.state.startTime,
        playTime: this.state.timeLen
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
    this.CalculateVenuePrice({ starttime: this.state.startTime, playtime: this.state.timeLen, sportid: this.state.liNum, venueid: venueidid.slice(1, venueidid.length) })
    this.setState({ selectable: false, selectVenueId: venueidid.slice(1, venueidid.length) })
  }

  async CalculateVenuePrice(data) {
    const res = await CalculateVenuePrice(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ TotalPrice: res.data.data.TotalPrice, consumpMoneyYou: res.data.other, })

    }
  }




  async DelVenueOfflineOccupancy(data) {
    const res = await DelVenueOfflineOccupancy(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
      this.setState({ History: false })
      message.success('取消成功')
    } else {
      message.warning(res.data.msg)
    }
  }


  delVenue = () => {
    this.DelVenueOfflineOccupancy({ offid: this.state.informaid, isloop: 3, cur: this.state.dateString })
  }

  delVenueTwo = () => {
    this.DelVenueOfflineOccupancy({ offid: this.state.informaid, isloop: 1, cur: this.state.dateString })
  }

  delVenueThree = () => {
    this.DelVenueOfflineOccupancy({ offid: this.state.informaid, isloop: 2, cur: this.state.dateString })
  }



  sdgdrf = (e) => {

    this.setState({ startTime: new Date(e).format("yyyy-MM-dd hh:mm") })
  }

  sdgfsdg = e => {
    let i = Number(e.currentTarget.dataset.index)
    this.setState({ vipDetailsTwo: this.state.vipDetails[i], InfoVip: false })
  }
  informOnCloseTwi = () => {
    this.setState({ InfoVip: false })
  }

  showNow = () => {
    let hours = new Date().getHours()
    let Minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
    this.setState({ dateString: new Date().format("yyyy-MM-dd"), hours: hours, Minutes: Minutes, startTime: new Date().format("yyyy-MM-dd") + ' ' + hours + ':' + Minutes })
  }
  dateChangeTwo = (value, mode) => {
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    this.setState({ dateString: value._d.format("yyyy-MM-dd"), hours: Number(new Date().getHours() + 1), startTime: value._d.format("yyyy-MM-dd") + ' ' + Number(new Date().getHours() + 1) + ':' + this.state.Minutes, week: week[new Date(value._d.format("yyyy-MM-dd")).getDay()] })
    this.getDateAndDayOfWeek({ date: value._d.format("yyyy-MM-dd") })
    this.getVenueReservation({ sportid: this.state.liNum, date: value._d.format("yyyy-MM-dd") })
  }


  async cancelSingleOrder(data) {
    const res = await cancelSingleOrder(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ informaid: this.state.otherObjTime[Number(this.state.orderIndex) + 1].orderID })
      this.getVenueBookingInformation({ informaid: this.state.otherObjTime[Number(this.state.orderIndex) + 1].orderID, type: 1, cur: this.state.dateString })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
      message.success(res.data.msg)
    } else {
      message.warning(res.data.msg)
    }
  }

  singly = e => {
    this.setState({ sidTgh: e.currentTarget.dataset.orderid, curere: e.currentTarget.dataset.date, orderIndex: e.currentTarget.dataset.index })
  }
  singlyTwo = () => {
    this.cancelSingleOrder({ sid: this.state.sidTgh, cur: this.state.curere })
  }

  async payOccupyWindow(data) {
    const res = await payOccupyWindow(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ checkOutNow: true, checkOutNowObj: res.data.data, amount: res.data.data.pay, payment: res.data.data.modeName === 2 ? 3 : 1, payTime: res.data.data.payTime })
    } else {
      message.error(res.data.msg)
    }
  }

  checkOutNow = e => {
    this.payOccupyWindow({ orderId: e.currentTarget.dataset.orderid, cur: this.state.dateString })
  }

  payment = e => {
    this.setState({ payment: e })
  }
  amount = e => {
    this.setState({ amount: e.target.value })
  }

  async payOfflineOccupyOrder(data) {
    const res = await payOfflineOccupyOrder(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      message.success(res.data.msg)
      this.setState({ checkOutNow: false, History: false })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
    } else {
      message.error(res.data.msg)
    }
  }


  checkPlease = () => {
    let { checkOutNowObj, amount, payment, payTime } = this.state
    this.payOfflineOccupyOrder({ orderId: checkOutNowObj.orderID, pay: amount, payMode: payment, masterID: checkOutNowObj.masterID, payTime: payTime })

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
      venueT.splice(new Date(j).format("yyyy-MM-dd hh:mm") + '|' + venueid, 1)
    }
    this.setState({ venueT: venueT })
    this.CalculateVenuePrice({ sportid: this.state.liNum, venueT: venueT.join(',') })
    let venueTwo = this.state.venueTwo
    venueTwo.splice(e.currentTarget.dataset.index, 1)
    this.setState({ venueTwo: venueTwo })

  }



  render() {
    const content = (
      <div style={this.state.vipDetailsTwo.length === 0 ? { display: 'none' } : {}}>
        <div>卡主名称：{this.state.vipDetailsTwo.kzName}</div>
        <div>联系人：{this.state.vipDetailsTwo.userName}</div>
        <div>手机号：{this.state.vipDetailsTwo.tel}</div>
        <div>会员卡号：{this.state.vipDetailsTwo.cardNum}</div>
      </div>
    )

    return (

      <div className="orderList" style={{ position: 'relative', height: '100%' }}>
        <div className="navTab" style={{ paddingLeft: '0' }}>
          <div className="sping"> <SyncOutlined className={this.state.Oneloading === true || this.state.number === '2' ? 'hidden' : 'block'} onClick={this.Oneloading} style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.Oneloading} /></div>
        </div>
        <div className="xiange"></div>

        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'} style={{ height: '90%' }} >
          <ul className="rightNav" style={{ top: '-63px', left: '-20px' }}>
            <li className="dateSelect">
              <DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} value={moment(this.state.dateString, 'YYYY-MM-DD')} locale={locale} allowClear={false} placeholder="请选择日期" className="DatePicker" onPanelChange={this.dateChangeTwo} onChange={this.dateChange} />
            </li>
          </ul>

          <div className="weekListBos">
            <div className="weekList">
              <div className="riLeft" onClick={this.riLeft}>上一周</div>
              {
                this.state.weekList.map((item, i) => (
                  <div className="moTimeBtn" onClick={this.dateStingTwo} data-date={item.date} style={this.state.dateString === item.date ? { background: '#F5A623', color: '#fff', borderColor: '#fff' } : {}} key={i}>{item.week}<br />{item.date}</div>
                ))
              }
              <div className="riRight" onClick={this.riRight}>下一周</div>
            </div>
          </div>

          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span style={{ background: '#E9E9E9' }}></span><span>不可选</span></div>
            <div><span></span><span>线下占用</span></div>
            <div><span></span><span>线上占用</span></div>
            <div className="cofirmZ" style={{ paddingTop: 0 }} onClick={this.cofirmZ}>预订场地</div>
          </div>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <ul className="activityNav" style={{ width: '1350px' }}>
              {
                this.state.activityNav.map((item, i) => (
                  <li key={i} onClick={this.clickLi} data-index={i} data-num={item.id} className={parseInt(this.state.dianIndex) === i ? 'borderLi' : ''}>{item.name}</li>
                ))
              }
            </ul>
          </div>

          <div className="xiange"></div>
          {/* 看板渲染标签 */}
          <div style={{ height: '88%' }}>
            <Spin spinning={this.state.lppding}>
              <Table loading={this.state.loadingTwo} style={this.state.otherType.length === 0 ? { display: 'none' } : { maxWidth: this.state.otherType.length * 100 }} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 76, minWidth: 40, y: '93%' }} />,
           <div style={this.state.otherType.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '84px', height: 84, display: 'block', margin: '84px auto 0' }} src={require('../../assets/xifen (2).png')} alt="icon" /><span style={{ display: 'block', textAlign: 'center' }}>{this.state.textNuma + '!'}</span></div>
            </Spin>
          </div>
        </div>

        <Drawer
          title="该活动详细信息"
          placement="right"
          width='400px'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >
          <div style={this.state.informList.length > 0 ? {} : { display: 'none' }}>
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
              <span>{this.state.informList.length > 0 ? this.state.informList[0].PlayTime : ''}小时</span>
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
              <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney + '元' : ''}</span>
            </div>
            <div className="informDrawer">
              <span>场地费状态：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
            </div>
          </div>
          <div style={this.state.informList.length > 0 ? { display: 'none' } : {}}>无</div>
        </Drawer>
        <Drawer
          title='预订信息'
          placement="right"
          closable={false}
          width='400px'
          className="kojk"
          onClose={this.historyClose}
          visible={this.state.History}

        >
          <div className="plaTop">
            <p>预订人信息</p>
            <div><span>支付方式:</span><span>{this.state.otherObj.mode}</span></div>
            <div style={this.state.otherObj.cardholderName === '' ? { display: 'none' } : {}}><span>卡主名称:</span><span>{this.state.otherObj.cardholderName}</span></div>
            <div><span>联系人:</span><span>{this.state.otherObj.contacts === '' ? '无' : this.state.otherObj.contacts}</span></div>
            <div><span>手机号:</span><span>{this.state.otherObj.contactNumber === '' ? '无' : this.state.otherObj.contactNumber}</span></div>
            <div style={this.state.otherObj.cardNumber === '' ? { display: 'none' } : {}}><span>会员卡号:</span><span>{this.state.otherObj.cardNumber}</span></div>
            <div style={this.state.otherObj.balance === '' ? { display: 'none' } : {}}><span>余额:</span><span>{this.state.otherObj.balance}</span></div>
            <div><span>其他:</span><span>{this.state.otherObj.comment === '' ? '无' : this.state.otherObj.comment}</span></div>
          </div>
          <div style={{ height: '12px', background: '#f5f5f5', marginTop: "10px" }}></div>

          <div className="plaTop plaTopTwo">
            <p>场地信息</p>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}><span>预订时间:</span><span>{this.state.otherObj.bookingTime}</span></div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}><span>预订项目:</span><span>
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
                  <Popconfirm
                    title="您确定取消该场地订单吗?"
                    onConfirm={this.singlyTwo}
                    onCancel={this.cancel}
                    okText="确定"
                    placement="top"
                    cancelText="取消"
                  >
                    <span className="sdfdsfg" data-orderid={item.orderID} data-index={i} data-date={item.fullDate} onClick={this.singly} style={item.showCancel === 0 ? { display: 'none' } : { float: 'right' }}>取消订单</span>
                  </Popconfirm>
                </div>
              ))
            }
            <div style={{ color: "#D0021B", float: 'left' }}>预计消费：￥{this.state.otherObj.consumpMoney}</div>
            <div style={{ color: "#D0021B", float: 'right' }}>已消费：￥{this.state.otherObj.pay}</div>
          </div>
          <div className="footer"><span style={{ color: '#F5A623', fontSize: '17px' }}>订单状态：{this.state.otherObj.status}</span>

            <div style={this.state.otherObj.status === '未开始' ? {} : { display: "none" }}>

              <Popconfirm
                title="您确定取消本次订单吗?"
                onConfirm={this.delVenue}
                onCancel={this.cancel}
                okText="确定"
                placement="top"
                cancelText="取消"
              >
                <div className="calce" style={this.state.otherObj.isloop === 0 ? {} : { display: 'none' }} >取消订单</div>
              </Popconfirm>

              <Popconfirm
                title="您确定取消本次循环订单吗?"
                onConfirm={this.delVenueTwo}
                onCancel={this.cancel}
                okText="确定"
                placement="top"
                cancelText="取消"
              >
                <div className="calce" style={this.state.otherObj.isloop === 1 ? {} : { display: 'none' }} >取消本次订单</div>
              </Popconfirm>

              <Popconfirm
                title="您确定取消所有循环订单吗?"
                onConfirm={this.delVenueThree}
                onCancel={this.cancel}
                okText="确定"
                placement="top"
                cancelText="取消"
              >
                <div className="calce" style={this.state.otherObj.isloop === 1 ? { clear: 'both', marginTop: '20px' } : { display: 'none' }}>取消循环订单</div>
              </Popconfirm>
            </div>


            <div className="calce" onClick={this.checkOutNow} data-orderid={this.state.otherObj.orderID} style={this.state.otherObj.status !== '未开始' && this.state.otherObj.status !== '已结算' && this.state.otherObj.status !== '已完成' && this.state.otherObj.status !== '已取消' ? {} : { display: 'none' }} >立即结账</div>
          </div>

        </Drawer>


        <Modal
          title="请选择会员信息"
          visible={this.state.InfoVip}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.informOnCloseTwi}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px', lineHeight: '30px' }} />}
        >
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {
              this.state.vipDetails.map((item, i) => (
                <div key={i} className="sdfdgsdf" onClick={this.sdgfsdg} data-index={i}>
                  <div><span>卡主名称：</span><span>{item.kzName}</span></div>
                  <div><span>联系人：</span><span>{item.userName}</span></div>
                  <div><span>手机号：</span><span>{item.tel}</span></div>
                  <div><span>会员卡号：</span><span>{item.cardNum}</span><span style={item.expire === 1 ? { color: 'red' } : { display: 'none' }}>（已过期）</span></div>
                </div>
              ))
            }
          </div>



        </Modal>


        <Modal
          title="请添加预订场馆相关信息"
          visible={this.state.info}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancelInFo}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px', lineHeight: '30px' }} />}
        >
          <div className="Relatedness">
            <div>
              <span>支付方式</span>
              <Select defaultValue="其他支付(现金/微信/支付宝)" placeholder="选择支付方式" style={{ width: 260 }} onChange={this.theWay}>
                <Option value="1">会员卡扣费</Option>
                <Option value="2">其他支付(现金/微信/支付宝)</Option>
              </Select>
            </div>
            <div style={this.state.theWay === '1' ? {} : { display: 'none' }}>
              <span>检索会员信息</span>
              <Search placeholder="请输入卡主名称/手机号/会员卡号检索" style={{ width: '260px' }} onSearch={this.searching} />
            </div>

            <div style={this.state.vipDetailsTwo !== '' ? {} : { display: 'none' }}>
              <span>会员信息</span>
              <Popover placement="top" title="会员详情" content={content} trigger="click">
                <div style={{ lineHeight: '36px', color: '#F5A623', cursor: 'pointer' }}>{this.state.vipDetailsTwo === '' ? '检索会员信息' : '查看详情'}</div>
              </Popover>
            </div>

            <div style={this.state.theWay === '1' ? {} : { display: 'none' }}>
              <span>余额</span>
              <Input disabled={true} value={this.state.vipDetailsTwo.length === 0 ? '￥0' : '￥' + this.state.vipDetailsTwo.balance} />
            </div>


            <div style={this.state.theWay === '2' ? {} : { display: 'none' }}>
              <span>联系人</span>
              <Input maxLength={18} placeholder="请填写（选填）" onChange={this.contacts} />
            </div>

            <div style={this.state.theWay === '2' ? {} : { display: 'none' }}>
              <span>手机号</span>
              <Input maxLength={11} placeholder="请填写（选填）" onChange={this.contactNumber} />
            </div>

            <div className="sdgfdfgf" style={this.state.venueT.length === 0 ? {} : { display: 'none' }}>

              <div style={{ position: 'relative' }}>
                <span>开始时间</span>

                <DatePicker
                  onChange={this.sdgdrf}
                  allowClear={false}
                  showTime
                  showNow={false}
                  minuteStep={30}
                  defaultValue={moment(this.state.dateString + ' ' + this.state.hours + ':' + this.state.Minute, 'YYYY-MM-DD HH:mm')}
                  style={{ width: '260px', opacity: '0', position: 'absolute', top: '0', left: '104px' }}
                  format="YYYY-MM-DD HH:mm"
                  onOk={this.startTime} />

                <div className="sdgedesfrgde">{this.state.dateString + ' ' + this.state.hours + ':' + this.state.Minutes}</div>


                <span style={{ marginLeft: '10px', color: 'blue', cursor: 'pointer', marginTop: '5px', float: 'left' }} onClick={this.showNow}>此刻</span>
              </div>
              <div>
                <span>预约时长</span>
                <Select placeholder="选择预约时长" style={{ width: 260 }} onChange={this.timeLen}>
                  <Option value="1">1小时</Option>
                  <Option value="2">2小时</Option>
                  <Option value="3">3小时</Option>
                  <Option value="4">4小时</Option>
                  <Option value="5">5小时</Option>
                  <Option value="6">6小时</Option>
                </Select>
              </div>

              <div onClick={this.selectVenue}>
                <span>场地号</span>
                <Input disabled={true} style={{ cursor: 'pointer' }} value={this.state.selectVenueId} placeholder="点击选择场地号" />
              </div>

            </div>

            <div style={this.state.venueT.length !== 0 ? {} : { display: 'none' }}>
              <span>已选择场地</span>
              <div style={{ float: 'left' }}>
                {
                  this.state.venueTwo.map((item, i) => (
                    <div key={i}>{item.date} {item.stime}-{item.etime}|{item.venueid.slice(0, 1)}号场地  <span className="caleseij" onClick={this.sdgdsfg} data-index={i} data-venueid={item.venueid.slice(0, 1)} data-playtime={item.playtime} data-stime={item.stime} data-date={item.date}>取消</span></div>
                  ))
                }
              </div>

            </div>



            <div>
              <span>预计消费</span>
              <Input disabled={true} value={'￥' + this.state.TotalPrice} />
            </div>

            <div>
              <span>每周重复</span>
              <Select placeholder="选择预约时长" style={{ width: 260 }} value={this.state.repeat} onChange={this.repeat}>
                <Option value="0">不重复</Option>
                <Option value="1">重复</Option>
              </Select>
            </div>



            <div>
              <span>其它</span>
              <Input maxLength={200} placeholder="选填" onChange={this.theNews} />
            </div>



          </div>




          <span onClick={this.placeSubmit} style={{ cursor: 'pointer', padding: '4px 8px', background: '#F5A623', color: '#fff', float: 'right', marginRight: '108px', marginTop: '20px' }}>提交</span>


        </Modal>


        <Modal
          title="可选择场地编号"
          visible={this.state.selectable}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancel}
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
        </Modal>


        <Modal
          title="立即结账"
          visible={this.state.checkOutNow}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancel}
        >
          <div className="Relatedness">
            <div style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
              <span>支付方式</span>
              <Input disabled={true} value='会员卡支付' />
            </div>

            <div style={this.state.checkOutNowObj.modeName === 2 ? {} : { display: 'none' }}>
              <span>支付方式</span>
              <Select defaultValue="现金" placeholder="选择支付方式" style={{ width: 260 }} onChange={this.payment}>
                <Option value="3">现金</Option>
                <Option value="4">微信</Option>
                <Option value="5">支付宝</Option>
              </Select>
            </div>


            <div style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
              <span>卡主名称</span>
              <Input disabled={true} value={this.state.checkOutNowObj.cardHolder} />
            </div>
            <div>
              <span>联系人</span>
              <Input disabled={true} placeholder='未填写' value={this.state.checkOutNowObj.contactor} />
            </div>
            <div>
              <span>手机号</span>
              <Input disabled={true} placeholder="未填写" value={this.state.checkOutNowObj.tel} />
            </div>
            <div style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
              <span>会员卡号</span>
              <Input disabled={true} value={this.state.checkOutNowObj.cardNum} />
            </div>
            <div style={this.state.checkOutNowObj.modeName === 1 ? {} : { display: 'none' }}>
              <span>余额</span>
              <Input disabled={true} value={this.state.checkOutNowObj.enough === 1 ? this.state.checkOutNowObj.balance : this.state.checkOutNowObj.balance + '   (余额不足本次消费)'} />
            </div>
            <div>
              <span>累计消费时长</span>
              <Input disabled={true} value={this.state.checkOutNowObj.time} />
            </div>
            <div>
              <span>消费金额</span>
              <Input value={this.state.amount} onBlur={this.amount} />
              <span style={this.state.checkOutNowObj.zhekou !== 10 ? { paddingLeft: '5px', lineHeight: '36px', color: '#F5A623' } : { display: 'none' }}>已打{this.state.checkOutNowObj.zhekou}折</span>
            </div>


          </div>

          <div className="bnsdfsd" onClick={this.checkPlease}>确定</div>

        </Modal>




      </div>
    )
  }
}

export default appointmentList;