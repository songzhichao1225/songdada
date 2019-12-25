import React from 'react';
import './orderPh.css';
import ReactDOM from 'react-dom';
import { PullToRefresh,DatePicker, Toast, Card } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Modal, Radio, Input, Drawer, Result, Icon, Spin } from 'antd';
import { getReservationActivitieslist, VenueSendMessage, getVenueReservationss, getVenueSport, VenueClickCancelPlace, getVenueNumberTitleList, getVenueNumberTitleSave } from '../../api';

import moment from 'moment';
import zh_CN from 'antd/es/date-picker/locale/zh_CN'
const { TextArea } = Input

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class orderPh extends React.Component {

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
      { name: '已取消', id: 7 }
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
    venueid: '',


    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],

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


    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: genData(),
    }), 0);

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
    this.getReservationActivitieslist({
      page: page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '',
      startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end
    })
  }

  showModal = (e) => {
    this.setState({
      visible: true,
      publicUUID: e.currentTarget.dataset.uid,
      venueid: e.currentTarget.dataset.venueid
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
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end })
    }
  }

  sendingMessage = e => {
    let { publicUUID, sendCheck, textArea, venueid } = this.state
    this.VenueSendMessage({ type: sendCheck, publicUUID: publicUUID, content: textArea, venuenumber: '', venueid: venueid })
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
    this.getReservationActivitieslist({
      page: 1, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start,
      enddate: this.state.end === '选择结束日期' ? '' : this.state.end
    })
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
      <div className="orderPh">
        <div className="headerNav">
          <div onClick={this.activityList} style={this.state.activityList === true ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>预约活动列表</div>
          <div onClick={this.bookingKanban} style={this.state.activityList === false ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>场地预约情况</div>
        </div>
        <div className='headSelect' style={this.state.spinFlag === false ? { display: 'none' } : { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' }} ><Icon type="loading" className='loadingY' style={{ top: this.state.clenTop / 4 }} /></div>

        <div style={{ height: '0.5rem', background: '#f5f5f5' }}  ></div>
        <div className={this.state.activityList === true ? 'activityList' : 'hidden'}>
          <div className="screen" onClick={this.showDrawer}><span style={{ paddingRight: '0.2rem' }}>筛选</span><img style={{ marginTop: '-0.2rem' }} src={require('../../assets/shaixuan.png')} alt="筛选" /></div>



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
            onRefresh={() => {
              this.setState({ refreshing: true });
              setTimeout(() => {
                this.setState({ refreshing: false });
              }, 1000);
            }}
          >
            <div className='contentT'>
            <div style={this.state.activeSon.length === 0 ? { display: 'none' } : { display: 'block' }}>
              {
                this.state.activeSon.map((item, i) => (
                  <Card key={i}>
                    <Card.Header
                      title={'**' + item.orderId.slice(-4) + item.SportName}
                      thumb={
                        item.PublicStatus === '匹配中' ? require('../../assets/pipei.png') : ''
                          || item.PublicStatus === '待评价' ? require('../../assets/pinjia.png') : ''
                            || item.PublicStatus === '活动中' ? require('../../assets/huodong.png') : ''
                              || item.PublicStatus === '待填写结果' ? require('../../assets/jieguo.png') : ''
                                || item.PublicStatus === '待确认结束' ? require('../../assets/jieshu.png') : ''
                                  || item.PublicStatus === '已取消' ? require('../../assets/tuichu.png') : ''
                                    || item.PublicStatus === '已完成' ? require('../../assets/wancheng.png') : ''
                                      || item.PublicStatus === '待出发' ? require('../../assets/dai.png') : ''}
                      extra={<div style={{ fontSize: '12px', lineHeight: '13px', paddingRight: '0.5rem', textAlign: 'center' }}>{item.StartTime.slice(0, 10)}<br />{item.StartTime.slice(10, item.StartTime.length)} -{item.FinishedTime.slice(10, item.FinishedTime.length)}</div>}
                    />
                    <Card.Body style={{ fontSize: '12px' }}>
                      <div><span>金额:{item.SiteMoney}</span><span style={{ marginLeft: '11%' }}>支付状态:{item.SiteMoneyStatus}</span></div>
                      <div><span>应到人数:{item.Shouldarrive}人</span><span style={{ marginLeft: '5%' }}>已到人数:{item.TrueTo}人</span></div>
                      <div><span>时长:{item.PlayTime}小时</span><i onClick={this.showModal} data-venueid={item.venueid} data-uid={item.uuid} className={item.PublicStatus === '匹配中' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'sendingTwo' : 'circumstanceT'} >
                        <svg t="1577274065679" className="icon" viewBox="0 0 1235 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15123" width="40" height="40"><path d="M899.65056 979.48672c-120.35072 0-218.2656-97.95584-218.2656-218.35776s97.91488-218.35776 218.2656-218.35776 218.2656 97.95584 218.2656 218.35776S1020.00128 979.48672 899.65056 979.48672M899.65056 498.25792c-144.88576 0-262.76352 117.92384-262.76352 262.87104S754.75968 1024 899.65056 1024s262.76352-117.92384 262.76352-262.87104S1045.53984 498.25792 899.65056 498.25792M586.60864 862.70976 130.58048 862.70976c-17.21344 0-31.21152-14.53568-31.21152-32.41472L99.36896 112.66048c0-17.86368 14.0032-32.39936 31.21152-32.39936l926.38208 0c17.21344 0 31.2064 14.53568 31.2064 32.39936l0 377.84576c0 12.29824 9.6 22.25664 21.43744 22.25664 11.83232 0 21.43744-9.9584 21.43744-22.25664L1131.04384 112.66048c0-42.40896-33.23392-76.91264-74.08128-76.91264L130.58048 35.74784c-40.84736 0-74.0864 34.50368-74.0864 76.91264l0 717.63456c0 42.41408 33.23904 76.928 74.0864 76.928l456.02816 0c11.83744 0 21.43744-9.96352 21.43744-22.25664S598.44608 862.70976 586.60864 862.70976M1042.52928 95.83616l-448.768 343.95648c-0.87552 0.24064-2.25792 0.24576-3.10272 0.03072l-445.5936-343.936c-8.63232-8.74496-22.72256-8.832-31.4624-0.18944-8.74496 8.6272-8.82688 22.72768-0.19456 31.47264l447.42144 345.7792c0.7168 0.73216 1.48992 1.41312 2.30912 2.03264 8.28416 6.33856 18.6624 9.51296 29.05088 9.51296 10.37824 0 20.76672-3.1744 29.05088-9.50784 0.79872-0.60928 1.55136-1.26976 2.25792-1.98144l450.5856-345.7792c8.66304-8.71936 8.6272-22.8096-0.08704-31.47776C1065.27232 87.08608 1051.17696 87.11168 1042.52928 95.83616M779.74016 783.3856l186.10176 0-44.78976 44.8c-8.68864 8.69376-8.68864 22.784 0 31.47776 8.68352 8.69376 22.76864 8.69376 31.4624 0.00512l82.7648-82.79552c0.16384-0.16384 0.27136-0.36352 0.43008-0.52736 0.83456-0.88576 1.63328-1.81248 2.31424-2.82112 0.26624-0.39936 0.44544-0.83968 0.68096-1.2544 0.49152-0.83968 0.9984-1.67424 1.37216-2.57536 0.20992-0.50176 0.31232-1.03424 0.48128-1.55136 0.28672-0.86528 0.60928-1.70496 0.7936-2.60608 0.29184-1.43872 0.44544-2.91328 0.44544-4.40832l0 0 0 0c0-0.05632-0.02048-0.11264-0.02048-0.17408-0.01024-1.42848-0.14848-2.8416-0.42496-4.224-0.20992-1.024-0.55808-1.99168-0.896-2.95936-0.13824-0.39424-0.21504-0.80896-0.37376-1.19296-0.44544-1.07008-1.024-2.05824-1.62304-3.03104-0.1536-0.26112-0.26112-0.54272-0.42496-0.78848-0.81408-1.21344-1.7408-2.3552-2.76992-3.38432l-82.75456-98.23232c-4.34688-4.34176-10.0352-6.51776-15.73376-6.51776-5.68832 0-11.392 2.176-15.73376 6.51776-8.68864 8.69376-8.68864 38.23616 0 46.92992l44.78976 44.8-186.10176 0c-12.288 0-22.2464 9.96352-22.2464 22.25664S767.45216 783.3856 779.74016 783.3856" p-id="15124" fill='#888'></path></svg>
                      </i></div>
                    </Card.Body>
                    <Card.Footer />
                  </Card>
                ))
              }



              <Pagination className={this.state.activeSon.length > 0 ? 'fenye' : 'hidden'} size="small" defaultCurrent={1} onChange={this.current} total={this.state.total} />
            </div>
            <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin} />
            <Result className={this.state.spin === false && this.state.activeSon.length === 0 ? '' : 'hidden'} icon={<Icon style={{ fontSize: '2rem' }} type="bank" theme="twoTone" twoToneColor="#F5A623" />} title="没有活动列表" />
          </div>
          </PullToRefresh>













          
            



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
            <div className="headerSon" style={{ width: '' + (this.state.macNum.length + 1) * 3.25 + 'rem' }}>
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

export default orderPh;