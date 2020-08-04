import React from 'react';
import './orderPhT.css';

import { Toast, Card, Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination, Drawer, Spin } from 'antd';
import { getReservationActivitieslist, VenueSendMessage, getVenueSport, getVenueNumberTitleList, VenueNumberSporttypeSave, DelVenueNumberTitle, getVenueNumberTitleSave, getVenueSporttypelist } from '../../api';
import { LoadingOutlined, } from '@ant-design/icons';
import moment from 'moment';
const prompt = Modal.prompt;




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
    statusIdVal: 10,
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
      { name: '网球', id: 7 }
    ],
    status: [
      { name: '全部', id: 10 },
      { name: '待出发', id: 2 },
      { name: '活动中', id: 3 },
      { name: '投诉中', id: 9 },
      { name: '待填写比赛结果', id: 4 },
      { name: '待评价', id: 6 },
      { name: '已完成', id: 5 },
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
    paied:2
  }


  async getVenueNumberTitleList(data) {
    const res = await getVenueNumberTitleList(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ topNumList: res.data.data })
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
      if (res.data.data.length > 0) {
        this.setState({ remList: res.data.data, liNum: res.data.data[0].id })
        this.getVenueNumberTitleList({ sportid: res.data.data[0].id })
      }
    }
  }

  async getVenueSporttypelist(data) {
    const res = await getVenueSporttypelist(data, localStorage.getItem('venue_token'))
    if (res.data.code === 2000) {
      this.setState({ activityNavTwo: res.data.data })
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
    this.setState({ qiDate: new Date(), nowDate: new Date().toLocaleDateString().replace(/\//g, "-") })
    this.getVenueSport()
 
      if (sessionStorage.getItem('modl') === '1') {
        let start = moment().startOf('day')._d.toLocaleDateString().replace(/\//g, "-").split('-')
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-").split('-')
        let startT = ''
        let endT = ''
        if (start[0].length === 4) {
          startT = start[0] + '-' + start[1] + '-' + start[2]
          endT = end[0] + '-' + end[1] + '-' + end[2]
        } else if (start[0].length !== 4) {
          startT = start[2] + '-' + start[0] + '-' + start[1]
          endT = end[2] + '-' + end[0] + '-' + end[1]
        }
        this.setState({ start: startT, end: endT })
        this.getReservationActivitieslist({ page: 1, sport: '', status: 10, startdate: startT, enddate: endT,paied:2 })

      } else if (sessionStorage.getItem('modl') === '2') {
        let myDate = new Date()
        let start = moment().startOf('day').subtract(myDate.getDate() - 1, 'days')._d.toLocaleDateString().replace(/\//g, "-").split('-')
        let end = moment().endOf('day')._d.toLocaleDateString().replace(/\//g, "-").split('-')
        let startT = ''
        let endT = ''
        if (start[0].length === 4) {
          startT = start[0] + '-' + start[1] + '-' + start[2]
          endT = end[0] + '-' + end[1] + '-' + end[2]
        } else if (start[0].length !== 4) {
          startT = start[2] + '-' + start[0] + '-' + start[1]
          endT = end[2] + '-' + end[0] + '-' + end[1]
        }
        this.setState({ start: startT, end: endT })
        this.getReservationActivitieslist({ page: 1, sport: '', status: 10, startdate: startT, enddate: endT,paied:2 })
      }else if(this.props.history.location.query!==undefined){
        this.getReservationActivitieslist({ page: 1, publicuid:this.props.history.location.query.uuid,paied:2 })
      }else{
        this.setState({ activeSon: [], informList:[], total:[], flag: false, spin: false })
      }
    







    setInterval(() => {
      window.addEventListener('storage', sessionStorage.getItem('kood') === '2' ? this.getVenueNumberTitleList({ sportid: this.state.liNum }) : this);
    }, 2000)
  }



  activityList = () => {
    this.setState({ activityList: true })
    this.getReservationActivitieslist({ page: 1, sport: '', status: 10, publicuid: '',paied:2 })
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
      startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end,paied:this.state.paied
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
      Toast.success(res.data.msg, 1)
      this.setState({ visible: false })
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end,paied:this.state.paied })
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
      modalTwo: false
    })
  }


  sport = e => {
    this.setState({ sportIdVal: e.currentTarget.dataset.id })
  }
  status = e => {
    this.setState({ statusIdVal: e.currentTarget.dataset.id })
  }

  drawerInputOrderDate = (date) => {

    this.setState({ start: date })

  }



  drawerInputOrderDateTwo = (date) => {
    this.setState({ end: date.toLocaleDateString(), qiEnd: date })
  }

  submitVal = () => {

    this.getReservationActivitieslist({
      page: 1, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '' ? '' : this.state.start,
      enddate: this.state.end === '' ? '' : this.state.end,paied:this.state.paied
    })
    this.setState({
      Drawervisible: false, page: 1
    })
  }

  sportName = e => {
    this.setState({ liNum: e.currentTarget.dataset.id, liIndex: e.currentTarget.dataset.index })
    this.getVenueNumberTitleList({ sportid: e.target.dataset.id })
    this.getVenueSporttypelist({ sportid: e.target.dataset.id })
  }

  informOnClose = () => {
    this.setState({ informVisible: false })
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


  onTouchStart = (e) => {

    this.setState({ evet: e.currentTarget.dataset.type, evetId: e.currentTarget.dataset.uuid })
    this.timeOutEvent = setTimeout(() => {
      this.timeOutEvent = 0;
      this.menu()
    }, 400);
  }

  onTouchMove = () => {
    clearTimeout(this.timeOutEvent);
    this.timeOutEvent = 0;
  }
  onTouchEnd = () => {
    clearTimeout(this.timeOutEvent);
    if (this.timeOutEvent === 0) {


    }
    return false;
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
      this.VenueRemarksLabel({ uuid: this.state.evetId })
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


  placeSubmit = () => {
    let { vIpChang, nameChang, phoneChang, qitaChang, changNum, changTime, liNum, qiDate } = this.state


    let obj = {
      placeHui: vIpChang,
      placeName: nameChang,
      placePhone: phoneChang,
      placeQi: qitaChang,
    }
    this.VenueClickCancelPlace({ uuid: '', date: qiDate, venueid: changNum.slice(0, changNum.length - 1), other: JSON.stringify(obj), time: changTime.slice(0, changTime.length - 1), sportid: liNum, type: 1 })


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
      this.getReservationActivitieslist({ page: this.state.page, sport: this.state.sportIdVal, status: this.state.statusIdVal, publicuid: '', startdate: this.state.start === '选择开始日期' ? '' : this.state.start, enddate: this.state.end === '选择结束日期' ? '' : this.state.end,paied:this.state.paied })
    }, 1000)
  }

  delTitle = e => {
    this.DelVenueNumberTitle({ uuid: e.currentTarget.dataset.uuid })
  }


  classList = e => {
    this.setState({ sportName: e })
    this.VenueNumberSporttypeSave({ sportid: this.state.liNum, sporttype: e.split('-')[0], venueid: e.split('-')[1] })
  }



  totitle = e => {
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type === '1') {
      Toast.info('请为各场地选择对应的场地类型，如1号场地为11人制足球场地；2号场地为5人制足球场地等', 5);
    } else {
      Toast.info('请为各场地填写标签，如普通、VIP、赛台、独立包间、楼上、楼下、人造草皮、真草皮等标签，也可不填写', 5);
    }
  }




  render() {
    return (
      <div className="orderPh">
        <div className="headerNav">
          <div onClick={this.activityList} style={this.state.activityList === true ? { borderBottom: '0.12rem solid #D85D27', color: '#D85D27' } : { border: 'none', color: '#000' }}>预约活动列表</div>
        </div>
        <div className='headSelect' style={this.state.spinFlag === false ? { display: 'none' } : { display: 'block', height: this.state.clenTop, transition: '0.3s', position: 'relative' }} ><LoadingOutlined className='loadingY' style={{ top: this.state.clenTop / 4 }} /></div>
        <div style={{ height: '0.5rem', background: '#f5f5f5' }}></div>
        <div className={this.state.activityList === true ? 'activityList' : 'hidden'}>
          <div className="screen" onClick={this.showDrawer}><span style={{ paddingRight: '0.2rem' }}>筛选</span><img style={{ marginTop: '-0.2rem' }} src={require('../../assets/shaixuan.png')} alt="筛选" /></div>



          <div style={this.state.activeSon.length === 0 ? { display: 'none' } : { height: '100%', overflow: 'scroll', paddingBottom: '4rem' }}>
            {
              this.state.activeSon.map((item, i) => (
                <div key={i} >
                  <Card>
                    <Card.Header
                      title={'**' + item.orderId.slice(-4) + item.SportName}
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
                      extra={<div style={{ fontSize: '12px', lineHeight: '13px', paddingRight: '0.5rem', textAlign: 'right' }}>{item.StartTime.slice(0, 10)}<br />{item.StartTime.slice(10, item.StartTime.length)} -{item.FinishedTime.slice(10, item.FinishedTime.length)}</div>}
                    />
                    <Card.Body style={{ fontSize: '12px' }}>
                      <div><span style={{ display: 'block', width: '90px', float: 'left', marginLeft: '0.5rem' }}>金额:{item.SiteMoney}</span><span style={{ marginLeft: '5%' }}>支付状态:{item.SiteMoneyStatus}</span><span style={item.reserve === 1 ? { display: 'none' } : { display: 'block', width: '90px', float: 'left' }}>应到人数:{item.Shouldarrive}人</span></div>
                      <div><span style={{ display: 'block', width: '90px', float: 'left', marginLeft: '0.5rem' }}>时长:{item.PlayTime}小时</span><span style={item.reserve === 1 ? { display: 'none' } : {}}>报名人数:{item.TrueTo}人</span><i onClick={this.showModal} data-venueid={item.venueid} data-uid={item.uuid} className={item.PublicStatus === '匹配中' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '待出发' ? 'sendingTwo' : 'circumstanceT' && item.PublicStatus === '活动中' ? 'sendingTwo' : 'circumstanceT'} >
                        <svg t="1577274065679" className="icon" viewBox="0 0 1235 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15123" width="30" height="30"><path d="M899.65056 979.48672c-120.35072 0-218.2656-97.95584-218.2656-218.35776s97.91488-218.35776 218.2656-218.35776 218.2656 97.95584 218.2656 218.35776S1020.00128 979.48672 899.65056 979.48672M899.65056 498.25792c-144.88576 0-262.76352 117.92384-262.76352 262.87104S754.75968 1024 899.65056 1024s262.76352-117.92384 262.76352-262.87104S1045.53984 498.25792 899.65056 498.25792M586.60864 862.70976 130.58048 862.70976c-17.21344 0-31.21152-14.53568-31.21152-32.41472L99.36896 112.66048c0-17.86368 14.0032-32.39936 31.21152-32.39936l926.38208 0c17.21344 0 31.2064 14.53568 31.2064 32.39936l0 377.84576c0 12.29824 9.6 22.25664 21.43744 22.25664 11.83232 0 21.43744-9.9584 21.43744-22.25664L1131.04384 112.66048c0-42.40896-33.23392-76.91264-74.08128-76.91264L130.58048 35.74784c-40.84736 0-74.0864 34.50368-74.0864 76.91264l0 717.63456c0 42.41408 33.23904 76.928 74.0864 76.928l456.02816 0c11.83744 0 21.43744-9.96352 21.43744-22.25664S598.44608 862.70976 586.60864 862.70976M1042.52928 95.83616l-448.768 343.95648c-0.87552 0.24064-2.25792 0.24576-3.10272 0.03072l-445.5936-343.936c-8.63232-8.74496-22.72256-8.832-31.4624-0.18944-8.74496 8.6272-8.82688 22.72768-0.19456 31.47264l447.42144 345.7792c0.7168 0.73216 1.48992 1.41312 2.30912 2.03264 8.28416 6.33856 18.6624 9.51296 29.05088 9.51296 10.37824 0 20.76672-3.1744 29.05088-9.50784 0.79872-0.60928 1.55136-1.26976 2.25792-1.98144l450.5856-345.7792c8.66304-8.71936 8.6272-22.8096-0.08704-31.47776C1065.27232 87.08608 1051.17696 87.11168 1042.52928 95.83616M779.74016 783.3856l186.10176 0-44.78976 44.8c-8.68864 8.69376-8.68864 22.784 0 31.47776 8.68352 8.69376 22.76864 8.69376 31.4624 0.00512l82.7648-82.79552c0.16384-0.16384 0.27136-0.36352 0.43008-0.52736 0.83456-0.88576 1.63328-1.81248 2.31424-2.82112 0.26624-0.39936 0.44544-0.83968 0.68096-1.2544 0.49152-0.83968 0.9984-1.67424 1.37216-2.57536 0.20992-0.50176 0.31232-1.03424 0.48128-1.55136 0.28672-0.86528 0.60928-1.70496 0.7936-2.60608 0.29184-1.43872 0.44544-2.91328 0.44544-4.40832l0 0 0 0c0-0.05632-0.02048-0.11264-0.02048-0.17408-0.01024-1.42848-0.14848-2.8416-0.42496-4.224-0.20992-1.024-0.55808-1.99168-0.896-2.95936-0.13824-0.39424-0.21504-0.80896-0.37376-1.19296-0.44544-1.07008-1.024-2.05824-1.62304-3.03104-0.1536-0.26112-0.26112-0.54272-0.42496-0.78848-0.81408-1.21344-1.7408-2.3552-2.76992-3.38432l-82.75456-98.23232c-4.34688-4.34176-10.0352-6.51776-15.73376-6.51776-5.68832 0-11.392 2.176-15.73376 6.51776-8.68864 8.69376-8.68864 38.23616 0 46.92992l44.78976 44.8-186.10176 0c-12.288 0-22.2464 9.96352-22.2464 22.25664S767.45216 783.3856 779.74016 783.3856" p-id="15124" fill='#888'></path></svg>
                      </i></div>
                    </Card.Body>
                    <Card.Footer />
                  </Card>
                </div>

              ))
            }

            <Pagination className={this.state.activeSon.length > 0 ? 'fenye' : 'hidden'} hideOnSinglePage={true} showSizeChanger={false} size="small" defaultCurrent={1} onChange={this.current} current={this.state.page} total={this.state.total} />

          </div>

          <Spin style={{ width: '100%', marginTop: '45%' }} spinning={this.state.spin} />
          <div style={this.state.spin === false && this.state.activeSon.length === 0 ? { width: '100%' } : { display: 'none' }}><img style={{ width: '4rem', height: '4rem', display: 'block', margin: '4rem auto 0' }} src={require('../../assets/xifen (5).png')} alt="444" /><span style={{ display: 'block', textAlign: 'center' }}>没有相关预约活动!</span></div>
        </div>





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

          <div className="drawerBtn">
            <div onClick={this.onClose}>取消</div>
            <div onClick={this.submitVal}>确定</div>
          </div>
        </Drawer>





      </div>
    )
  }
}

export default orderPhT;