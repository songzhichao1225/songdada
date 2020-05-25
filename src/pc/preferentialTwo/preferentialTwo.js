import React from 'react';
import './preferentialTwo.css';
import 'antd/dist/antd.css';
import { Input, Spin, message, DatePicker, Modal, Drawer, Table, Checkbox, Result } from 'antd';
import { SyncOutlined, FundOutlined } from '@ant-design/icons';
import { getVenueReservation, getVenueSport, VenueNumberSporttypeSave, getVenueNumberTitleList, VenueClickCancelPlace, getReservationActivitieslist, VenueNewsHistoricalRecord, VenueRemarksLabel } from '../../api';
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
  });
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
   
  };

  async getVenueSport(data) {
    const res = await getVenueSport(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/')
      message.error('登陆超时请重新登陆！')
    } else if (res.data.code === 2000) {
      this.setState({ activityNav: res.data.data })
      this.getVenueNumberTitleList({ sportid: this.state.liNum })
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


  componentDidMount() {
    this.getVenueSport()
    if (this.props.location.query !== undefined) {
      this.setState({
        number: this.props.location.query.number.toString()
      })
      this.setState({ dianIndex: this.props.location.query.dataIndex, liNum: this.props.location.query.id.toString(), spinningTwo: true })
      this.getVenueNumberTitleList({ sportid: this.props.location.query.id })
    }
    this.setState({ dateString: new Date().toLocaleDateString().replace(/\//g, "-") })
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


      this.setState({
        resData:res.data.data
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
      this.setState({ lookList: res.data.data, spinningTwo: false, loadingTwo: false })
      sessionStorage.setItem('kood', 1)
    } else if (res.data.code === 4003) {
      this.setState({ otherType: [], lookBan: [], loadingTwo: false })
      sessionStorage.setItem('kood', 1)
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
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '' })
      this.setState({ informVisible: true })
    } else if (e.currentTarget.dataset.type === '4' && this.state.Cancels === 0) {
      this.VenueRemarksLabel({ uuid: e.currentTarget.dataset.uuid })
    }
  }
  informOnClose = () => {
    this.setState({ informVisible: false })
  }


  hoode=(resData)=>{
    let jood = []
      for (let i in resData) {
        let obj = {}
        for (let j in resData[i].c) {
          obj.key = j + 1
          let key = resData[i].c[j].venueids
          let value = <div><div data-type={resData[i].c[j].type} data-uuid={resData[i].c[j].uuid} onClick={this.lookDeta} style={resData[i].c[j].type === 1 ? { background: '#6FB2FF', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 2 ? { background: '#ADD2FF', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 3 ? { background: '#F5A623', color: 'transparent', height: 45, lineHeight: 3 } : {} && resData[i].c[j].type === 4 ? { background: 'red', height: 45, lineHeight: 3 } : {}}><Checkbox className="chePe" defaultChecked={this.state.Cancels===1?false:false} onChange={this.checkbox} dtype={resData[i].c[j].type} time={resData[i].a}  venueid={resData[i].c[j].venueids} uuid={resData[i].c[j].uuid} style={resData[i].c[j].type === 1 && this.state.cofirmZ === 1 ? {} : { display: 'none' } && resData[i].c[j].type === 4 && this.state.Cancels === 1 ? {} : { display: 'none' }} />{resData[i].c[j].money}</div></div>
          obj[key] = value
          let koTwo = parseInt(resData[i].a.slice(1, 2)) + 1 + ':00'
          obj.lppd = <div style={{ color: '#F5A623' }}>{resData[i].a}<br />{resData[i].a.slice(3, resData[i].a.length) === '00' ? resData[i].a.slice(0, 2) + ':30' : koTwo === '10:00' ? parseInt(koTwo.slice(0, 1)) + 1 + '0:00' : resData[i].a.slice(0, 1) + koTwo}</div>
        }
        jood.push(obj)
      }
     
      
        this.setState({
          lookBan: jood
        })
     
      

  }



  clickLi = (e) => {
    this.getVenueNumberTitleList({ sportid: e.target.dataset.num })
    this.setState({ dianIndex: e.target.dataset.index, liNum: e.target.dataset.num, spinningTwo: true })
  }

  cofirmZ = () => {
    this.setState({
      cofirmZ: 1,
      chePe:false
    })
     setTimeout(() => {
      this.hoode(this.state.resData)
      
      }, 50)
    
  }
  dateChange = (data, datatring) => {
    this.setState({ dateString: datatring })
    this.getVenueReservation({ sportid: this.state.liNum, date: datatring })
  }
  checkbox = e => {
    this.setState({
      dtype: e.target.dtype,
      venueidids: [...this.state.venueidids, e.target.venueid],
      dtime: [...this.state.dtime, e.target.time],
      duuid: [...this.state.duuid, e.target.uuid],
      
    })
  
  }

  shour = () => {
    let { venueidids, dtime } = this.state
    console.log(venueidids, dtime)
    if (venueidids.length !== 0) {
      this.setState({
        info: true,
        venueidids:typeof(venueidids)==='string'?venueidids:venueidids.join(','),
        dtime:typeof(dtime)==='string'?dtime:dtime.join(',')
      })
    } else {
      message.error('请选择空闲场地')
    }

  }
  shourTwo = () => {
    this.setState({
      cofirmZ: 0, venueidids: [], dtime: []
    })
    setTimeout(()=>{
      this.hoode(this.state.resData)
    },50)
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
      this.setState({ cofirmZ: 0, venueidids: [], dtime: [], Cancels: 0 })
      this.getVenueReservation({ sportid: this.state.liNum, date: this.state.dateString })
      if (data.type === 1) {
        message.info('该场地该时间段已标记为线下占用')
      } else if (data.type === 2) {
        this.setState({ flagClick: 0 })
        message.info('该场地该时间段已向找对手线上释放')
      }
      this.setState({ info: false, lotime: [] })
    } else {
      message.error('操作失败')
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
    this.VenueClickCancelPlace({ uuid: '', date: this.state.dateString, venueid: venueidids, other: JSON.stringify(obj), time: dtime, sportid: this.state.liNum, type: 1 })
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
    let { venueidids, dtime, duuid, dateString, liNum } = this.state
    if (venueidids.length !== 0) {
      this.VenueClickCancelPlace({ date: dateString, sportid: liNum, type: 2, time: dtime.join(','), venueid: venueidids.join(','), uuid: duuid.join(','), other: '' })
    } else {
      message.error('请选择需要释放的场地')
    }
  }
  CancelsshourTwo = () => {
    this.setState({
      venueidids: [],
      dtime: [],
      duuid: [],
      Cancels: 0
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
  handleCancelInFo=()=>{
    this.setState({
      info:false
    })
  }

  render() {

    return (

      <div className="orderList" style={{ position: 'relative', height: '100%' }}>
        <div className="navTab">
          <div className="sping"> <SyncOutlined className={this.state.Oneloading === true || this.state.number === '2' ? 'hidden' : 'block'} onClick={this.Oneloading} style={{ fontSize: 24, marginTop: 15 }} /><Spin indicator={antIcon} spinning={this.state.Oneloading} /></div>
        </div>
        <div className="xiange"></div>

        <div className={this.state.number === '2' ? 'circumstance' : 'circumstanceT'} style={{ height: '93%' }} >
          <ul className="rightNav" style={{ top: '-48px' }}>
            <li className="dateSelect">
              <DatePicker defaultValue={moment(new Date(), 'YYYY-MM-DD')} locale={locale} placeholder="请选择日期" className="DatePicker" onChange={this.dateChange} />
            </li>
          </ul>
          <div className="prompt">
            <div><span></span><span>空闲</span></div>
            <div><span style={{ background: '#6FB2FF', opacity: '.3', }}></span><span>不可选</span></div>
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
              <li style={this.state.cofirmZ === 1 ? { display: 'none' } : { display: 'block' }}><div className="cofirmZ" onClick={this.cofirmZ}>设置线下占用</div></li>
              <li style={this.state.cofirmZ === 1 ? { display: 'block' } : { display: 'none' }}><div className="cofirmZText" onClick={this.shour}>确定</div><div style={{ marginLeft: 2 }} className="cofirmZText" onClick={this.shourTwo}>取消</div></li>
              <li style={this.state.Cancels === 1 ? { display: 'none' } : { display: 'block' }}><div className="cofirmZ" onClick={this.Cancels}>取消线下占用</div></li>
              <li style={this.state.Cancels === 1 ? { display: 'block' } : { display: 'none' }}><div className="cofirmZText" onClick={this.Cancelsshour}>确定</div><div style={{ marginLeft: 2 }} className="cofirmZText" onClick={this.CancelsshourTwo}>取消</div></li>
            </ul>
          </div>

          <div className="xiange"></div>
          {/* 看板渲染标签 */}
          <Table loading={this.state.loadingTwo} style={this.state.otherType.length === 0 ? { display: 'none' } : { maxWidth: this.state.otherType.length * 100 }} columns={this.state.otherType} rowKey='key' pagination={false} dataSource={this.state.lookBan} scroll={{ x: this.state.otherType.length * 76, minWidth: 40, y: '90%' }} />,
          <Result className={this.state.otherType.length === 0 ? '' : 'hidden'} icon={<FundOutlined style={{ color: '#F5A623' }} />} title="您还没有进行价格设置" />


        </div>

        <Drawer
          title="该活动详细信息"
          placement="right"
          closable={false}
          width='400px'
          onClose={this.informOnClose}
          visible={this.state.informVisible}
        >
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
            <span>{this.state.informList.length > 0 ? this.state.informList[0].PlayTime : ''}</span>
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
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney : ''}</span>
          </div>
          <div className="informDrawer">
            <span>场地费状态：</span>
            <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
          </div>
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
          onCancel={this.handleCancelInFo}
        >
          <div style={{ overflow: 'hidden' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>姓名：  </span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placeName} placeholder='(选填)' />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>手机号：</span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placePhone} placeholder="(选填)" />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>会员卡卡号：</span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placeHui} placeholder="(选填)" />
          </div>
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <span style={{ width: '100px', lineHeight: '30px', textAlign: 'right', display: 'block', float: 'left' }}>其他：</span>
            <Input style={{ width: 250, float: 'left' }} onChange={this.placeQi} placeholder="(选填)" />
          </div>
          <span onClick={this.placeSubmit} style={{ cursor: 'pointer', padding: '4px 8px', background: '#F5A623', color: '#fff', float: 'right', marginRight: '125px', marginTop: '20px' }}>提交</span>
        </Modal>


      </div>
    )
  }
}

export default appointmentList;