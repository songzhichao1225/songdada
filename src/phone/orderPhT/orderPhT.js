import React from 'react';
import './orderPhT.css';

import { DatePicker, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Row, Col, Pagination, Modal, Radio, Input, Drawer, Result, Icon, Spin } from 'antd';
import { getReservationActivitieslist, VenueSendMessage, getVenueReservationss, getVenueSport, VenueClickCancelPlace, getVenueNumberTitleList, getVenueNumberTitleSave } from '../../api';

import moment from 'moment';
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
const { TextArea } = Input


class orderPhT extends React.Component {

  state = {
    activityList: true,
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
      { name: '高尔夫', id: 8 }
    ],
    status: [
      { name: '全部', id: 0 },
      { name: '匹配中', id: 1 },
      { name: '待出发', id: 2 },
      { name: '活动中', id: 3 },
      { name: '待确认结束/待填写结果', id: 4 },
      { name: '待评价', id: 6 },
      { name: '已完成', id: 5 },
      {name:'已取消',id:7}
    ],
    page: 0,
    clenTop: 0,
    clickY: 0,
    moveY: 0,
    spinFlag: false,

    start: '选择开始日期',
    end: '选择结束日期',
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
    venueid:'',
  };


  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
      this.getVenueReservationss({ sportid: this.state.liNum, date: this.state.dateString, types: 1 })
    }
  }




  async getVenueReservationss(data) {
    const res = await getVenueReservationss(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      for (let j in this.state.topNumList) {
        res.data.data[0].c[this.state.topNumList[j].venueid - 1].title = this.state.topNumList[j].title
        res.data.data[0].c[this.state.topNumList[j].venueid - 1].uuid = this.state.topNumList[j].uuid
      }

      this.setState({ lookList: res.data.data, macNum: res.data.data[0].c, value: 'l' })
      if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) < 24) {
        if (res.data.data[res.data.data.length - 1].a.slice(-2) === '00') {

          if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) < 10) {
            this.setState({ lastTime: '0' + (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2))) + ':30' })
          } else {
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + ':30' })
          }
        } else if (res.data.data[res.data.data.length - 1].a.slice(-2) === '30') {

          if (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 < 10) {
            this.setState({ lastTime: '0' + (parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1) + ':00' })
          } else {
            this.setState({ lastTime: parseInt(res.data.data[res.data.data.length - 1].a.slice(0, 2)) + 1 + ':00' })
          }
        }
      }
    } else if (res.data.code === 4005) {
      this.setState({ lookList: res.data.data })
    } else if (res.data.code === 4003) {
      this.setState({ lookList: [] })
    }
  }


  async getReservationActivitieslist(data) {
    const res = await getReservationActivitieslist(data, localStorage.getItem('venue_token'))
    if (res.data.code === 4001) {
      this.props.history.push('/login')
      Toast.fail('登录超时请重新登录', 1);
    } else if (res.data.code === 2000) {
      this.setState({ activeSon: res.data.data.data, informList: res.data.data.data, total: res.data.data.count, flag: false, spin: false })
    } else if (res.data.code === 4002) {
      this.setState({ activeSon: [], flag: true })
    }
    this.setState({ spin: false, spinFlag: false })

  }


  async getVenueSport(data) {
    const res = await getVenueSport(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      if (res.data.data.length > 0) {
        this.setState({ remList: res.data.data, liNum: res.data.data[0].id })
        this.getVenueNumberTitleList({ sportid: res.data.data[0].id })
      }

    }
  }

  componentDidMount() {
    this.setState({ dataString: new Date().toLocaleDateString().replace(/\//g, "-"), nowDate: new Date().toLocaleDateString().replace(/\//g, "-") })
    this.getVenueReservationss({ sportid: 1, date: new Date().toLocaleDateString().replace(/\//g, "-"), types: 1 })
    this.getVenueSport()
    if (this.props.location.query !== undefined) {
      if (this.props.location.query.time === 1) {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        setInterval(() => {
          this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        }, 1000 * 60 * 5)
      } else if (this.props.location.query.time === 2) {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        setInterval(() => {
          this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        }, 1000 * 60 * 5)
      } else if (this.props.location.query.uuid) {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-")
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-")
        this.setState({ start: start, end: end })
        this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        setInterval(() => {
          this.getReservationActivitieslist({ page: 1, sport: '', status: '', startdate: start, enddate: end })
        }, 1000 * 60 * 5)

        this.setState({ visible: true, publicUUID: this.props.location.query.uuid })
      }
    } else {
      this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
      setInterval(() => {
        this.getReservationActivitieslist({ page: 1, sport: '', status: '' })
      }, 1000 * 60 * 5)
    }

  }


  activityList = () => {
    this.setState({ activityList: true })
    this.getReservationActivitieslist({ page: 1, sport: '', status: '', publicuid: '' })
  }
  bookingKanban = () => {
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
    this.setState({ page: page })
    this.getReservationActivitieslist({ page: page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', 
    startdate: this.state.start==='选择开始日期'?'':this.state.start, enddate: this.state.end==='选择结束日期'?'':this.state.end })
  }

  showModal = (e) => {
    this.setState({
      visible: true,
      publicUUID: e.currentTarget.dataset.uid,
      venueid:e.currentTarget.dataset.venueid
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
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
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start==='选择开始日期'?'':this.state.start, enddate: this.state.end==='选择结束日期'?'':this.state.end  })
    }
  }

  sendingMessage = e => {
    let { publicUUID, sendCheck, textArea,venueid } = this.state
    this.VenueSendMessage({ type: sendCheck, publicUUID: publicUUID, content: textArea,venuenumber:'',venueid:venueid })
  }


  showDrawer = () => {
    this.setState({
      Drawervisible: true
    })
  };

  onClose = () => {
    this.setState({
      Drawervisible: false
    })
  }

  dateChange = (date) => {

    this.setState({ dataString: date.toLocaleDateString().replace(/\//g, "-"), qiDate: date })
    this.getVenueReservationss({ date: date.toLocaleDateString().replace(/\//g, "-"), sportid: this.state.sportid, types: 1, siteUUID: '' })
  }
  sport = e => {
    this.setState({ sportIdVal: e.currentTarget.dataset.id })
  }
  status = e => {
    this.setState({ statusIdVal: e.currentTarget.dataset.id })
  }

  drawerInputOrderDate = (date) => {
    this.setState({ start: date.toLocaleDateString().replace(/\//g, "-"), qiStart: date })

  }

  drawerInputOrderDateTwo = (date) => {
    this.setState({ end: date.toLocaleDateString().replace(/\//g, "-"), qiEnd: date })
  }

  submitVal = () => {
    this.getReservationActivitieslist({ page: 1, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start==='选择开始日期'?'':this.state.start, 
    enddate: this.state.end==='选择结束日期'?'':this.state.end })
    this.setState({
      Drawervisible: false
    })
  }

  sportName = e => {
    this.setState({ liNum: e.currentTarget.dataset.id, liIndex: e.currentTarget.dataset.index })
    this.getVenueReservationss({ sportid: e.currentTarget.dataset.id, date: this.state.dataString, types: 1 })
  }

  informOnClose = () => {
    this.setState({ informVisible: false })
  }

  async VenueClickCancelPlace(data) {
    const res = await VenueClickCancelPlace(data, sessionStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.getVenueReservationss({ sportid: this.state.liNum, date: this.state.dateString, types: 1 })
      if (data.type === 1) {
        Toast.fail('该场地该时间段已标记为线下占用', 1);
      } else if (data.type === 2) {
        Toast.fail('该场地该时间段已向找对手线上释放', 1);
      }
      this.setState({ info: false, lotime: [] })
    } else {
      Toast.fail('操作失败', 1);
    }
  }

  lookPlate = e => {
    let time = e.currentTarget.dataset.time
    let uuid = e.currentTarget.dataset.uuid
    let lotime = e.currentTarget.dataset.lo
    let num = e.currentTarget.dataset.num
    if (e.currentTarget.dataset.type !== '3' && e.currentTarget.dataset.type !== '2') {
      if (e.currentTarget.dataset.type === '1') {
        if (this.state.lotime.length > 0) {
          if (this.state.lotime.indexOf(lotime) !== -1) {
            this.state.lotime.splice(this.state.lotime.indexOf(lotime), 1)
          } else {
            this.setState({ lotime: [...this.state.lotime, lotime] })
          }
        } else {
          this.setState({ lotime: [...this.state.lotime, lotime] })
        }

      } else if (e.currentTarget.dataset.type === '4') {
        this.VenueClickCancelPlace({ date: this.state.dateString, uuid: uuid, time: time, venueid: num, sportid: this.state.liNum, other: '', type: 2 })
      }
    } else if (e.currentTarget.dataset.type === "3") {
      this.getReservationActivitieslist({ publicuid: e.currentTarget.dataset.uuid, page: 1, sport: '', status: '' })
      this.setState({ informVisible: true })
    }
  }



  scroll = () => {
    let scrollTop = this.scrollRef.scrollTop;
    let scrollLeft = this.scrollRef.scrollLeft;
    this.setState({ left: scrollLeft, top: scrollTop })
  }

  touClick = (e) => {
    this.setState({ clickY: e.targetTouches[0].clientY })
  }

  touMove = (e) => {
    if (this.state.clickY < e.targetTouches[0].clientY && this.state.clickY < 130) {
      this.setState({ moveY: e.targetTouches[0].clientY })
      if (e.targetTouches[0].clientY - this.state.clickY < 80) {
        this.setState({ spinFlag: true })
        this.setState({ clenTop: e.targetTouches[0].clientY - this.state.clickY })
      }
    }
  }
  touEnd = () => {
    if (this.state.moveY > this.state.clickY + 10) {
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal })
      if (this.state.spinFlag === false) {
        this.setState({ moveY: 0, clickY: 0 })
        this.setState({ clenTop: 0 })
      }
    }
  }
  valChange = (vals) => {
    let monut = parseInt(vals[1]) + 1
    this.setState({ nowDate: vals[0] + '-' + monut + '-' + vals[2] })
  }



  menu = (e) => {
    if (e.currentTarget.dataset.type === '1') {
      this.setState({ otherObj: '', menu: 2 })
      if (this.state.lotime.length !== 0) {
        let num = ''
        let time = ''
        for (let i in this.state.lotime) {
          num += this.state.lotime[i].split('-')[1] + ','
          time += this.state.lotime[i].split('-')[0] + ','
        }
        this.setState({ info: true, num: num, time: time })
      } else {
        Toast.fail('请选择场地', 1);
      }
    } else if (e.currentTarget.dataset.type === '4') {
      this.VenueRemarksLabel({ uuid: e.currentTarget.dataset.uuid })
    } else {
      this.setState({ otherObj: '', menu: 2 })
    }

  }

  async getVenueNumberTitleSave(data) {
    const res = await getVenueNumberTitleSave(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      Toast.fail(res.data.msg, 1);
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


  render() {
    return (
      <div className="orderPh" onTouchMove={this.touMove} onTouchStart={this.touClick} onTouchEnd={this.touEnd}>
        <div className="headerNav">
          <div onClick={this.activityList} style={this.state.activityList === true ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>预约活动列表</div>
          <div onClick={this.bookingKanban} style={this.state.activityList === false ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>场地预约情况</div>
        </div>
        <div className='headSelect' style={this.state.spinFlag === false ? { display: 'none' } : { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' }} ><Icon type="loading" className='loadingY' style={{ top: this.state.clenTop / 4 }} /></div>

        <div style={{ height: '0.6rem', background: '#f5f5f5' }}  ></div>
        <div className={this.state.activityList === true ? 'activityList' : 'hidden'}>
          <div className="screen" onClick={this.showDrawer}><span style={{ paddingRight: '0.2rem' }}>筛选</span><img style={{ marginTop: '-0.2rem' }} src={require('../../assets/shaixuan.png')} alt="筛选" /></div>

          <Row style={{ borderBottom: '0.06rem solid #f5f5f5' }}>
            <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>ID/项目</Col>
            <Col xs={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 1 }}>时间</Col>
            <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 1 }}>状态</Col>
          </Row>
          <div style={{width:'100%',height:'0.6rem',background:'rgb(245, 245, 245)'}}></div>
          <div className='contentT'>
            <div style={this.state.activeSon.length === 0 ? { display: 'none' } : { display: 'block' }}>
              {
                this.state.activeSon.map((item, i) => (
                  <Row key={i} className="list" data-index={i} onClick={this.select}>
                    <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}>{'**' + item.orderId.slice(-4)}{item.SportName}</Col>
                    <Col className='dateTime' xs={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 2 }}>{item.StartTime}<br />{item.FinishedTime}</Col>
                    <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.PublicStatus}</Col>
                    <div className={this.state.index === '' + i + '' ? 'select' : 'hidden'}>
                      <Row style={{ paddingTop: '0.5rem' }}>
                        <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left', height: '2rem', lineHeight: '2rem' }} lg={{ span: 6, offset: 2 }}><span >金额</span>  {item.SiteMoney}元</Col>
                        <Col xs={{ span: 8, offset: 2 }} style={{ height: '2rem', lineHeight: '2rem', textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span >支付状态</span>  {item.SiteMoneyStatus}</Col>
                      </Row>
                      <Row>
                        <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left', height: '2rem', lineHeight: '2rem' }} lg={{ span: 6, offset: 2 }}><span style={{ height: '2rem', lineHeight: '2rem' }}>应到人数</span>  {item.Shouldarrive}人</Col>
                        <Col xs={{ span: 8, offset: 2 }} style={{ height: '2rem', lineHeight: '2rem', textAlign: 'left' }} lg={{ span: 6, offset: 2 }}><span style={{ height: '2rem', lineHeight: '2rem' }}>已到人数</span>  {item.TrueTo}人</Col>
                      </Row>
                      <Row>
                        <Col xs={{ span: 6, offset: 1 }} style={{ textAlign: 'left', height: '2rem', lineHeight: '2rem' }} lg={{ span: 6, offset: 2 }}><span style={{ height: '2rem', lineHeight: '2rem' }}>  时长</span>  {item.PlayTime}小时</Col>
                        <Col xs={{ span: 9, offset: 1 }} lg={{ span: 6, offset: 3 }}></Col>
                        <Col xs={{ span: 6, offset: 1 }} lg={{ span: 6, offset: 2 }}><img onClick={this.showModal} data-venueid={item.venueid} data-uid={item.uuid} src={require('../../assets/sendingBtn.png')} alt="发消息" className={item.PublicStatus === '匹配中' ? 'sending' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'sending' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'sending' : 'circumstanceT'} /></Col>
                      </Row>
                    </div>
                  </Row>
                ))
              }
              <Pagination className={this.state.activeSon.length > 0 ? 'fenye' : 'hidden'} size="small" defaultCurrent={1} onChange={this.current} total={this.state.total} />
            </div>
            <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin} />
            <Result className={this.state.spin === false && this.state.activeSon.length === 0 ? '' : 'hidden'} icon={<Icon style={{ fontSize: '2rem' }} type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="没有活动列表" />
          </div>



          <Modal
            title="发消息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Radio.Group onChange={this.sendCheck} value={this.state.sendCheck}>
              <Radio value={2}>未预留场地</Radio>
            </Radio.Group>
            <TextArea style={{ marginTop: '30px' }} className="sending" maxLength={200} onChange={this.textArea} rows={4} />
            <span style={{ float: 'left' }}>还可以输入{200 - this.state.textArea.length}字</span>
            <div className="sending">
              <div onClick={this.handleCancel}>取消</div>
              <div onClick={this.sendingMessage}>发送</div>
            </div>
          </Modal>



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
            <div className='drawerInputOrder'>
              <span style={{ clear: 'both', display: 'block', marginTop: '1rem' }}>选择日期</span>
              <div style={{ width: '100%', height: '3rem', borderBottom: '0.06rem solid #f5f5f5' }}>
                <DatePicker
                  mode="date"
                  extra="Optional"
                  title='选择日期'
                  onChange={this.drawerInputOrderDate}
                  locale={zh_CN}
                  value={this.state.qiStart}
                >
                  <div style={{ lineHeight: '3rem' }}>{this.state.start}</div>
                </DatePicker>

              </div>
              <div style={{ width: '100%', height: '3rem', borderBottom: '0.06rem solid #f5f5f5' }}>
                <DatePicker
                  mode="date"
                  extra="Optional"
                  title='选择日期'
                  onChange={this.drawerInputOrderDateTwo}
                  locale={zh_CN}
                  value={this.state.qiEnd}
                >
                  <div style={{ lineHeight: '3rem' }}>{this.state.end}</div>
                </DatePicker>

              </div>
            </div>
            <div className="drawerBtn">
              <div onClick={this.onClose}>取消</div>
              <div onClick={this.submitVal}>确定</div>
            </div>
          </Drawer>
        </div>



        <div className={this.state.activityList === false ? 'bookingKanban' : 'hidden'}>
          <div className="modTitle">
            <span className="blue"></span><span>空闲</span><span className="white"></span><span>不可选</span><span className="yellow"></span><span>已占用</span><span className="red"></span><span>场地取消</span>
          </div>
          <div className="locaList">
            {
              this.state.remList.map((item, i) => (
                <div key={i} data-id={item.id} data-index={i} onClick={this.sportName} style={parseInt(this.state.liIndex) === i ? { borderBottom: '0.06rem solid #D85D27', color: '#D85D27' } : {}}>{item.name}</div>
              ))
            }
          </div>
          <div className="lookList" onScrollCapture={this.scroll} ref={c => { this.scrollRef = c }} style={this.state.lookList.length < 1 ? { display: 'none' } : { display: 'block' }}>
            <div className="headerSon" style={{ width:'' + (this.state.macNum.length + 1) * 3.25 + 'rem' }}>
              <div className="topFixd" style={{ top: this.state.top, minWidth: '100%' }}>
                <span></span>
                {
                  this.state.macNum.map((item, i) => (
                    <span key={i}>{i + 1}
                      <div className="boxBoss" style={{ position: 'relative', width: '100%', height: '26px' }}>
                        <Input style={{ height: '26px', padding: '0', width: '100%', textAlign: 'center', fontSize: '8px', border: '0.06rem solid #ccc' }} data-uuid={item.uuid} onChange={this.tilChange} data-num={i + 1} onBlur={this.tilBlur} maxLength={5} placeholder="点击输入" />
                        <div className="plokjh" onClick={this.noneBox} data-num={i + 1} style={parseInt(this.state.value) === parseInt(i + 1) ? { display: 'none' } : { fontSize: '10px' }}>{item.title}</div>
                      </div>
                    </span>
                  ))
                }
              </div>
              <div style={{ height: 80 }}></div>
              {
                this.state.lookList.map((index, i) => (
                  <div key={i} className="sonList">
                    <span style={{ left: this.state.left }}>{index.a}<br />{i === this.state.lookList.length - 1 ? this.state.lastTime : ''}</span>
                    <span></span>
                    {
                      this.state.lookList[i].c.map((item, i) => (
                        <span
                          className='spanFa'
                          key={i}
                          data-time={index.a}
                          data-num={i + 1}
                          data-uuid={item.uuid}
                          data-type={item.type}
                          onClick={this.lookPlate}
                          onContextMenu={this.menu}
                          data-lo={index.a + '-' + (i + 1)}
                          style={item.type === 1 ? { background: '#6FB2FF', marginTop: '0.12rem', color: '#fff' } : {} && item.type === 2 ? { background: '#6FB2FF', marginTop: '0.12rem', color: '#fff', opacity: '.3' } : {} && item.type === 3 ? { background: '#F5A623', marginTop: '0.12rem', color: '#fff' } : {} && item.type === 4 ? { background: 'red', marginTop: '0.12rem', color: '#fff' } : {}}
                        >
                          {this.state.lotime.indexOf(index.a + '-' + (i + 1)) !== -1 ? <Icon type="check" /> : ''}
                          {item.type === 1 ? item.money : ''}
                        </span>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>

          <DatePicker
            mode="date"
            extra="Optional"
            title='选择日期'
            onChange={this.dateChange}
            locale={zh_CN}
            value={this.state.qiDate}
          >
          <div className="dateT">{this.state.dataString}</div>
          </DatePicker>

          <Result style={{ fontSize: '0.75rem' }} className={this.state.lookList.length === 0 ? '' : 'hidden'} icon={<Icon type="reconciliation" style={{ fontSize: '2rem' }} theme="twoTone" twoToneColor="#F5A623" />} title="没有预约情况" />
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
              <span>{this.state.informList.length > 0 ? this.state.informList[0].PlayTime : ''}</span>
            </div>
            <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
              <span>应到人数：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].Shouldarrive : ''}</span>
            </div>
            <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
              <span>已签到人数：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].TrueTo : ''}</span>
            </div>
            <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
              <span>活动状态：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].PublicStatus : ''}</span>
            </div>
            <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
              <span>场地费金额：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoney : ''}</span>
            </div>
            <div className="informDrawer" style={{ fontSize: '0.75rem' }}>
              <span>场地费状态：</span>
              <span>{this.state.informList.length > 0 ? this.state.informList[0].SiteMoneyStatus : ''}</span>
            </div>
          </Drawer>
        </div>
      </div>
    )
  }
}

export default orderPhT;