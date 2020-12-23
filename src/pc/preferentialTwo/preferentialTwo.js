import React from 'react';
import './preferentialTwo.css';
import 'antd/dist/antd.css';
import { Input, Spin, message, DatePicker, Modal, Drawer, Table, Checkbox } from 'antd';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { getVenueReservation, getVenueSport, VenueNumberSporttypeSave, getVenueNumberTitleList, VenueClickCancelPlace,getDateAndDayOfWeek, getReservationActivitieslist, VenueNewsHistoricalRecord, VenueRemarksLabel } from '../../api';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';



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
    textNuma:'您还没有进行场地设置,请前往设置！',
    paied:'2',
    week:'',
    isloop:2,
    isModalVisible:false,
    weekList:[],
  };

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登录超时请重新登录!')
    } else if (res.data.code === 2000) {
      this.setState({ activityNav: res.data.data,liNum:res.data.data[0].id })
      this.getVenueNumberTitleList({ sportid:res.data.data[0].id  })
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
    const res =await getDateAndDayOfWeek(data, sessionStorage.getItem('venue_token'))
    this.setState({weekList:res.data.data})

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
    let week=['周日','周一','周二','周三','周四','周五','周六']
    
    this.setState({ dateString: new Date().toLocaleDateString().replace(/\//g, "-"),week:week[new Date().getDay()] })
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
      for (let i in res.data.data) {
        for (let j in res.data.data[i].c) {
          res.data.data[i].c[j].checked = false
          if (res.data.data[i].c[j].type === 4) {
            this.setState({ calesRed: 1 })
          }
        }
      }

      let arrTime=[]
      for(let i in res.data.data){
        arrTime.push(res.data.data[i].a)
      }
      
      let ko=''
      if(new Date().getMinutes()>=30){
        ko=new Date().getHours()+':30'
      }else{
        ko=new Date().getHours()+':00'
      }
      setTimeout(()=>{
        if(document.querySelector('.ant-table-body')!==null){
          document.querySelector('.ant-table-body').scrollTo(0,arrTime.indexOf(ko)*45)
         }
      },2000)


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
    }else if(res.data.code===4004){
      this.setState({lppding: false,textNuma:res.data.msg})
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
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '',paied:this.state.paied })
      this.setState({ informVisible: true })
    } else if (e.currentTarget.dataset.type === '4' && this.state.Cancels === 0) {
      this.VenueRemarksLabel({ uuid: e.currentTarget.dataset.uuid })
    }
  }
  informOnClose = () => {
    this.setState({ informVisible: false })
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



  clickLi = (e) => {
    this.getVenueNumberTitleList({ sportid: e.target.dataset.num })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num, spinningTwo: true })
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
  dateChange = (data, datatring) => {
    let week=['周日','周一','周二','周三','周四','周五','周六']
    this.setState({ dateString: datatring,week:week[new Date(datatring).getDay()] })
    this.getVenueReservation({ sportid: this.state.liNum, date: datatring })
  }

  dateStingTwo=(e)=>{
    let week=['周日','周一','周二','周三','周四','周五','周六']
    this.setState({ dateString: e.currentTarget.dataset.date,week:week[new Date(e.currentTarget.dataset.date).getDay()] })
    this.getVenueReservation({ sportid: this.state.liNum, date: e.currentTarget.dataset.date })
  }



  checkbox = e => {
    if (this.state.resData[e.target.idx].c[e.target.jdx].checked === false) {
      let item=this.state.resData
      item[e.target.idx].c[e.target.jdx].checked = true
      this.hoode(item)
    } else {
      let item=this.state.resData
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
      message.error('请选择空闲场地')
    }

  }
  shourTwo = () => {
    this.setState({
      cofirmZ: 0, venueidids: [], dtime: [], arrTimeuid: []
    })
    setTimeout(() => {
      let items=this.state.resData
      for (let i in items) {
        for (let j in items[i].c) {
          items[i].c[j].checked = false
        }
      }
      this.hoode(items)
    }, 50)
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

  async VenueClickCancelPlace(data) {
    const res = await VenueClickCancelPlace(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ cofirmZ: 0, venueidids: [], dtime: [], Cancels: 0,isloop:2 })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
      if (data.type === 1) {
        message.success('该场地该时间段已标记为线下占用')
        this.setState({placeHui:'',placeName:'',placePhone:'',placeQi:''})
      } else if (data.type === 2) {
        this.setState({ flagClick: 0 })
        message.success('该场地该时间段已向找对手线上释放')
      }
      this.setState({ info: false, lotime: [], arrTimeuid: [],isloop:2,isModalVisible:false })
    } else {
      message.error('操作失败')
    }


  }
  CheckboxOnChange=(e)=>{
   if(e.target.checked===true){
     this.setState({isloop:1})
   }else{
    this.setState({isloop:2})
   }
  }

  placeSubmit = () => {
    let { venueidids, dtime, placeHui, placeName, placePhone, placeQi } = this.state
   
      let obj = {
        placeHui: placeHui,
        placeName: placeName,
        placePhone: placePhone,
        placeQi: placeQi,
      }

      this.VenueClickCancelPlace({ uuid: '', date: this.state.dateString, venueid: venueidids, other: JSON.stringify(obj), time: dtime, sportid: this.state.liNum, type: 1,isloop:this.state.isloop })
    
    
 
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
    let { arrTimeuid } = this.state
    let venueidids = []
    let dtime = []
    let duuid = []
    for (let i in arrTimeuid) {

      venueidids.push(arrTimeuid[i].split('#')[2])
      dtime.push(arrTimeuid[i].split('#')[1])
      duuid.push(arrTimeuid[i].split('#')[0])
    }
    this.setState({isModalVisible:true,venueidids:venueidids,dtime:dtime,duuid:duuid})

    
  }

  moBtn=()=>{
    if (this.state.venueidids.length !== 0) {
      this.VenueClickCancelPlace({ date: this.state.dateString, sportid: this.state.liNum, type: 2, time: this.state.dtime.join(','), venueid: this.state.venueidids.join(','), uuid: this.state.duuid.join(','), other: '',isloop:this.state.isloop })
    } else {
      message.error('请选择需要释放的场地')
    }
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
      let items=this.state.resData
      for (let i in items) { 
        for (let j in items[i].c) {
          items[i].c[j].checked = false
        }
      }
      this.hoode(items)
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

  async VenueRemarksLabel(data) {
    const res = await VenueRemarksLabel(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      let ko = JSON.parse(res.data.data)
      let arrObj = <div>
        <div>姓名：{ko.placeName === '' ? '无' : ko.placeName}</div>
        <div>手机号：{ko.placePhone === '' ? '无' : ko.placePhone}</div>
        <div>会员卡号：{ko.placeHui === '' ? '无' : ko.placeHui}</div>
        <div>其他：{ko.placeQi === '' ? '无' : ko.placeQi}</div>
      </div>
      this.setState({ otherObj: arrObj, menu: 1, History: true })
    }
  }
  handleCancelInFo = () => {
    this.setState({
      info: false,
      
    })
  }
  handleCancel=()=>{
    this.setState({isModalVisible:false})
  }








   getDay=(day)=>{
    　　var today = new Date(this.state.dateString);
    
    　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    
    
    
    　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
    
    
    
    　　var tYear = today.getFullYear();
    
    　　var tMonth = today.getMonth();
    
    　　var tDate = today.getDate();
    
    　　tMonth = this.doHandleMonth(tMonth + 1);
    
    　　tDate = this.doHandleMonth(tDate);
    
    　　return tYear+"-"+tMonth+"-"+tDate;
    
    }
    
   doHandleMonth=(month)=>{
    
    　　var m = month;
    
    　　if(month.toString().length === 1){
    
    　　　　m = "0" + month;
    
    　　}
    
    　　return m;
    
    }

  riLeft=()=>{
    let week=['周日','周一','周二','周三','周四','周五','周六']
    this.setState({ dateString: this.getDay(-7),week:week[new Date(this.getDay(-7)).getDay()] })
    this.getDateAndDayOfWeek({date:this.getDay(-7)})
    this.getVenueReservation({ sportid: this.state.liNum, date: this.getDay(-7) })
  }

  riRight=()=>{
    let week=['周日','周一','周二','周三','周四','周五','周六']
    this.setState({ dateString: this.getDay(7),week:week[new Date(this.getDay(7)).getDay()] })
    this.getDateAndDayOfWeek({date:this.getDay(7)})
    this.getVenueReservation({ sportid: this.state.liNum, date: this.getDay(7) })
  }

  render() {

    return (

      <div className="orderList" style={{ position: 'relative', height: '100%' }}>
        <div className="navTab" style={{ paddingLeft: '0' }}>
          <div className="sping"> <SyncOutlined className={this.state.Oneloading === true || this.state.number === '2' ? 'hidden' : 'block'} onClick={this.Oneloading} style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.Oneloading} /></div>
        </div>
        <div className="xiange"></div>

        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'} style={{ height: '92%' }} >
          <ul className="rightNav" style={{ top: '-48px', left: '-20px' }}>
            <li className="dateSelect">
              <DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} locale={locale} value={moment(this.state.dateString, 'YYYY-MM-DD')} placeholder="请选择日期" className="DatePicker" onPanelChange={this.dateChangeTwo} onChange={this.dateChange} />
            </li>
          </ul>
           
          <div className="weekList">
          <div className="riLeft"><img onClick={this.riLeft} src={require('../../assets/left.png')} alt="icon" / ></div>
            {
              this.state.weekList.map((item,i)=>(
              <div className="moTimeBtn" onClick={this.dateStingTwo} data-date={item.date} style={this.state.dateString===item.date?{background:'#F5A623',color:'#fff',borderColor:'#fff'}:{}}  key={i}>{item.week}<br/>{item.date}</div>
              ))
            }
             <div  className="riRight"><img onClick={this.riRight} src={require('../../assets/right.png')} alt="icon" / ></div>
          </div>
         
          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span style={{ background: '#E9E9E9'}}></span><span>不可选</span></div>
            <div><span></span><span>线下占用</span></div>
            <div><span></span><span>线上占用</span></div>
          </div>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <ul className="activityNav" style={{ width: '1350px' }}>
              {
                this.state.activityNav.map((item, i) => (
                  <li key={i} onClick={this.clickLi} data-index={i} data-num={item.id} className={parseInt(this.state.dianIndex) === i ? 'borderLi' : ''}>{item.name}</li>
                ))
              }
              <li style={this.state.cofirmZ === 1 || this.state.otherType.length === 0 || this.state.Cancels === 1 ? { display: 'none' } : { display: 'block' }}><div className="cofirmZ" onClick={this.cofirmZ}>设置线下占用</div></li>
              <li style={this.state.cofirmZ === 1 ? { display: 'block' } : { display: 'none' }}><div className="cofirmZText" onClick={this.shour}>确定</div><div style={{ marginLeft: 2 }} className="cofirmZText" onClick={this.shourTwo}>取消</div></li>
              <li style={this.state.Cancels === 1 || this.state.otherType.length === 0 || this.state.calesRed === 0 || this.state.cofirmZ === 1 ? { display: 'none' } : { display: 'block' }}><div className="cofirmZ" onClick={this.Cancels}>取消线下占用</div></li>
              <li style={this.state.Cancels === 1 ? { display: 'block' } : { display: 'none' }}><div className="cofirmZText" onClick={this.Cancelsshour}>确定</div><div style={{ marginLeft: 2 }} className="cofirmZText" onClick={this.CancelsshourTwo}>取消</div></li>
            </ul>
          </div>

          <div className="xiange"></div> 
          {/* 看板渲染标签 */}
          <div style={{height:'88%'}}>
          <Spin spinning={this.state.lppding}>
            <Table loading={this.state.loadingTwo} style={this.state.otherType.length === 0 ? { display: 'none' } : { maxWidth: this.state.otherType.length * 100 }} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 76, minWidth: 40, y: '90%' }} />,
           <div style={this.state.otherType.length === 0?{width:'100%'}:{display:'none'}}><img style={{width:'84px',height:84,display:'block',margin:'84px auto 0'}} src={require('../../assets/xifen (2).png')} alt="icon"/><span style={{display:'block',textAlign:'center'}}>{this.state.textNuma+'!'}</span></div>
          </Spin>
          </div>
        </div>

        <Drawer
          title="该活动详细信息"
          placement="right"
          closable={false}
          width='400px'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >
          <div style={this.state.informList.length > 0?{}:{display:'none'}}>
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
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney+'元' : ''}</span>
          </div>
          <div className="informDrawer">
            <span>场地费状态：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
          </div>
          </div>
          <div style={this.state.informList.length > 0?{display:'none'}:{}}>无</div>
        </Drawer>
        <Drawer
          title='线下预订人信息'
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
          title="请输入线下预订人的相关信息"
          visible={this.state.info}
          onOk={this.handleOk}
          className="mode"
          onCancel={this.handleCancelInFo}
          closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: '20px',lineHeight:'30px' }} />}
        >
          <div style={{ overflow: 'hidden' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>姓名：</span>
            <Input style={{ width: 250, float: 'left' }} value={this.state.placeName} maxLength={20} onChange={this.placeName} placeholder='(选填)' />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>手机号：</span>
            <Input style={{ width: 250, float: 'left' }} maxLength={11} value={this.state.placePhone} onChange={this.placePhone} placeholder="(选填)" />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>会员卡卡号：</span>
            <Input style={{ width: 250, float: 'left' }} maxLength={20} onChange={this.placeHui} value={this.state.placeHui} placeholder="(选填)" />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>其他：</span>
            <Input style={{ width: 250, float: 'left' }} maxLength={50} value={this.state.placeQi} onChange={this.placeQi} placeholder="(选填)" />
          </div>
            <Checkbox style={{marginLeft:'50px',marginTop:'20px'}} defaultChecked={false} checked={this.state.isloop===2?false:true} onChange={this.CheckboxOnChange}>将所选场地时间段在每{this.state.week}都预留给该线下用户</Checkbox>
          <span onClick={this.placeSubmit} style={{ cursor: 'pointer', padding: '4px 8px', background: '#F5A623', color: '#fff', float: 'right', marginRight: '125px', marginTop: '20px' }}>提交</span>
        </Modal>

        <Modal
        title="提示"
        visible={this.state.isModalVisible}
        onOk={this.handleOk}
        className="mode"
        onCancel={this.handleCancel}
      >
        <span style={{fontSize:'20px',fontWeight:'bold'}}>将所选线下占用场地时间段释放到线上？</span>
        <Checkbox style={{marginTop:'20px'}} checked={this.state.isloop===2?false:true} onChange={this.CheckboxOnChange}>将所选场地时间段在每{this.state.week}都释放</Checkbox>
        <div style={{clear:'both'}}></div>
        <div className="moBtn" onClick={this.handleCancel}>取消</div> <div className="moBtn" onClick={this.moBtn}>确定</div>
      </Modal>


      </div>
    )
  }
}

export default appointmentList;